import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import OfflineSimulatorBar from '../../components/OfflineSimulatorBar.jsx';
import {
  ClipboardList,
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

export default function AssignedInspections() {
  const navigate = useNavigate();
  const { applications } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const assigned = applications.filter(
    (a) => a.assignedOfficer && a.assignedOfficer !== 'Unassigned'
  );

  const filtered = assigned.filter(
    (a) =>
      a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.instrumentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <OfflineSimulatorBar />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Assigned Inspections</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Field verification tasks dispatched by the Smart Scheduling engine for your assigned jurisdiction.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inspections by ID, business, or address..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#00162c]"
          />
        </div>
        <span className="text-xs font-mono text-slate-500">{filtered.length} assigned</span>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <ClipboardList className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No inspections assigned</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm
              ? 'No assigned inspections match your search criteria.'
              : 'There are no pending inspection tasks in your jurisdiction queue.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {app.id}
                  </span>
                  <StatusBadge status={app.status} size="sm" />
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2f6388] transition-colors">
                  {app.instrumentName}
                </h3>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">{app.businessName}</p>
                  <p className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{app.location}</span>
                  </p>
                  <p className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Scheduled: {app.scheduledDate} ({app.scheduledTime})</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-500">
                  {app.verificationType}
                </span>

                <button
                  onClick={() => navigate(`/lmo/inspection/${app.id}`)}
                  className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Launch Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
