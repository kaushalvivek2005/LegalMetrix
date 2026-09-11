// LegalMetrix - Department of Consumer Affairs (DoCA)
// Service API layer ready for FastAPI REST integration
// Uses local simulated state and latency for realistic government UX

import {
  INITIAL_INSTRUMENTS,
  INITIAL_APPLICATIONS,
  INITIAL_CERTIFICATES,
  AVAILABLE_OFFICERS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData.js';

// Helper to simulate slight network roundtrip if needed
const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Instruments
  async getInstruments() {
    await delay(50);
    return [...INITIAL_INSTRUMENTS];
  },

  async createInstrument(data) {
    await delay(100);
    const newId = `LM-INST-2026-${String(Math.floor(Math.random() * 90000) + 10000).substring(0, 5)}`;
    const newInstrument = {
      id: newId,
      status: "Registered - Ready to Apply",
      ...data
    };
    return newInstrument;
  },

  // Applications
  async getApplications() {
    await delay(50);
    return [...INITIAL_APPLICATIONS];
  },

  async createApplication(appData) {
    await delay(150);
    const newAppId = `LM-APP-2026-${String(Math.floor(Math.random() * 90000) + 10000).substring(0, 5)}`;
    const dateStr = new Date().toISOString().split('T')[0];
    const newApplication = {
      id: newAppId,
      submittedDate: dateStr,
      status: "Submitted",
      assignedOfficer: "Unassigned",
      timeline: [
        { step: "Application Submitted", date: `${dateStr}, Just Now`, completed: true, actor: "Business User" },
        { step: "Document Validation", date: "In Progress", completed: false, actor: "DoCA Verification Cell" },
        { step: "Officer Assignment", date: "Pending", completed: false, actor: "Smart Scheduler" },
        { step: "Inspection Scheduled", date: "Pending", completed: false, actor: "LMO" },
        { step: "Field Inspection", date: "Pending", completed: false, actor: "LMO" },
        { step: "Verification Decision", date: "Pending", completed: false, actor: "LMO" },
        { step: "Certificate Issuance", date: "Pending", completed: false, actor: "System" }
      ],
      ...appData
    };
    return newApplication;
  },

  // Officer Assignment & Smart Scheduling
  async assignOfficer(applicationId, officer) {
    await delay(100);
    return {
      applicationId,
      assignedOfficer: officer.name,
      officerId: officer.id,
      officerRole: officer.role,
      status: "Inspection Scheduled",
      scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      scheduledTime: "11:00 AM"
    };
  },

  // Inspections
  async getInspections() {
    await delay(50);
    return INITIAL_APPLICATIONS.filter(app => app.assignedOfficer && app.assignedOfficer !== "Unassigned");
  },

  async submitInspection(inspectionData) {
    await delay(150);
    return {
      ...inspectionData,
      submittedAt: new Date().toISOString(),
      verifiedGpsMatch: true
    };
  },

  // Certificates
  async generateCertificate(certData) {
    await delay(150);
    const certNumber = `LM-CERT-2026-${String(Math.floor(Math.random() * 90000) + 10000).substring(0, 5)}`;
    const now = new Date();
    const oneYearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    
    const newCert = {
      certificateNumber: certNumber,
      verificationDate: now.toISOString().split('T')[0],
      validUntil: oneYearLater.toISOString().split('T')[0],
      status: "VERIFIED & ACTIVE",
      sealHash: Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      securityHash: `DOCA-LM-SHA256-${Math.floor(10000000 + Math.random() * 90000000)}`,
      qrPayload: `https://legalmetrix.gov.in/verify?cert=${certNumber}`,
      isDemo: true,
      ...certData
    };
    return newCert;
  },

  // Public Verification
  async verifyCertificate(certificateNumber, certificatesList = INITIAL_CERTIFICATES) {
    await delay(200);
    const cleanId = (certificateNumber || '').trim().toUpperCase();
    const found = certificatesList.find(c => 
      c.certificateNumber.toUpperCase() === cleanId || 
      c.instrumentId.toUpperCase() === cleanId
    );
    return found || null;
  },

  // Audit Logs
  async getAuditLogs() {
    await delay(50);
    return [...INITIAL_AUDIT_LOGS];
  }
};
