import React, { useState } from 'react';
import { CheckCircle2, Circle, Sparkles, AlertCircle } from 'lucide-react';
import { Scholarship } from '../../types';

interface EligibilityChecklistProps {
  scholarship: Scholarship;
}

export const EligibilityChecklist: React.FC<EligibilityChecklistProps> = ({ scholarship }) => {
  const requirementsList = scholarship.requirements || [
    'Completed prior academic degree with satisfactory grades',
    'Meet host university English language proficiency standards',
    'Submit academic reference letters from professors',
    'Submit Statement of Purpose (SOP) or motivation essay'
  ];

  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedState(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const totalCriteria = requirementsList.length + 2; // Including degree and language
  const checkedCount = Object.values(checkedState).filter(Boolean).length;
  const matchPercentage = Math.round((checkedCount / totalCriteria) * 100);

  return (
    <div id="eligibility-evaluator" className="bg-gradient-to-b from-indigo-50/50 via-white to-white rounded-2xl border border-indigo-100 p-5 sm:p-6 space-y-4">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100/80">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Interactive Eligibility Self-Check</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Tick each criterion to calculate your admission compatibility score.
          </p>
        </div>

        {/* Match percentage meter */}
        <div className="flex items-center gap-3 bg-white px-3.5 py-2 rounded-xl border border-indigo-200/80 shadow-xs shrink-0">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-slate-400">Match Score</span>
            <span className={`text-base font-black ${
              matchPercentage === 100 ? 'text-emerald-600' : matchPercentage >= 60 ? 'text-indigo-600' : 'text-amber-600'
            }`}>
              {matchPercentage}%
            </span>
          </div>
          <div className="w-12 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                matchPercentage === 100 ? 'bg-emerald-500' : matchPercentage >= 60 ? 'bg-indigo-600' : 'bg-amber-500'
              }`}
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-2.5">
        
        {/* Automatic core item: Degree Level */}
        <div
          onClick={() => toggleCheck(998)}
          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
            checkedState[998] ? 'bg-emerald-50/60 border-emerald-200 text-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          {checkedState[998] ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
          )}
          <div className="text-xs sm:text-sm">
            <span className="font-semibold block">Target Degree Qualification</span>
            <span className="text-slate-500">I hold the required prior qualification for {scholarship.degreeLevels.join(' / ')} level study.</span>
          </div>
        </div>

        {/* Automatic core item: Language */}
        <div
          onClick={() => toggleCheck(999)}
          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
            checkedState[999] ? 'bg-emerald-50/60 border-emerald-200 text-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          {checkedState[999] ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
          )}
          <div className="text-xs sm:text-sm">
            <span className="font-semibold block">Language Proficiency Condition</span>
            <span className="text-slate-500">
              {scholarship.languageRequirements.ieltsRequired
                ? `I possess valid IELTS (${scholarship.languageRequirements.ieltsScore}) / TOEFL or will complete testing before the deadline.`
                : 'I meet the Medium of Instruction (MOI) English certificate or native English proficiency requirement.'}
            </span>
          </div>
        </div>

        {/* Specific criteria from requirements list */}
        {requirementsList.map((req, idx) => (
          <div
            key={idx}
            onClick={() => toggleCheck(idx)}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
              checkedState[idx] ? 'bg-emerald-50/60 border-emerald-200 text-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            {checkedState[idx] ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
            )}
            <div className="text-xs sm:text-sm leading-relaxed">
              {req}
            </div>
          </div>
        ))}

      </div>

      {matchPercentage === 100 && (
        <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-semibold">
            Outstanding! You satisfy 100% of the core eligibility standards for this scholarship.
          </span>
        </div>
      )}
    </div>
  );
};
