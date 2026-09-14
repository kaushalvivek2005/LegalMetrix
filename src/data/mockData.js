// LegalMetrix - Department of Consumer Affairs (DoCA)
// Master reference data for LegalMetrix Platform
// Strictly controlled 2-instrument connected demo dataset

export const INITIAL_INSTRUMENTS = [
  {
    id: "LM-WM-2026-001",
    name: "Electronic Weighing Scale",
    type: "Commercial NAWI (Class III)",
    category: "Commercial NAWI",
    capacity: "30 kg (e = 5g)",
    accuracyClass: "Class III (Medium)",
    manufacturer: "Essae-Teraoka Ltd.",
    model: "Essae DS-852",
    serialNumber: "ES-2025-9941",
    businessName: "Sharma Retail & Wholesale",
    location: "Sakchi Market, Jamshedpur, Jharkhand",
    jurisdiction: "Jamshedpur Zone, Jharkhand",
    status: "VERIFIED",
    certificateId: "LM-CERT-2026-001",
    previousCertificateNumber: "LM-CERT-2026-001",
    lastVerificationDate: "2026-08-10",
    expiryDate: "2027-08-09",
    applicationId: "APP-2026-001"
  },
  {
    id: "LM-WM-2026-002",
    name: "Platform Weighing Scale",
    type: "Commercial Heavy Platform Scale",
    category: "Platform Scale",
    capacity: "300 kg (e = 50g)",
    accuracyClass: "Class III (Medium)",
    manufacturer: "Avery Weigh-Tronix",
    model: "Avery H305 Platform",
    serialNumber: "AV-2026-7782",
    businessName: "Singh Grain Traders",
    location: "Bank More, Dhanbad, Jharkhand",
    jurisdiction: "Dhanbad Zone, Jharkhand",
    status: "INSPECTION SCHEDULED",
    certificateId: null,
    previousCertificateNumber: null,
    lastVerificationDate: "2025-09-12",
    expiryDate: "2026-09-11 (Re-verification in progress)",
    applicationId: "APP-2026-002"
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: "APP-2026-001",
    instrumentId: "LM-WM-2026-001",
    instrumentName: "Electronic Weighing Scale",
    instrumentType: "Commercial NAWI (Class III)",
    businessName: "Sharma Retail & Wholesale",
    location: "Sakchi Market, Jamshedpur, Jharkhand",
    jurisdiction: "Jamshedpur Zone, Jharkhand",
    status: "VERIFIED",
    verificationType: "Periodic Re-verification & Stamping",
    submittedDate: "2026-08-01",
    scheduledDate: "2026-08-10",
    scheduledTime: "10:30 AM",
    assignedOfficer: "Rajesh Kumar (LMO-JHK-012)",
    officerId: "LMO-JHK-012",
    officerName: "Rajesh Kumar",
    certificateId: "LM-CERT-2026-001",
    feeAmount: 1250,
    paymentStatus: "Paid",
    timeline: [
      { step: "Application Submitted", date: "2026-08-01", completed: true, actor: "Sharma Retail & Wholesale" },
      { step: "Document Validation", date: "2026-08-02", completed: true, actor: "DoCA Verification Cell" },
      { step: "Officer Assignment", date: "2026-08-03", completed: true, actor: "Smart Scheduler" },
      { step: "Inspection Scheduled", date: "2026-08-05", completed: true, actor: "Rajesh Kumar" },
      { step: "Field Inspection", date: "2026-08-10", completed: true, actor: "Rajesh Kumar" },
      { step: "Verification Decision", date: "PASS - 2026-08-10", completed: true, actor: "Rajesh Kumar" },
      { step: "Certificate Issuance", date: "LM-CERT-2026-001 Generated", completed: true, actor: "LegalMetrix Core Engine" }
    ]
  },
  {
    id: "APP-2026-002",
    instrumentId: "LM-WM-2026-002",
    instrumentName: "Platform Weighing Scale",
    instrumentType: "Commercial Heavy Platform Scale",
    businessName: "Singh Grain Traders",
    location: "Bank More, Dhanbad, Jharkhand",
    jurisdiction: "Dhanbad Zone, Jharkhand",
    status: "INSPECTION SCHEDULED",
    verificationType: "Periodic Re-verification & Stamping",
    submittedDate: "2026-09-02",
    scheduledDate: "2026-09-15",
    scheduledTime: "11:30 AM",
    assignedOfficer: "Priya Singh (LMO-JHK-018)",
    officerId: "LMO-JHK-018",
    officerName: "Priya Singh",
    certificateId: null,
    feeAmount: 1850,
    paymentStatus: "Paid",
    timeline: [
      { step: "Application Submitted", date: "2026-09-02", completed: true, actor: "Singh Grain Traders" },
      { step: "Document Validation", date: "2026-09-03", completed: true, actor: "DoCA Verification Cell" },
      { step: "Officer Assignment", date: "2026-09-05", completed: true, actor: "Smart Scheduler" },
      { step: "Inspection Scheduled", date: "2026-09-15, 11:30 AM", completed: true, actor: "Priya Singh" },
      { step: "Field Inspection", date: "Scheduled for 2026-09-15", completed: false, actor: "Priya Singh" },
      { step: "Verification Decision", date: "Pending Field Audit", completed: false, actor: "Priya Singh" },
      { step: "Certificate Issuance", date: "Pending Verification Pass", completed: false, actor: "System" }
    ]
  }
];

