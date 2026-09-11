import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Scale,
  LayoutDashboard,
  FilePlus,
  Compass,
  FileText,
  Award,
  Bell,
  CheckCircle2,
  CalendarCheck,
  ClipboardList,
  ShieldCheck,
  Users,
  Activity,
  History,
  QrCode,
  MapPin,
  Bot,
  Layers,
  Sparkles,
  SearchCheck,
  Radio
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { role, applications } = useApp();
  const location = useLocation();

  // Find latest active inspection for LMO quick link
  const currentInspectApp = applications.find(a => a.assignedOfficer && a.assignedOfficer !== 'Unassigned')?.id || 'LM-APP-2026-00421';

  const getNavSections = () => {
    switch (role) {
      case 'business':
        return [
          {
            title: 'Business Workspace',
            items: [
              { to: '/business/dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { to: '/business/instruments', label: 'Instrument Inventory', icon: Scale },
              { to: '/business/instruments/new', label: 'Register Instrument', icon: FilePlus },
              { to: '/business/applications', label: 'Applications Tracking', icon: Compass },
              { to: '/business/applications/new', label: 'New Application', icon: FileText },
              { to: '/business/certificates', label: 'Digital Certificates', icon: Award },
            ]
          }
        ];

      case 'lmo':
        return [
          {
            title: 'Field Enforcement',
            items: [
              { to: '/lmo/dashboard', label: 'Field Dashboard', icon: LayoutDashboard },
              { to: '/lmo/inspections', label: 'Assigned Inspections', icon: ClipboardList },
              { to: `/lmo/inspection/${currentInspectApp}`, label: 'Field Audit Console', icon: CheckCircle2, highlight: true },
              { to: '/business/certificates', label: 'Issued Certificates', icon: Award },
            ]
          }
        ];

      case 'gatc':
        return [
          {
            title: 'GATC Lab Console',
            items: [
              { to: '/gatc/dashboard', label: 'Lab Dashboard', icon: LayoutDashboard },
              { to: '/gatc/requests', label: 'Assigned Requests', icon: ClipboardList },
              { to: '/business/certificates', label: 'Calibration Reports', icon: Award },
            ]
          }
        ];

      case 'admin':
        return [
          {
            title: 'Government Administration',
            items: [
              { to: '/admin/dashboard', label: 'Command Center', icon: LayoutDashboard },
              { to: '/admin/applications', label: 'All Applications', icon: Compass },
              { to: '/admin/scheduling', label: 'Smart Scheduling', icon: Sparkles, highlight: true },
              { to: '/admin/instruments', label: 'National Registry', icon: Scale },
              { to: '/admin/certificates', label: 'Certificates Ledger', icon: Award },
              { to: '/admin/users', label: 'LMO & Jurisdictions', icon: Users },
              { to: '/admin/analytics', label: 'Compliance Analytics', icon: Activity },
              { to: '/admin/audit', label: 'System Audit Logs', icon: History },
            ]
          }
        ];

      case 'public':
      default:
        return [
          {
            title: 'Public Portal',
            items: [
              { to: '/', label: 'Overview & Portal', icon: LayoutDashboard },
              { to: '/verify', label: 'Verify Certificate (QR)', icon: QrCode, highlight: true },
              { to: '/business/dashboard', label: 'Business Stamping', icon: Scale },
              { to: '/admin/dashboard', label: 'Government Central', icon: ShieldCheck },
            ]
          }
        ];
    }
  };

  const sections = getNavSections();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-72 bg-[#f2f4f5] border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-200/80 flex items-center gap-3 bg-[#f2f4f5]">
          <div className="w-9 h-9 rounded-xl bg-[#00162c] flex items-center justify-center text-white shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-base font-bold text-[#00162c] tracking-tight leading-none">
              LegalMetrix
            </h1>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Ministry of Consumer Affairs
            </p>
          </div>
        </div>

        {/* Role Identity Tag */}
        <div className="px-5 py-3 bg-slate-200/50 border-b border-slate-200/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-slate-700 capitalize">
              {role === 'lmo' ? 'Legal Metrology Officer' : role === 'admin' ? 'Government Admin' : role} Mode
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
            SIH26036
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {sections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="px-3 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                {sec.title}
              </h3>
              <div className="mt-1.5 space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.to;

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => onClose && onClose()}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#0f2b46] text-white shadow-xs font-semibold'
                          : item.highlight
                          ? 'text-[#0f2b46] bg-blue-100/50 hover:bg-blue-100 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-blue-700' : 'text-slate-500'}`} />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.highlight && !isActive && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-blue-200/80 text-blue-900 font-bold rounded">
                          Live
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Universal Link to Public Verification */}
          <div className="pt-2 border-t border-slate-200/70">
            <h3 className="px-3 text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Verification Engine
            </h3>
            <Link
              to="/verify"
              onClick={() => onClose && onClose()}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 transition-all"
            >
              <QrCode className="w-4 h-4 text-slate-500" />
              <span>Public QR Lookup</span>
            </Link>
          </div>
        </nav>

        {/* Footer Identity */}
        <div className="p-4 border-t border-slate-200 bg-[#f2f4f5]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00162c] text-white flex items-center justify-center font-bold text-xs">
              LM
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 truncate">National Portal Node</p>
              <p className="text-[11px] text-slate-500 truncate">Dept. of Consumer Affairs</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
