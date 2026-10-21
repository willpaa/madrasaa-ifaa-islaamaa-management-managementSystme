import { 
  FunctionalRequirement, 
  NonFunctionalRequirement, 
  UseCaseItem, 
  SequenceDiagramFlow, 
  DesignPatternItem 
} from '../types/school';

export const SRS_METADATA = {
  documentTitle: "Software Requirements Specification (SRS) & Architecture Blueprint",
  systemName: "EduPulse K-12 Mobile School Management System (SMS)",
  version: "v3.2.0 - Production Specification",
  standard: "ISO/IEC/IEEE 29148:2018 Systems & Software Engineering Standard",
  targetAudience: "School Boards, Software Architects, Mobile Engineers, School Administrators, K-12 Educators",
  gradeScope: "Grades 1 through 12 (Elementary 1-5, Middle School 6-8, High School 9-12)",
  lastUpdated: "Academic Year 2026-2027"
};

export const REQUIREMENTS_GATHERING_METHODOLOGY = {
  phases: [
    {
      step: 1,
      title: "1. Stakeholder Discovery & Persona Elicitation",
      description: "Direct interviews with School Principals, Grade 1-12 Headteachers, Parents (both working & non-working), District IT, and High School Students.",
      deliverables: ["User Persona Profiles", "Empathy Maps", "Daily School Routine Journey Maps"]
    },
    {
      step: 2,
      title: "2. Global K-12 Comparative Field Study",
      description: "Surveyed regulations across North America (FERPA/COPPA/State standards), UK/Commonwealth (Ofsted, GCSE/A-Levels), International Baccalaureate (PYP/MYP/DP), and Asian school models (CBSE/ICSE/MOE).",
      deliverables: ["Global Grade Equivalency Matrix", "Regulatory Compliance Checklist", "Curriculum Grading Differential"]
    },
    {
      step: 3,
      title: "3. Workflow Modeling & Bottleneck Analysis",
      description: "Mapped critical time-sensitive paths: Morning 7:45 AM attendance rush, Report card generation periods, End-of-month tuition fee collections, and Emergency lockdown broadcasts.",
      deliverables: ["BPMN 2.0 Process Diagrams", "Peak Load Concurrency Models", "Offline Vulnerability Audit"]
    },
    {
      step: 4,
      title: "4. Requirements Formalization & MoSCoW Prioritization",
      description: "Structured requirements into traceable Functional (FR) and Non-Functional (NFR) matrices with strict verification criteria.",
      deliverables: ["Requirements Traceability Matrix (RTM)", "Acceptance Test Criteria", "Safety & Privacy Impact Assessment (DPIA)"]
    },
    {
      step: 5,
      title: "5. Architectural Prototyping & Iteration",
      description: "Constructed Clean Architecture + MVVM mobile prototypes, evaluated mobile battery/data footprints, and validated usability with elementary school parents.",
      deliverables: ["Interactive Prototype", "System Sequence Diagrams", "REST/GraphQL & Offline Sync Schemas"]
    }
  ]
};

export const GLOBAL_GRADE_TAXONOMY = [
  {
    stage: "Primary / Elementary Education",
    grades: "Grade 1 to Grade 5 (Ages 6 - 11)",
    focus: "Foundational Literacy, Numeracy, Social-Emotional Learning & Child Safety",
    appCharacteristics: [
      "Parent-centric interface: Grade 1-3 students do not carry phones; parents manage all check-ins, homework, and permissions.",
      "Visual badge rewards, gold stars, and qualitative teacher feedback over harsh numerical ranks.",
      "Strict real-time bus tracking and geo-fenced authorized guardian pickup verification (QR / PIN code).",
      "Daily health/dietary monitoring: Lunch allergies, nap times (Grade 1), and incident slips."
    ]
  },
  {
    stage: "Middle School / Junior Secondary",
    grades: "Grade 6 to Grade 8 (Ages 11 - 14)",
    focus: "Subject Specialization, Formative Assessments, Developing Independence",
    appCharacteristics: [
      "Student digital access: Students receive their own login with restricted social features and controlled screen time.",
      "Multi-teacher schedule: Timetable transitions across distinct classrooms, lockers, and subject specialists.",
      "Homework & Project deadlines tracker with push notifications 24 hours prior to submission.",
      "Extracurricular club enrollment, sports team attendance, and house points/conduct logging."
    ]
  },
  {
    stage: "High School / Senior Secondary",
    grades: "Grade 9 to Grade 12 (Ages 14 - 18)",
    focus: "Academic Rigor, Weighted GPA, College/University Prep, Transcripts & Career Paths",
    appCharacteristics: [
      "Comprehensive GPA engine: Handles Weighted/Unweighted GPA, AP/IB points, Honor rolls, and graduation credits.",
      "Self-directed attendance: Period-by-period class attendance tracking with excuse letter upload by student/parent.",
      "Standardized exam registration (SAT, ACT, IB Diploma, AP, National Board exams) and digital hall tickets.",
      "Transcript generation, recommendation letter request portal, and direct counselor messaging."
    ]
  }
];

