import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import {
  Sparkles,
  MapPin,
  UserCheck,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Activity,
  Zap,
  RotateCcw
} from 'lucide-react';

export default function SmartScheduling() {
  const [searchParams] = useSearchParams();
  const queryAppId = searchParams.get('appId');
  const navigate = useNavigate();
  const { applications, officers, assignOfficerToApplication } = useApp();

  const [selectedAppId, setSelectedAppId] = useState(
    queryAppId || applications.find((a) => !a.assignedOfficer || a.assignedOfficer === 'Unassigned')?.id || applications[0]?.id
  );

  const [selectedOfficerId, setSelectedOfficerId] = useState('lmo-1');
  const [scheduledDate, setScheduledDate] = useState('2026-02-16');
  const [scheduledTime, setScheduledTime] = useState('11:00 AM');
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (queryAppId) {
      setSelectedAppId(queryAppId);
    }
  }, [queryAppId]);

  const selectedApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  // Scoring algorithm simulation based on jurisdiction, proximity, workload
  const scoredOfficers = officers.map((officer) => {
    let score = 75;
    if (selectedApp?.jurisdiction && officer.jurisdiction.includes(selectedApp.jurisdiction)) {
      score += 18;
    }
    if (officer.activeWorkload <= 3) {
      score += 6;
    } else if (officer.activeWorkload > 5) {
      score -= 8;
    }
    return {
      ...officer,
      matchScore: Math.min(score, 98),
      distanceKm: officer.id === 'lmo-1' ? '2.4 km' : officer.id === 'lmo-2' ? '5.1 km' : '8.9 km'
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const bestOfficer = scoredOfficers[0];

  const handleAutoAssign = async () => {
    setIsProcessing(true);
    await assignOfficerToApplication(
      selectedApp.id,
      bestOfficer.name,
      scheduledDate,
      scheduledTime
    );
    setIsProcessing(false);
    setAssignmentSuccess(true);
  };

  const handleManualAssign = async () => {
    const chosen = officers.find((o) => o.id === selectedOfficerId) || bestOfficer;
    setIsProcessing(true);
    await assignOfficerToApplication(
      selectedApp.id,
      chosen.name,
      scheduledDate,
      scheduledTime
    );
    setIsProcessing(false);
    setAssignmentSuccess(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Smart India Hackathon 2026 • AI Allocation Subsystem
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Smart Inspection Scheduling Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Automated, proximity-aware dispatch matching verification lodgements with certified LMO officers.
          </p>
        </div>

        <button
          onClick={handleAutoAssign}
          disabled={isProcessing}
          className="px-5 py-2.5 rounded-xl bg-[#2f6388] text-white text-xs sm:text-sm font-semibold hover:bg-[#255273] transition-all flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>{isProcessing ? 'Optimizing...' : 'Auto-Assign Best Officer'}</span>
        </button>
      </div>

      {/* Main Grid: Left Applications Queue, Right Matchmaker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Pending / Unassigned Queue */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Pending Applications</h3>
            <span className="text-xs font-mono text-slate-500">{applications.length} total</span>
          </div>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {applications.map((app) => {
              const isSelected = app.id === selectedApp?.id;
              const isAssigned = app.assignedOfficer && app.assignedOfficer !== 'Unassigned';

              return (
                <div
                  key={app.id}
                  onClick={() => {
                    setSelectedAppId(app.id);
                    setAssignmentSuccess(false);
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#00162c] bg-blue-50/50 shadow-xs'
                      : 'border-slate-200/80 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900">{app.id}</span>
                    <StatusBadge status={app.status} size="sm" />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{app.instrumentName}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span className="truncate max-w-[130px]">{app.jurisdiction}</span>
                    <span className={`font-medium ${isAssigned ? 'text-slate-600' : 'text-amber-700 font-bold'}`}>
                      {isAssigned ? app.assignedOfficer : 'Unassigned'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Smart Dispatch Console */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-6">
            {/* Target Application Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Target Inspection Job
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedApp?.instrumentName} ({selectedApp?.id})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedApp?.businessName} • {selectedApp?.location}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Jurisdiction Zone</span>
                <span className="font-bold text-slate-800">{selectedApp?.jurisdiction}</span>
              </div>
            </div>

            {/* Smart Recommendation Highlight Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50/50 border border-blue-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00162c] text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Recommended Smart Match
                    </h4>
                    <p className="text-xs text-slate-600">Calculated via multi-factor workload and distance weighting.</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-bold text-emerald-700">{bestOfficer.matchScore}%</span>
                  <span className="block text-[10px] text-slate-500 font-medium">Match Score</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px]">Officer</span>
                  <span className="font-bold text-slate-900">{bestOfficer.name}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px]">Proximity Distance</span>
                  <span className="font-bold text-blue-900">{bestOfficer.distanceKm}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px]">Active Workload</span>
                  <span className="font-bold text-slate-900">{bestOfficer.activeWorkload} inspections</span>
                </div>
              </div>

              <button
                onClick={handleAutoAssign}
                disabled={isProcessing}
                className="w-full py-2.5 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Confirm Best Officer Match ({bestOfficer.name})</span>
              </button>
            </div>

            {/* Candidate LMO Pool List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                All Available Legal Metrology Officers (LMO)
              </h4>

              <div className="space-y-2">
                {scoredOfficers.map((off) => {
                  const isSelected = selectedOfficerId === off.id;
                  return (
                    <div
                      key={off.id}
                      onClick={() => setSelectedOfficerId(off.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#00162c] bg-slate-50 ring-1 ring-[#00162c]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                          {off.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs font-bold text-slate-900">{off.name}</h5>
                            <span className="font-mono text-[10px] text-slate-400">{off.id}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{off.jurisdiction} • {off.distanceKm} away</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-right">
                        <div>
                          <span className="font-bold text-slate-900 block">{off.activeWorkload} active</span>
                          <span className="text-[10px] text-slate-400">Load</span>
                        </div>
                        <div className="w-14 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-900">
                            {off.matchScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date & Time Slot configuration */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Scheduled Date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Inspection Time Window</label>
                <select
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-medium text-slate-800 cursor-pointer"
                >
                  <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                  <option value="11:00 AM">11:00 AM - 01:00 PM</option>
                  <option value="02:30 PM">02:30 PM - 04:30 PM</option>
                  <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>

            {/* Manual Confirmation Button */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleManualAssign}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                Assign Selected Officer &amp; Dispatch Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Showing "Assigned successfully" */}
      {assignmentSuccess && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Dispatch Scheduled
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                LMO Assigned Successfully
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Application:</span>
                <span className="font-mono font-bold text-slate-900">{selectedApp?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Officer:</span>
                <span className="font-bold text-slate-900">{bestOfficer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Schedule:</span>
                <span className="font-bold text-blue-900">{scheduledDate} ({scheduledTime})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Application Status:</span>
                <span className="font-bold text-emerald-700">Scheduled</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              The application status has updated to "Scheduled". The LMO officer now has this task in their field verification console.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setAssignmentSuccess(false);
                  navigate(`/lmo/inspection/${selectedApp?.id}`);
                }}
                className="w-full py-2.5 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
              >
                Switch to LMO Inspection View
              </button>

              <button
                onClick={() => setAssignmentSuccess(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all cursor-pointer"
              >
                Continue Scheduling Queue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
