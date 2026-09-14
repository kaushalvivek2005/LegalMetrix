import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Smartphone,
  Scale,
  CalendarCheck,
  Search,
  ArrowRight,
  ExternalLink,
  Award,
  Layers,
  FileText
} from 'lucide-react';
import { LifecyclePipelineBar } from '../../components/Timeline.jsx';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setRole, certificates } = useApp();
  const [searchCert, setSearchCert] = useState('LM-CERT-2026-001');

  const handleVerify = (e) => {
    e.preventDefault();
    if (searchCert.trim()) {
      setRole('public');
      navigate(`/verify?cert=${encodeURIComponent(searchCert.trim())}`);
    }
  };

  const handleGoBusinessRegister = () => {
    setRole('business');
    navigate('/business/instruments/new');
  };

  const handleGoBusinessDashboard = () => {
    setRole('business');
    navigate('/business/dashboard');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-[#00162c] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-blue-500/10 pointer-events-none blur-3xl" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-md border border-white/15">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Smart India Hackathon 2026 • SIH26036 • Ministry of Consumer Affairs (DoCA)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            LEGALMETRIX
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-blue-200">
            Digital Verification for a Trusted Measurement Ecosystem
          </p>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            One platform to register, verify, certify and track weighing and measuring instruments across Indian commerce, industry, and public distribution systems.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={handleGoBusinessRegister}
              className="px-6 py-3 rounded-xl bg-[#2f6388] text-white font-semibold hover:bg-[#255273] transition-all flex items-center gap-2 shadow-md cursor-pointer text-sm"
            >
              <Scale className="w-4 h-4" />
              <span>Register Instrument</span>
            </button>

            <button
              onClick={() => {
                setRole('public');
                navigate('/verify');
              }}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all backdrop-blur-md border border-white/20 flex items-center gap-2 cursor-pointer text-sm"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Verify Certificate</span>
            </button>

            <button
              onClick={handleGoBusinessDashboard}
              className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-medium transition-all text-sm cursor-pointer"
            >
              Business Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Complete Lifecycle Pipeline Visual Bar */}
      <LifecyclePipelineBar activeStep={1} />

      {/* Three Pillars Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#00162c] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#2f6388]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">1. Digital Verification</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Eliminates physical paperwork and stamping delays. Seamless registration of commercial scales, weighbridges, and flowmeters with statutory fee calculation.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-[#2f6388]">
            <span>Legal Metrology Act, 2009 Compliant</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">2. Field-Ready Inspection</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Mobile-first audit console for Legal Metrology Officers (LMO). Geofenced GPS validation, offline-first local cache synchronization, and tamper seal verification.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <span>Offline-First Field Mobility</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mb-4">
              <QrCode className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">3. QR Certificate Authentication</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Cryptographically stamped digital certificates with SHA-256 integrity hash. Public QR code enables any Indian consumer to verify scale accuracy instantly.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-purple-700">
            <span>Zero-Trust Citizen Transparency</span>
          </div>
        </div>
      </div>

      {/* Public Certificate Verification Quick Lookup */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Verify a Legal Metrology Certificate
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter the Government Stamping Certificate ID or Instrument ID to verify official validity, inspection date, and authorized officer.
          </p>

          <form onSubmit={handleVerify} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <input
              type="text"
              value={searchCert}
              onChange={(e) => setSearchCert(e.target.value)}
              placeholder="e.g. LM-CERT-2026-00123"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-[#00162c]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00162c] text-white text-sm font-semibold hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Verify Certificate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {certificates.length > 0 && (
            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-500">
              <span>Try sample certificates:</span>
              {certificates.slice(0, 2).map((c) => (
                <button
                  key={c.certificateNumber}
                  onClick={() => setSearchCert(c.certificateNumber)}
                  className="underline font-mono text-blue-700 hover:text-blue-900 cursor-pointer"
                >
                  {c.certificateNumber}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
