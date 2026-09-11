import React from 'react';

export default function StatusBadge({ status, size = 'md' }) {
  const norm = (status || '').toLowerCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (norm.includes('verified') || norm.includes('approved') || norm.includes('pass') || norm.includes('active') || norm.includes('completed')) {
    colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium';
  } else if (norm.includes('scheduled') || norm.includes('assigned') || norm.includes('review') || norm.includes('submitted')) {
    colorClasses = 'bg-blue-50 text-blue-800 border-blue-200 font-medium';
  } else if (norm.includes('pending') || norm.includes('due') || norm.includes('warning') || norm.includes('draft') || norm.includes('expir')) {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200 font-medium';
  } else if (norm.includes('failed') || norm.includes('reject') || norm.includes('expired') || norm.includes('violation')) {
    colorClasses = 'bg-rose-50 text-rose-800 border-rose-200 font-medium';
  }

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : size === 'lg'
    ? 'px-3 py-1.5 text-sm'
    : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${colorClasses} tracking-wide`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      <span>{status}</span>
    </span>
  );
}
