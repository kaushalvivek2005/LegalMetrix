import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import StatCard from '../../components/StatCard.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { Wrench, CheckCircle2, Clock, Award, FileText, FlaskConical, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GatcDashboard() {
  const { applications } = useApp();
  const navigate = useNavigate();

  const [testRequests, setTestRequests] = useState([
    {
      id: 'GATC-CAL-2026-081',
      instrument: 'Working Standard Weights Set (1mg - 10kg)',
      lab: 'National Physical Laboratory (NPL) Partner Lab',
      status: 'In Testing',
      dueDate: '16 Feb 2026',
      accuracy: 'Class E2 Standard',
      tolerance: '± 0.16 mg'
    },
    {
      id: 'GATC-CAL-2026-089',
      instrument: 'Bulk Fuel Volumetric Prover (2000L)',
      lab: 'DoCA Calibration Facility, Okhla',
      status: 'Scheduled',
      dueDate: '19 Feb 2026',
      accuracy: 'Class 0.2',
      tolerance: '± 0.05%'
    },
    {
      id: 'GATC-CAL-2026-092',
      instrument: 'Electronic Automatic Weighing Head (50kg)',
      lab: 'Metrology Lab Delhi 1',
      status: 'Approved',
      dueDate: '11 Feb 2026',
      accuracy: 'Class III',
      tolerance: '± 15 g'
    }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="p-6 sm:p-7 rounded-2xl bg-[#00162c] text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-2">
            <FlaskConical className="w-3.5 h-3.5 text-blue-300" />
            Government Approved Test Centre (GATC) Lab Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Metrology Testing &amp; Calibration Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            GATC Node ID: GATC-DL-003 • Accredited Under Section 24 of Legal Metrology Act
          </p>
        </div>

        <button
          onClick={() => alert('New Calibration Test Batch initialized.')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          + Log New Calibration Batch
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Lab Tests"
          value={testRequests.length}
          subtitle="Standards in chamber"
          icon={FlaskConical}
          variant="primary"
        />
        <StatCard
          title="Calibrated Standard Sets"
          value="42"
          subtitle="Traceable to NPL"
          icon={CheckCircle2}
          variant="success"
        />
        <StatCard
          title="Verification Latency"
          value="1.2 days"
          subtitle="Turnaround"
          icon={Clock}
          variant="neutral"
        />
        <StatCard
          title="Compliance Factor"
          value="99.4%"
          subtitle="Tolerance pass rate"
          icon={Award}
          variant="success"
        />
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Assigned Laboratory Tests</h3>
            <p className="text-xs text-slate-500">
              High-precision verification of standard weights, test measures, and industrial provers.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
            Traceability: NPL-DELHI
          </span>
        </div>

        <div className="space-y-3">
          {testRequests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">{req.id}</span>
                  <StatusBadge status={req.status} size="sm" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{req.instrument}</h4>
                <p className="text-xs text-slate-500">{req.lab} • Tolerance: {req.tolerance}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs hidden sm:block">
                  <span className="text-slate-400 block text-[10px] uppercase">Target Date</span>
                  <span className="font-semibold text-slate-800">{req.dueDate}</span>
                </div>

                <button
                  onClick={() => alert(`Opening GATC calibration datasheet for ${req.id}`)}
                  className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
                >
                  Enter Lab Data
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
