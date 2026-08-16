import React from 'react';
import { Scholarship } from '../../types';
import { ScholarshipCard } from './ScholarshipCard';

interface RelatedScholarshipsProps {
  currentScholarship: Scholarship;
  allScholarships: Scholarship[];
}

export const RelatedScholarships: React.FC<RelatedScholarshipsProps> = ({ currentScholarship, allScholarships }) => {
  // Find same country or same degree level, excluding current
  const related = allScholarships
    .filter(s => s.id !== currentScholarship.id)
    .filter(s => 
      s.country === currentScholarship.country ||
      s.degreeLevels.some(d => currentScholarship.degreeLevels.includes(d)) ||
      s.category === currentScholarship.category
    )
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div id="related-scholarships-section" className="space-y-4 mt-12">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Related Opportunities You May Qualify For
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map(scholarship => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} viewMode="grid" />
        ))}
      </div>
    </div>
  );
};
