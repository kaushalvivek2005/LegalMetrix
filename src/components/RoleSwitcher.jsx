import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Building2, Wrench, Globe } from 'lucide-react';

export default function RoleSwitcher() {
  const { role, setRole } = useApp();
  const navigate = useNavigate();

  const roles = [
    { id: 'business', label: 'Business', icon: Building2, path: '/business/dashboard' },
    { id: 'lmo', label: 'LMO', icon: UserCheck, path: '/lmo/dashboard' },
    { id: 'gatc', label: 'GATC', icon: Wrench, path: '/gatc/dashboard' },
    { id: 'admin', label: 'Government Admin', icon: ShieldCheck, path: '/admin/dashboard' },
    { id: 'public', label: 'Public', icon: Globe, path: '/verify' },
  ];

  const handleRoleChange = (newRole, path) => {
    setRole(newRole);
    navigate(path);
  };

  return (
    <div className="flex items-center gap-2 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 shadow-xs">
      <div className="hidden sm:flex items-center gap-1 px-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        DEMO MODE:
      </div>
      <div className="flex items-center gap-1 overflow-x-auto">
        {roles.map((r) => {
          const isActive = role === r.id;
          const Icon = r.icon;
          return (
            <button
              key={r.id}
              onClick={() => handleRoleChange(r.id, r.path)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#00162c] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title={`Switch to ${r.label} View`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
