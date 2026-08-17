import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  Mail, 
  MailOpen, 
  CheckCircle, 
  Reply, 
  RefreshCw, 
  Calendar, 
  User, 
  Phone, 
  Clock, 
  Inbox,
  AlertCircle
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminContactMessagesPage: React.FC = () => {
  const { addToast } = useApp();

  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const list = await scholarshipApi.admin.getContactMessages();
      setMessages(list);
      if (list.length > 0 && !selectedMessage) {
        setSelectedMessage(list[0]);
      }
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to load inbox.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSelectMessage = async (msg: any) => {
    setSelectedMessage(msg);
    if (msg.status === 'new') {
      try {
        await scholarshipApi.admin.updateContactMessageStatus(msg.id, 'read');
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, status: 'read' } : m))
        );
      } catch (err) {
        // silent
      }
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await scholarshipApi.admin.updateContactMessageStatus(id, status);
      addToast({ type: 'success', title: 'Status Updated', message: `Marked as ${status}.` });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Could not update status.' });
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await scholarshipApi.admin.deleteContactMessage(itemToDelete.id);
      addToast({ type: 'success', title: 'Deleted', message: 'Message permanently removed.' });
      setDeleteModalOpen(false);
      setItemToDelete(null);
      const remaining = messages.filter((m) => m.id !== itemToDelete.id);
      setMessages(remaining);
      setSelectedMessage(remaining[0] || null);
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Could not delete message.' });
    }
  };

  const filtered = messages.filter((m) => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.subject?.toLowerCase().includes(q) ||
        m.message?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout
      title="Contact Form Inquiries Inbox"
      subtitle="Read, process, reply, and archive inquiries submitted by prospective scholars in contactMessages.json"
    >
      <div className="space-y-6">
        {/* Top Controls */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sender name, email, subject, or message text..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">All Messages ({messages.length})</option>
              <option value="new">New / Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>

            <button
              onClick={loadMessages}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Master-Detail Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Messages List */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden max-h-[700px] flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Inbox ({filtered.length})</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">contactMessages.json</span>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
              {isLoading ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Loading inquiries...
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No contact messages match your filter.
                </div>
              ) : (
                filtered.map((msg) => {
                  const isSelected = selectedMessage?.id === msg.id;
                  const isNew = msg.status === 'new';
                  return (
                    <div
                      key={msg.id}
                      onClick={() => handleSelectMessage(msg)}
                      className={`p-4 transition-all cursor-pointer text-xs space-y-1.5 ${
                        isSelected
                          ? 'bg-indigo-50/70 border-l-4 border-indigo-600'
                          : isNew
                          ? 'bg-white hover:bg-slate-50/80 font-bold'
                          : 'bg-slate-50/30 hover:bg-slate-50/80 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`truncate text-xs ${isNew ? 'font-black text-slate-900' : 'font-semibold text-slate-800'}`}>
                          {msg.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {msg.createdAt?.split('T')[0] || 'Today'}
                        </span>
                      </div>

                      <p className={`line-clamp-1 text-xs ${isNew ? 'text-indigo-900 font-semibold' : 'text-slate-700'}`}>
                        {msg.subject || 'Student Inquiry'}
                      </p>

                      <p className="line-clamp-2 text-[11px] text-slate-500 font-normal">
                        {msg.message}
                      </p>

                      <div className="flex items-center gap-1.5 pt-1">
                        <span className={`px-2 py-0.2 rounded-full text-[9px] font-black uppercase ${
                          msg.status === 'new' ? 'bg-rose-500 text-white' :
                          msg.status === 'replied' ? 'bg-emerald-100 text-emerald-800' :
                          msg.status === 'archived' ? 'bg-slate-200 text-slate-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Message Detail & Response */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      {selectedMessage.subject || 'Direct Student Question'}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Received on {selectedMessage.createdAt || 'Recent'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => handleUpdateStatus(selectedMessage.id, e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none cursor-pointer"
                    >
                      <option value="new">Mark New</option>
                      <option value="read">Mark Read</option>
                      <option value="replied">Mark Replied</option>
                      <option value="archived">Archive</option>
                    </select>

                    <button
                      onClick={() => {
                        setItemToDelete({ id: selectedMessage.id, name: selectedMessage.name });
                        setDeleteModalOpen(true);
                      }}
                      className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sender Metadata Box */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="font-bold">{selectedMessage.name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <a href={`mailto:${selectedMessage.email}`} className="text-indigo-600 hover:underline">
                      {selectedMessage.email}
                    </a>
                  </div>

                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2 text-slate-700">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>{selectedMessage.phone}</span>
                    </div>
                  )}

                  {selectedMessage.country && (
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Origin: {selectedMessage.country}</span>
                    </div>
                  )}
                </div>

                {/* Message Body */}
                <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 text-xs leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>

                {/* Reply Trigger */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Clicking reply will launch your email client addressing {selectedMessage.email}.
                  </span>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject || 'Scholarship Inquiry'
                    )}`}
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'replied')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Send Email Reply</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center text-slate-400 text-xs">
                Select an inquiry from the left to view its full details.
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        itemName={itemToDelete?.name}
        onCancel={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
};
