import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Bell, Check, Clock, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications } = useApp();

  if (!isOpen) return null;

  const getIcon = (priority) => {
    if (priority === 'high') return <AlertTriangle className="w-4 h-4 text-rose-600" />;
    if (priority === 'medium') return <Clock className="w-4 h-4 text-amber-600" />;
    return <Info className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="p-3.5 bg-[#00162c] text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-300" />
          <h4 className="text-xs font-bold uppercase tracking-wider">Notifications &amp; Alerts</h4>
        </div>
        <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded-full">
          {notifications.filter((n) => !n.read).length} Unread
        </span>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">
            No active notifications.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 text-left transition-colors flex items-start gap-2.5 ${
                notif.read ? 'bg-white hover:bg-slate-50' : 'bg-blue-50/40 hover:bg-blue-50/70'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                {getIcon(notif.priority)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-semibold text-slate-900 truncate">
                    {notif.title}
                  </h5>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  {notif.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
        <button
          onClick={onClose}
          className="text-xs font-semibold text-[#00162c] hover:underline cursor-pointer"
        >
          Close Notifications
        </button>
      </div>
    </div>
  );
}
