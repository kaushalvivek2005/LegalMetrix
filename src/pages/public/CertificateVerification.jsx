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
  RotateCcw,
  Clock
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge.jsx';

export default function CertificateVerification() {
  const [searchParams] = useSearchParams();
  const queryCert = searchParams.get('cert') || '';
  const { certificates, applications, instruments } = useApp();

  const [inputVal, setInputVal] = useState(queryCert || '');
  const [searchedCert, setSearchedCert] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isScanningQR, setIsScanningQR] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (queryCert) {
      setInputVal(queryCert);
      doLookup(queryCert);
    }
  }, [queryCert, certificates]);

  const doLookup = (code) => {
    if (!code) return;
    setIsLoading(true);
    setHasSearched(true);
    setTimeout(() => {
      const clean = (code || '').trim().toUpperCase();
      
      // 1. Direct match in active certificates
      const found = certificates.find(
        (c) =>
          (c.certificateNumber && c.certificateNumber.toUpperCase() === clean) ||
          (c.instrumentId && c.instrumentId.toUpperCase() === clean)
      );

      if (found) {
        setSearchedCert({
          ...found,
          status: 'ACTIVE',
          result: 'PASS',
          isPending: false
        });
        setIsLoading(false);
        return;
      }

      // 2. Check if searching for Instrument 2 or Application 2
      if (clean === 'LM-CERT-2026-002' || clean === 'LM-WM-2026-002' || clean === 'APP-2026-002') {
        const app = applications.find((a) => a.id === 'APP-2026-002' || a.instrumentId === 'LM-WM-2026-002');
        const inst = instruments.find((i) => i.id === 'LM-WM-2026-002');

        // Check if certificate has already been issued for Instrument 2
        if (app?.certificateId) {
          const issuedCert = certificates.find((c) => c.certificateNumber === app.certificateId);
          if (issuedCert) {
            setSearchedCert({
              ...issuedCert,
              status: 'ACTIVE',
              result: 'PASS',
              isPending: false
            });
            setIsLoading(false);
            return;
          }
        }

        // Before PASS: Not generated / scheduled state
        setSearchedCert({
          certificateNumber: 'LM-CERT-2026-002',
          instrumentId: 'LM-WM-2026-002',
          instrumentName: inst?.name || 'Platform Weighing Scale',
          businessName: inst?.businessName || 'Singh Grain Traders',
          location: inst?.location || 'Bank More, Dhanbad, Jharkhand',
          verificationDate: 'Scheduled: ' + (app?.scheduledDate || '2026-09-15'),
          validUntil: 'Pending Verification Pass',
          verifiedBy: app?.assignedOfficer || 'Priya Singh (LMO-JHK-018)',
          status: 'INSPECTION SCHEDULED',
          result: 'PENDING',
          isPending: true,
          sealHash: 'Awaiting Officer Field Verification Stamp'
        });
      } else {
        setSearchedCert(null);
      }
      setIsLoading(false);
    }, 300);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputVal) {
      doLookup(inputVal);
    }
  };

  const simulateQRScan = () => {
    setIsScanningQR(true);
    setTimeout(() => {
      const demoCert = certificates[0]?.certificateNumber || '';
      setInputVal(demoCert);
      setIsScanningQR(false);
      if (demoCert) {
        doLookup(demoCert);
      }
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          LegalMetrix Public Verification Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Verify Legal Metrology Certificate
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Scan QR code or enter certificate ID to authenticate demonstration stamping, validity window, and instrument verification records.
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
              placeholder="e.g. Enter Certificate Number or Instrument ID"
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
            disabled={isScanningQR || certificates.length === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Camera className={`w-4 h-4 ${isScanningQR ? 'animate-spin' : ''}`} />
            <span>{isScanningQR ? 'Scanning Camera...' : 'Scan QR Code'}</span>
          </button>
        </form>

        {/* Quick Demo Certificate Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
          <span className="font-medium">Quick Demo Certificates:</span>
          <button
            type="button"
            onClick={() => {
              setInputVal('LM-CERT-2026-001');
              doLookup('LM-CERT-2026-001');
            }}
            className="font-mono text-emerald-800 hover:underline cursor-pointer bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>LM-CERT-2026-001 (Verified)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setInputVal('LM-CERT-2026-002');
              doLookup('LM-CERT-2026-002');
            }}
            className="font-mono text-blue-800 hover:underline cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 flex items-center gap-1.5"
          >
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>
              LM-CERT-2026-002 {certificates.some((c) => c.certificateNumber === 'LM-CERT-2026-002') ? '(Verified)' : '(Scheduled)'}
            </span>
          </button>
        </div>
      </div>

      {/* Lookup Results */}
      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-600">Verifying prototype record on digital register...</p>
        </div>
      ) : hasSearched && searchedCert ? (
        <div className={`p-6 sm:p-8 rounded-2xl bg-white shadow-lg space-y-6 relative overflow-hidden border ${
          searchedCert.isPending ? 'border-amber-300' : 'border-emerald-300'
        }`}>
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none ${
            searchedCert.isPending ? 'bg-amber-500/5' : 'bg-emerald-500/5'
          }`} />

          {/* Banner with Prominent DEMO CERTIFICATE status and Disclaimer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                searchedCert.isPending ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {searchedCert.isPending ? <Clock className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
              </div>
              <div className="space-y-1">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider ${
                  searchedCert.isPending ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {searchedCert.isPending ? 'CERTIFICATE NOT YET GENERATED' : 'VALID DEMO CERTIFICATE'}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {searchedCert.isPending ? 'CERTIFICATE NOT YET GENERATED' : searchedCert.certificateNumber}
                </h2>
                {searchedCert.isPending ? (
                  <p className="text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 inline-block">
                    Instrument {searchedCert.instrumentId} is currently scheduled for verification.
                  </p>
                ) : (
                  <p className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 inline-block">
                    DEMO CERTIFICATE – NOT AN OFFICIAL GOVERNMENT CERTIFICATE
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                searchedCert.isPending
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                Status: {searchedCert.status || (searchedCert.isPending ? 'INSPECTION SCHEDULED' : 'ACTIVE')}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                Result:{' '}
                <strong className={searchedCert.isPending ? 'text-amber-700' : 'text-emerald-700'}>
                  {searchedCert.result || (searchedCert.isPending ? 'PENDING' : 'PASS')}
                </strong>
              </span>
            </div>
          </div>

          {/* Explicit Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Certificate
              </span>
              <p className="font-mono font-bold text-slate-900 text-base">{searchedCert.certificateNumber}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Instrument ID
              </span>
              <p className="font-mono font-bold text-blue-900 text-base">{searchedCert.instrumentId}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Instrument
              </span>
              <p className="font-bold text-slate-900 text-sm">{searchedCert.instrumentName}</p>
              <p className="text-[11px] text-slate-500">{searchedCert.instrumentType || 'Commercial Weighing Instrument'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Owner / Trader
              </span>
              <p className="font-bold text-slate-900 text-sm">{searchedCert.businessName}</p>
              <p className="text-[11px] text-slate-500 truncate">{searchedCert.location}</p>
            </div>

            <div className={`p-3.5 rounded-xl border space-y-1 ${
              searchedCert.isPending ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider block ${
                searchedCert.isPending ? 'text-amber-800' : 'text-emerald-800'
              }`}>
                Result
              </span>
              <p className={`font-bold text-base ${searchedCert.isPending ? 'text-amber-900' : 'text-emerald-950'}`}>
                {searchedCert.result || 'PASS'}
              </p>
              <p className={`text-[11px] ${searchedCert.isPending ? 'text-amber-700' : 'text-emerald-700'}`}>
                {searchedCert.isPending ? 'Audit in progress' : 'Verified to Statutory Standards'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Verification Date
              </span>
              <p className="font-bold text-slate-900 text-base">{searchedCert.verificationDate}</p>
              <p className="text-[11px] text-slate-500">{searchedCert.verifiedBy}</p>
            </div>

            <div className={`p-3.5 rounded-xl border space-y-1 ${
              searchedCert.isPending ? 'bg-slate-50 border-slate-200' : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider block ${
                searchedCert.isPending ? 'text-slate-500' : 'text-emerald-800'
              }`}>
                Valid Until
              </span>
              <p className={`font-bold text-base ${searchedCert.isPending ? 'text-slate-800' : 'text-emerald-950'}`}>
                {searchedCert.validUntil}
              </p>
              <p className={`text-[11px] ${searchedCert.isPending ? 'text-slate-500' : 'text-emerald-700'}`}>
                {searchedCert.isPending ? '1-Year Validity Upon Pass' : 'Annual Stamping Period'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Status
              </span>
              <p className={`font-bold text-base ${searchedCert.isPending ? 'text-amber-700' : 'text-emerald-700'}`}>
                {searchedCert.status || 'VERIFIED'}
              </p>
              <p className="text-[11px] text-slate-500">{searchedCert.isPending ? 'Awaiting LMO Action' : 'In Force'}</p>
            </div>
          </div>

          {/* Demonstration Seal Box or Inspection Action */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white p-1 rounded-xl border border-slate-300 flex items-center justify-center shrink-0">
                <QrCode className="w-10 h-10 text-[#00162c]" />
              </div>
              <div className="space-y-0.5 text-left">
                <h4 className="text-xs font-bold text-slate-900">Demonstration Digital Seal</h4>
                <p className="text-[11px] font-mono text-slate-500 break-all">
                  SHA-256: {searchedCert.sealHash || '8f9b2c34a110e58c9921f...77209'}
                </p>
                <p className="text-[11px] text-slate-500">
                  Prototype verification record for demonstration purposes.
                </p>
              </div>
            </div>

            {searchedCert.isPending ? (
              <Link
                to="/lmo"
                className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap shadow-xs flex items-center gap-1.5"
              >
                <span>Complete Inspection as LMO</span>
              </Link>
            ) : (
              <Link
                to={`/certificates/${searchedCert.certificateNumber}`}
                className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                View Full Certificate
              </Link>
            )}
          </div>
        </div>
      ) : hasSearched && !searchedCert ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-rose-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
            <XCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-rose-900">✕ CERTIFICATE NOT FOUND</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No record matching "{inputVal}" was found in the register.
          </p>
          {certificates.length > 0 && (
            <button
              onClick={() => {
                const firstCert = certificates[0].certificateNumber;
                setInputVal(firstCert);
                doLookup(firstCert);
              }}
              className="text-xs font-semibold text-blue-700 hover:underline pt-2 cursor-pointer"
            >
              Try Registered Certificate ({certificates[0].certificateNumber})
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
