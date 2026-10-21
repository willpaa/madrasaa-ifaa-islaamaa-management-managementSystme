import { 
  Student, 
  AttendanceRecord, 
  SubjectGrade, 
  Assignment, 
  FeeInvoice, 
  TimetableSlot, 
  NoticeAnnouncement, 
  ChatMessage 
} from '../types/school';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'STU-101',
    name: 'Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    grade: 10,
    section: 'A',
    rollNumber: '10-A-14',
    dob: '2010-04-12',
    gender: 'Female',
    bloodGroup: 'O+',
    emergencyContact: '+1 (555) 234-8901',
    parentId: 'PAR-88',
    parentName: 'David & Elena Chen',
    parentPhone: '+1 (555) 234-8901',
    parentEmail: 'dchen.family@example.com',
    attendanceRate: 97.2,
    currentGpa: 3.92,
    houseOrHomeroom: 'Newton House (Room 304)',
    busRoute: 'Route 4B - North Hill Expressway',
    busStatus: 'In Transit'
  },
  {
    id: 'STU-102',
    name: 'Leo Chen',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    grade: 3,
    section: 'B',
    rollNumber: '03-B-08',
    dob: '2017-09-24',
    gender: 'Male',
    bloodGroup: 'O+',
    emergencyContact: '+1 (555) 234-8901',
    parentId: 'PAR-88',
    parentName: 'David & Elena Chen',
    parentPhone: '+1 (555) 234-8901',
    parentEmail: 'dchen.family@example.com',
    attendanceRate: 98.8,
    currentGpa: 4.0,
    houseOrHomeroom: 'Curie House (Room 102)',
    busRoute: 'Route 4B - North Hill Expressway',
    busStatus: 'Boarded'
  },
  {
    id: 'STU-103',
    name: 'Marcus Miller',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    grade: 10,
    section: 'A',
    rollNumber: '10-A-21',
    dob: '2010-02-18',
    gender: 'Male',
    bloodGroup: 'A+',
    emergencyContact: '+1 (555) 345-6789',
    parentId: 'PAR-92',
    parentName: 'Sarah Miller',
    parentPhone: '+1 (555) 345-6789',
    parentEmail: 'smiller@example.com',
    attendanceRate: 91.5,
    currentGpa: 3.45,
    houseOrHomeroom: 'Newton House (Room 304)',
    busRoute: 'Route 2A - West Metro',
    busStatus: 'Dropped Off'
  },
  {
    id: 'STU-104',
    name: 'Aisha Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    grade: 10,
    section: 'A',
    rollNumber: '10-A-03',
    dob: '2010-08-05',
    gender: 'Female',
    bloodGroup: 'B+',
    emergencyContact: '+1 (555) 456-7890',
    parentId: 'PAR-93',
    parentName: 'Rajesh & Meera Patel',
    parentPhone: '+1 (555) 456-7890',
    parentEmail: 'rpatel@example.com',
    attendanceRate: 99.1,
    currentGpa: 4.0,
    houseOrHomeroom: 'Newton House (Room 304)',
    busRoute: 'Route 4B - North Hill Expressway',
    busStatus: 'In Transit'
  },
  {
    id: 'STU-105',
    name: 'Ethan Brooks',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    grade: 12,
    section: 'Honor',
    rollNumber: '12-H-05',
    dob: '2008-11-14',
    gender: 'Male',
    bloodGroup: 'AB+',
    emergencyContact: '+1 (555) 567-8901',
    parentId: 'PAR-94',
    parentName: 'Linda Brooks',
    parentPhone: '+1 (555) 567-8901',
    parentEmail: 'lbrooks@example.com',
    attendanceRate: 95.8,
    currentGpa: 3.96,
    houseOrHomeroom: 'Senior Wing (Room 410)',
    busRoute: 'Self Commute / Carpool',
    busStatus: 'Not Using'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'ATT-001',
    studentId: 'STU-101',
    studentName: 'Sophia Chen',
    grade: 10,
    section: 'A',
    date: '2026-10-21',
    status: 'present',
    recordedBy: 'Dr. Evelyn Vance',
    time: '08:05 AM'
  },
  {
    id: 'ATT-002',
    studentId: 'STU-102',
    studentName: 'Leo Chen',
    grade: 3,
    section: 'B',
    date: '2026-10-21',
    status: 'present',
    recordedBy: 'Mrs. Clara Higgins',
    time: '08:10 AM'
  },
  {
    id: 'ATT-003',
    studentId: 'STU-103',
    studentName: 'Marcus Miller',
    grade: 10,
    section: 'A',
    date: '2026-10-21',
    status: 'late',
    remark: 'Traffic delay on 5th Avenue',
    recordedBy: 'Dr. Evelyn Vance',
    time: '08:24 AM'
  },
  {
    id: 'ATT-004',
    studentId: 'STU-104',
    studentName: 'Aisha Patel',
    grade: 10,
    section: 'A',
    date: '2026-10-21',
    status: 'present',
    recordedBy: 'Dr. Evelyn Vance',
    time: '08:00 AM'
  }
];

