import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { Scale, Search, Filter, MapPin, Eye, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NationalInstruments() {
  const { instruments } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = instruments.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
          <Scale className="w-4 h-4 text-blue-600" />
          Central Legal Metrology Database
        </div>
        <h1 className="text-2xl font-bold text-slate-900">National Instrument Registry</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Master registry of verified, under-review, and stamped commercial measuring instruments across India.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, instrument model, business, or state..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#00162c]"
          />
        </div>
        <span className="text-xs font-mono text-slate-500">{filtered.length} instruments</span>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Instrument ID</th>
                <th className="pb-3">Model &amp; Manufacturer</th>
                <th className="pb-3">Classification</th>
                <th className="pb-3">Capacity &amp; Class</th>
                <th className="pb-3">Business Entity</th>
                <th className="pb-3">Jurisdiction</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((inst) => (
                <tr key={inst.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 font-mono font-bold text-blue-900">
                    {inst.id}
                  </td>
                  <td className="py-3">
                    <p className="font-semibold text-slate-900">{inst.name}</p>
                    <p className="text-[10px] text-slate-400">{inst.manufacturer} • {inst.model}</p>
                  </td>
                  <td className="py-3 text-slate-600">{inst.type}</td>
                  <td className="py-3 font-medium text-slate-800">{inst.capacity}</td>
                  <td className="py-3 text-slate-600">{inst.businessName}</td>
                  <td className="py-3 text-slate-500">{inst.location}</td>
                  <td className="py-3">
                    <StatusBadge status={inst.status} size="sm" />
                  </td>
                  <td className="py-3 text-right">
                    {inst.previousCertificateNumber ? (
                      <Link
                        to={`/certificates/${inst.previousCertificateNumber}`}
                        className="font-mono text-blue-700 hover:underline font-semibold text-[11px]"
                      >
                        {inst.previousCertificateNumber}
                      </Link>
                    ) : (
                      <span className="text-slate-400 text-[11px]">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
