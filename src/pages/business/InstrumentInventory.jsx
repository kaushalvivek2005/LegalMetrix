import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import {
  Scale,
  Plus,
  Search,
  Filter,
  FileText,
  Award,
  Calendar,
  MapPin,
  Tag,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function InstrumentInventory() {
  const navigate = useNavigate();
  const { instruments } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInst, setSelectedInst] = useState(null);

  const filtered = instruments.filter((inst) => {
    const matchSearch =
      inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCat = categoryFilter === 'All' || inst.type === categoryFilter || (inst.category && inst.category.includes(categoryFilter));
    const matchStatus = statusFilter === 'All' || (inst.status && inst.status.toUpperCase().includes(statusFilter.toUpperCase()));

    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Instrument Inventory</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Registered weighing and measuring instruments across commercial premises and warehouses.
          </p>
        </div>

        <button
          onClick={() => navigate('/business/instruments/new')}
          className="px-4 py-2.5 rounded-xl bg-[#00162c] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Instrument</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, serial number, model, or location..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#00162c]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Commercial Weighing">Commercial Weighing</option>
            <option value="Fuel Dispenser">Fuel Dispenser</option>
            <option value="Weighbridge">Weighbridge</option>
            <option value="Counter Scale">Counter Scale</option>
            <option value="Measuring Instrument">Measuring Instrument</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Verified">Verified &amp; Active</option>
            <option value="Due">Inspection Due</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Grid of Instruments */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <Scale className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No instruments registered</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm || categoryFilter !== 'All' || statusFilter !== 'All'
              ? 'No instruments match your filter criteria.'
              : 'Add your commercial scales, dispensers, or weighbridges to initiate statutory verification.'}
          </p>
          <button
            onClick={() => navigate('/business/instruments/new')}
            className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Instrument</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((inst) => (
            <div
              key={inst.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {inst.id}
                  </span>
                  <StatusBadge status={inst.status} size="sm" />
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2f6388] transition-colors">
                  {inst.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {inst.manufacturer} • {inst.model}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Serial No:</span>
                    <span className="font-mono font-medium">{inst.serialNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Capacity / Class:</span>
                    <span className="font-medium">{inst.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-medium truncate max-w-[160px]">{inst.location}</span>
                  </div>
                  {inst.expiryDate && (
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400">Valid Until:</span>
                      <span className={`font-semibold ${inst.status.includes('Expired') ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {inst.expiryDate}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setSelectedInst(inst)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold text-center transition-all cursor-pointer"
                >
                  Specifications
                </button>

                <button
                  onClick={() => navigate(`/business/applications/new?instrumentId=${inst.id}`)}
                  className="flex-1 py-2 rounded-xl bg-[#00162c] text-white hover:bg-slate-800 text-xs font-semibold text-center transition-all cursor-pointer shadow-xs"
                >
                  Apply Stamping
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Specifications Modal */}
      {selectedInst && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedInst.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedInst.name}</h3>
              </div>
              <StatusBadge status={selectedInst.status} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Manufacturer</span>
                <span className="font-bold text-slate-800">{selectedInst.manufacturer}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Model</span>
                <span className="font-bold text-slate-800">{selectedInst.model}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Serial Number</span>
                <span className="font-mono font-bold text-slate-800">{selectedInst.serialNumber}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Accuracy Class</span>
                <span className="font-bold text-slate-800">{selectedInst.accuracyClass}</span>
              </div>
              <div className="col-span-2 p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Business &amp; Address</span>
                <span className="font-medium text-slate-800">{selectedInst.businessName}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">{selectedInst.address}</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Previous Certificate</span>
                <span className="font-mono font-bold text-slate-800">{selectedInst.previousCertificateNumber || 'N/A (New)'}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Previous Verification</span>
                <span className="font-bold text-slate-800">{selectedInst.previousVerificationDate || 'N/A'}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedInst(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const instId = selectedInst.id;
                  setSelectedInst(null);
                  navigate(`/business/applications/new?instrumentId=${instId}`);
                }}
                className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Apply for Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
