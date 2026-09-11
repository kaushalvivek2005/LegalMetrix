import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import OfflineSimulatorBar from '../../components/OfflineSimulatorBar.jsx';
import {
  Smartphone,
  CheckCircle2,
  XCircle,
  Clock,
  Camera,
  Scale,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck,
  Award,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Eye,
  CheckSquare,
  Square
} from 'lucide-react';

export default function FieldInspection() {
  const { appId } = useParams();
  const navigate = useNavigate();
  const {
    applications,
    submitInspectionDecision,
    isOffline,
    pendingSyncCount
  } = useApp();

  const application =
    applications.find((a) => a.id === appId) || applications[0];

  // Inspection Checklist State
  const [checklist, setChecklist] = useState({
    physicalCondition: true,
    zeroLoadTest: true,
    maxCapacityTest: true,
    eccentricityTest: true,
    repeatabilityTest: true,
    environmentalFactors: true,
  });

  // Measurement Entry State
  const [standardWeight, setStandardWeight] = useState('50.00 kg');
  const [displayReading, setDisplayReading] = useState('50.01 kg');
  const [errorLimit, setErrorLimit] = useState('±0.05 kg');
  const [measurementResult, setMeasurementResult] = useState('Pass');

  // Photo / Evidence
  const [photos, setPhotos] = useState([
    { name: 'instrument_front_serial.jpg', captured: true, label: 'Instrument Serial Plate' },
    { name: 'lead_seal_point_before.jpg', captured: true, label: 'Stamping Location' },
    { name: 'standard_weights_50kg_npl.jpg', captured: true, label: 'NPL Test Weights Applied' }
  ]);

  const [officerNotes, setOfficerNotes] = useState(
    'Instrument zero balance verified. Repeatability error within 0.01 kg. Statutory lead wire seal affixed at calibration port.'
  );

  // Completion State
  const [completedResult, setCompletedResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleChecklist = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDecision = async (decision) => {
    setIsSubmitting(true);
    const res = await submitInspectionDecision(application.id, decision, {
      checklist,
      standardWeight,
      displayReading,
      errorLimit,
      officerNotes,
      officerName: 'Rajesh Sharma (LMO-DEL-042)'
    });
    setIsSubmitting(false);
    setCompletedResult(res);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Offline First Simulation Header Banner */}
      <OfflineSimulatorBar />

      {/* Header Profile */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                {application.id}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Inspection Active
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {application.instrumentName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {application.businessName} • {application.location}
            </p>
          </div>

          <StatusBadge status={application.status} size="lg" />
        </div>

        {/* Quick GPS Geofence badge */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>GPS Geofence Match: 28.6328° N, 77.2197° E (Within 15 meters)</span>
          </span>
          <span className="font-mono text-slate-400">Officer: Rajesh Sharma (LMO-DEL-042)</span>
        </div>
      </div>

      {/* Main Inspection Audit Form */}
      <div className="space-y-6">
        {/* Section 1: Standard Verification Checklist */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                1. Statutory Inspection Checklist
              </h3>
              <p className="text-xs text-slate-500">
                Standard technical checkpoints mandated by Legal Metrology (General) Rules.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              6 Mandatory Tests
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { key: 'physicalCondition', label: 'Physical Condition & Seal Platter Checked' },
              { key: 'zeroLoadTest', label: 'Zero Load & Center-of-Zero Test' },
              { key: 'maxCapacityTest', label: 'Maximum Capacity Load Test' },
              { key: 'eccentricityTest', label: 'Eccentricity (Corner Load) Test' },
              { key: 'repeatabilityTest', label: 'Repeatability Test (3 Identical Weighings)' },
              { key: 'environmentalFactors', label: 'Environmental Factors & Spirit Level Balance' },
            ].map((item) => {
              const isChecked = checklist[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleChecklist(item.key)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="font-semibold text-xs leading-snug">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Measurement Entry & Tolerance Check */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Metrological Measurement Entry
            </h3>
            <p className="text-xs text-slate-500">
              Apply certified working standard weights and log digital readout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Standard Weight Applied</label>
              <input
                type="text"
                value={standardWeight}
                onChange={(e) => setStandardWeight(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Display Reading (Observed)</label>
              <input
                type="text"
                value={displayReading}
                onChange={(e) => setDisplayReading(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Permissible Error Limit</label>
              <input
                type="text"
                value={errorLimit}
                onChange={(e) => setErrorLimit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Test Outcome</label>
              <select
                value={measurementResult}
                onChange={(e) => setMeasurementResult(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border font-bold text-xs cursor-pointer ${
                  measurementResult === 'Pass'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-rose-50 border-rose-300 text-rose-800'
                }`}
              >
                <option value="Pass">✓ PASS (Within Limit)</option>
                <option value="Fail">✕ FAIL (Exceeds Error)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Photo & Geotagged Evidence Capture */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                3. Photo &amp; Geotagged Evidence Capture
              </h3>
              <p className="text-xs text-slate-500">
                Timestamped camera evidence linked to immutable inspection log.
              </p>
            </div>
            <button
              onClick={() => alert('Simulated camera shutter captured and uploaded photo.')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Capture Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {photos.map((p, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2"
              >
                <div className="w-full h-24 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{p.label}</h4>
                  <p className="text-[10px] font-mono text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{p.name}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Officer Notes */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            4. Inspecting Officer Observations
          </h3>
          <textarea
            rows={3}
            value={officerNotes}
            onChange={(e) => setOfficerNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
          />
        </div>

        {/* Final Decision Action Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase">
              Submit Statutory Audit Decision
            </h4>
            <p className="text-xs text-slate-500">
              Approved decisions generate the official cryptographic digital certificate instantly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleDecision('Re-Schedule')}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            >
              Re-Schedule
            </button>

            <button
              onClick={() => handleDecision('Reject')}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              Reject / Non-Compliant
            </button>

            <button
              onClick={() => handleDecision('Pass')}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording Decision...' : 'PASS / APPROVE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Completion Modal Showing Certificate Generated */}
      {completedResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Inspection Completed Successfully
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Digital Certificate Generated
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-emerald-800">
                Official Stamping Certificate Number
              </span>
              <p className="font-mono text-xl font-bold text-[#00162c]">
                {completedResult.certificateId || 'LM-CERT-2026-00123'}
              </p>
              <p className="text-xs text-emerald-700 font-medium">
                SHA-256 Seal Validated &amp; Stored on Central Ledger
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              The instrument has successfully passed all statutory tests. The public QR code is now live for consumers and business audits.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <Link
                to={`/certificates/${completedResult.certificateId || 'LM-CERT-2026-00123'}`}
                className="w-full py-2.5 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>View Digital Certificate</span>
              </Link>

              <Link
                to={`/verify?cert=${completedResult.certificateId || 'LM-CERT-2026-00123'}`}
                className="w-full py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Test Public QR Authenticator</span>
              </Link>

              <button
                onClick={() => navigate('/lmo/dashboard')}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all cursor-pointer"
              >
                Return to LMO Field Desk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
