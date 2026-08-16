import React from 'react';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

interface DeadlineCountdownProps {
  deadline: string;
  compact?: boolean;
}

export const DeadlineCountdown: React.FC<DeadlineCountdownProps> = ({ deadline, compact = false }) => {
  const target = new Date(deadline);
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formattedDate = target.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  if (diffDays < 0) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold text-rose-600 bg-rose-50 border border-rose-200/80 rounded-md ${
        compact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}>
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>Closed ({formattedDate})</span>
      </span>
    );
  }

  if (diffDays <= 15) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-md animate-pulse ${
        compact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}>
        <Clock className="w-3.5 h-3.5 text-rose-600" />
        <span>{diffDays} {diffDays === 1 ? 'day' : 'days'} left ({formattedDate})</span>
      </span>
    );
  }

  if (diffDays <= 45) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-md ${
        compact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}>
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        <span>{diffDays} days left ({formattedDate})</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium text-slate-600 bg-slate-100/90 border border-slate-200/80 rounded-md ${
      compact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
    }`}>
      <Calendar className="w-3.5 h-3.5 text-slate-500" />
      <span>{formattedDate}</span>
    </span>
  );
};
