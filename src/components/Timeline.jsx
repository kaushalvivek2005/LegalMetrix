import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

export function ApplicationTimeline({ steps = [] }) {
  return (
    <div className="w-full py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 relative">
        {steps.map((item, idx) => {
          const isDone = item.completed;
          const isCurrent = !isDone && (idx === 0 || steps[idx - 1]?.completed);
          
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                  : isCurrent
                  ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-100 text-blue-950 shadow-xs'
                  : 'bg-slate-50/80 border-slate-200/70 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  isDone ? 'bg-emerald-100 text-emerald-800' : isCurrent ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  Step {idx + 1}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-semibold leading-tight line-clamp-2">
                  {item.step}
                </h4>
                <p className="text-[11px] mt-1.5 opacity-80 truncate">
                  {item.date || 'Pending'}
                </p>
                {item.actor && (
                  <p className="text-[10px] mt-0.5 opacity-70 font-mono truncate">
                    {item.actor}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LifecyclePipelineBar({ activeStep = 1 }) {
  const stages = [
    { num: 1, name: 'Register', desc: 'Instrument Profile', icon: 'how_to_reg' },
    { num: 2, name: 'Apply', desc: 'Stamping Request', icon: 'description' },
    { num: 3, name: 'Schedule', desc: 'Smart LMO Match', icon: 'calendar_month' },
    { num: 4, name: 'Inspect', desc: 'Field Verification', icon: 'fact_check' },
    { num: 5, name: 'Certify', desc: 'Crypto Seal Gen', icon: 'military_tech' },
    { num: 6, name: 'Verify', desc: 'Public QR Check', icon: 'qr_code_2' },
    { num: 7, name: 'Track', desc: 'Annual Re-Verify', icon: 'monitoring' },
  ];

  return (
    <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Digital Metrology Lifecycle Pipeline
        </h3>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          SIH26036 Standard Flow
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {stages.map((stage) => {
          const isActive = stage.num === activeStep;
          const isPassed = stage.num < activeStep;

          return (
            <div
              key={stage.num}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                isActive
                  ? 'bg-[#0f2b46] text-white border-[#0f2b46] shadow-sm'
                  : isPassed
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-slate-50 text-slate-700 border-slate-200/80'
              }`}
            >
              <div className={`w-5 h-5 rounded-full mb-1 flex items-center justify-center text-[10px] font-bold ${
                isActive ? 'bg-white text-[#0f2b46]' : isPassed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {isPassed ? '✓' : stage.num}
              </div>
              <span className="text-xs font-semibold">{stage.name}</span>
              <span className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                {stage.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
