import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Send, 
  Linkedin, 
  Twitter, 
  Mail, 
  Printer 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SocialShareButtonsProps {
  title: string;
  url?: string;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ title, url }) => {
  const { addToast } = useApp();
  const [copied, setCopied] = useState(false);
  
  const currentUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(`Check out this fully funded scholarship: ${title}`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Link Copied!',
      message: 'Scholarship URL copied to clipboard.'
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="social-share-bar" className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mr-1">
        <Share2 className="w-4 h-4 text-indigo-600" />
        <span>Share:</span>
      </div>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
          copied
            ? 'bg-emerald-500 text-white border-emerald-500'
            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
        }`}
        title="Copy scholarship link"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
        <span>{copied ? 'Copied' : 'Copy Link'}</span>
      </button>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
        title="Share to WhatsApp"
      >
        <span>WhatsApp</span>
      </a>

      {/* Telegram */}
      <a
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors"
        title="Share to Telegram"
      >
        <Send className="w-3 h-3" />
        <span>Telegram</span>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
        title="Share on Twitter / X"
      >
        <Twitter className="w-4 h-4" />
      </a>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodedTitle}&body=I found this scholarship opportunity on ScholarBridge:%0A%0A${encodedUrl}`}
        className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
        title="Send via Email"
      >
        <Mail className="w-4 h-4" />
      </a>

      {/* Print */}
      <button
        onClick={handlePrint}
        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors ml-auto hidden sm:block"
        title="Print Scholarship Summary"
      >
        <Printer className="w-4 h-4" />
      </button>
    </div>
  );
};
