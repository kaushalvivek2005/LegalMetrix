import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { ApplicationTimeline } from '../../components/Timeline.jsx';
import {
  Compass,
  Search,
  Calendar,
  UserCheck,
  Building2,
  Scale,
  Award,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react';

export default function ApplicationTracking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const { applications } = useApp();

  const [selectedAppId, setSelectedAppId] = useState(
    highlightId || applications[0]?.id || ''
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (highlightId) {
      setSelectedAppId(highlightId);
    } else if (!selectedAppId && applications.length > 0) {
      setSelectedAppId(applications[0].id);
    }
  }, [highlightId, applications, selectedAppId]);

  const selectedApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  const filteredApps = applications.filter(
    (a) =>
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.instrumentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
          <Compass className="w-4 h-4 text-blue-600" />
          Real-time Statutory Pipeline Tracking
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Application Tracking &amp; Status Lifecycle
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          End-to-end visibility of verification requests, document validation, officer dispatch, field inspection, and certificate generation.
        </p>
      </div>

      {/* Main Container: Left list, Right deep details & large visual timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Applications List */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">All Applications</h3>
            <span className="text-[11px] font-mono text-slate-500 font-semibold">{applications.length} total</span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID or instrument..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#00162c]"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredApps.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No applications found.
              </div>
            ) : (
              filteredApps.map((app) => {
                const isSelected = app.id === selectedApp?.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#00162c] bg-blue-50/50 shadow-xs'
                        : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-900">{app.id}</span>
                      <StatusBadge status={app.status} size="sm" />
                    </div>
                    <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {app.instrumentName}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span>{app.verificationType}</span>
                      <span>{app.submittedDate}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Detailed Tracking View with Large Visual Timeline */}
        {selectedApp ? (
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-6">
              {/* Application Top Summary Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {selectedApp.id}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-medium">Lodged: {selectedApp.submittedDate}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedApp.instrumentName}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedApp.businessName} • {selectedApp.location}
                  </p>
                </div>

                <StatusBadge status={selectedApp.status} size="lg" />
              </div>

              {/* Large Visual Timeline - MOST IMPORTANT VISUAL SECTION */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Statutory Progress Pipeline
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Traceable on Central DoCA Audit Ledger
                  </span>
                </div>

                <ApplicationTimeline steps={selectedApp.timeline} />
              </div>

              {/* Details Grid: Officer, Schedule, Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Assigned LMO Officer</span>
                  <p className="font-bold text-slate-800 text-sm">
                    {selectedApp.assignedOfficer || 'Unassigned (In Queue)'}
                  </p>
                  <p className="text-[11px] text-slate-500">{selectedApp.officerRole || 'Legal Metrology'}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Scheduled Audit Time</span>
                  <p className="font-bold text-slate-800 text-sm">
                    {selectedApp.scheduledDate ? `${selectedApp.scheduledDate} ${selectedApp.scheduledTime}` : 'Awaiting Schedule'}
                  </p>
                  <p className="text-[11px] text-slate-500">On-site geofenced inspection</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Statutory Stamping Fee</span>
                  <p className="font-bold text-emerald-800 text-sm">₹{selectedApp.feeAmount || 1000}.00</p>
                  <p className="text-[11px] text-emerald-700 font-medium">Receipt #REC-2026-8812</p>
                </div>
              </div>

              {/* Action Banner depending on status */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900">Field Audit &amp; Certification Actions</h4>
                  <p className="text-[11px] text-slate-500">
                    Inspect application in LMO field view or view issued digital certificate.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/lmo/inspection/${selectedApp.id}`)}
                    className="px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
                  >
                    Open Field Inspection View
                  </button>

                  {selectedApp.certificateId && (
                    <Link
                      to={`/certificates/${selectedApp.certificateId}`}
                      className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>View Certificate</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 p-12 text-center rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center justify-center space-y-3">
            <Clock className="w-10 h-10 text-slate-300" />
            <h3 className="text-base font-bold text-slate-700">No Application Selected</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Select an application from the list or submit a new verification application to track its statutory progress.
            </p>
            <button
              onClick={() => navigate('/business/applications/new')}
              className="mt-2 px-4 py-2 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
            >
              Submit Verification Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
