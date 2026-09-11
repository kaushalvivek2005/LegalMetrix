import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import RoleSwitcher from './RoleSwitcher.jsx';
import NotificationPanel from './NotificationPanel.jsx';
import DemoGuideModal from './DemoGuideModal.jsx';
import {
  Bell,
  HelpCircle,
  PlayCircle,
  Menu,
  ShieldAlert,
  User,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onToggleSidebar }) {
  const { notifications, resetDemoData } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        {/* Left: Mobile Menu + Platform title for mobile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Govt. of India
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-600">
              Department of Consumer Affairs (DoCA)
            </span>
          </div>
        </div>

        {/* Center/Right: Role Switcher & SIH 2026 Tour & Notification icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick SIH Live Presentation Button */}
          <button
            onClick={() => setShowGuide(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold hover:bg-blue-100 transition-all cursor-pointer shadow-2xs"
            title="Open 5-minute live demonstration checklist for SIH 2026 judges"
          >
            <PlayCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>SIH Demo Guide</span>
          </button>

          {/* Role Switcher */}
          <RoleSwitcher />

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-600 ring-2 ring-white" />
              )}
            </button>
            <NotificationPanel
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
            />
          </div>

          {/* Quick Reset State Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset demo state to initial test records?')) {
                resetDemoData();
                alert('Demo state reset.');
              }
            }}
            className="hidden xl:flex p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            title="Reset Demo Records"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#00162c] flex items-center justify-center text-white text-xs font-bold">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">National Portal</p>
              <p className="text-[10px] text-slate-400 font-mono">SIH26036 • Active</p>
            </div>
          </div>
        </div>
      </header>

      <DemoGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </>
  );
}
