import { 
  Student, 
  AttendanceRecord, 
  SubjectGrade, 
  Assignment, 
  FeeInvoice, 
  TimetableSlot, 
  NoticeAnnouncement, 
  ChatMessage,
  TeacherProfile,
  StudentScoreInput
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
  },
  {
    id: 'STU-106',
    name: 'Bilal Adams',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    grade: 10,
    section: 'A',
    rollNumber: '10-A-07',
    dob: '2010-06-19',
    gender: 'Male',
    bloodGroup: 'O+',
    emergencyContact: '+1 (555) 678-9012',
    parentId: 'PAR-95',
    parentName: 'Yusuf Adams',
    parentPhone: '+1 (555) 678-9012',
    parentEmail: 'yadams@example.com',
    attendanceRate: 96.0,
    currentGpa: 3.78,
    houseOrHomeroom: 'Newton House (Room 304)',
    busRoute: 'Route 4B - North Hill Expressway',
    busStatus: 'In Transit'
  },
  {
    id: 'STU-107',
    name: 'Fatima Zahra Noor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    grade: 10,
    section: 'A',
    rollNumber: '10-A-09',
    dob: '2010-09-30',
    gender: 'Female',
    bloodGroup: 'A+',
    emergencyContact: '+1 (555) 789-0123',
    parentId: 'PAR-96',
    parentName: 'Tariq & Amina Noor',
    parentPhone: '+1 (555) 789-0123',
    parentEmail: 'anoor@example.com',
    attendanceRate: 98.4,
    currentGpa: 3.95,
    houseOrHomeroom: 'Newton House (Room 304)',
    busRoute: 'Route 2A - West Metro',
    busStatus: 'Boarded'
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

export const INITIAL_TEACHERS: TeacherProfile[] = [
  {
    id: 'TCH-01',
    name: 'Ustaz Ahmad Al-Hadi',
    title: 'Senior Qari & Quranic Studies Lead',
    subjectCode: 'QRN-10',
    subjectName: 'Quran Recitation & Tajweed',
    department: 'Islamic & Quranic Studies',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    assignedGrade: 10,
    assignedSection: 'A'
  },
  {
    id: 'TCH-02',
    name: 'Ustaza Fatima Zahra',
    title: 'Head of Classical Arabic Dept',
    subjectCode: 'ARB-10',
    subjectName: 'Arabic Language & Nahw',
    department: 'Languages & Linguistics',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    assignedGrade: 10,
    assignedSection: 'A'
  },
  {
    id: 'TCH-03',
    name: 'Ustaz Dawud Ibrahim',
    title: 'Lead Mathematics Instructor',
    subjectCode: 'MTH-10',
    subjectName: 'Mathematics & Algebra',
    department: 'STEM & Mathematics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    assignedGrade: 10,
    assignedSection: 'A'
  },
  {
    id: 'TCH-04',
    name: 'Ustaz Bilal Nur',
    title: 'Fiqh & Hadith Specialist',
    subjectCode: 'ISL-10',
    subjectName: 'Islamic Studies & Fiqh',
    department: 'Islamic & Quranic Studies',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    assignedGrade: 10,
    assignedSection: 'A'
  },
  {
    id: 'TCH-05',
    name: 'Dr. Evelyn Vance',
    title: 'Department Head & Natural Sciences',
    subjectCode: 'SCI-10',
    subjectName: 'Biology & General Sciences',
    department: 'Natural Sciences',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    assignedGrade: 10,
    assignedSection: 'A'
  },
  {
    id: 'TCH-06',
    name: 'Ustaza Maryam Ali',
    title: 'English & Literature Coordinator',
    subjectCode: 'ENG-10',
    subjectName: 'English Language & Composition',
    department: 'Languages & Humanities',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    assignedGrade: 10,
    assignedSection: 'A'
  }
];

export const calculateScoreMetrics = (assignment: number, quiz: number, midterm: number, finalExam: number) => {
  const safeAssign = Math.min(20, Math.max(0, assignment || 0));
  const safeQuiz = Math.min(20, Math.max(0, quiz || 0));
  const safeMid = Math.min(20, Math.max(0, midterm || 0));
  const safeFinal = Math.min(40, Math.max(0, finalExam || 0));
  const total = Math.round(safeAssign + safeQuiz + safeMid + safeFinal);

  let letter = 'F';
  let gpa = 0.0;
  if (total >= 95) { letter = 'A+'; gpa = 4.0; }
  else if (total >= 90) { letter = 'A'; gpa = 3.9; }
  else if (total >= 85) { letter = 'B+'; gpa = 3.5; }
  else if (total >= 80) { letter = 'B'; gpa = 3.0; }
  else if (total >= 75) { letter = 'C+'; gpa = 2.5; }
  else if (total >= 65) { letter = 'C'; gpa = 2.0; }
  else if (total >= 50) { letter = 'D'; gpa = 1.0; }
  else { letter = 'F'; gpa = 0.0; }

  return { total, letter, gpa };
};

// Seed initial multi-teacher scores for Grade 10-A students
export const INITIAL_MULTI_TEACHER_SCORES: Record<string, Record<string, StudentScoreInput>> = {
  // Sophia Chen (STU-101)
  'STU-101': {
    'QRN-10': {
      studentId: 'STU-101',
      studentName: 'Sophia Chen',
      rollNumber: '10-A-14',
      grade: 10,
      section: 'A',
      subjectCode: 'QRN-10',
      assignmentScore: 19,
      quizScore: 20,
      midtermScore: 19,
      finalExamScore: 39,
      totalScore: 97,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Flawless makharij and tajweed articulation. Memorized Juz 30 with distinction.'
    },
    'ARB-10': {
      studentId: 'STU-101',
      studentName: 'Sophia Chen',
      rollNumber: '10-A-14',
      grade: 10,
      section: 'A',
      subjectCode: 'ARB-10',
      assignmentScore: 19,
      quizScore: 18,
      midtermScore: 19,
      finalExamScore: 38,
      totalScore: 94,
      letterGrade: 'A',
      gpaPoint: 3.9,
      remarks: 'Strong mastery of Nahw sentence structure and noun declensions.'
    },
    'MTH-10': {
      studentId: 'STU-101',
      studentName: 'Sophia Chen',
      rollNumber: '10-A-14',
      grade: 10,
      section: 'A',
      subjectCode: 'MTH-10',
      assignmentScore: 18,
      quizScore: 19,
      midtermScore: 19,
      finalExamScore: 38,
      totalScore: 94,
      letterGrade: 'A',
      gpaPoint: 3.9,
      remarks: 'Exceptional problem-solving speed in quadratic relations and proof analysis.'
    },
    'ISL-10': {
      studentId: 'STU-101',
      studentName: 'Sophia Chen',
      rollNumber: '10-A-14',
      grade: 10,
      section: 'A',
      subjectCode: 'ISL-10',
      assignmentScore: 20,
      quizScore: 20,
      midtermScore: 20,
      finalExamScore: 39,
      totalScore: 99,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Comprehensive understanding of Fiqh al-Ibadat and historical Sahabah biographies.'
    },
    'SCI-10': {
      studentId: 'STU-101',
      studentName: 'Sophia Chen',
      rollNumber: '10-A-14',
      grade: 10,
      section: 'A',
      subjectCode: 'SCI-10',
      assignmentScore: 19,
      quizScore: 19,
      midtermScore: 19,
      finalExamScore: 39,
      totalScore: 96,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Exemplary scientific hypothesis formulation and microscope lab documentation.'
    },
    'ENG-10': {
      studentId: 'STU-101',
      studentName: 'Sophia Chen',
      rollNumber: '10-A-14',
      grade: 10,
      section: 'A',
      subjectCode: 'ENG-10',
      assignmentScore: 19,
      quizScore: 18,
      midtermScore: 18,
      finalExamScore: 38,
      totalScore: 93,
      letterGrade: 'A',
      gpaPoint: 3.9,
      remarks: 'Rich vocabulary and insightful rhetorical essays on classical literature.'
    }
  },
  // Aisha Patel (STU-104)
  'STU-104': {
    'QRN-10': {
      studentId: 'STU-104',
      studentName: 'Aisha Patel',
      rollNumber: '10-A-03',
      grade: 10,
      section: 'A',
      subjectCode: 'QRN-10',
      assignmentScore: 20,
      quizScore: 20,
      midtermScore: 20,
      finalExamScore: 40,
      totalScore: 100,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Masterful melodic tajweed, zero errors across oral recitation exam.'
    },
    'ARB-10': {
      studentId: 'STU-104',
      studentName: 'Aisha Patel',
      rollNumber: '10-A-03',
      grade: 10,
      section: 'A',
      subjectCode: 'ARB-10',
      assignmentScore: 19,
      quizScore: 20,
      midtermScore: 20,
      finalExamScore: 39,
      totalScore: 98,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Fluent Arabic composition and excellent Sarf morphological derivations.'
    },
    'MTH-10': {
      studentId: 'STU-104',
      studentName: 'Aisha Patel',
      rollNumber: '10-A-03',
      grade: 10,
      section: 'A',
      subjectCode: 'MTH-10',
      assignmentScore: 19,
      quizScore: 19,
      midtermScore: 20,
      finalExamScore: 39,
      totalScore: 97,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Outstanding analytical capability and rigorous geometric calculations.'
    },
    'ISL-10': {
      studentId: 'STU-104',
      studentName: 'Aisha Patel',
      rollNumber: '10-A-03',
      grade: 10,
      section: 'A',
      subjectCode: 'ISL-10',
      assignmentScore: 20,
      quizScore: 20,
      midtermScore: 19,
      finalExamScore: 39,
      totalScore: 98,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Exemplary ethics and comprehensive Hadith terminology analysis.'
    },
    'SCI-10': {
      studentId: 'STU-104',
      studentName: 'Aisha Patel',
      rollNumber: '10-A-03',
      grade: 10,
      section: 'A',
      subjectCode: 'SCI-10',
      assignmentScore: 20,
      quizScore: 19,
      midtermScore: 20,
      finalExamScore: 39,
      totalScore: 98,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Top score in molecular genetics examination.'
    },
    'ENG-10': {
      studentId: 'STU-104',
      studentName: 'Aisha Patel',
      rollNumber: '10-A-03',
      grade: 10,
      section: 'A',
      subjectCode: 'ENG-10',
      assignmentScore: 19,
      quizScore: 19,
      midtermScore: 19,
      finalExamScore: 39,
      totalScore: 96,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Eloquent orator and thoughtful analytical writer.'
    }
  },
  // Fatima Zahra Noor (STU-107)
  'STU-107': {
    'QRN-10': {
      studentId: 'STU-107',
      studentName: 'Fatima Zahra Noor',
      rollNumber: '10-A-09',
      grade: 10,
      section: 'A',
      subjectCode: 'QRN-10',
      assignmentScore: 19,
      quizScore: 19,
      midtermScore: 20,
      finalExamScore: 38,
      totalScore: 96,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Clear tajweed rules application and consistent daily revision.'
    },
    'ARB-10': {
      studentId: 'STU-107',
      studentName: 'Fatima Zahra Noor',
      rollNumber: '10-A-09',
      grade: 10,
      section: 'A',
      subjectCode: 'ARB-10',
      assignmentScore: 19,
      quizScore: 19,
      midtermScore: 19,
      finalExamScore: 38,
      totalScore: 95,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Impressive vocabulary and clear verbal dialogue skills.'
    },
    'MTH-10': {
      studentId: 'STU-107',
      studentName: 'Fatima Zahra Noor',
      rollNumber: '10-A-09',
      grade: 10,
      section: 'A',
      subjectCode: 'MTH-10',
      assignmentScore: 18,
      quizScore: 19,
      midtermScore: 18,
      finalExamScore: 37,
      totalScore: 92,
      letterGrade: 'A',
      gpaPoint: 3.9,
      remarks: 'Diligent work ethic and very accurate arithmetic proofs.'
    },
    'ISL-10': {
      studentId: 'STU-107',
      studentName: 'Fatima Zahra Noor',
      rollNumber: '10-A-09',
      grade: 10,
      section: 'A',
      subjectCode: 'ISL-10',
      assignmentScore: 20,
      quizScore: 19,
      midtermScore: 19,
      finalExamScore: 39,
      totalScore: 97,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Deep reverence and comprehensive knowledge of Islamic ethics.'
    },
    'SCI-10': {
      studentId: 'STU-107',
      studentName: 'Fatima Zahra Noor',
      rollNumber: '10-A-09',
      grade: 10,
      section: 'A',
      subjectCode: 'SCI-10',
      assignmentScore: 18,
      quizScore: 19,
      midtermScore: 19,
      finalExamScore: 38,
      totalScore: 94,
      letterGrade: 'A',
      gpaPoint: 3.9,
      remarks: 'Precise laboratory technique and strong data analysis.'
    },
    'ENG-10': {
      studentId: 'STU-107',
      studentName: 'Fatima Zahra Noor',
      rollNumber: '10-A-09',
      grade: 10,
      section: 'A',
      subjectCode: 'ENG-10',
      assignmentScore: 19,
      quizScore: 19,
      midtermScore: 19,
      finalExamScore: 38,
      totalScore: 95,
      letterGrade: 'A+',
      gpaPoint: 4.0,
      remarks: 'Expressive prose and active classroom discussions.'
    }
  },
  // Bilal Adams (STU-106)
  'STU-106': {
    'QRN-10': {
      studentId: 'STU-106',
      studentName: 'Bilal Adams',
      rollNumber: '10-A-07',
      grade: 10,
      section: 'A',
      subjectCode: 'QRN-10',
      assignmentScore: 18,
      quizScore: 17,
      midtermScore: 18,
      finalExamScore: 36,
      totalScore: 89,
      letterGrade: 'A',
      gpaPoint: 3.75,
      remarks: 'Steadily improving articulation of Ghunnah and Madd rules.'
    },
    'ARB-10': {
      studentId: 'STU-106',
      studentName: 'Bilal Adams',
      rollNumber: '10-A-07',
      grade: 10,
      section: 'A',
      subjectCode: 'ARB-10',
      assignmentScore: 17,
      quizScore: 17,
      midtermScore: 17,
      finalExamScore: 35,
      totalScore: 86,
      letterGrade: 'A',
      gpaPoint: 3.75,
      remarks: 'Solid grasp of fundamental noun-adjective agreements.'
    },
    'MTH-10': {
      studentId: 'STU-106',
      studentName: 'Bilal Adams',
      rollNumber: '10-A-07',
      grade: 10,
      section: 'A',
      subjectCode: 'MTH-10',
      assignmentScore: 16,
      quizScore: 17,
      midtermScore: 17,
      finalExamScore: 34,
      totalScore: 84,
      letterGrade: 'B+',
      gpaPoint: 3.5,
      remarks: 'Good progress in polynomial factoring; continue practice.'
    },
    'ISL-10': {
      studentId: 'STU-106',
      studentName: 'Bilal Adams',
      rollNumber: '10-A-07',
      grade: 10,
      section: 'A',
      subjectCode: 'ISL-10',
      assignmentScore: 19,
      quizScore: 18,
      midtermScore: 18,
      finalExamScore: 37,
      totalScore: 92,
      letterGrade: 'A',
      gpaPoint: 3.9,
      remarks: 'Very attentive during Islamic jurisprudence discussions.'
    },
    'SCI-10': {
      studentId: 'STU-106',
      studentName: 'Bilal Adams',
      rollNumber: '10-A-07',
      grade: 10,
      section: 'A',
      subjectCode: 'SCI-10',
      assignmentScore: 17,
      quizScore: 18,
      midtermScore: 17,
      finalExamScore: 36,
      totalScore: 88,
      letterGrade: 'A',
      gpaPoint: 3.75,
      remarks: 'High curiosity in ecological systems and plant biology.'
    },
    'ENG-10': {
      studentId: 'STU-106',
      studentName: 'Bilal Adams',
      rollNumber: '10-A-07',
      grade: 10,
      section: 'A',
      subjectCode: 'ENG-10',
      assignmentScore: 18,
      quizScore: 17,
      midtermScore: 18,
      finalExamScore: 35,
      totalScore: 88,
      letterGrade: 'A',
      gpaPoint: 3.75,
      remarks: 'Great argumentative essays and clear paragraph transitions.'
    }
  },
  // Marcus Miller (STU-103)
  'STU-103': {
    'QRN-10': {
      studentId: 'STU-103',
      studentName: 'Marcus Miller',
      rollNumber: '10-A-21',
      grade: 10,
      section: 'A',
      subjectCode: 'QRN-10',
      assignmentScore: 17,
      quizScore: 16,
      midtermScore: 17,
      finalExamScore: 34,
      totalScore: 84,
      letterGrade: 'B+',
      gpaPoint: 3.5,
      remarks: 'Good progress in Qalqalah; extra practice on elongation recommended.'
    },
    'ARB-10': {
      studentId: 'STU-103',
      studentName: 'Marcus Miller',
      rollNumber: '10-A-21',
      grade: 10,
      section: 'A',
      subjectCode: 'ARB-10',
      assignmentScore: 16,
      quizScore: 16,
      midtermScore: 16,
      finalExamScore: 33,
      totalScore: 81,
      letterGrade: 'B+',
      gpaPoint: 3.5,
      remarks: 'Good vocabulary building; needs more practice in verb conjugation.'
    },
    'MTH-10': {
      studentId: 'STU-103',
      studentName: 'Marcus Miller',
      rollNumber: '10-A-21',
      grade: 10,
      section: 'A',
      subjectCode: 'MTH-10',
      assignmentScore: 15,
      quizScore: 16,
      midtermScore: 15,
      finalExamScore: 32,
      totalScore: 78,
      letterGrade: 'B',
      gpaPoint: 3.0,
      remarks: 'Solid foundation; attend weekly math clinic for complex proofs.'
    },
    'ISL-10': {
      studentId: 'STU-103',
      studentName: 'Marcus Miller',
      rollNumber: '10-A-21',
      grade: 10,
      section: 'A',
      subjectCode: 'ISL-10',
      assignmentScore: 18,
      quizScore: 18,
      midtermScore: 17,
      finalExamScore: 36,
      totalScore: 89,
      letterGrade: 'A',
      gpaPoint: 3.75,
      remarks: 'Active participant in discussions on Islamic social justice.'
    },
    'SCI-10': {
      studentId: 'STU-103',
      studentName: 'Marcus Miller',
      rollNumber: '10-A-21',
      grade: 10,
      section: 'A',
      subjectCode: 'SCI-10',
      assignmentScore: 16,
      quizScore: 17,
      midtermScore: 16,
      finalExamScore: 34,
      totalScore: 83,
      letterGrade: 'B+',
      gpaPoint: 3.5,
      remarks: 'Great teamwork during laboratory experiments.'
    },
    'ENG-10': {
      studentId: 'STU-103',
      studentName: 'Marcus Miller',
      rollNumber: '10-A-21',
      grade: 10,
      section: 'A',
      subjectCode: 'ENG-10',
      assignmentScore: 17,
      quizScore: 17,
      midtermScore: 17,
      finalExamScore: 35,
      totalScore: 86,
      letterGrade: 'A',
      gpaPoint: 3.75,
      remarks: 'Very creative writing submissions.'
    }
  }
};
