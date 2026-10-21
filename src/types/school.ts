export type UserRole = 'student' | 'parent' | 'teacher' | 'admin';

export type SchoolStage = 'primary' | 'middle' | 'high'; // Primary: Gr 1-5, Middle: Gr 6-8, High: Gr 9-12

export interface Student {
  id: string;
  name: string;
  avatar: string;
  grade: number; // 1 - 12
  section: string;
  rollNumber: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  emergencyContact: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  attendanceRate: number; // e.g. 96.4
  currentGpa: number; // 3.88
  houseOrHomeroom: string;
  busRoute?: string;
  busStatus?: 'Boarded' | 'In Transit' | 'Dropped Off' | 'Not Using';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: number;
  section: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remark?: string;
  recordedBy: string;
  time: string;
}

export interface SubjectGrade {
  subject: string;
  code: string;
  teacher: string;
  score: number; // 0-100
  letterGrade: string; // A+, A, B, etc.
  credits: number;
  comments: string;
  term: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  grade: number;
  teacherName: string;
  dueDate: string;
  dueTime: string;
  status: 'pending' | 'submitted' | 'graded';
  obtainedScore?: number;
  totalScore: number;
  description: string;
}

export interface FeeInvoice {
  id: string;
  studentId: string;
  studentName: string;
  grade: number;
  term: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'due' | 'overdue';
  description: string;
  paidDate?: string;
  receiptNumber?: string;
  paymentMethod?: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface NoticeAnnouncement {
  id: string;
  title: string;
  category: 'Urgent' | 'Academic' | 'Event' | 'Sports' | 'Holiday';
  date: string;
  targetAudience: 'All' | 'High School' | 'Parents' | 'Teachers';
  content: string;
  sender: string;
}

export interface ChatMessage {
  id: string;
  senderRole: 'parent' | 'teacher';
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

// SRS Specific Types
export interface FunctionalRequirement {
  id: string;
  category: 'Academics' | 'Attendance' | 'Grading' | 'Communication' | 'Finance' | 'Safety & Transport' | 'Security & RBAC' | 'Administration';
  title: string;
  description: string;
  priority: 'Must Have' | 'Should Have' | 'Could Have';
  applicableRoles: UserRole[];
  gradeLevels: string; // e.g., "Grades 1-12", "Grades 9-12 (High School)"
  acceptanceCriteria: string[];
}

export interface NonFunctionalRequirement {
  id: string;
  category: 'Performance' | 'Security & Compliance' | 'Availability & Offline' | 'Scalability' | 'Accessibility & Usability' | 'Interoperability';
  title: string;
  metric: string;
  specification: string;
  standardReference: string; // e.g., "FERPA / COPPA / GDPR Art 8", "WCAG 2.1 AA", "ISO 27001"
}

export interface UseCaseItem {
  id: string;
  name: string;
  actor: 'Administrator' | 'Teacher' | 'Parent' | 'Student' | 'Accountant' | 'System';
  preconditions: string;
  primaryFlow: string[];
  alternativeFlow?: string[];
  postconditions: string;
  relatedModule: string;
}

export interface SequenceStep {
  step: number;
  from: string;
  to: string;
  action: string;
  type: 'sync' | 'async' | 'return';
  detail: string;
}

export interface SequenceDiagramFlow {
  id: string;
  title: string;
  description: string;
  participants: string[];
  steps: SequenceStep[];
}

export interface DesignPatternItem {
  name: string;
  type: 'Architectural' | 'Creational' | 'Structural' | 'Behavioral';
  problemStatement: string;
  solution: string;
  schoolContextExample: string;
  codeSnippet: string;
}
