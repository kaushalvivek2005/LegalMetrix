import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';

// Public Pages
import LandingPage from './pages/public/LandingPage.jsx';
import CertificateVerification from './pages/public/CertificateVerification.jsx';

// Business Pages
import BusinessDashboard from './pages/business/BusinessDashboard.jsx';
import InstrumentInventory from './pages/business/InstrumentInventory.jsx';
import InstrumentRegistration from './pages/business/InstrumentRegistration.jsx';
import ApplicationWorkflow from './pages/business/ApplicationWorkflow.jsx';
import ApplicationTracking from './pages/business/ApplicationTracking.jsx';
import CertificatesList from './pages/business/CertificatesList.jsx';
import CertificateView from './pages/business/CertificateView.jsx';

// LMO Pages
import LmoDashboard from './pages/lmo/LmoDashboard.jsx';
import AssignedInspections from './pages/lmo/AssignedInspections.jsx';
import FieldInspection from './pages/lmo/FieldInspection.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import SmartScheduling from './pages/admin/SmartScheduling.jsx';
import AuditLogs from './pages/admin/AuditLogs.jsx';
import NationalInstruments from './pages/admin/NationalInstruments.jsx';
import OfficersList from './pages/admin/OfficersList.jsx';
import ComplianceAnalytics from './pages/admin/ComplianceAnalytics.jsx';

// GATC Pages
import GatcDashboard from './pages/gatc/GatcDashboard.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify" element={<CertificateVerification />} />
        <Route path="/certificates/:certId" element={<CertificateView />} />

        {/* Business Routes */}
        <Route path="/business/dashboard" element={<BusinessDashboard />} />
        <Route path="/business/instruments" element={<InstrumentInventory />} />
        <Route path="/business/instruments/new" element={<InstrumentRegistration />} />
        <Route path="/business/applications" element={<ApplicationTracking />} />
        <Route path="/business/applications/new" element={<ApplicationWorkflow />} />
        <Route path="/business/certificates" element={<CertificatesList />} />

        {/* LMO Routes */}
        <Route path="/lmo/dashboard" element={<LmoDashboard />} />
        <Route path="/lmo/inspections" element={<AssignedInspections />} />
        <Route path="/lmo/inspection/:appId" element={<FieldInspection />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/scheduling" element={<SmartScheduling />} />
        <Route path="/admin/audit" element={<AuditLogs />} />
        <Route path="/admin/instruments" element={<NationalInstruments />} />
        <Route path="/admin/users" element={<OfficersList />} />
        <Route path="/admin/analytics" element={<ComplianceAnalytics />} />
        <Route path="/admin/applications" element={<ApplicationTracking />} />
        <Route path="/admin/certificates" element={<CertificatesList />} />

        {/* GATC Routes */}
        <Route path="/gatc/dashboard" element={<GatcDashboard />} />
        <Route path="/gatc/requests" element={<GatcDashboard />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
