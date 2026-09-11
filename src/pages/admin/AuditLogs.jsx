import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  History,
  Search,
  Filter,
  ShieldCheck,
  Download,
  Calendar,
  User,
  Hash,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function AuditLogs() {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('All');

  const filtered = auditLogs.filter((log) => {
    const matchSearch =
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.hash.toLowerCase().includes(searchTerm.toLowerCase());

    const matchAction = filterAction === 'All' || log.action === filterAction;
    return matchSearch && matchAction;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
            <History className="w-4 h-4 text-blue-600" />
            Immutable Verification Ledger
          </div>
          <h1 className="text-2xl font-bold text-slate-900">National System Audit Logs</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Chronological, tamper-proof record of every statutory registration, LMO assignment, field audit, and certificate signature.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting full audit trail to encrypted CSV format.')}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Trail (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by event, actor, instrument, or SHA-256 hash..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#00162c]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer"
          >
            <option value="All">All Event Types</option>
            <option value="CERTIFICATE_ISSUED">Certificate Issuance</option>
            <option value="INSPECTION_COMPLETED">Field Inspections</option>
            <option value="LMO_ASSIGNED">LMO Dispatch</option>
            <option value="APPLICATION_SUBMITTED">Applications Lodged</option>
            <option value="INSTRUMENT_REGISTERED">Instrument Registrations</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Timestamp (UTC)</th>
                <th className="pb-3">Event Description</th>
                <th className="pb-3">Action Type</th>
                <th className="pb-3">Target Entity</th>
                <th className="pb-3">Actor / Officer</th>
                <th className="pb-3">Cryptographic SHA-256 Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 font-sans font-semibold text-slate-900">
                    {log.event}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 text-slate-700 font-medium">
                    {log.target}
                  </td>
                  <td className="py-3 text-slate-600 font-sans">
                    {log.actor}
                  </td>
                  <td className="py-3 text-slate-500 text-[10px] truncate max-w-[140px]" title={log.hash}>
                    {log.hash}
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
