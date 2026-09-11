import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import StatCard from '../../components/StatCard.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import OfflineSimulatorBar from '../../components/OfflineSimulatorBar.jsx';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Navigation,
  Smartphone
} from 'lucide-react';

export default function LmoDashboard() {
  const navigate = useNavigate();
  const { applications, isOffline, pendingSyncCount } = useApp();

  // Find applications assigned to LMO
  const assignedInspections = applications.filter(
    (a) => a.assignedOfficer && a.assignedOfficer !== 'Unassigned'
  );

  const completedCount = applications.filter((a) => a.status === 'Approved' || a.status === 'Inspection Completed').length;
  const pendingCount = assignedInspections.filter((a) => a.status !== 'Approved' && a.status !== 'Rejected').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Offline First Simulation Banner */}
      <OfflineSimulatorBar />

      {/* Header Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#00162c] text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-2">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            Field Verification Console • Enforcement Directorate
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Legal Metrology Officer (LMO) Field Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Officer: Rajesh Sharma (ID: LMO-DEL-042) • Jurisdiction: Central Delhi
          </p>
        </div>

        <button
          onClick={() => {
            const firstApp = assignedInspections[0]?.id || 'LM-APP-2026-00421';
            navigate(`/lmo/inspection/${firstApp}`);
          }}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Launch Field Audit</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Today"
          value={assignedInspections.length}
          subtitle="Field queue"
          icon={ClipboardList}
          variant="primary"
        />
        <StatCard
          title="Verified &amp; Stamped"
          value={completedCount}
          subtitle="Completed"
          icon={CheckCircle2}
          variant="success"
        />
        <StatCard
          title="Pending Inspections"
          value={pendingCount}
          subtitle="Awaiting audit"
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Offline Sync Queue"
          value={pendingSyncCount}
          subtitle={pendingSyncCount > 0 ? 'Pending ledger push' : 'All synced'}
          icon={AlertCircle}
          variant={pendingSyncCount > 0 ? 'warning' : 'neutral'}
        />
      </div>

      {/* Today's Field Route Inspection Cards */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Today's Inspection Queue</h3>
            <p className="text-xs text-slate-500">Route optimized with geofenced location validation.</p>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
            Zone: DL-CENTRAL
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignedInspections.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {app.id}
                  </span>
                  <StatusBadge status={app.status} size="sm" />
                </div>

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#2f6388] transition-colors">
                  {app.instrumentName}
                </h4>

                <div className="text-xs text-slate-600 space-y-1">
                  <p className="font-medium text-slate-800">{app.businessName}</p>
                  <p className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{app.location}</span>
                  </p>
                  <p className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Slot: {app.scheduledDate} ({app.scheduledTime})</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-500">
                  {app.verificationType}
                </span>

                <button
                  onClick={() => navigate(`/lmo/inspection/${app.id}`)}
                  className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Start Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