export const FUNCTIONAL_REQUIREMENTS: FunctionalRequirement[] = [
  {
    id: "FR-01",
    category: "Security & RBAC",
    title: "Multi-Role Granular Authentication & Biometrics",
    description: "The system shall provide secure authentication for 5 distinct roles (Super Admin, Principal, Teacher, Student, Parent) with biometric (FaceID/Fingerprint) and SSO support.",
    priority: "Must Have",
    applicableRoles: ["admin", "teacher", "student", "parent"],
    gradeLevels: "Grades 1-12",
    acceptanceCriteria: [
      "Users can authenticate via email/phone OTP, OAuth (Google/Microsoft Workspace), or Biometric passkey.",
      "JWT tokens must expire after 15 minutes of inactivity with seamless refresh token rotation.",
      "Role-based UI guards ensure students cannot view unreleased exam rubrics or other students' disciplinary records."
    ]
  },
  {
    id: "FR-02",
    category: "Attendance",
    title: "Period & Daily One-Tap Attendance Marking",
    description: "Teachers shall be able to record class attendance in under 30 seconds for 40 students with options: Present, Absent, Late, or Excused.",
    priority: "Must Have",
    applicableRoles: ["teacher", "admin"],
    gradeLevels: "Grades 1-12",
    acceptanceCriteria: [
      "Default state pre-fills all students as 'Present' to minimize tapping.",
      "Bulk mark controls (Mark All Present, Mark Selected) must function offline.",
      "Submissions sync to server with timestamp and teacher digital signature."
    ]
  },
  {
    id: "FR-03",
    category: "Attendance",
    title: "Automated Instant Parent Absence Alert Flow",
    description: "Upon a teacher submitting an 'Absent' or 'Late' record, an automated push notification and SMS shall dispatch to registered parent devices within 60 seconds.",
    priority: "Must Have",
    applicableRoles: ["parent", "admin"],
    gradeLevels: "Grades 1-12 (Critical for Gr 1-8)",
    acceptanceCriteria: [
      "Notification specifies exact student name, time of absence, and subject/homeroom.",
      "Parents can submit one-tap acknowledgment or upload a medical excuse note directly from the alert.",
      "Principal dashboard flags unexcused consecutive 3-day absences automatically."
    ]
  },
  {
    id: "FR-04",
    category: "Grading",
    title: "Multi-Curriculum Grading Engine & Weighted GPA",
    description: "The grading subsystem shall calculate cumulative Weighted GPA (4.0/5.0 scale), Letter Grades (A+ to F), and IB/CBSE marks based on configurable school grade schemes.",
    priority: "Must Have",
    applicableRoles: ["teacher", "student", "parent", "admin"],
    gradeLevels: "Grades 6-12 (Middle & High School)",
    acceptanceCriteria: [
      "Supports grade categories (Homework 20%, Quizzes 30%, Midterm 20%, Final Exam 30%).",
      "Calculates instantaneous student class rank (if enabled) and cumulative credit hours.",
      "Provides what-if grade calculator for high school students to forecast exam requirements."
    ]
  },
  {
    id: "FR-05",
    category: "Grading",
    title: "Digital Report Card Generation with Digital Watermark",
    description: "The system shall compile term report cards into downloadable, cryptographically signed PDF documents featuring teacher remarks and school seal.",
    priority: "Must Have",
    applicableRoles: ["admin", "teacher", "parent", "student"],
    gradeLevels: "Grades 1-12",
    acceptanceCriteria: [
      "Generates PDF in < 2 seconds on mobile with QR code for third-party verification.",
      "Includes visual attendance graph, radar chart of core competencies, and principal endorsement.",
      "Parents can digitally sign acceptance directly on their touch screen."
    ]
  },
  {
    id: "FR-06",
    category: "Academics",
    title: "Assignment Submission & File Attachment Handling",
    description: "Students shall view homework assignments, read attached rubrics, and upload PDF/image homework submissions before the deadline.",
    priority: "Must Have",
    applicableRoles: ["student", "teacher", "parent"],
    gradeLevels: "Grades 4-12",
    acceptanceCriteria: [
      "Supports camera capture with auto-crop for handwritten math/science sheets.",
      "Late submissions flagged automatically with custom percentage penalty.",
      "Teachers can annotate directly on submitted student work using in-app pen tools."
    ]
  },
  {
    id: "FR-07",
    category: "Finance",
    title: "Tuition Invoicing, Installment Plans & Mobile Checkout",
    description: "Parents shall view itemized school fee invoices (Tuition, Lab, Uniform, Meals, Bus) and execute secure in-app payments with instant receipt issuance.",
    priority: "Must Have",
    applicableRoles: ["parent", "admin"],
    gradeLevels: "Grades 1-12",
    acceptanceCriteria: [
      "Integrates with Apple Pay, Google Pay, Credit/Debit Cards, and local banking gateways.",
      "Supports automated partial payment installment schedules.",
      "Generates tax-deductible digital receipt with unique transaction hash."
    ]
  },
  {
    id: "FR-08",
    category: "Safety & Transport",
    title: "Live GPS School Bus Tracking & Boarding Telemetry",
    description: "Parents and school dispatchers shall track school bus location in real time with estimated arrival time (ETA) alerts at designated stops.",
    priority: "Should Have",
    applicableRoles: ["parent", "admin"],
    gradeLevels: "Grades 1-12 (Crucial for Gr 1-5)",
    acceptanceCriteria: [
      "Bus driver app transmits geo-coordinates every 5 seconds.",
      "Student RFID/QR tap logs boarding and disembarking timestamps.",
      "Proximity alert fires when the school bus is within 1.0 km or 5 minutes of home."
    ]
  },
  {
    id: "FR-09",
    category: "Communication",
    title: "Two-Way Direct Parent-Teacher Messaging with Office Hours",
    description: "Encrypted direct communication channel between teachers and parents with enforced off-hours quiet mode to prevent educator burnout.",
    priority: "Must Have",
    applicableRoles: ["parent", "teacher"],
    gradeLevels: "Grades 1-12",
    acceptanceCriteria: [
      "Teachers can set office availability (e.g. 8:00 AM - 4:00 PM weekdays).",
      "Emergency high-priority override channels reserved exclusively for administration.",
      "Supports inline translation for ESL / immigrant families into 40+ languages."
    ]
  },
  {
    id: "FR-10",
    category: "Administration",
    title: "Admissions Pipeline & Student Information System (SIS)",
    description: "Administrators shall manage the full lifecycle of student enrollment from online application, document verification, grade placement, to alumni graduation.",
    priority: "Must Have",
    applicableRoles: ["admin"],
    gradeLevels: "Grades 1-12",
    acceptanceCriteria: [
      "Full digital student dossier: health immunizations, emergency contacts, parent linkage.",
      "Automated roll-number assignment and section capacity balancer (e.g. max 28 students/section).",
      "Seamless annual grade promotion batch job (moving Grade 4 to Grade 5)."
    ]
  },
  {
    id: "FR-11",
    category: "Safety & Transport",
    title: "School Clinic & Health Care Incident Log",
    description: "School nurse shall record student visits, allergy profiles, temperature readings, and medication administration with instantaneous parent notification.",
    priority: "Should Have",
    applicableRoles: ["admin", "teacher", "parent"],
    gradeLevels: "Grades 1-12",
    acceptanceCriteria: [
      "Teachers see prominent allergen badges (e.g., Peanut, Penicillin) on class rosters.",
      "Parents must provide digital authorization before prescription medication can be administered.",
      "Head injury incidents trigger an immediate priority phone call workflow."
    ]
  },
  {
    id: "FR-12",
    category: "Communication",
    title: "Emergency Broadcast & School Closure Alerts",
    description: "Principal can send high-priority push notifications, SMS, and email broadcasts within 30 seconds for snow days, severe weather, or campus emergencies.",
    priority: "Must Have",
    applicableRoles: ["admin", "parent", "teacher", "student"],
    gradeLevels: "Grades 1-12",
    acceptanceCriteria: [
      "Bypasses Do-Not-Disturb device settings for catastrophic priority alerts.",
      "Live acknowledgment rate dashboard showing percentage of parents who read the alert.",
      "Geo-targeted or grade-specific broadcast options (e.g., Grade 10 Science trip delay)."
    ]
  }
];