export const INITIAL_CERTIFICATES = [
  {
    certificateNumber: "LM-CERT-2026-001",
    instrumentId: "LM-WM-2026-001",
    instrumentName: "Electronic Weighing Scale",
    instrumentType: "Commercial Non-Automatic Weighing Instrument (Class III)",
    businessName: "Sharma Retail & Wholesale",
    location: "Sakchi Market, Jamshedpur, Jharkhand",
    manufacturer: "Essae-Teraoka Ltd.",
    model: "Essae DS-852",
    serialNumber: "ES-2025-9941",
    capacity: "30 kg (e = 5g)",
    accuracyClass: "Class III (Medium)",
    verificationDate: "2026-08-10",
    validUntil: "2027-08-09",
    status: "ACTIVE",
    result: "PASS",
    verifiedBy: "Rajesh Kumar (LMO-JHK-012)",
    verificationAuthority: "Legal Metrology Enforcement Directorate, Jharkhand State",
    verificationCentre: "Jharkhand State Legal Metrology Division • Jamshedpur Desk",
    sealHash: "7c89f21d3e45ba0987ef1234567890abcdef1234",
    securityHash: "DOCA-LM-SHA256-77192840",
    qrPayload: "https://legalmetrix.gov.in/verify?cert=LM-CERT-2026-001",
    isDemo: true
  }
];

export const INITIAL_GATC_TESTS = [
  {
    id: "GATC-TASK-2026-002",
    instrumentId: "LM-WM-2026-002",
    applicationId: "APP-2026-002",
    instrumentName: "Platform Weighing Scale",
    businessName: "Singh Grain Traders",
    assignedOfficer: "Priya Singh (LMO-JHK-018)",
    taskType: "Working Standard Weight Set Verification Support",
    standardType: "NPL-Traceable M1 Class Weights (50 kg Set)",
    status: "SCHEDULED",
    scheduledDate: "2026-09-15",
    location: "Bank More, Dhanbad, Jharkhand",
    labNode: "GATC-JHK-002 (Dhanbad)"
  }
];

export const AVAILABLE_OFFICERS = [
  {
    id: "LMO-JHK-018",
    name: "Priya Singh",
    role: "Legal Metrology Officer (LMO)",
    jurisdiction: "Dhanbad & Bokaro Zone",
    district: "Dhanbad, Jharkhand",
    distanceKm: 2.4,
    currentWorkload: 1,
    activeWorkload: 1,
    completedInspections: 142,
    availability: "Available",
    matchScore: 98,
    activeInspectionsToday: 1,
    phone: "+91 94311 88204",
    email: "priya.singh.lmo@doca.gov.in"
  },
  {
    id: "LMO-JHK-012",
    name: "Rajesh Kumar",
    role: "Legal Metrology Officer (LMO)",
    jurisdiction: "Jamshedpur Zone",
    district: "East Singhbhum, Jharkhand",
    distanceKm: 4.8,
    currentWorkload: 2,
    activeWorkload: 2,
    completedInspections: 198,
    availability: "Available",
    matchScore: 95,
    activeInspectionsToday: 1,
    phone: "+91 94313 77192",
    email: "rajesh.kumar.lmo@doca.gov.in"
  },
  {
    id: "GATC-JHK-002",
    name: "Dhanbad GATC Regional Calibration Lab",
    role: "Government Approved Test Centre (GATC)",
    jurisdiction: "Coalfield Belt / Dhanbad",
    district: "Bank More, Dhanbad",
    distanceKm: 3.1,
    currentWorkload: 1,
    activeWorkload: 1,
    completedInspections: 86,
    availability: "Available",
    matchScore: 96,
    activeInspectionsToday: 1,
    phone: "+91 326 2309112",
    email: "gatc.dhanbad@doca.gov.in"
  }
];