export const INITIAL_GRADES_SOPHIA: SubjectGrade[] = [
  {
    subject: 'AP Biology',
    code: 'BIO-201',
    teacher: 'Dr. Evelyn Vance',
    score: 96,
    letterGrade: 'A+',
    credits: 4.0,
    comments: 'Superb grasp of cellular biology and laboratory protocols.',
    term: 'Fall Term 2026'
  },
  {
    subject: 'Pre-Calculus Honors',
    code: 'MTH-203',
    teacher: 'Prof. Robert Thorne',
    score: 92,
    letterGrade: 'A',
    credits: 4.0,
    comments: 'Consistent high performer in trigonometric identities.',
    term: 'Fall Term 2026'
  },
  {
    subject: 'World Literature & Rhetoric',
    code: 'ENG-201',
    teacher: 'Ms. Rebecca Ross',
    score: 89,
    letterGrade: 'B+',
    credits: 3.5,
    comments: 'Strong analytical essays; encourage more vocal participation in seminars.',
    term: 'Fall Term 2026'
  },
  {
    subject: 'AP Computer Science A',
    code: 'CSC-301',
    teacher: 'Mr. Alan Rivera',
    score: 98,
    letterGrade: 'A+',
    credits: 4.0,
    comments: 'Outstanding algorithmic thinking and Java OOP design.',
    term: 'Fall Term 2026'
  },
  {
    subject: 'Global World History',
    code: 'HIS-202',
    teacher: 'Mrs. Catherine Hayes',
    score: 91,
    letterGrade: 'A-',
    credits: 3.0,
    comments: 'Thorough primary source synthesis and debate contributions.',
    term: 'Fall Term 2026'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'ASN-01',
    title: 'Cellular Mitosis & Microscopy Lab Report',
    subject: 'AP Biology',
    grade: 10,
    teacherName: 'Dr. Evelyn Vance',
    dueDate: '2026-10-23',
    dueTime: '11:59 PM',
    status: 'pending',
    totalScore: 50,
    description: 'Submit your 4-page laboratory write-up including labeled microscope sketches of onion root tip cells under 400x magnification.'
  },
  {
    id: 'ASN-02',
    title: 'Trigonometric Polynomials Problem Set #4',
    subject: 'Pre-Calculus Honors',
    grade: 10,
    teacherName: 'Prof. Robert Thorne',
    dueDate: '2026-10-22',
    dueTime: '08:00 AM',
    status: 'submitted',
    obtainedScore: 48,
    totalScore: 50,
    description: 'Complete problem questions 12 through 34 from Chapter 5. Show step-by-step angle addition formula derivations.'
  },
  {
    id: 'ASN-03',
    title: 'Othello Character Foil Essay Draft',
    subject: 'World Literature',
    grade: 10,
    teacherName: 'Ms. Rebecca Ross',
    dueDate: '2026-10-25',
    dueTime: '05:00 PM',
    status: 'pending',
    totalScore: 100,
    description: 'Compare and contrast Iago and Cassio as foils in Shakespeare’s tragedy. Minimum 1,200 words with MLA citations.'
  },
  {
    id: 'ASN-04',
    title: 'Elementary Solar System Diorama & Story',
    subject: 'Science Discovery',
    grade: 3,
    teacherName: 'Mrs. Clara Higgins',
    dueDate: '2026-10-24',
    dueTime: '03:00 PM',
    status: 'submitted',
    obtainedScore: 20,
    totalScore: 20,
    description: 'Create a shoebox diorama with painted foam planets and write 3 fun facts about Mars!'
  }
];

