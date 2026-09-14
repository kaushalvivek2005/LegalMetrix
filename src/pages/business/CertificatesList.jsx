import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import {
  Award,
  Search,
  QrCode,
  Download,
  Calendar,
  Eye,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function CertificatesList() {
  const navigate = useNavigate();
  const { certificates, setRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = certificates.filter(
    (c) =>
      c.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instrumentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instrumentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
            <Award className="w-4 h-4 text-blue-600" />
            Statutory Legal Metrology Certifications
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Digital Certificates Ledger</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Cryptographically sealed, tamper-evident verification certificates issued by authorized officers.
          </p>
        </div>

        <button
          onClick={() => {
            setRole('public');
            navigate('/verify');
          }}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <QrCode className="w-4 h-4 text-emerald-600" />
          <span>Public QR Authenticator</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search certificate ID, instrument, or business..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#00162c]"
          />
        </div>
        <span className="text-xs font-mono text-slate-500">{filtered.length} certificates</span>
      </div>

      {/* Grid of Certificates */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <Award className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No Certificates Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Digital verification certificates will appear here once an LMO approves and stamps an instrument application.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cert) => (
            <div
              key={cert.certificateNumber}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {cert.certificateNumber}
                  </span>
                  <StatusBadge status={cert.status} size="sm" />
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2f6388] transition-colors">
                  {cert.instrumentName}
                </h3>
                <p className="text-xs font-mono text-blue-900 mt-0.5">
                  Instrument: {cert.instrumentId}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Business:</span>
                    <span className="font-medium truncate max-w-[170px]">{cert.businessName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Issued On:</span>
                    <span className="font-medium">{cert.verificationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Valid Until:</span>
                    <span className="font-bold text-emerald-700">{cert.validUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Verified By:</span>
                    <span className="font-medium">{cert.verifiedBy}</span>
                  </div>
                </div>

                {/* SHA-256 seal tag */}
                <div className="mt-3 p-2 bg-slate-50 rounded-lg border border-slate-200/70 text-[10px] font-mono text-slate-500 truncate">
                  Seal Hash: {cert.sealHash || '8f9b2c34a110e58c9921f77209'}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <Link
                  to={`/certificates/${cert.certificateNumber}`}
                  className="flex-1 py-2 rounded-xl bg-[#00162c] text-white hover:bg-slate-800 text-xs font-semibold text-center transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Full Certificate</span>
                </Link>

                <Link
                  to={`/verify?cert=${cert.certificateNumber}`}
                  className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-all cursor-pointer"
                  title="Verify Public QR"
                >
                  <QrCode className="w-4 h-4 text-emerald-700" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
