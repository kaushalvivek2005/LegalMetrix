import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { ApplicationTimeline } from '../../components/Timeline.jsx';
import {
  FileText,
  CheckCircle2,
  Scale,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileCheck,
  ShieldCheck,
  Building,
  CreditCard,
  Layers
} from 'lucide-react';

export default function ApplicationWorkflow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedInstId = searchParams.get('instrumentId');
  const { instruments, submitApplication } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInstId, setSelectedInstId] = useState(preselectedInstId || instruments[0]?.id || '');
  const [verificationType, setVerificationType] = useState('Periodic Re-verification');
  const [notes, setNotes] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [createdApp, setCreatedApp] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedInstId) {
      setSelectedInstId(preselectedInstId);
    }
  }, [preselectedInstId]);

  const activeInstrument = instruments.find((i) => i.id === selectedInstId) || instruments[0];

  const feeMap = {
    'Initial Verification': 1500,
    'Periodic Re-verification': 1000,
    'Repair / Calibration Re-test': 750
  };

  const stepsList = [
    { num: 1, label: 'Select Instrument' },
    { num: 2, label: 'Verification Type' },
    { num: 3, label: 'Documents' },
    { num: 4, label: 'Review & Fee' },
    { num: 5, label: 'Submitted' }
  ];

  const handleNext = () => {
    setCurrentStep((c) => Math.min(c + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep((c) => Math.max(c - 1, 1));
  };

  const handleSubmit = async () => {
    if (!activeInstrument) return;
    setIsSubmitting(true);
    const newApp = await submitApplication({
      instrumentId: activeInstrument.id,
      instrumentName: activeInstrument.name,
      instrumentType: activeInstrument.type,
      verificationType,
      businessName: activeInstrument.businessName,
      jurisdiction: (activeInstrument.location || '').includes('Delhi') ? 'Central Delhi' : 'Dhanbad / Jharkhand',
      location: activeInstrument.location || 'Premises',
      feeAmount: feeMap[verificationType] || 1000,
      feeStatus: 'Paid (Govt Portal)'
    });
    setIsSubmitting(false);
    setCreatedApp(newApp);
    setCurrentStep(5);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
          <FileText className="w-4 h-4 text-blue-600" />
          Stamping Application Lodgement Wizard
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Apply for Verification / Re-verification
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Submit statutory verification request for weighing and measuring instruments to the Legal Metrology Department.
        </p>
      </div>

      {/* Step Indicator Header */}
      <div className="grid grid-cols-5 gap-2 p-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
        {stepsList.map((step) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;

          return (
            <div
              key={step.num}
              className={`p-2 sm:p-2.5 rounded-xl text-center transition-all flex flex-col items-center justify-center ${
                isActive
                  ? 'bg-[#00162c] text-white shadow-xs'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-slate-50 text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${
                isActive ? 'bg-white text-[#00162c]' : isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {isDone ? '✓' : step.num}
              </span>
              <span className="text-[11px] font-semibold truncate w-full hidden sm:block">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Wizard Content Body */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        {/* STEP 1: Select Instrument */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 1: Select Instrument for Verification</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose from your registered inventory of weighing &amp; measuring equipment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {instruments.length === 0 ? (
                <div className="col-span-full p-8 text-center rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-2">
                  <Scale className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="font-semibold text-slate-700">No instruments currently registered</p>
                  <p className="text-[11px] text-slate-400">Register an instrument first to submit a statutory verification application.</p>
                </div>
              ) : (
                instruments.map((inst) => {
                  const isSelected = selectedInstId === inst.id;
                  return (
                    <div
                      key={inst.id}
                      onClick={() => setSelectedInstId(inst.id)}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#00162c] ring-2 ring-[#00162c]/20 bg-blue-50/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                          {inst.id}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">{inst.type}</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900">{inst.name}</h3>
                      <p className="text-[11px] text-slate-500 mt-1">Capacity: {inst.capacity}</p>
                      <p className="text-[11px] text-slate-500 truncate">{inst.location}</p>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={handleNext}
                disabled={!selectedInstId}
                className="px-6 py-2.5 rounded-xl bg-[#00162c] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <span>Next: Verification Type</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Verification Type */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 2: Select Verification Type</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Specify whether this is a brand new stamping or periodic re-verification under Legal Metrology rules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Initial Verification',
                  desc: 'Mandatory stamping before placing newly manufactured or imported instruments into commercial use.',
                  fee: '₹1,500.00'
                },
                {
                  title: 'Periodic Re-verification',
                  desc: 'Mandatory annual / biennial re-stamping for active commercial instruments within statutory validity.',
                  fee: '₹1,000.00'
                },
                {
                  title: 'Repair / Calibration Re-test',
                  desc: 'Post-maintenance statutory inspection following seal tampering, load cell repair, or recalibration.',
                  fee: '₹750.00'
                }
              ].map((opt) => {
                const isSelected = verificationType === opt.title;
                return (
                  <div
                    key={opt.title}
                    onClick={() => setVerificationType(opt.title)}
                    className={`p-5 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#00162c] ring-2 ring-[#00162c]/20 bg-blue-50/40'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center mb-3">
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#00162c]" />}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">{opt.title}</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{opt.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">Statutory Fee</span>
                      <span className="text-xs font-bold text-[#00162c]">{opt.fee}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={handlePrev}
                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[#00162c] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Next: Document Upload</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Documents Upload */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 3: Upload Compliance Documents</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Attach manufacturer model approval certificate and calibration report.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center space-y-2">
                <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                <h4 className="text-xs font-bold text-slate-800">Model Approval Certificate</h4>
                <p className="text-[11px] text-slate-500">Issued by Director of Legal Metrology</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>model_approval_FX50.pdf</span>
                </div>
              </div>

              <div className="p-5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center space-y-2">
                <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                <h4 className="text-xs font-bold text-slate-800">Prior Verification Certificate / Invoice</h4>
                <p className="text-[11px] text-slate-500">Previous stamping record or purchase bill</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>prior_certificate_2025.pdf</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Optional Notes for Inspecting Officer</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Instrument available at warehouse bay 3 between 10am-4pm."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-[#00162c] focus:outline-hidden resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={handlePrev}
                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[#00162c] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Next: Review &amp; Fee</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 4: Review Application &amp; Statutory Fee</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verify instrument specifications and statutory fees before submitting to DoCA verification cell.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant Business:</span>
                <span className="font-bold text-slate-800">{activeInstrument?.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Instrument:</span>
                <span className="font-bold text-slate-800">{activeInstrument?.name} ({activeInstrument?.id})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Capacity &amp; Class:</span>
                <span className="font-bold text-slate-800">{activeInstrument?.capacity} • {activeInstrument?.accuracyClass}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Inspection Address:</span>
                <span className="font-medium text-slate-800 truncate max-w-sm">{activeInstrument?.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Type:</span>
                <span className="font-bold text-blue-900">{verificationType}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm">
                <span className="font-bold text-slate-900">Total Statutory Fee:</span>
                <span className="font-bold text-[#00162c] text-base">₹{feeMap[verificationType] || 1000}.00</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/50 border border-blue-200 text-xs text-slate-700">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded text-[#00162c] focus:ring-[#00162c]"
              />
              <label htmlFor="terms">
                I hereby declare that the instrument is installed at the declared premises and conforms to the Legal Metrology Act, 2009. I agree to pay the non-refundable government verification fee.
              </label>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={handlePrev}
                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!agreedTerms || isSubmitting}
                className="px-7 py-2.5 rounded-xl bg-[#2f6388] text-white text-xs sm:text-sm font-semibold hover:bg-[#255273] transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <CreditCard className="w-4 h-4" />
                <span>{isSubmitting ? 'Lodging Application...' : `Pay ₹${feeMap[verificationType] || 1000} & Submit Application`}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Success Confirmation with Application ID & Timeline */}
        {currentStep === 5 && createdApp && (
          <div className="text-center space-y-6 py-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Application Lodged Successfully
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Application ID: <span className="font-mono text-[#00162c]">{createdApp.id}</span>
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Your application has been received and routed to the Smart Scheduling engine. A Legal Metrology Officer will be assigned.
              </p>
            </div>

            {/* Visual Timeline */}
            <div className="text-left bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Application Lifecycle Tracking
              </h3>
              <ApplicationTimeline steps={createdApp.timeline} />
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => navigate(`/business/applications?highlight=${createdApp.id}`)}
                className="px-5 py-2.5 rounded-xl bg-[#00162c] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
              >
                Track This Application
              </button>

              <button
                onClick={() => navigate('/business/dashboard')}
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-200 transition-all cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
