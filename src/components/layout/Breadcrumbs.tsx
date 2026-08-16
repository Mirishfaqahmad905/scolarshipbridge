import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center gap-1.5 list-none p-0 m-0">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-indigo-600 transition-colors text-slate-600 font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast || !item.url ? (
                <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-indigo-600 transition-colors text-slate-600 font-medium truncate max-w-[150px] sm:max-w-xs"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