export const NON_FUNCTIONAL_REQUIREMENTS: NonFunctionalRequirement[] = [
  {
    id: "NFR-01",
    category: "Performance",
    title: "Sub-Second API Response & Morning Concurrency",
    metric: "P95 latency < 250ms, P99 < 500ms under 15,000 requests/second",
    specification: "The mobile app must boot to home screen within 1.2s. Class attendance batch submit for 40 students must complete in under 800ms.",
    standardReference: "Google RAIL Model / High-Performance Mobile SLA"
  },
  {
    id: "NFR-02",
    category: "Security & Compliance",
    title: "Student Privacy & Child Protection Regulations",
    metric: "100% adherence to FERPA, COPPA, and GDPR Article 8",
    specification: "No personal behavioral or grade data may be shared with commercial third-party trackers or ad networks. Verifiable parental consent required for all users under 13.",
    standardReference: "FERPA 34 CFR Part 99 / FTC COPPA Rule / GDPR Art 8"
  },
  {
    id: "NFR-03",
    category: "Security & Compliance",
    title: "Cryptographic Protection & Data-at-Rest Encryption",
    metric: "AES-256-GCM at rest, TLS 1.3 with Certificate Pinning in transit",
    specification: "Student health information, disciplinary notes, and parent payment tokens must be salted and encrypted. Mobile local SQLite storage encrypted with SQLCipher.",
    standardReference: "NIST SP 800-53 / ISO/IEC 27001"
  },
  {
    id: "NFR-04",
    category: "Availability & Offline",
    title: "Offline-First Sync Capability for Classroom Dead Zones",
    metric: "100% core teacher workflows functional with zero connectivity",
    specification: "Teachers can record attendance, input assignment grades, and view rosters in basements/gymnasiums without Wi-Fi. Automatic conflict-free delta sync resumes when back online.",
    standardReference: "CRDT (Conflict-free Replicated Data Types) Offline Sync"
  },
  {
    id: "NFR-05",
    category: "Accessibility & Usability",
    title: "Universal Mobile Accessibility & Dynamic Type",
    metric: "WCAG 2.1 Level AA Compliance & Screen Reader compatibility",
    specification: "Touch targets minimum 48x48dp. Contrast ratio minimum 4.5:1. Seamless support for iOS Dynamic Type and Android font scaling up to 200% for elderly guardians.",
    standardReference: "W3C WCAG 2.1 AA / Section 508 Rehabilitation Act"
  },
  {
    id: "NFR-06",
    category: "Scalability",
    title: "Elastic Scalability for Report Card Day Spikes",
    metric: "Auto-scale from 200 to 50,000 concurrent active mobile sessions in 90 seconds",
    specification: "Backend architecture utilizes containerized microservices and multi-region CDN caching for static academic assets, PDFs, and grade cards.",
    standardReference: "Cloud-Native Infrastructure SLA (99.95% uptime)"
  }
];

