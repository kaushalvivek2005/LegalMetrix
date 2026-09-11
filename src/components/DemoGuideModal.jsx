import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { X, Play, CheckCircle2, RotateCcw, ArrowRight, ExternalLink } from 'lucide-react';

export default function DemoGuideModal({ isOpen, onClose }) {
  const { setRole, resetDemoData, applications, certificates } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Most recent app and cert
  const latestApp = applications[0]?.id || 'LM-APP-2026-00421';
  const latestCert = certificates[0]?.certificateNumber || 'LM-CERT-2026-00123';

  const demoSteps = [
    {
      step: 1,
      title: 'Public Portal & Lifecycle Overview',
      role: 'public',
      route: '/',
      action: 'Show the National Legal Metrology vision & 7-stage digital lifecycle pipeline.'
    },
    {
      step: 2,
      title: 'Business: Register Instrument',
      role: 'business',
      route: '/business/instruments/new',
      action: 'Register an Electronic Bench Scale (300kg) & get immediate Digital Instrument ID.'
    },
    {
      step: 3,
      title: 'Business: Lodge Verification Application',
      role: 'business',
      route: '/business/applications/new',
      action: 'Use 4-step wizard to apply for stamping and review statutory fee.'
    },
    {
      step: 4,
      title: 'Admin: Smart Scheduling Engine',
      role: 'admin',
      route: '/admin/scheduling',
      action: 'Inspect proximity, workload & jurisdiction match to auto-assign nearest LMO.'
    },
    {
      step: 5,
      title: 'LMO: Field Verification & Offline Demo',
      role: 'lmo',
      route: `/lmo/inspection/${latestApp}`,
      action: 'Audit checkpoints, simulate offline mode, enter standard weights test, take geotagged photo, and submit PASS.'
    },
    {
      step: 6,
      title: 'Generate Cryptographic Digital Certificate',
      role: 'business',
      route: `/certificates/${latestCert}`,
      action: 'Inspect official DoCA certificate with tamper-proof SHA-256 seal & verifiable QR code.'
    },
    {
      step: 7,
      title: 'Public: Instant QR / ID Verification',
      role: 'public',
      route: `/verify?cert=${latestCert}`,
      action: 'Simulate consumer scanning QR code to see live verified green badge.'
    },
    {
      step: 8,
      title: 'Admin: Command Center & Audit Trail',
      role: 'admin',
      route: '/admin/dashboard',
      action: 'Inspect real-time analytics, Recharts compliance graphs, and immutable chronological audit logs.'
    }
  ];

  const handleJump = (stepObj) => {
    setRole(stepObj.role);
    navigate(stepObj.route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 bg-[#00162c] text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold">
              <Play className="w-3 h-3 text-blue-300" />
              Smart India Hackathon 2026 Presentation Guide
            </div>
            <h3 className="text-lg font-bold mt-1">Live 5-Minute Demonstration Flow</h3>
            <p className="text-xs text-slate-300">
              Execute the complete Legal Metrology verification lifecycle in connected real-time state.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-2.5 divide-y divide-slate-100">
          {demoSteps.map((s) => (
            <div
              key={s.step}
              className="pt-2.5 first:pt-0 flex items-start justify-between gap-3 group hover:bg-slate-50 p-2 rounded-xl transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover:bg-[#00162c] group-hover:text-white transition-colors">
                  {s.step}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                      Role: {s.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{s.action}</p>
                </div>
              </div>

              <button
                onClick={() => handleJump(s)}
                className="shrink-0 flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-800 hover:bg-[#00162c] hover:text-white transition-all cursor-pointer shadow-xs"
              >
                <span>Jump</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('Reset all demo state back to default mock records?')) {
                resetDemoData();
                alert('Demo state reset successfully!');
              }
            }}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
