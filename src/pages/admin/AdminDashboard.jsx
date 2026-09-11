import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import StatCard from '../../components/StatCard.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  ShieldCheck,
  Scale,
  Compass,
  Award,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Eye,
  History,
  Activity,
  Users,
  MapPin
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { instruments, applications, certificates } = useApp();

  // Monthly verification chart data
  const monthlyData = [
    { month: 'Sep', verifications: 1420, inspections: 1510 },
    { month: 'Oct', verifications: 1890, inspections: 1980 },
    { month: 'Nov', verifications: 2100, inspections: 2240 },
    { month: 'Dec', verifications: 2450, inspections: 2590 },
    { month: 'Jan', verifications: 2780, inspections: 2910 },
    { month: 'Feb', verifications: 3120, inspections: 3260 },
  ];

  // Category distribution
  const categoryData = [
    { name: 'Commercial NAWI', value: 45, color: '#00162c' },
    { name: 'Fuel Dispensers', value: 25, color: '#2f6388' },
    { name: 'Weighbridges', value: 18, color: '#0284c7' },
    { name: 'Counter Scales', value: 12, color: '#10b981' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* National Command Center Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#00162c] text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            National Command Center • Ministry of Consumer Affairs
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Legal Metrology Administration &amp; Oversight
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time pan-India monitoring of verification compliance, automated LMO dispatch, and digital certificate integrity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/admin/scheduling')}
            className="px-5 py-2.5 rounded-xl bg-[#2f6388] text-white text-xs sm:text-sm font-semibold hover:bg-[#255273] transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Smart Scheduling Engine</span>
          </button>

          <button
            onClick={() => navigate('/admin/audit')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-md border border-white/20 flex items-center gap-2 cursor-pointer"
          >
            <History className="w-4 h-4" />
            <span>Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Registered Instruments"
          value="1,48,290"
          subtitle="+8.4% YoY National Growth"
          icon={Scale}
          variant="primary"
        />
        <StatCard
          title="Active Stamping Certs"
          value="1,34,510"
          subtitle="92.1% Compliance Rate"
          icon={Award}
          variant="success"
        />
        <StatCard
          title="In Verification Pipeline"
          value={applications.length}
          subtitle="Live queue across zones"
          icon={Compass}
          variant="warning"
        />
        <StatCard
          title="Enforcement Flags"
          value="24"
          subtitle="Non-compliant / Seal break"
          icon={AlertTriangle}
          variant="error"
          alert={true}
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Volume Bar Chart */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">National Verification Volume</h3>
              <p className="text-xs text-slate-500">Monthly inspection and digital certificate issuance trends.</p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              FY 2025-26
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#00162c', color: '#fff', borderRadius: '12px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="inspections" name="Inspections Completed" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="verifications" name="Certificates Issued" fill="#00162c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Instrument Distribution Donut Chart */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Instrument Category Share</h3>
              <span className="text-[10px] text-slate-500 font-mono">DoCA Census</span>
            </div>

            <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#00162c', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span>{cat.name}</span>
                </span>
                <span className="font-bold text-slate-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications Queue with Smart Schedule assignment option */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">National Applications Queue</h3>
            <p className="text-xs text-slate-500">Live lodgements requiring officer scheduling and jurisdiction dispatch.</p>
          </div>

          <button
            onClick={() => navigate('/admin/scheduling')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold hover:bg-blue-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Open Smart Scheduler</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Application ID</th>
                <th className="pb-3">Instrument</th>
                <th className="pb-3">Business Entity</th>
                <th className="pb-3">Jurisdiction</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Assigned LMO</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.slice(0, 6).map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 font-mono font-semibold text-slate-900">
                    {app.id}
                  </td>
                  <td className="py-3 font-medium text-slate-900">
                    {app.instrumentName}
                  </td>
                  <td className="py-3 text-slate-600">
                    {app.businessName}
                  </td>
                  <td className="py-3 text-slate-600">
                    {app.jurisdiction}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="py-3 font-medium">
                    {app.assignedOfficer && app.assignedOfficer !== 'Unassigned' ? (
                      <span className="text-slate-800">{app.assignedOfficer}</span>
                    ) : (
                      <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right space-x-1">
                    <button
                      onClick={() => navigate(`/admin/scheduling?appId=${app.id}`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#00162c] hover:text-white text-slate-700 text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      Assign LMO
                    </button>
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