export const USE_CASE_CATALOG: UseCaseItem[] = [
  {
    id: "UC-01",
    name: "Take & Submit Daily Class Attendance",
    actor: "Teacher",
    preconditions: "Teacher is authenticated and assigned to the active class roster for the specified period/grade.",
    primaryFlow: [
      "Teacher opens Mobile App and selects 'Grade 10-A Homeroom Attendance'.",
      "System displays sorted roster with all students defaulted to 'Present'.",
      "Teacher taps student 'Sophia Chen' to toggle status to 'Absent' with remark 'Family trip'.",
      "Teacher taps 'Late' for student 'Marcus Miller' with arrival timestamp 8:12 AM.",
      "Teacher hits 'Submit Attendance'. System validates all 32 students accounted for.",
      "System cryptographically signs submission and writes to attendance ledger.",
      "System triggers asynchronous event bus to dispatch Parent Alert workers."
    ],
    alternativeFlow: [
      "Offline Mode: No network detected. Record saved to local encrypted cache. Status badge shows 'Pending Sync (1)'. Sync automatically completes when network returns."
    ],
    postconditions: "Class attendance recorded. Absence notifications routed to respective parents.",
    relatedModule: "Attendance Management Subsystem"
  },
  {
    id: "UC-02",
    name: "View Academic Report Card & Sign Acknowledgment",
    actor: "Parent",
    preconditions: "Parent is linked to registered student; term grades have been published by the Principal.",
    primaryFlow: [
      "Parent receives push notification: 'Term 1 Official Report Card Published for Sophia'.",
      "Parent opens app, enters biometric authentication (Face ID).",
      "Parent inspects overall GPA (3.88), subject breakdown (Math A+, Biology A, History B+).",
      "Parent reviews teacher comments, conduct score, and days absent count.",
      "Parent taps 'Acknowledge & Sign', providing digital signature on canvas.",
      "System generates certified PDF with signature audit stamp and stores receipt."
    ],
    postconditions: "Parent digital signature logged. School registrar status marked as acknowledged.",
    relatedModule: "Grading & Reporting Subsystem"
  },
  {
    id: "UC-03",
    name: "Pay Term Tuition Fees via Mobile Wallet",
    actor: "Parent",
    preconditions: "Tuition invoice generated by Bursar/Finance with active balance.",
    primaryFlow: [
      "Parent navigates to Finance tab; views invoice #INV-2026-089 for $1,250.00.",
      "Parent reviews itemized charges: Tuition ($1,000), STEM Lab ($150), Bus Fee ($100).",
      "Parent selects payment method (Apple Pay / Debit Card).",
      "Payment gateway tokenizes transaction; parent confirms biometric authorization.",
      "Payment gateway returns HTTP 200 OK with transaction reference.",
      "Mobile app displays green success confirmation with printable tax receipt."
    ],
    postconditions: "Student invoice balance decremented to $0.00. Bursar ledger updated.",
    relatedModule: "Fee & Financial Subsystem"
  },
  {
    id: "UC-04",
    name: "Grade Student Assignment with Rubric",
    actor: "Teacher",
    preconditions: "Students have submitted homework files prior to or during evaluation window.",
    primaryFlow: [
      "Teacher selects Assignment: 'Grade 10 Biology - Cellular Mitosis Lab'.",
      "Teacher opens student submission PDF in built-in mobile viewer.",
      "Teacher inputs rubric criteria: Hypothesis (10/10), Methodology (18/20), Analysis (19/20).",
      "Teacher adds constructive voice remark or text note: 'Exceptional diagram detail!'.",
      "Teacher taps 'Publish Grade'. System calculates total 47/50 (94% - Grade A).",
      "Student receives instant grade push notification with feedback."
    ],
    postconditions: "Grade recorded in gradebook and reflected in student's running average.",
    relatedModule: "LMS & Academics Subsystem"
  },
  {
    id: "UC-05",
    name: "Campus-Wide Emergency Broadcast Notification",
    actor: "Administrator",
    preconditions: "Super Admin or Principal credentials with two-factor authorization.",
    primaryFlow: [
      "Principal triggers 'Emergency Alert Mode' in Admin Mobile Portal.",
      "Selects broadcast template: 'Severe Weather / Early Dismissal 1:00 PM'.",
      "Selects audience: 'All Grades 1-12 Parents & Faculty'.",
      "Enters secondary PIN authorization.",
      "System invokes multi-channel dispatcher: Push Notification + High Priority SMS + Voice IVR.",
      "Dashboard renders real-time receipt counter: 92% delivered within 45 seconds."
    ],
    postconditions: "Mass communication dispatched and delivery audit trail archived.",
    relatedModule: "Emergency Communication Subsystem"
  }
];

