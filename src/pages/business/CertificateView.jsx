import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  Award,
  QrCode,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Scale,
  Hash,
  ArrowLeft,
  FileCheck
} from 'lucide-react';

export default function CertificateView() {
  const { certId } = useParams();
  const navigate = useNavigate();
  const { certificates, setRole } = useApp();

  const certificate =
    certificates.find((c) => c.certificateNumber === certId) || certificates[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (certificate) {
      alert(`Downloading statutory digital certificate: ${certificate.certificateNumber}.pdf`);
    }
  };

  if (!certificate) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <Award className="w-10 h-10 text-slate-300 mx-auto" />
          <h2 className="text-lg font-bold text-slate-800">Certificate Not Found</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No certificate record matches ID <span className="font-mono">{certId}</span>.
          </p>
          <button
            onClick={() => navigate('/business/certificates')}
            className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
          >
            Back to Certificates Ledger
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>

          <button
            onClick={() => {
              setRole('public');
              navigate(`/verify?cert=${certificate.certificateNumber}`);
            }}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#00162c] hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-all shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verify Authenticity</span>
          </button>
        </div>
      </div>

      {/* Official Government Certificate Sheet */}
      <div className="p-8 sm:p-12 bg-white rounded-2xl border-4 border-double border-slate-300 shadow-xl relative overflow-hidden print:border-none print:shadow-none print:p-0">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <Scale className="w-96 h-96 text-slate-900" />
        </div>

        {/* Demo Verification Banner */}
        <div className="mb-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center relative z-10">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
            VALID DEMO CERTIFICATE
          </span>
          <p className="text-[11px] font-semibold text-amber-900 mt-0.5">
            DEMO CERTIFICATE – NOT AN OFFICIAL GOVERNMENT CERTIFICATE
          </p>
        </div>

        {/* Header: Emblem & National Authority */}
        <div className="text-center space-y-1.5 border-b-2 border-slate-800 pb-6 relative z-10">
          <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-[#00162c] text-white flex items-center justify-center font-serif text-xl font-bold shadow-xs">
            🇮🇳
          </div>
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
            GOVERNMENT OF INDIA
          </p>
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Ministry of Consumer Affairs, Food &amp; Public Distribution
          </h2>
          <h3 className="text-xs font-medium text-slate-600">
            Department of Consumer Affairs • Legal Metrology Division
          </h3>
          <div className="pt-3">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#00162c] uppercase tracking-wide">
              Certificate of Verification
            </h1>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Issued under Rule 14 of the Legal Metrology (General) Rules, 2011
            </p>
          </div>
        </div>

        {/* Certificate Metadata Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-200 text-xs relative z-10">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Certificate Number</span>
            <span className="font-mono font-bold text-base text-[#00162c]">{certificate.certificateNumber}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Instrument ID</span>
            <span className="font-mono font-bold text-base text-blue-950">{certificate.instrumentId}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Statutory Status</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PASS / VERIFIED
            </span>
          </div>
        </div>

        {/* Core Verification Facts Grid */}
        <div className="py-6 space-y-5 relative z-10 text-xs sm:text-sm">
          <p className="text-slate-700 leading-relaxed italic text-xs">
            This is to certify that the weighing / measuring instrument described below has been inspected, tested with standard weights, and verified in accordance with the standards prescribed under the Legal Metrology Act, 2009.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Instrument Description</span>
              <p className="font-bold text-slate-900">{certificate.instrumentName}</p>
              <p className="text-xs text-slate-500">Classification: {certificate.instrumentType}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Capacity &amp; Class</span>
              <p className="font-bold text-slate-900">{certificate.capacity || '300 kg (e = 50g)'}</p>
              <p className="text-xs text-slate-500">Accuracy Class: {certificate.accuracyClass || 'Class III'}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Registered Business Entity</span>
              <p className="font-bold text-slate-900">{certificate.businessName}</p>
              <p className="text-xs text-slate-500 truncate">{certificate.location}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Verification Officer / Authority</span>
              <p className="font-bold text-slate-900">{certificate.verifiedBy}</p>
              <p className="text-xs text-slate-500">{certificate.verificationAuthority || 'Legal Metrology Officer, Enforcement Directorate'}</p>
            </div>
          </div>

          {/* Dates Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div>
              <span className="text-[10px] font-semibold text-emerald-800 uppercase">Verification &amp; Stamping Date</span>
              <p className="font-bold text-emerald-950 text-base">{certificate.verificationDate}</p>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-emerald-800 uppercase">Statutory Expiration Date</span>
              <p className="font-bold text-emerald-950 text-base">{certificate.validUntil}</p>
            </div>
          </div>
        </div>

        {/* Footer: QR Code & Cryptographic SHA-256 Digital Signature Box */}
        <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
          {/* QR Code */}
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 bg-white p-1.5 rounded-xl border border-slate-300 flex items-center justify-center shrink-0 shadow-2xs">
              <QrCode className="w-16 h-16 text-[#00162c]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Scan to Verify</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Scan via camera or LegalMetrix Public Portal to confirm live validity.
              </p>
            </div>
          </div>

          {/* Digital Seal Signature */}
          <div className="md:col-span-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                Demonstration Digital Seal
              </span>
              <span className="text-[10px] font-mono text-slate-500">SHA-256 Audit Seal</span>
            </div>
            <p className="font-mono text-[10px] text-slate-600 break-all leading-tight">
              Hash: {certificate.sealHash || '8f9b2c34a110e58c9921f37e411b0294da18b4566f1e847c134aa896177209'}
            </p>
            <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
              <span>Issuer Key: DoCA-DEMO-DEL-2026-X9</span>
              <span>Timestamp: {certificate.verificationDate} 11:24:08 UTC</span>
            </div>
          </div>
        </div>

        {/* Statutory Legal Notice & Demo Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-500">
          Demo verification record – not an official government certificate. Generated for demonstration purposes within the LegalMetrix digital verification prototype.
        </div>
      </div>
    </div>
  );
}
