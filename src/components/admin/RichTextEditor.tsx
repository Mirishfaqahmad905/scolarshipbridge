import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Quote, 
  Code, 
  Table as TableIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Eye, 
  Edit3
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  label?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write content here (Markdown & Rich Text supported)...',
  minHeight = '320px',
  label
}) => {
  const [activeView, setActiveView] = useState<'edit' | 'preview'>('edit');

  const insertFormatting = (prefix: string, suffix: string = '', defaultText: string = '') => {
    const textarea = document.getElementById('rich-text-textarea') as HTMLTextAreaElement;
    if (!textarea) {
      onChange(value + prefix + defaultText + suffix);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;
    const replacement = prefix + selectedText + suffix;
    
    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 10);
  };

  const handleInsertLink = () => {
    const url = prompt('Enter hyperlink URL:', 'https://');
    if (url) {
      insertFormatting('[', `](${url})`, 'Link text');
    }
  };

  const handleInsertImage = () => {
    const url = prompt('Enter Image URL (or Base64 data URI):', 'https://');
    if (url) {
      insertFormatting('![', `](${url})`, 'Image description');
    }
  };

  const handleInsertTable = () => {
    const tableTemplate = `\n| Column 1 | Column 2 | Column 3 |\n| :--- | :--- | :--- |\n| Data A | Data B | Data C |\n| Data 1 | Data 2 | Data 3 |\n\n`;
    onChange(value + tableTemplate);
  };

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{label}</label>
          <span className="text-xs text-slate-400">Markdown & HTML formatting enabled</span>
        </div>
      )}

      <div className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200 gap-1">
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**', 'bold text')}
              title="Bold"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*', 'italic text')}
              title="Italic"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Italic className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-300 mx-1" />

            <button
              type="button"
              onClick={() => insertFormatting('\n# ', '\n', 'Heading 1')}
              title="Heading 1"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n## ', '\n', 'Heading 2')}
              title="Heading 2"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n### ', '\n', 'Heading 3')}
              title="Heading 3"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Heading3 className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-300 mx-1" />

            <button
              type="button"
              onClick={() => insertFormatting('\n- ', '', 'List item')}
              title="Bullet List"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n1. ', '', 'Numbered item')}
              title="Numbered List"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n> ', '\n', 'Quote text')}
              title="Blockquote"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Quote className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-300 mx-1" />

            <button
              type="button"
              onClick={handleInsertLink}
              title="Insert Link"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleInsertImage}
              title="Insert Image"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleInsertTable}
              title="Insert Table"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n```\n', '\n```\n', '// Code snippet')}
              title="Code Block"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>

          {/* Toggle Edit / Preview */}
          <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveView('edit')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeView === 'edit' ? 'bg-white text-indigo-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('preview')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeView === 'preview' ? 'bg-white text-indigo-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* View Mode */}
        {activeView === 'edit' ? (
          <textarea
            id="rich-text-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full p-4 text-sm text-slate-800 font-mono leading-relaxed bg-transparent resize-y outline-none focus:outline-none"
          />
        ) : (
          <div 
            style={{ minHeight }}
            className="p-4 prose prose-slate max-w-none text-sm leading-relaxed overflow-y-auto bg-slate-50/50"
          >
            {value ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <span className="text-slate-400 italic">No content to preview yet.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
