import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function OfflineSimulatorBar() {
  const {
    isOffline,
    toggleOffline,
    pendingSyncCount,
    isSyncing,
    syncSuccessMsg,
    syncOfflineData
  } = useApp();

  return (
    <div className={`px-4 py-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 transition-all ${
      isOffline 
        ? 'bg-amber-500/10 border-amber-300 text-amber-950'
        : 'bg-emerald-500/10 border-emerald-300 text-emerald-950'
    }`}>
      <div className="flex items-center gap-2.5">
        <span className={`flex h-3 w-3 relative`}>
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isOffline ? 'bg-amber-500' : 'bg-emerald-500'
          }`} />
          <span className={`relative inline-flex rounded-full h-3 w-3 ${
            isOffline ? 'bg-amber-600' : 'bg-emerald-600'
          }`} />
        </span>

        {isOffline ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
            <WifiOff className="w-4 h-4 text-amber-600" />
            <span>OFFLINE MODE SIMULATOR</span>
            <span className="font-normal text-amber-700 hidden md:inline">
              — Inspection data will be saved locally in browser storage.
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900">
            <Wifi className="w-4 h-4 text-emerald-600" />
            <span>ONLINE MODE</span>
            <span className="font-normal text-emerald-700 hidden md:inline">
              — Connected to DoCA Central Cloud Ledger.
            </span>
          </div>
        )}

        {isOffline && pendingSyncCount > 0 && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
            Saved Locally ({pendingSyncCount} pending)
          </span>
        )}

        {syncSuccessMsg && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md animate-bounce">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ✓ Synced Successfully (Pending: 0)
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isOffline ? (
          <button
            onClick={syncOfflineData}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Restore Connection & Sync'}</span>
          </button>
        ) : (
          <button
            onClick={toggleOffline}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-all cursor-pointer shadow-xs"
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>Simulate Offline</span>
          </button>
        )}
      </div>
    </div>
  );
}
