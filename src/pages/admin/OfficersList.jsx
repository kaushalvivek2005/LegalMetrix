import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { Users, MapPin, Phone, Mail, Award, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OfficersList() {
  const { officers } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
            <Users className="w-4 h-4 text-blue-600" />
            Enforcement Directorate Roster
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Legal Metrology Officers &amp; Jurisdictions</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Authorized government inspectors certified under the Legal Metrology Act for field testing and stamping.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {officers.map((officer) => (
          <div
            key={officer.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {officer.id.toUpperCase()}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3" />
                  Active Field Duty
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#00162c] text-white flex items-center justify-center font-bold text-sm">
                  {officer.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{officer.name}</h3>
                  <p className="text-xs text-slate-500">{officer.role}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">{officer.jurisdiction}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{officer.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{officer.email}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block uppercase">Workload</span>
                  <span className="font-bold text-slate-900 text-sm">{officer.activeWorkload} active</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block uppercase">Completed</span>
                  <span className="font-bold text-emerald-800 text-sm">{officer.completedInspections} audits</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate(`/admin/scheduling`)}
                className="w-full py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-[#00162c] hover:text-white transition-all cursor-pointer shadow-xs"
              >
                Schedule Inspections
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