export const REGIONAL_DATA = [
  { region: "Jharkhand (Dhanbad & Jamshedpur)", registered: 2, active: 1, pending: 1, lmos: 2, complianceRate: 100 }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "AUD-2026-008",
    action: "Inspection Scheduled",
    actor: "Priya Singh (LMO-JHK-018)",
    target: "APP-2026-002",
    timestamp: "2026-09-05 14:15:00",
    details: "Field inspection scheduled for LM-WM-2026-002 on 2026-09-15 at 11:30 AM.",
    category: "lmo",
    hash: "0x4a91c83b12"
  },
  {
    id: "AUD-2026-007",
    action: "LMO Assigned via Smart Scheduler",
    actor: "Admin / Smart Scheduling Engine",
    target: "APP-2026-002",
    timestamp: "2026-09-05 11:00:00",
    details: "Assigned officer Priya Singh (LMO-JHK-018) for Platform Weighing Scale in Dhanbad.",
    category: "scheduling",
    hash: "0x7b12e48f90"
  },
  {
    id: "AUD-2026-006",
    action: "Application Submitted",
    actor: "Singh Grain Traders",
    target: "APP-2026-002",
    timestamp: "2026-09-02 10:20:00",
    details: "Verification application submitted for LM-WM-2026-002. Statutory fee ₹1,850 recorded.",
    category: "business",
    hash: "0x9c33d16a55"
  },
  {
    id: "AUD-2026-005",
    action: "Instrument Registered",
    actor: "Singh Grain Traders",
    target: "LM-WM-2026-002",
    timestamp: "2026-09-01 16:45:00",
    details: "Platform Weighing Scale registered in Dhanbad Zone registry.",
    category: "business",
    hash: "0x2d88c31e44"
  },
  {
    id: "AUD-2026-004",
    action: "Digital Certificate Issued",
    actor: "LegalMetrix Cryptographic Engine",
    target: "LM-CERT-2026-001",
    timestamp: "2026-08-10 12:30:00",
    details: "Issued verification certificate LM-CERT-2026-001 for Sharma Retail & Wholesale (LM-WM-2026-001). SHA-256 seal generated.",
    category: "system",
    hash: "0x3e45baef12"
  },
  {
    id: "AUD-2026-003",
    action: "Field Inspection Passed",
    actor: "Rajesh Kumar (LMO-JHK-012)",
    target: "APP-2026-001",
    timestamp: "2026-08-10 11:45:00",
    details: "Physical verification and MPE tolerances verified for Electronic Weighing Scale. Decision: PASS.",
    category: "lmo",
    hash: "0x6f11a29d01"
  },
  {
    id: "AUD-2026-002",
    action: "Application Submitted",
    actor: "Sharma Retail & Wholesale",
    target: "APP-2026-001",
    timestamp: "2026-08-01 09:30:00",
    details: "Periodic verification application lodged with statutory fee payment.",
    category: "business",
    hash: "0x8a77b42c90"
  },
  {
    id: "AUD-2026-001",
    action: "Instrument Registered",
    actor: "Sharma Retail & Wholesale",
    target: "LM-WM-2026-001",
    timestamp: "2026-07-28 15:10:00",
    details: "Electronic Weighing Scale registered in Jamshedpur Zone master database.",
    category: "business",
    hash: "0x1b22f97a33"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-001",
    title: "Inspection Scheduled",
    message: "Inspection for Platform Weighing Scale (LM-WM-2026-002) is scheduled for 2026-09-15 at 11:30 AM with LMO Priya Singh.",
    timestamp: "2 hours ago",
    read: false,
    priority: "high",
    role: "business"
  },
  {
    id: "NOTIF-002",
    title: "Field Inspection Today",
    message: "You have 1 scheduled inspection today at Singh Grain Traders, Bank More, Dhanbad for LM-WM-2026-002.",
    timestamp: "1 hour ago",
    read: false,
    priority: "high",
    role: "lmo"
  },
  {
    id: "NOTIF-003",
    title: "Standards Support Assigned",
    message: "Working standard weights (50 kg M1) allocated for field verification support in Dhanbad.",
    timestamp: "3 hours ago",
    read: false,
    priority: "medium",
    role: "gatc"
  }
];