export const SEQUENCE_DIAGRAMS: SequenceDiagramFlow[] = [
  {
    id: "SEQ-01",
    title: "1. Daily Attendance Marking & Real-Time Parent Notification Flow",
    description: "End-to-end sequence from teacher mobile tap to parent phone alert and offline fallback handling.",
    participants: ["Teacher Mobile App", "API Gateway", "Attendance Service", "Notification Engine", "Parent Mobile App"],
    steps: [
      { step: 1, from: "Teacher Mobile App", to: "API Gateway", action: "POST /api/v1/attendance/batch", type: "sync", detail: "Payload: { classId: '10-A', date: '2026-10-21', absentIds: ['STU-04'] }" },
      { step: 2, from: "API Gateway", to: "Attendance Service", action: "Validate JWT & Teacher Permissions", type: "sync", detail: "Verifies teacher is active homeroom educator" },
      { step: 3, from: "Attendance Service", to: "Attendance Service", action: "Persist to SQL / DB with Audit Hash", type: "sync", detail: "Writes record in ACID transaction" },
      { step: 4, from: "Attendance Service", to: "Notification Engine", action: "Publish Event: student.absent", type: "async", detail: "RabbitMQ/Kafka: { studentId: 'STU-04', parentId: 'PAR-88', time: '08:15' }" },
      { step: 5, from: "Notification Engine", to: "Parent Mobile App", action: "FCM / APNS High-Priority Push", type: "async", detail: "Banner: 'Sophia Chen was marked Absent for Period 1'" },
      { step: 6, from: "Parent Mobile App", to: "API Gateway", action: "POST /api/v1/attendance/acknowledge", type: "sync", detail: "Parent taps 'Medical Excuse Note' with Doctor certificate" },
      { step: 7, from: "Attendance Service", to: "Teacher Mobile App", action: "Update Attendance Roster to 'Excused'", type: "async", detail: "Roster status transitions from Red (Absent) to Amber (Excused)" }
    ]
  },
  {
    id: "SEQ-02",
    title: "2. Exam Gradebook Submission & Automatic Report Card Publication",
    description: "Flow demonstrating grade moderation, weighted GPA calculation, digital watermarking, and publication.",
    participants: ["Teacher", "Grading Service", "GPA Calculation Engine", "Principal / Admin", "Parent / Student"],
    steps: [
      { step: 1, from: "Teacher", to: "Grading Service", action: "Submit Final Term Marks", type: "sync", detail: "Inputs midterm (30%), final (50%), coursework (20%)" },
      { step: 2, from: "Grading Service", to: "GPA Calculation Engine", action: "Compute Weighted GPA & Honor Roll", type: "sync", detail: "Strategy Pattern applied based on school curriculum (AP vs IB vs Standard)" },
      { step: 3, from: "Grading Service", to: "Principal / Admin", action: "Notify: Term Gradebook Ready for Moderation", type: "async", detail: "Admin reviews grade distribution bell curve" },
      { step: 4, from: "Principal / Admin", to: "Grading Service", action: "Sign & Publish Term Report Cards", type: "sync", detail: "Cryptographic HMAC signature affixed to student records" },
      { step: 5, from: "Grading Service", to: "Parent / Student", action: "Push Alert: Official Report Card Ready", type: "async", detail: "PDF compiled with watermark and verified QR link" }
    ]
  },
  {
    id: "SEQ-03",
    title: "3. Student Tuition Fee Payment & Financial Settlement",
    description: "Secure payment flow with payment gateway tokenization, receipt generation, and ledger reconciliation.",
    participants: ["Parent App", "School Core API", "Payment Gateway (Stripe/Apple Pay)", "Banking Ledger", "Bursar Dashboard"],
    steps: [
      { step: 1, from: "Parent App", to: "School Core API", action: "Request Active Fee Invoices", type: "sync", detail: "Fetches itemized tuition, laboratory, and bus dues" },
      { step: 2, from: "Parent App", to: "Payment Gateway (Stripe/Apple Pay)", action: "Tokenize Payment Credentials", type: "sync", detail: "Biometric auth generates encrypted one-time payment token" },
      { step: 3, from: "Payment Gateway (Stripe/Apple Pay)", to: "School Core API", action: "Webhook: payment.succeeded ($1,250)", type: "async", detail: "Secure webhook signature validated" },
      { step: 4, from: "School Core API", to: "Banking Ledger", action: "Post Double-Entry Ledger Entry", type: "sync", detail: "Debit: Cash/Stripe Account, Credit: Student Tuition Revenue" },
      { step: 5, from: "School Core API", to: "Parent App", action: "Issue Digital PDF Tax Receipt", type: "sync", detail: "Displays instant receipt #REC-2026-9902" },
      { step: 6, from: "School Core API", to: "Bursar Dashboard", action: "Update Real-Time Collection Analytics", type: "async", detail: "Increments Daily Collection KPI by $1,250" }
    ]
  }
];

