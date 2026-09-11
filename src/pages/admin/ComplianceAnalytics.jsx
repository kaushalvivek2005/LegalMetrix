import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { Activity, ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2, Download } from 'lucide-react';
import StatCard from '../../components/StatCard.jsx';

export default function ComplianceAnalytics() {
  const stateData = [
    { state: 'Delhi NCR', compliant: 94, nonCompliant: 6 },
    { state: 'Maharashtra', compliant: 91, nonCompliant: 9 },
    { state: 'Gujarat', compliant: 95, nonCompliant: 5 },
    { state: 'Tamil Nadu', compliant: 89, nonCompliant: 11 },
    { state: 'Karnataka', compliant: 92, nonCompliant: 8 },
    { state: 'Uttar Pradesh', compliant: 86, nonCompliant: 14 },
    { state: 'West Bengal', compliant: 88, nonCompliant: 12 },
  ];

  const trendData = [
    { week: 'W1', passRate: 92.4, tamperFlags: 4 },
    { week: 'W2', passRate: 94.1, tamperFlags: 2 },
    { week: 'W3', passRate: 93.8, tamperFlags: 5 },
    { week: 'W4', passRate: 95.2, tamperFlags: 1 },
    { week: 'W5', passRate: 96.0, tamperFlags: 3 },
    { week: 'W6', passRate: 96.8, tamperFlags: 1 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
            <Activity className="w-4 h-4 text-blue-600" />
            National Metrology Compliance Analytics
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Enforcement &amp; Accuracy Metrics</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time compliance indices, pass/fail ratios, and calibration drift monitoring across states.
          </p>
        </div>

        <button
          onClick={() => alert('Generating National Metrology Compliance PDF Report.')}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="National Pass Rate"
          value="96.2%"
          subtitle="Within legal tolerance"
          icon={CheckCircle2}
          variant="success"
        />
        <StatCard
          title="Average Audit Time"
          value="26 mins"
          subtitle="Down from 4.2 days"
          icon={TrendingUp}
          variant="primary"
        />
        <StatCard
          title="Tamper Seal Alerts"
          value="18"
          subtitle="Enforcement issued"
          icon={AlertTriangle}
          variant="error"
          alert={true}
        />
        <StatCard
          title="Re-Verification Turnaround"
          value="1.8 days"
          subtitle="Target: ≤ 3.0 days"
          icon={ShieldCheck}
          variant="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* State-wise compliance */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">State-wise Compliance Rate (%)</h3>
              <p className="text-xs text-slate-500">Percentage of active commercial scales with valid statutory stamp.</p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              State Index
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="state" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#00162c', color: '#fff', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="compliant" name="Compliant (%)" fill="#00162c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly pass rate trend */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Weekly Inspection Pass Trend</h3>
              <p className="text-xs text-slate-500">6-week moving average of field verification approvals.</p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              Moving Avg
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[90, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#00162c', color: '#fff', borderRadius: '12px', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="passRate" name="Pass Rate (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
