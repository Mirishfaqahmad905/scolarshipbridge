import React, { useState } from 'react';
import { MessageSquare, Send, ShieldCheck, Heart, Reply, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CommentsSectionProps {
  scholarshipId: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ scholarshipId }) => {
  const { comments, addComment, currentUser } = useApp();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [content, setContent] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, number>>({});

  const relevantComments = comments.filter(c => c.scholarshipId === scholarshipId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && content.trim()) {
      addComment(scholarshipId, name.trim(), email.trim(), content.trim());
      setContent('');
    }
  };

  const handleLike = (id: string, currentLikes: number) => {
    setLikedMap(prev => ({
      ...prev,
      [id]: (prev[id] || currentLikes) + 1
    }));
  };

  return (
    <div id="comments-and-qna" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">Student Discussion & Q&A</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
          {relevantComments.length} {relevantComments.length === 1 ? 'Inquiry' : 'Inquiries'}
        </span>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Ask a question or share your experience
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Your Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="px-3.5 py-2 bg-white text-xs text-slate-800 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          />
          <input
            type="email"
            required
            placeholder="Email (kept strictly private)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-3.5 py-2 bg-white text-xs text-slate-800 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          />
        </div>

        <textarea
          required
          rows={3}
          placeholder="Ask regarding documents, IELTS waivers, admission deadlines, or embassy processing..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white text-xs text-slate-800 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none leading-relaxed"
        />

        <div className="flex items-center justify-between pt-1">
          <p className="text-[11px] text-slate-400">
            Comments are moderated by ScholarBridge advisors.
          </p>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
          >
            <span>Post Inquiry</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>

      {/* Existing Comments List */}
      <div className="space-y-4 pt-2">
        {relevantComments.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No questions yet for this scholarship. Be the first to ask!
          </div>
        ) : (
          relevantComments.map(comment => {
            const likes = likedMap[comment.id] !== undefined ? likedMap[comment.id] : comment.likes;
            return (
              <div key={comment.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{comment.authorName}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(comment.id, comment.likes)}
                    className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-600 transition-colors px-2 py-1 rounded-md hover:bg-rose-50"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>{likes}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed pl-9">
                  {comment.content}
                </p>

                {/* Staff / Advisor Replies */}
                {comment.replies && comment.replies.map(reply => (
                  <div key={reply.id} className="ml-9 p-3 rounded-lg bg-indigo-50/70 border border-indigo-100 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-xs font-bold text-indigo-950">{reply.authorName}</span>
                      <span className="text-[10px] bg-indigo-200/80 text-indigo-800 font-bold px-1.5 py-0.2 rounded">
                        Verified Advisor
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
