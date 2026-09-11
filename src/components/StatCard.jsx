import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, trend, variant = 'default', alert = false }) {
  const variantStyles = {
    default: 'text-slate-800',
    primary: 'text-[#00162c]',
    secondary: 'text-[#2f6388]',
    success: 'text-emerald-700',
    warning: 'text-amber-700',
    error: 'text-rose-700'
  };

  return (
    <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all hover:border-slate-300">
      <div className="flex items-center justify-between text-slate-500">
        <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">{title}</span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-50 text-slate-600">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className={`text-2xl lg:text-3xl font-bold tracking-tight ${variantStyles[variant] || 'text-slate-900'}`}>
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1.5">
            {trend && <span className="font-semibold">{trend}</span>}
            <span>{subtitle}</span>
          </p>
        )}
      </div>
      {alert && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-rose-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          Action Required
        </div>
      )}
    </div>
  );
}