export const DESIGN_PATTERNS: DesignPatternItem[] = [
  {
    name: "Clean Architecture + MVVM (Model-View-ViewModel)",
    type: "Architectural",
    problemStatement: "Mobile applications for schools mix business rules (e.g. attendance validation, GPA formulas) with UI views, leading to brittle code when supporting both iOS and Android or changing backend APIs.",
    solution: "Separates the app into 4 concentric layers: Entities (Domain), Use Cases (Business Logic), Interface Adapters (ViewModels/Repositories), and Frameworks (UI / SQLite / HTTP).",
    schoolContextExample: "The AttendanceViewModel manages UI state (loading, error, list of 32 students), delegating the actual 'MarkStudentAbsentUseCase' to pure domain logic that knows nothing about React/Flutter UI.",
    codeSnippet: `// Domain Entity & UseCase
export class MarkAttendanceUseCase {
  constructor(private attendanceRepo: IAttendanceRepository, private eventBus: IEventBus) {}

  async execute(command: MarkAttendanceCommand): Promise<Result<void>> {
    // 1. Verify business invariants
    if (command.date > new Date()) {
      return Result.fail("Cannot record attendance for future dates.");
    }
    // 2. Persist via repository
    await this.attendanceRepo.saveRecord(command);
    // 3. Emit event for parent notification
    if (command.status === 'absent') {
      await this.eventBus.publish(new StudentAbsentEvent(command.studentId));
    }
    return Result.ok();
  }
}`
  },
  {
    name: "Repository Pattern with Offline-First Cache",
    type: "Structural",
    problemStatement: "Teachers take attendance in concrete school basements or outdoor sports fields with zero cellular connectivity. Dropping data is unacceptable.",
    solution: "A unified StudentRepository mediates between a local encrypted SQLite database and remote REST/GraphQL endpoints, implementing a write-through cache with sync queuing.",
    schoolContextExample: "When teacher marks 30 students, records are immediately committed to local SQLite, and queued in an Outbox table. An OutboxWorker synchronizes with the cloud when Wi-Fi re-establishes.",
    codeSnippet: `export class StudentRepositoryImpl implements IStudentRepository {
  constructor(private localDb: SQLiteDatabase, private remoteApi: SchoolApiClient, private network: NetworkStatus) {}

  async getRosterByGrade(grade: number): Promise<Student[]> {
    if (await this.network.isConnected()) {
      try {
        const remote = await this.remoteApi.fetchRoster(grade);
        await this.localDb.upsertStudents(remote); // Cache locally
        return remote;
      } catch (err) {
        return this.localDb.getStudentsByGrade(grade); // Fallback
      }
    }
    return this.localDb.getStudentsByGrade(grade); // Offline directly
  }
}`
  },
  {
    name: "Observer / Pub-Sub Pattern",
    type: "Behavioral",
    problemStatement: "When a child is marked absent or the school bus reaches a stop, multiple independent consumers (Parent Push Worker, School Nurse alert, Audit Logger, Bursar) need immediate notification without coupling the attendance module.",
    solution: "An asynchronous Event Bus where events (e.g., StudentAbsentEvent, BusArrivalEvent) are broadcasted to registered subscribers.",
    schoolContextExample: "AttendanceModule publishes 'StudentAbsentEvent'. Subscriber A (ParentNotificationWorker) sends an APNs push; Subscriber B (TruancyMonitor) flags repeated absences; Subscriber C (DailyStatsAggregator) updates the Principal's dashboard.",
    codeSnippet: `// Event Bus interface
export class SchoolEventBus {
  private handlers = new Map<string, Function[]>();

  subscribe<T>(eventType: string, handler: (event: T) => void) {
    const list = this.handlers.get(eventType) || [];
    list.push(handler);
    this.handlers.set(eventType, list);
  }

  async publish<T>(eventType: string, event: T) {
    const listeners = this.handlers.get(eventType) || [];
    await Promise.all(listeners.map(fn => fn(event)));
  }
}`
  },
  {
    name: "Strategy Pattern for International Grading Systems",
    type: "Behavioral",
    problemStatement: "Schools globally calculate grades differently: American schools use 4.0/5.0 GPA scales; British/IGCSE schools use A*-G letters; IB schools use 1-7 point criteria; European/Asian boards use percentages or raw marks.",
    solution: "Define a family of grading algorithms behind a standard 'IGradingStrategy' interface, selecting the active strategy dynamically based on school or curriculum configuration.",
    schoolContextExample: "High School Grade 11 AP Biology uses WeightedGpaStrategy (+1.0 bonus for Advanced Placement), while Grade 11 IB uses IBPointsStrategy (1 to 7 with CAS/TOK criteria).",
    codeSnippet: `export interface IGradingStrategy {
  calculate(scores: AssessmentScore[]): GradeResult;
}

export class USWeightedGpaStrategy implements IGradingStrategy {
  calculate(scores: AssessmentScore[]): GradeResult {
    // Calculates 4.0 scale + 0.5 for Honors + 1.0 for AP courses
    let totalPoints = 0, totalCredits = 0;
    for (const s of scores) {
      const base = s.percentage >= 90 ? 4.0 : s.percentage >= 80 ? 3.0 : 2.0;
      const weight = s.isAP ? 1.0 : s.isHonors ? 0.5 : 0.0;
      totalPoints += (base + weight) * s.credits;
      totalCredits += s.credits;
    }
    return { gpa: (totalPoints / totalCredits).toFixed(2), letter: 'A' };
  }
}

export class IBPointsStrategy implements IGradingStrategy {
  calculate(scores: AssessmentScore[]): GradeResult {
    // Computes IB 1-7 criterion bands
    const total = scores.reduce((sum, s) => sum + s.rawScore, 0);
    const band = total >= 40 ? 7 : total >= 34 ? 6 : total >= 28 ? 5 : 4;
    return { gpa: band.toString(), letter: \`IB Band \${band}\` };
  }
}`
  },
  {
    name: "Factory Pattern for Notification Channel Dispatch",
    type: "Creational",
    problemStatement: "Schools need to deliver messages across varying channels depending on recipient preference and urgency: Push notifications for everyday homework, SMS for emergency closures, WhatsApp for developing nations, and Email for formal invoices.",
    solution: "A NotificationServiceFactory that instantiates the correct sender (PushSender, SmsSender, WhatsAppSender, EmailSender) based on user channel preferences and message priority.",
    schoolContextExample: "Emergency campus alert invokes the SMS & Push factories simultaneously, whereas a routine library overdue book notice invokes only the Push notification factory.",
    codeSnippet: `export class NotificationChannelFactory {
  static getDispatcher(channel: 'push' | 'sms' | 'email' | 'whatsapp'): INotificationDispatcher {
    switch(channel) {
      case 'push': return new FCMNotificationDispatcher();
      case 'sms': return new TwilioSmsDispatcher();
      case 'email': return new SendGridEmailDispatcher();
      case 'whatsapp': return new MetaWhatsAppDispatcher();
      default: throw new Error("Unknown notification channel");
    }
  }
}`
  }
];
