import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  QrCode,
  Search,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Calendar,
  Building,
  Scale,
  Award,
  Download,
  Share2,
  Camera,
  RotateCcw
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge.jsx';

export default function CertificateVerification() {
  const [searchParams] = useSearchParams();
  const queryCert = searchParams.get('cert') || '';
  const { certificates } = useApp();

  const [inputVal, setInputVal] = useState(queryCert || 'LM-CERT-2026-00123');
  const [searchedCert, setSearchedCert] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isScanningQR, setIsScanningQR] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (queryCert) {
      setInputVal(queryCert);
      doLookup(queryCert);
    } else {
      doLookup(inputVal);
    }
  }, [queryCert]);

  const doLookup = (code) => {
    setIsLoading(true);
    setHasSearched(true);
    setTimeout(() => {
      const clean = (code || '').trim().toUpperCase();
      const found = certificates.find(
        (c) =>
          c.certificateNumber.toUpperCase() === clean ||
          c.instrumentId.toUpperCase() === clean
      );
      setSearchedCert(found || null);
      setIsLoading(false);
    }, 300);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    doLookup(inputVal);
  };

  const simulateQRScan = () => {
    setIsScanningQR(true);
    setTimeout(() => {
      const randomCert = certificates[0]?.certificateNumber || 'LM-CERT-2026-00123';
      setInputVal(randomCert);
      setIsScanningQR(false);
      doLookup(randomCert);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          National Legal Metrology Public Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Verify Legal Metrology Certificate
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Scan QR code or enter certificate ID to authenticate official government stamping, validity window, and instrument verification records.
        </p>
      </div>

      {/* Input Search Box & QR Scan simulator */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. LM-CERT-2026-00123 or LM-INST-2026-00126"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-[#00162c]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#00162c] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <Search className="w-4 h-4" />
            <span>Verify Certificate</span>
          </button>

          <button
            type="button"
            onClick={simulateQRScan}
            disabled={isScanningQR}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Camera className={`w-4 h-4 ${isScanningQR ? 'animate-spin' : ''}`} />
            <span>{isScanningQR ? 'Scanning Camera...' : 'Scan QR Code'}</span>
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
          <span>Active Sample Certificates:</span>
          {certificates.map((c) => (
            <button
              key={c.certificateNumber}
              onClick={() => {
                setInputVal(c.certificateNumber);
                doLookup(c.certificateNumber);
              }}
              className="font-mono text-blue-700 hover:underline cursor-pointer bg-slate-100 px-2 py-0.5 rounded"
            >
              {c.certificateNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Lookup Results */}
      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-600">Verifying cryptographic hash on central ledger...</p>
        </div>
      ) : hasSearched && searchedCert ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-emerald-300 shadow-lg space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

          {/* Large Success Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                  Verified Official Record
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 flex items-center gap-2">
                  ✓ CERTIFICATE VERIFIED
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified through the LegalMetrix digital verification system.
                </p>
              </div>
            </div>

            <StatusBadge status="PASS / Compliant" size="lg" />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Certificate Number</span>
              <p className="font-mono font-bold text-slate-900 text-base">{searchedCert.certificateNumber}</p>
              <p className="text-[11px] text-slate-500">Government Stamped ID</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Instrument ID</span>
              <p className="font-mono font-bold text-blue-900 text-base">{searchedCert.instrumentId}</p>
              <p className="text-[11px] text-slate-500">{searchedCert.instrumentName}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Instrument Type</span>
              <p className="font-bold text-slate-900">{searchedCert.instrumentType}</p>
              <p className="text-[11px] text-slate-500">Accuracy: {searchedCert.accuracyClass || 'Class III'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Business Entity</span>
              <p className="font-bold text-slate-900">{searchedCert.businessName}</p>
              <p className="text-[11px] text-slate-500 truncate">{searchedCert.location}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Verification Date</span>
              <p className="font-bold text-slate-900">{searchedCert.verificationDate}</p>
              <p className="text-[11px] text-slate-500">Stamped by {searchedCert.verifiedBy}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase">Valid Until</span>
              <p className="font-bold text-emerald-950 text-base">{searchedCert.validUntil}</p>
              <p className="text-[11px] text-emerald-700 font-medium">Active Statutory Protection</p>
            </div>
          </div>

          {/* Cryptographic & QR Signature block */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white p-1 rounded-xl border border-slate-300 flex items-center justify-center shrink-0">
                <QrCode className="w-10 h-10 text-[#00162c]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900">Cryptographic Seal Signature</h4>
                <p className="text-[11px] font-mono text-slate-500 break-all">
                  SHA-256: {searchedCert.sealHash || '8f9b2c34a110e58c9921f...77209'}
                </p>
                <p className="text-[11px] text-emerald-700 font-medium">
                  Signed by National Legal Metrology Directorate
                </p>
              </div>
            </div>

            <Link
              to={`/certificates/${searchedCert.certificateNumber}`}
              className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              View Full Certificate
            </Link>
          </div>
        </div>
      ) : hasSearched && !searchedCert ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-rose-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
            <XCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-rose-900">✕ CERTIFICATE NOT FOUND</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No active certificate matching "{inputVal}" was found in the National Metrology Register. The certificate may have expired, or the instrument may not have completed statutory verification.
          </p>
          <button
            onClick={() => {
              setInputVal('LM-CERT-2026-00123');
              doLookup('LM-CERT-2026-00123');
            }}
            className="text-xs font-semibold text-blue-700 hover:underline pt-2 cursor-pointer"
          >
            Load Valid Sample Certificate (LM-CERT-2026-00123)
          </button>
        </div>
      ) : null}
    </div>
  );
}
