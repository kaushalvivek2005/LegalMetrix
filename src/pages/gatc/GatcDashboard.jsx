import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import StatCard from '../../components/StatCard.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { CheckCircle2, Clock, Award, FlaskConical, Scale, ShieldCheck, MapPin, Calendar, UserCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function GatcDashboard() {
  const { applications, instruments } = useApp();
  const navigate = useNavigate();

  // Link strictly to Instrument 2
  const liveApp = applications.find((a) => a.id === 'APP-2026-002') || applications[1] || applications[0];
  const liveInstrument = instruments.find((i) => i.id === 'LM-WM-2026-002') || instruments[1] || instruments[0];

  const isVerified = liveApp?.status === 'Approved' || liveApp?.status === 'Inspection Completed' || liveApp?.status === 'VERIFIED';
  const statusLabel = isVerified ? 'Verified / Standards Support Completed' : 'Scheduled / Pending Verification Support';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="p-6 sm:p-7 rounded-2xl bg-[#00162c] text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-2">
            <FlaskConical className="w-3.5 h-3.5 text-blue-300" />
            Government Approved Test Centre (GATC) Lab Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Metrology Testing &amp; Verification Support Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            GATC Node ID: GATC-JHK-002 (Dhanbad) • Supporting Joint Field Verification for Legal Metrology
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/lmo"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
          >
            <UserCheck className="w-4 h-4" />
            <span>View Assigned LMO Field Desk</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Verification Task"
          value="1"
          subtitle="Linked to LM-WM-2026-002"
          icon={Scale}
          variant="primary"
        />
        <StatCard
          title="Verification Status"
          value={isVerified ? "Verified" : "Scheduled"}
          subtitle={isVerified ? "Inspection Approved" : "Pending LMO audit"}
          icon={CheckCircle2}
          variant={isVerified ? "success" : "warning"}
        />
        <StatCard
          title="Working Standard Weights"
          value="50 kg"
          subtitle="NPL Traceable standard"
          icon={FlaskConical}
          variant="neutral"
        />
        <StatCard
          title="Assigned Officer"
          value="Priya Singh"
          subtitle="LMO-JHK-018"
          icon={Award}
          variant="success"
        />
      </div>

      {/* Single Controlled Task for Instrument 2 */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Verification Support Task</h3>
            <p className="text-xs text-slate-500">
              Technical calibration and standard weight support for scheduled field inspection.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
            Traceability: NPL-INDIA (50 kg Standard Set)
          </span>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition-all space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                Instrument: {liveInstrument?.id || 'LM-WM-2026-002'}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="font-mono text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                Application: {liveApp?.id || 'APP-2026-002'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {statusLabel}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-200/80">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Instrument Details</span>
              <span className="font-bold text-slate-900 block mt-0.5">{liveInstrument?.name || 'Platform Weighing Scale'}</span>
              <span className="text-slate-500 text-[11px]">{liveInstrument?.manufacturer || 'Essae'} {liveInstrument?.model || 'DS-300'}</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Capacity &amp; Class</span>
              <span className="font-bold text-slate-900 block mt-0.5">{liveInstrument?.capacity || '300 kg'}</span>
              <span className="text-blue-700 font-semibold text-[11px]">{liveInstrument?.accuracyClass || 'Class III'}</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Assigned LMO</span>
              <span className="font-bold text-slate-900 block mt-0.5">{liveApp?.assignedOfficer || 'Priya Singh'}</span>
              <span className="text-slate-500 text-[11px]">ID: LMO-JHK-018 (Dhanbad)</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Scheduled Inspection</span>
              <span className="font-bold text-slate-900 block mt-0.5">{liveApp?.scheduledDate || '2026-09-15'}</span>
              <span className="text-slate-500 text-[11px]">{liveApp?.scheduledTime || '11:30 AM'}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-blue-900 font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Supporting Test &amp; Evidence Information</span>
            </div>
            <p className="text-blue-800 text-[11px] leading-relaxed">
              Working Standard Weights 50 kg NPL traceability verification support allocated for Singh Grain Traders site verification (Bank More, Dhanbad, Jharkhand).
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500">
              Verification Status: <strong className="text-slate-800">{isVerified ? 'Completed & Approved' : 'Scheduled for Field Verification'}</strong>
            </span>

            {isVerified && liveApp?.certificateId ? (
              <Link
                to={`/certificates/${liveApp.certificateId}`}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs"
              >
                View Generated Certificate
              </Link>
            ) : (
              <button
                onClick={() => navigate(`/lmo/inspection/${liveApp?.id || 'APP-2026-002'}`)}
                className="px-4 py-2 rounded-xl bg-[#00162c] hover:bg-slate-800 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
              >
                Inspect Live Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
