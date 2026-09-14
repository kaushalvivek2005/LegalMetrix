import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_INSTRUMENTS,
  INITIAL_APPLICATIONS,
  INITIAL_CERTIFICATES,
  INITIAL_GATC_TESTS,
  AVAILABLE_OFFICERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  REGIONAL_DATA
} from '../data/mockData.js';
import { api } from '../services/api.js';

const AppContext = createContext();

const STORAGE_KEYS = {
  INSTRUMENTS: 'lm_instruments_v8',
  APPLICATIONS: 'lm_applications_v8',
  CERTIFICATES: 'lm_certificates_v8',
  AUDIT_LOGS: 'lm_audit_logs_v8',
  NOTIFICATIONS: 'lm_notifications_v8',
  GATC_TESTS: 'lm_gatc_tests_v8',
  ROLE: 'lm_current_role_v8'
};

export function AppProvider({ children }) {
  // Role State: 'business' | 'lmo' | 'gatc' | 'admin' | 'public'
  const [role, setRoleState] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ROLE) || 'business';
  });

  const setRole = (newRole) => {
    setRoleState(newRole);
    localStorage.setItem(STORAGE_KEYS.ROLE, newRole);
  };

  // Sweep legacy demo/prototype cache keys
  useEffect(() => {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (
          k &&
          ((k.startsWith('lm_') && !k.endsWith('_v8')) ||
            k.includes('gatc') ||
            k.includes('mock') ||
            k.includes('sample'))
        ) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch {
      // storage unavailable
    }
  }, []);

  // Connected Data States - initializes from storage or clean baseline
  const [instruments, setInstruments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSTRUMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 2 && parsed.some((i) => i.id === 'LM-WM-2026-002')) {
          return parsed;
        }
      }
      return INITIAL_INSTRUMENTS;
    } catch {
      return INITIAL_INSTRUMENTS;
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 2 && parsed.some((a) => a.id === 'APP-2026-002')) {
          return parsed;
        }
      }
      return INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((c) => c.certificateNumber === 'LM-CERT-2026-001')) {
          return parsed;
        }
      }
      return INITIAL_CERTIFICATES;
    } catch {
      return INITIAL_CERTIFICATES;
    }
  });

  const [gatcTests, setGatcTests] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GATC_TESTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 1) {
          return parsed;
        }
      }
      return INITIAL_GATC_TESTS;
    } catch {
      return INITIAL_GATC_TESTS;
    }
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 1) {
          return parsed;
        }
      }
      return INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 1) {
          return parsed;
        }
      }
      return INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [officers] = useState(AVAILABLE_OFFICERS);
  const [regionalStats] = useState(REGIONAL_DATA);

  // Offline Simulation State
  const [isOffline, setIsOffline] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState(false);

  // Presentation Mode Drawer / Tour State
  const [showDemoGuide, setShowDemoGuide] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INSTRUMENTS, JSON.stringify(instruments));
  }, [instruments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Helper to add audit log
  const addAuditLog = (event, actor, referenceId, details, type = 'system', action = null, hash = null) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];
    const timestampStr = `${dateStr} ${timeStr}`;
    const generatedHash = hash || `DOCA-SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const newLog = {
      id: `AUD-${Date.now()}`,
      timestamp: timestampStr,
      time: timeStr,
      date: dateStr,
      event,
      action: action || (type === 'system' ? 'CERTIFICATE_ISSUED' : type === 'lmo' ? 'INSPECTION_COMPLETED' : type === 'scheduling' ? 'LMO_ASSIGNED' : 'APPLICATION_SUBMITTED'),
      target: referenceId,
      referenceId,
      actor,
      details,
      type,
      hash: generatedHash
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // 1. Register Instrument
  const registerInstrument = async (instrumentData) => {
    const created = await api.createInstrument(instrumentData);
    setInstruments((prev) => [created, ...prev]);

    addAuditLog(
      'Instrument Registered',
      `Business (${created.businessName || 'User'})`,
      created.id,
      `New ${created.name} (${created.type}) registered for legal metrology stamping.`,
      'business'
    );

    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: 'Instrument Registered',
      message: `Digital Instrument ID ${created.id} created successfully.`,
      timestamp: 'Just now',
      read: false,
      priority: 'low',
      role: 'business'
    };
    setNotifications((prev) => [notif, ...prev]);

    return created;
  };

  // 2. Submit Verification Application
  const submitApplication = async (applicationData) => {
    const created = await api.createApplication(applicationData);
    setApplications((prev) => [created, ...prev]);

    // Update the instrument's status
    if (created.instrumentId) {
      setInstruments((prev) =>
        prev.map((inst) =>
          inst.id === created.instrumentId
            ? { ...inst, status: 'Application Submitted' }
            : inst
        )
      );
    }

    addAuditLog(
      'Application Submitted',
      `Business (${created.businessName || 'Applicant'})`,
      created.id,
      `${created.verificationType} application lodged with statutory fee ₹${created.feeAmount || 1000}.`,
      'business'
    );

    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: 'Application Lodged',
      message: `Application ${created.id} submitted for ${created.instrumentName}. Verification fee paid.`,
      timestamp: 'Just now',
      read: false,
      priority: 'medium',
      role: 'business'
    };
    setNotifications((prev) => [notif, ...prev]);

    return created;
  };

  // 3. Admin Assigns Officer (Smart Scheduling)
  const assignOfficerToApplication = async (applicationId, officer) => {
    const res = await api.assignOfficer(applicationId, officer);
    
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          const updatedTimeline = app.timeline ? [...app.timeline] : [];
          // Update officer assignment step
          const assignIdx = updatedTimeline.findIndex((s) => s.step.includes('Officer Assignment'));
          if (assignIdx >= 0) {
            updatedTimeline[assignIdx] = {
              ...updatedTimeline[assignIdx],
              completed: true,
              date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
              actor: 'Smart Scheduler'
            };
          }
          // Update inspection scheduled step
          const schedIdx = updatedTimeline.findIndex((s) => s.step.includes('Inspection Scheduled'));
          if (schedIdx >= 0) {
            updatedTimeline[schedIdx] = {
              ...updatedTimeline[schedIdx],
              completed: true,
              date: `${res.scheduledDate}, ${res.scheduledTime}`,
              actor: officer.name
            };
          }

          return {
            ...app,
            assignedOfficer: res.assignedOfficer,
            officerId: res.officerId,
            officerRole: res.officerRole,
            status: 'Inspection Scheduled',
            scheduledDate: res.scheduledDate,
            scheduledTime: res.scheduledTime,
            timeline: updatedTimeline
          };
        }
        return app;
      })
    );

    addAuditLog(
      'LMO Assigned via Smart Scheduler',
      'Admin / GATC Engine',
      applicationId,
      `Assigned to ${officer.name} (${officer.id}) in ${officer.jurisdiction} (${officer.distanceKm} km away). Match score: ${officer.matchScore}%.`,
      'scheduling'
    );

    // Notify LMO
    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Field Audit Assigned',
      message: `Application ${applicationId} assigned to your schedule for ${res.scheduledDate}.`,
      timestamp: 'Just now',
      read: false,
      priority: 'high',
      role: 'lmo'
    };
    setNotifications((prev) => [notif, ...prev]);

    return res;
  };

  // 4. LMO Field Inspection Complete & PASS/FAIL
  const completeInspection = async (applicationId, inspectionResult) => {
    const isPass = inspectionResult.decision === 'PASS';
    
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          const updatedTimeline = app.timeline ? [...app.timeline] : [];
          
          const inspectIdx = updatedTimeline.findIndex((s) => s.step.includes('Field Inspection'));
          if (inspectIdx >= 0) {
            updatedTimeline[inspectIdx] = {
              ...updatedTimeline[inspectIdx],
              completed: true,
              date: `Completed - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              actor: inspectionResult.officerName || 'LMO'
            };
          }

          const decisionIdx = updatedTimeline.findIndex((s) => s.step.includes('Verification Decision'));
          if (decisionIdx >= 0) {
            updatedTimeline[decisionIdx] = {
              ...updatedTimeline[decisionIdx],
              completed: true,
              date: `${inspectionResult.decision} - ${new Date().toLocaleDateString('en-GB')}`,
              actor: inspectionResult.officerName || 'LMO'
            };
          }

          return {
            ...app,
            status: isPass ? 'Inspection Completed' : 'Rejected',
            inspectionData: inspectionResult,
            timeline: updatedTimeline
          };
        }
        return app;
      })
    );

    addAuditLog(
      isPass ? 'Field Inspection Passed' : 'Inspection Rejected',
      `LMO (${inspectionResult.officerName || 'Field Officer'})`,
      applicationId,
      isPass
        ? `On-site physical test, zero error & MPE passed. Integrity seal verified.`
        : `Rejected. Reason: ${inspectionResult.failureReason || 'Non-compliance with MPE tolerances'}.`,
      'lmo'
    );

    if (isOffline) {
      setPendingSyncCount((c) => c + 1);
    }

    return isPass;
  };

  // 5. Generate Certificate
  const generateCertificate = async (applicationId) => {
    const app = applications.find((a) => a.id === applicationId);
    if (!app) return null;

    const inst = instruments.find((i) => i.id === app.instrumentId);

    const certData = {
      instrumentId: app.instrumentId || inst?.id || '',
      instrumentName: app.instrumentName || inst?.name || 'Commercial Weighing Instrument',
      instrumentType: app.instrumentType || inst?.type || 'Commercial Weighing',
      businessName: app.businessName || inst?.businessName || 'Registered Enterprise',
      location: app.location || inst?.location || 'Designated Premises',
      manufacturer: inst?.manufacturer || app.manufacturer || 'Approved Manufacturer',
      model: inst?.model || app.model || 'Standard Model',
      serialNumber: inst?.serialNumber || app.serialNumber || `SN-${Date.now().toString().slice(-6)}`,
      capacity: inst?.capacity || app.capacity || 'Standard Capacity',
      accuracyClass: inst?.accuracyClass || app.accuracyClass || 'Class III (Medium)',
      verifiedBy: app.assignedOfficer || 'Priya Singh (LMO-JHK-018)',
      verificationCentre: 'Jharkhand State Legal Metrology Division • Dhanbad District Desk'
    };

    const newCert = await api.generateCertificate(certData);

    setCertificates((prev) => {
      const exists = prev.some((c) => c.certificateNumber === newCert.certificateNumber);
      if (exists) {
        return prev.map((c) => (c.certificateNumber === newCert.certificateNumber ? newCert : c));
      }
      return [newCert, ...prev];
    });

    // Update application state
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === applicationId) {
          const updatedTimeline = a.timeline ? [...a.timeline] : [];
          const certIdx = updatedTimeline.findIndex((s) => s.step.includes('Certificate'));
          if (certIdx >= 0) {
            updatedTimeline[certIdx] = {
              ...updatedTimeline[certIdx],
              completed: true,
              date: `${newCert.certificateNumber} Generated`,
              actor: 'LegalMetrix Core Engine'
            };
          }
          return {
            ...a,
            status: 'VERIFIED',
            certificateId: newCert.certificateNumber,
            timeline: updatedTimeline
          };
        }
        return a;
      })
    );

    // Update instrument status
    setInstruments((prev) =>
      prev.map((instItem) => {
        if (instItem.id === app.instrumentId) {
          return {
            ...instItem,
            status: 'VERIFIED',
            certificateId: newCert.certificateNumber,
            expiryDate: newCert.validUntil
          };
        }
        return instItem;
      })
    );

    addAuditLog(
      'Digital Certificate Generated',
      'LegalMetrix Cryptographic Engine',
      newCert.certificateNumber,
      `Issued for ${app.businessName} (${newCert.instrumentId}). SHA-256 seal: ${newCert.sealHash?.substring(0, 16)}... Valid until ${newCert.validUntil}.`,
      'system',
      'CERTIFICATE_ISSUED'
    );

    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: 'Digital Certificate Issued',
      message: `Certificate ${newCert.certificateNumber} generated for ${app.instrumentName}. QR seal ready for public lookup.`,
      timestamp: 'Just now',
      read: false,
      priority: 'high',
      role: 'business'
    };
    setNotifications((prev) => [notif, ...prev]);

    return newCert;
  };

  // 6. Submit Inspection Decision (Online or Offline-Aware)
  const submitInspectionDecision = async (applicationId, decision, inspectionDetails = {}) => {
    // If offline, save locally
    if (isOffline) {
      recordLocalInspectionChange();
      try {
        const cachedKey = `lm_offline_inspection_${applicationId}`;
        const offlineDraft = {
          applicationId,
          decision,
          inspectionDetails,
          cachedAt: new Date().toISOString()
        };
        localStorage.setItem(cachedKey, JSON.stringify(offlineDraft));
      } catch (e) {
        console.error('Failed to cache offline inspection', e);
      }

      addAuditLog(
        'Offline Inspection Saved Locally',
        inspectionDetails.officerName || 'Rajesh Sharma (LMO-DEL-042)',
        applicationId,
        `Field inspection (${decision}) saved to device local cache while offline. Awaiting connection restore to sync.`,
        'lmo',
        'INSPECTION_OFFLINE_CACHED'
      );

      return {
        offline: true,
        applicationId,
        decision,
        message: 'Inspection saved locally in offline storage. Reconnect to sync.'
      };
    }

    // Online execution
    const inspectionResult = {
      decision,
      officerName: inspectionDetails.officerName || 'Priya Singh (LMO-JHK-018)',
      officerId: inspectionDetails.officerId || 'LMO-JHK-018',
      date: new Date().toISOString().split('T')[0],
      ...inspectionDetails
    };

    await completeInspection(applicationId, inspectionResult);

    if (decision === 'PASS' || decision === 'Pass') {
      const newCert = await generateCertificate(applicationId);
      return {
        pass: true,
        offline: false,
        certificateId: newCert?.certificateNumber || null,
        certificate: newCert,
        isDemo: true
      };
    } else {
      return {
        pass: false,
        offline: false,
        message: `Inspection recorded as ${decision}.`
      };
    }
  };

  // 7. Offline Simulator Controls
  const toggleOffline = () => {
    setIsOffline((prev) => !prev);
  };

  const recordLocalInspectionChange = () => {
    setPendingSyncCount((c) => c + 1);
  };

  const syncOfflineData = async () => {
    setIsSyncing(true);
    await new Promise((r) => setTimeout(r, 900));

    // Check for cached offline inspections
    try {
      const offlineKeys = Object.keys(localStorage).filter((k) =>
        k.startsWith('lm_offline_inspection_')
      );
      for (const key of offlineKeys) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const draft = JSON.parse(raw);
          if (draft && draft.applicationId) {
            const isPass = draft.decision === 'PASS' || draft.decision === 'Pass';
            await completeInspection(draft.applicationId, {
              decision: draft.decision,
              officerName: draft.inspectionDetails?.officerName || 'Priya Singh (LMO-JHK-018)',
              officerId: draft.inspectionDetails?.officerId || 'LMO-JHK-018',
              date: new Date().toISOString().split('T')[0],
              ...draft.inspectionDetails
            });
            if (isPass) {
              await generateCertificate(draft.applicationId);
            }
          }
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      console.error('Error during offline sync processing', e);
    }

    setIsSyncing(false);
    setIsOffline(false);
    setPendingSyncCount(0);
    setSyncSuccessMsg(true);
    setTimeout(() => setSyncSuccessMsg(false), 3500);

    addAuditLog(
      'Offline Data Synchronized',
      'LMO Mobile Client (Rajesh Sharma)',
      'OFFLINE-SYNC',
      'Locally cached field inspection checkpoints & measurements synced to cloud ledger with valid GPS signature.',
      'lmo',
      'OFFLINE_SYNC_COMPLETED'
    );
  };

  // Reset Demo to fresh state
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.INSTRUMENTS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATES);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.GATC_TESTS);
    Object.keys(localStorage)
      .filter((k) => k.startsWith('lm_offline_inspection_'))
      .forEach((k) => localStorage.removeItem(k));
    setInstruments(INITIAL_INSTRUMENTS);
    setApplications(INITIAL_APPLICATIONS);
    setCertificates(INITIAL_CERTIFICATES);
    setGatcTests(INITIAL_GATC_TESTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setIsOffline(false);
    setPendingSyncCount(0);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        instruments,
        applications,
        certificates,
        gatcTests,
        setGatcTests,
        auditLogs,
        notifications,
        officers,
        regionalStats,
        // Methods
        registerInstrument,
        submitApplication,
        assignOfficerToApplication,
        completeInspection,
        submitInspectionDecision,
        generateCertificate,
        addAuditLog,
        // Offline
        isOffline,
        pendingSyncCount,
        isSyncing,
        syncSuccessMsg,
        toggleOffline,
        recordLocalInspectionChange,
        syncOfflineData,
        // Presentation Guide
        showDemoGuide,
        setShowDemoGuide,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
