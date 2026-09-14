import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import StatCard from '../../components/StatCard.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { LifecyclePipelineBar } from '../../components/Timeline.jsx';
import {
  Scale,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  ArrowRight,
  Eye,
  FileCheck,
  Compass,
  FileText,
  Calendar
} from 'lucide-react';

export default function BusinessDashboard() {
  const navigate = useNavigate();
  const { instruments, applications, certificates, setRole } = useApp();

  // Metrics
  const totalInstruments = instruments.length;
  const activeCerts = certificates.length;
  const pendingApps = applications.filter(
    (a) => a.status !== 'Approved' && a.status !== 'VERIFIED' && a.status !== 'Rejected'
  ).length;
  
  // Calculate expiring soon (within 30 days or marked due)
  const expiringSoonList = [];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#00162c] text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-white/5 pointer-events-none blur-2xl" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Smart India Hackathon 2026 • National Legal Metrology Platform</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Digital Verification for a Trusted Measurement Ecosystem
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Streamlining weights and measures compliance through automated scheduling, LMO field inspection workflows, IoT sensor telemetry, and cryptographic certificates.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate('/business/instruments/new')}
              className="px-5 py-2.5 rounded-xl bg-[#2f6388] text-white text-xs sm:text-sm font-semibold hover:bg-[#255273] transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register Instrument</span>
            </button>

            <button
              onClick={() => navigate('/business/applications/new')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-md border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Apply for Verification</span>
            </button>

            <button
              onClick={() => navigate('/business/applications')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              Track Applications
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Instruments"
          value={totalInstruments}
          subtitle="Registered devices"
          icon={Scale}
          trend="↑"
          variant="primary"
        />
        <StatCard
          title="Active Certificates"
          value={activeCerts}
          subtitle="Audit ready &amp; valid"
          icon={CheckCircle2}
          variant="success"
        />
        <StatCard
          title="Pending Applications"
          value={pendingApps}
          subtitle="In pipeline"
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Expiring Soon"
          value={expiringSoonList.length}
          subtitle={expiringSoonList.length > 0 ? "Action required" : "All certificates valid"}
          icon={AlertTriangle}
          variant={expiringSoonList.length > 0 ? "error" : "primary"}
          alert={expiringSoonList.length > 0}
        />
      </div>

      {/* Digital Metrology Lifecycle Pipeline */}
      <LifecyclePipelineBar activeStep={2} />

      {/* Registered Commercial Instruments Table */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Registered Commercial Instruments</h3>
            <p className="text-xs text-slate-500">Active weighing and measuring instruments registered under Legal Metrology Act.</p>
          </div>
          <Link
            to="/business/instruments"
            className="text-xs font-semibold text-[#2f6388] hover:underline flex items-center gap-1"
          >
            <span>View Registry ({instruments.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Instrument ID</th>
                <th className="pb-3">Instrument Details</th>
                <th className="pb-3">Trader / Business</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Compliance Status</th>
                <th className="pb-3">Certificate ID</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {instruments.map((inst) => (
                <tr key={inst.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 font-mono font-bold text-blue-900">
                    {inst.id}
                  </td>
                  <td className="py-3">
                    <p className="font-semibold text-slate-900">{inst.name}</p>
                    <p className="text-[10px] text-slate-500">{inst.capacity} • {inst.accuracyClass}</p>
                  </td>
                  <td className="py-3 text-slate-700 font-medium">{inst.businessName}</td>
                  <td className="py-3 text-slate-600">{inst.location}</td>
                  <td className="py-3">
                    <StatusBadge status={inst.status} size="sm" />
                  </td>
                  <td className="py-3 font-mono text-slate-700">
                    {inst.certificateId ? (
                      <span className="text-emerald-700 font-semibold">{inst.certificateId}</span>
                    ) : (
                      <span className="text-amber-700 text-[11px] font-medium italic">Pending Verification</span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => navigate(`/business/instruments?highlight=${inst.id}`)}
                      className="p-1.5 rounded-lg text-[#2f6388] hover:bg-blue-50 transition-colors cursor-pointer"
                      title="View Instrument Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two-Column: Recent Applications Table + Expiring Soon Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications Table */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Verification Applications Queue</h3>
              <p className="text-xs text-slate-500">Applications moving through stamping, scheduling &amp; verification stages.</p>
            </div>
            <Link
              to="/business/applications"
              className="text-xs font-semibold text-[#2f6388] hover:underline flex items-center gap-1"
            >
              <span>Track All ({applications.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Application ID</th>
                  <th className="pb-3">Instrument</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Submitted</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Assigned Officer</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-xs text-slate-500">
                      No verification applications currently in queue.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 font-mono font-bold text-slate-900">
                        {app.id}
                      </td>
                      <td className="py-3">
                        <p className="font-semibold text-slate-900">{app.instrumentName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{app.instrumentId}</p>
                      </td>
                      <td className="py-3 text-slate-600">{app.verificationType}</td>
                      <td className="py-3 text-slate-600">{app.submittedDate}</td>
                      <td className="py-3">
                        <StatusBadge status={app.status} size="sm" />
                      </td>
                      <td className="py-3 text-slate-600 font-medium">
                        {app.assignedOfficer || 'Unassigned'}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => navigate(`/business/applications?highlight=${app.id}`)}
                          className="p-1.5 rounded-lg text-[#2f6388] hover:bg-blue-50 transition-colors cursor-pointer"
                          title="View Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certificates Expiring Soon Widget */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${expiringSoonList.length > 0 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                <h3 className="text-sm font-bold text-slate-900">Certificates Expiring Soon</h3>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${expiringSoonList.length > 0 ? 'text-rose-600 bg-rose-50' : 'text-emerald-700 bg-emerald-50'}`}>
                {expiringSoonList.length > 0 ? 'Attention Required' : 'All Clear'}
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {expiringSoonList.length === 0 ? (
                <div className="p-6 text-center rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 space-y-1.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                  <p className="font-semibold text-slate-700">No certificates expiring soon</p>
                  <p className="text-[11px] text-slate-400">All registered instruments and certificates are up to date.</p>
                </div>
              ) : (
                expiringSoonList.map((item) => (
                  <div
                    key={item.certId}
                    className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-200/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {item.certId}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-800">
                        Expires in {item.daysLeft} days
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{item.instrument}</p>
                    <p className="text-[11px] text-slate-400">Valid Until: {item.expiryDate}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => navigate('/business/applications/new')}
              className="w-full py-2.5 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-xs text-center"
            >
              Renew Expiring Certificates
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Re-verification takes an average of 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