export const INITIAL_INVOICES: FeeInvoice[] = [
  {
    id: 'INV-2026-089',
    studentId: 'STU-101',
    studentName: 'Sophia Chen',
    grade: 10,
    term: 'Term 2 (Oct - Dec 2026)',
    amount: 1450.00,
    dueDate: '2026-11-05',
    status: 'due',
    description: 'High School Tuition ($1,100) + Advanced STEM Lab Fee ($200) + Library & Athletics ($150)'
  },
  {
    id: 'INV-2026-042',
    studentId: 'STU-101',
    studentName: 'Sophia Chen',
    grade: 10,
    term: 'Term 1 (Aug - Oct 2026)',
    amount: 1450.00,
    dueDate: '2026-08-25',
    status: 'paid',
    description: 'High School Tuition + Lab Fees',
    paidDate: '2026-08-22',
    receiptNumber: 'REC-2026-8831',
    paymentMethod: 'Apple Pay (Visa •••• 4022)'
  },
  {
    id: 'INV-2026-090',
    studentId: 'STU-102',
    studentName: 'Leo Chen',
    grade: 3,
    term: 'Term 2 (Oct - Dec 2026)',
    amount: 880.00,
    dueDate: '2026-11-05',
    status: 'due',
    description: 'Primary School Tuition ($680) + Daily Balanced Meal Plan ($200)'
  }
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  { id: 'TT-1', day: 'Monday', time: '08:30 - 09:45 AM', subject: 'AP Biology', teacher: 'Dr. Evelyn Vance', room: 'Lab 302' },
  { id: 'TT-2', day: 'Monday', time: '10:00 - 11:15 AM', subject: 'Pre-Calculus Honors', teacher: 'Prof. Thorne', room: 'Room 204' },
  { id: 'TT-3', day: 'Monday', time: '11:30 - 12:45 PM', subject: 'World Literature', teacher: 'Ms. Ross', room: 'Room 118' },
  { id: 'TT-4', day: 'Monday', time: '01:30 - 02:45 PM', subject: 'AP Computer Science', teacher: 'Mr. Rivera', room: 'Tech Lab 1' },
  { id: 'TT-5', day: 'Monday', time: '03:00 - 04:00 PM', subject: 'Varsity Athletics / Track', teacher: 'Coach Davis', room: 'Main Stadium' }
];

export const INITIAL_ANNOUNCEMENTS: NoticeAnnouncement[] = [
  {
    id: 'NTC-01',
    title: 'Grade 1-12 Parent-Teacher Conference (PTM) Sign-Up Open',
    category: 'Academic',
    date: '2026-10-20',
    targetAudience: 'Parents',
    content: 'Fall term conferences will take place on Friday, November 6. Please book your 15-minute one-on-one time slots via the mobile app portal before October 30.',
    sender: 'Office of the Principal'
  },
  {
    id: 'NTC-02',
    title: 'High School National Science Fair Registrations',
    category: 'Event',
    date: '2026-10-19',
    targetAudience: 'High School',
    content: 'Students in Grades 9-12 interested in submitting biotechnology or AI projects must finalize project proposals with Dr. Vance by next Wednesday.',
    sender: 'STEM Department'
  },
  {
    id: 'NTC-03',
    title: 'Flu Vaccine Clinic on Campus next Tuesday',
    category: 'Urgent',
    date: '2026-10-18',
    targetAudience: 'All',
    content: 'The school clinic will provide voluntary annual influenza immunizations for students with signed digital parental consent forms in the app.',
    sender: 'Health & Nursing Department'
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'MSG-01',
    senderRole: 'teacher',
    senderName: 'Dr. Evelyn Vance',
    text: 'Good evening Mr. Chen! Just wanted to commend Sophia for her leadership during the biology microscope lab today.',
    timestamp: 'Yesterday 4:15 PM',
    isRead: true
  },
  {
    id: 'MSG-02',
    senderRole: 'parent',
    senderName: 'David Chen',
    text: 'Thank you Dr. Vance! She was very enthusiastic about it over dinner. We also submitted her consent form for next week’s field trip.',
    timestamp: 'Yesterday 5:20 PM',
    isRead: true
  },
  {
    id: 'MSG-03',
    senderRole: 'teacher',
    senderName: 'Dr. Evelyn Vance',
    text: 'Received, thank you! Let me know if you need any adjustments before the upcoming term assessments.',
    timestamp: 'Today 9:30 AM',
    isRead: true
  }
];
