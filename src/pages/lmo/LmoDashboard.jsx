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

  const completedCount = applications.filter((a) => a.status === 'Approved' || a.status === 'Inspection Completed' || a.status === 'VERIFIED').length;
  const pendingCount = assignedInspections.filter((a) => a.status !== 'Approved' && a.status !== 'Inspection Completed' && a.status !== 'VERIFIED' && a.status !== 'Rejected').length;

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
            Officer: Priya Singh (ID: LMO-JHK-018) • Jurisdiction: Dhanbad / Jharkhand
          </p>
        </div>

        <button
          onClick={() => {
            const liveApp = applications.find((a) => a.id === 'APP-2026-002') || applications[0];
            if (liveApp) {
              navigate(`/lmo/inspection/${liveApp.id}`);
            }
          }}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Start Inspection (LM-WM-2026-002)</span>
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
            Zone: JH-DHANBAD / JAMSHEDPUR
          </span>
        </div>

        {assignedInspections.length === 0 ? (
          <div className="p-10 text-center rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <ClipboardList className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No inspections assigned today</p>
            <p className="text-[11px] text-slate-400">Newly allocated field audits will appear here automatically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignedInspections.map((app) => {
              const isPassed = app.status === 'Approved' || app.status === 'Inspection Completed' || app.status === 'VERIFIED';
              const resultText = isPassed ? 'PASS' : 'PENDING';

              return (
                <div
                  key={app.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                          {app.instrumentId || app.id}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="font-mono text-[11px] text-slate-500">
                          {app.id}
                        </span>
                      </div>
                      <StatusBadge status={app.status} size="sm" />
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#2f6388] transition-colors">
                      {app.instrumentName}
                    </h4>

                    <div className="text-xs text-slate-600 space-y-1.5 pt-1">
                      <p className="font-medium text-slate-800">{app.businessName}</p>
                      
                      <div className="grid grid-cols-2 gap-2 pt-1 pb-1 text-[11px]">
                        <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Assigned Officer</span>
                          <span className="font-bold text-slate-800">{app.assignedOfficer || 'Priya Singh'}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Verification Result</span>
                          <span className={`font-bold ${isPassed ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {resultText}
                          </span>
                        </div>
                      </div>

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

                    {app.certificateId ? (
                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/certificates/${app.certificateId}`}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-all flex items-center gap-1"
                        >
                          <span>View Certificate</span>
                        </Link>
                        <button
                          onClick={() => navigate(`/lmo/inspection/${app.id}`)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                        >
                          Audit Record
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate(`/lmo/inspection/${app.id}`)}
                        className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>Start Inspection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
