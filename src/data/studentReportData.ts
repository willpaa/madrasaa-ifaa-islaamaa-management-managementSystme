import { SubjectGrade, Assignment } from '../types/school';

export interface StudentAttendanceSummary {
  totalSchoolDays: number;
  presentDays: number;
  lateDays: number;
  absentDays: number;
  excusedDays: number;
  ratePercentage: number;
  streakDays: number;
  unexcusedCount: number;
  monthlyLog: { month: string; percentage: number; present: number; total: number }[];
  statusLabel: 'Exemplary' | 'Satisfactory' | 'Needs Attention';
}

export interface StudentAssignmentSummary {
  totalAssigned: number;
  submittedCount: number;
  pendingCount: number;
  overdueCount: number;
  completionRate: number; // percentage
  averageScore: number; // percentage
  recentItems: {
    id: string;
    title: string;
    subject: string;
    score: number;
    maxScore: number;
    submittedDate: string;
    status: 'Graded' | 'Submitted' | 'Pending' | 'Overdue';
  }[];
}

export interface StudentReportDossier {
  studentId: string;
  semester: string;
  academicYear: string;
  reportDate: string;
  academicStanding: string;
  rankInClass: string;
  conductRating: string;
  advisorName: string;
  grades: SubjectGrade[];
  attendance: StudentAttendanceSummary;
  assignments: StudentAssignmentSummary;
  principalRemark: string;
  advisorRemark: string;
  verificationHash: string;
}

export const STUDENT_REPORT_DOSSIERS: Record<string, StudentReportDossier> = {
  'STU-101': {
    studentId: 'STU-101',
    semester: 'Fall Semester (Terms 1 & 2)',
    academicYear: '2026-2027',
    reportDate: 'October 21, 2026',
    academicStanding: "Dean's High Honors List (Top 5%)",
    rankInClass: '4 of 128 (Grade 10)',
    conductRating: 'Exemplary (Grade A)',
    advisorName: 'Dr. Evelyn Vance (Dept of Biological Sciences)',
    grades: [
      {
        subject: 'AP Biology',
        code: 'BIO-201',
        teacher: 'Dr. Evelyn Vance',
        score: 96,
        letterGrade: 'A+',
        credits: 4.0,
        comments: 'Outstanding synthesis of molecular cellular transport and investigative laboratory protocols.',
        term: 'Fall 2026'
      },
      {
        subject: 'Pre-Calculus Honors',
        code: 'MTH-203',
        teacher: 'Prof. Robert Thorne',
        score: 92,
        letterGrade: 'A',
        credits: 4.0,
        comments: 'Strong mastery of trigonometric identities and polar coordinate proofs.',
        term: 'Fall 2026'
      },
      {
        subject: 'World Literature & Rhetoric',
        code: 'ENG-201',
        teacher: 'Ms. Rebecca Ross',
        score: 89,
        letterGrade: 'B+',
        credits: 3.5,
        comments: 'Thoughtful textual essays; encouraged to lead more analytical socratic seminars.',
        term: 'Fall 2026'
      },
      {
        subject: 'AP Computer Science A',
        code: 'CSC-301',
        teacher: 'Mr. Alan Rivera',
        score: 98,
        letterGrade: 'A+',
        credits: 4.0,
        comments: 'Mastery of Java polymorphism, recursions, and algorithm runtime complexity.',
        term: 'Fall 2026'
      },
      {
        subject: 'Global World History',
        code: 'HIS-202',
        teacher: 'Mrs. Catherine Hayes',
        score: 91,
        letterGrade: 'A-',
        credits: 3.0,
        comments: 'Superb primary source analysis and geopolitical historical synthesis.',
        term: 'Fall 2026'
      }
    ],
    attendance: {
      totalSchoolDays: 60,
      presentDays: 58,
      lateDays: 1,
      absentDays: 1,
      excusedDays: 1,
      ratePercentage: 97.2,
      streakDays: 24,
      unexcusedCount: 0,
      monthlyLog: [
        { month: 'August', percentage: 100, present: 14, total: 14 },
        { month: 'September', percentage: 95.5, present: 21, total: 22 },
        { month: 'October', percentage: 96.0, present: 23, total: 24 }
      ],
      statusLabel: 'Exemplary'
    },
    assignments: {
      totalAssigned: 16,
      submittedCount: 14,
      pendingCount: 2,
      overdueCount: 0,
      completionRate: 87.5,
      averageScore: 94.6,
      recentItems: [
        { id: 'ASN-01', title: 'Cellular Mitosis Lab Report', subject: 'AP Biology', score: 48, maxScore: 50, submittedDate: 'Oct 19, 2026', status: 'Graded' },
        { id: 'ASN-02', title: 'Trigonometric Polynomials #4', subject: 'Pre-Calculus', score: 48, maxScore: 50, submittedDate: 'Oct 18, 2026', status: 'Graded' },
        { id: 'ASN-03', title: 'Othello Character Foil Essay', subject: 'World Literature', score: 92, maxScore: 100, submittedDate: 'Oct 15, 2026', status: 'Graded' },
        { id: 'ASN-05', title: 'Sorting Algorithm Benchmark', subject: 'AP CompSci', score: 50, maxScore: 50, submittedDate: 'Oct 12, 2026', status: 'Graded' }
      ]
    },
    principalRemark: 'Sophia demonstrates exceptional scholarly diligence and intellectual curiosity across STEM disciplines. Her academic citizenship is a model for her peers.',
    advisorRemark: 'Sophia is progressing at the highest tier of our Advanced Placement track. Her independent lab initiatives reflect university-ready inquiry skills.',
    verificationHash: 'SHA256:7e8b91a24d03ef4512c98031d87e22fb96014acb5012'
  },
  'STU-102': {
    studentId: 'STU-102',
    semester: 'Fall Semester (Primary Stage)',
    academicYear: '2026-2027',
    reportDate: 'October 21, 2026',
    academicStanding: 'Distinguished Primary Scholar Award',
    rankInClass: '1 of 24 (Grade 3-B)',
    conductRating: 'Exemplary (Gold Star Conduct)',
    advisorName: 'Mrs. Clara Higgins (Primary Homeroom 3-B)',
    grades: [
      {
        subject: 'Primary English & Phonics',
        code: 'ENG-03',
        teacher: 'Mrs. Clara Higgins',
        score: 98,
        letterGrade: 'A+',
        credits: 3.0,
        comments: 'Exceptional reading comprehension and expressive storytelling.',
        term: 'Fall 2026'
      },
      {
        subject: 'Elementary Mathematics',
        code: 'MTH-03',
        teacher: 'Mrs. Clara Higgins',
        score: 97,
        letterGrade: 'A+',
        credits: 3.0,
        comments: 'Quick mental arithmetic and creative problem solving with geometric shapes.',
        term: 'Fall 2026'
      },
      {
        subject: 'Science Discovery & Nature',
        code: 'SCI-03',
        teacher: 'Mrs. Clara Higgins',
        score: 99,
        letterGrade: 'A+',
        credits: 3.0,
        comments: 'Fascinating curiosity about plants, weather cycles, and the solar system.',
        term: 'Fall 2026'
      },
      {
        subject: 'Visual Arts & Craft',
        code: 'ART-03',
        teacher: 'Ms. Miranda Bloom',
        score: 100,
        letterGrade: 'A+',
        credits: 2.0,
        comments: 'Vibrant color usage and meticulous paper-mache solar diorama.',
        term: 'Fall 2026'
      }
    ],
    attendance: {
      totalSchoolDays: 60,
      presentDays: 59,
      lateDays: 0,
      absentDays: 1,
      excusedDays: 1,
      ratePercentage: 98.8,
      streakDays: 32,
      unexcusedCount: 0,
      monthlyLog: [
        { month: 'August', percentage: 100, present: 14, total: 14 },
        { month: 'September', percentage: 100, present: 22, total: 22 },
        { month: 'October', percentage: 95.8, present: 23, total: 24 }
      ],
      statusLabel: 'Exemplary'
    },
    assignments: {
      totalAssigned: 12,
      submittedCount: 12,
      pendingCount: 0,
      overdueCount: 0,
      completionRate: 100,
      averageScore: 98.5,
      recentItems: [
        { id: 'ASN-04', title: 'Solar System Diorama', subject: 'Science Discovery', score: 20, maxScore: 20, submittedDate: 'Oct 20, 2026', status: 'Graded' },
        { id: 'ASN-P2', title: 'Multiplication Storybook', subject: 'Mathematics', score: 25, maxScore: 25, submittedDate: 'Oct 16, 2026', status: 'Graded' },
        { id: 'ASN-P3', title: 'Autumn Leaf Botanical Journal', subject: 'Nature Studies', score: 15, maxScore: 15, submittedDate: 'Oct 11, 2026', status: 'Graded' }
      ]
    },
    principalRemark: 'Leo brings joyful positivity, kindness to friends, and wonderful curiosity to our primary wing every single morning.',
    advisorRemark: 'Leo is a voracious reader who always shares his books with classmates during morning circle.',
    verificationHash: 'SHA256:1a84f339c09d56214988bf20491024bc668901ade542'
  },
  'STU-103': {
    studentId: 'STU-103',
    semester: 'Fall Semester (Terms 1 & 2)',
    academicYear: '2026-2027',
    reportDate: 'October 21, 2026',
    academicStanding: 'Good Standing (Academic Support Active)',
    rankInClass: '42 of 128 (Grade 10)',
    conductRating: 'Satisfactory (Grade B+)',
    advisorName: 'Dr. Evelyn Vance (Dept of Biological Sciences)',
    grades: [
      {
        subject: 'General Biology',
        code: 'BIO-201',
        teacher: 'Dr. Evelyn Vance',
        score: 84,
        letterGrade: 'B',
        credits: 4.0,
        comments: 'Shows solid conceptual grasp in discussions; test prep needs earlier revision routines.',
        term: 'Fall 2026'
      },
      {
        subject: 'Algebra II',
        code: 'MTH-201',
        teacher: 'Prof. Robert Thorne',
        score: 82,
        letterGrade: 'B-',
        credits: 4.0,
        comments: 'Improvement noted in quadratic formula drills. Attending after-school clinic recommended.',
        term: 'Fall 2026'
      },
      {
        subject: 'World Literature & Rhetoric',
        code: 'ENG-201',
        teacher: 'Ms. Rebecca Ross',
        score: 88,
        letterGrade: 'B+',
        credits: 3.5,
        comments: 'Engaging verbal speaker during debates. Written citations are improving.',
        term: 'Fall 2026'
      },
      {
        subject: 'Computer Science Basics',
        code: 'CSC-201',
        teacher: 'Mr. Alan Rivera',
        score: 90,
        letterGrade: 'A-',
        credits: 4.0,
        comments: 'Strong aptitude for web scripting and interactive visual tools.',
        term: 'Fall 2026'
      }
    ],
    attendance: {
      totalSchoolDays: 60,
      presentDays: 53,
      lateDays: 4,
      absentDays: 3,
      excusedDays: 2,
      ratePercentage: 91.5,
      streakDays: 8,
      unexcusedCount: 1,
      monthlyLog: [
        { month: 'August', percentage: 92.8, present: 13, total: 14 },
        { month: 'September', percentage: 90.9, present: 20, total: 22 },
        { month: 'October', percentage: 91.6, present: 20, total: 24 }
      ],
      statusLabel: 'Needs Attention'
    },
    assignments: {
      totalAssigned: 16,
      submittedCount: 11,
      pendingCount: 3,
      overdueCount: 2,
      completionRate: 68.7,
      averageScore: 84.2,
      recentItems: [
        { id: 'ASN-01', title: 'Cellular Mitosis Lab Report', subject: 'Biology', score: 39, maxScore: 50, submittedDate: 'Oct 20, 2026', status: 'Graded' },
        { id: 'ASN-02', title: 'Trigonometric Polynomials #4', subject: 'Algebra II', score: 40, maxScore: 50, submittedDate: 'Oct 19, 2026', status: 'Graded' },
        { id: 'ASN-M1', title: 'Shakespeare Scene Analysis', subject: 'Literature', score: 78, maxScore: 100, submittedDate: 'Oct 14, 2026', status: 'Graded' }
      ]
    },
    principalRemark: 'Marcus has palpable potential and energetic leadership in team athletics. Focusing on punctuality and timely homework turn-in will unlock his top bracket.',
    advisorRemark: 'We have instituted a 15-minute weekly coaching touchpoint to assist Marcus with assignment planner scheduling.',
    verificationHash: 'SHA256:4d8301ec99b502ea812a450912cb401e4a1089bc2134'
  },
  'STU-104': {
    studentId: 'STU-104',
    semester: 'Fall Semester (Terms 1 & 2)',
    academicYear: '2026-2027',
    reportDate: 'October 21, 2026',
    academicStanding: 'Highest Valedictorian Honors Track (Top 1%)',
    rankInClass: '1 of 128 (Grade 10)',
    conductRating: 'Exemplary (Grade A+)',
    advisorName: 'Dr. Evelyn Vance (Dept of Biological Sciences)',
    grades: [
      {
        subject: 'AP Biology',
        code: 'BIO-201',
        teacher: 'Dr. Evelyn Vance',
        score: 98,
        letterGrade: 'A+',
        credits: 4.0,
        comments: 'Near perfect laboratory execution and peer tutoring initiative.',
        term: 'Fall 2026'
      },
      {
        subject: 'Pre-Calculus Honors',
        code: 'MTH-203',
        teacher: 'Prof. Robert Thorne',
        score: 97,
        letterGrade: 'A+',
        credits: 4.0,
        comments: 'Flawless mathematical reasoning in vector mechanics and series expansions.',
        term: 'Fall 2026'
      },
      {
        subject: 'World Literature & Rhetoric',
        code: 'ENG-201',
        teacher: 'Ms. Rebecca Ross',
        score: 95,
        letterGrade: 'A',
        credits: 3.5,
        comments: 'Eloquent, scholarly prose with nuanced philosophical textual analysis.',
        term: 'Fall 2026'
      },
      {
        subject: 'AP Computer Science A',
        code: 'CSC-301',
        teacher: 'Mr. Alan Rivera',
        score: 99,
        letterGrade: 'A+',
        credits: 4.0,
        comments: 'Top performer in nationwide programming olympiad qualifying rounds.',
        term: 'Fall 2026'
      }
    ],
    attendance: {
      totalSchoolDays: 60,
      presentDays: 59,
      lateDays: 1,
      absentDays: 0,
      excusedDays: 0,
      ratePercentage: 99.1,
      streakDays: 45,
      unexcusedCount: 0,
      monthlyLog: [
        { month: 'August', percentage: 100, present: 14, total: 14 },
        { month: 'September', percentage: 100, present: 22, total: 22 },
        { month: 'October', percentage: 97.5, present: 23, total: 24 }
      ],
      statusLabel: 'Exemplary'
    },
    assignments: {
      totalAssigned: 16,
      submittedCount: 16,
      pendingCount: 0,
      overdueCount: 0,
      completionRate: 100,
      averageScore: 98.2,
      recentItems: [
        { id: 'ASN-01', title: 'Cellular Mitosis Lab Report', subject: 'AP Biology', score: 50, maxScore: 50, submittedDate: 'Oct 18, 2026', status: 'Graded' },
        { id: 'ASN-02', title: 'Trigonometric Polynomials #4', subject: 'Pre-Calculus', score: 49, maxScore: 50, submittedDate: 'Oct 17, 2026', status: 'Graded' },
        { id: 'ASN-03', title: 'Othello Character Foil Essay', subject: 'World Literature', score: 98, maxScore: 100, submittedDate: 'Oct 14, 2026', status: 'Graded' }
      ]
    },
    principalRemark: 'Aisha exemplifies the finest academic tradition of Madrasaa Ifaa Islaamaa. Her scholarship, work ethic, and humility are peerless.',
    advisorRemark: 'Aisha is currently conducting independent research on CRISPR Cas9 gene editing for the Intel Science Fair.',
    verificationHash: 'SHA256:884e1b29a03f441092ca899014bd56fe120489ac8701'
  },
  'STU-105': {
    studentId: 'STU-105',
    semester: 'Fall Semester (Senior Year)',
    academicYear: '2026-2027',
    reportDate: 'October 21, 2026',
    academicStanding: 'Summa Cum Laude Senior Distinction',
    rankInClass: '2 of 98 (Grade 12)',
    conductRating: 'Exemplary (Grade A)',
    advisorName: 'Dean Arthur Wright (Senior Counselor)',
    grades: [
      {
        subject: 'AP Calculus BC',
        code: 'MTH-401',
        teacher: 'Prof. Robert Thorne',
        score: 97,
        letterGrade: 'A+',
        credits: 4.0,
        comments: 'Superior command of multivariable integrals and Taylor series proofs.',
        term: 'Fall 2026'
      },
      {
        subject: 'AP Physics C: Mechanics',
        code: 'PHY-401',
        teacher: 'Dr. Gregory Sterling',
        score: 95,
        letterGrade: 'A',
        credits: 4.0,
        comments: 'Exceptional rotational dynamics problem formulation and laboratory data analysis.',
        term: 'Fall 2026'
      },
      {
        subject: 'Senior English Rhetoric',
        code: 'ENG-401',
        teacher: 'Ms. Rebecca Ross',
        score: 94,
        letterGrade: 'A',
        credits: 3.5,
        comments: 'Persuasive capstone dissertation on ethics in artificial intelligence.',
        term: 'Fall 2026'
      },
      {
        subject: 'AP Microeconomics',
        code: 'ECO-301',
        teacher: 'Mr. Kenneth Zhao',
        score: 98,
        letterGrade: 'A+',
        credits: 4.0,
        comments: 'Thorough modeling of game theory matrices and consumer surplus equilibrium.',
        term: 'Fall 2026'
      }
    ],
    attendance: {
      totalSchoolDays: 60,
      presentDays: 57,
      lateDays: 2,
      absentDays: 1,
      excusedDays: 1,
      ratePercentage: 95.8,
      streakDays: 19,
      unexcusedCount: 0,
      monthlyLog: [
        { month: 'August', percentage: 100, present: 14, total: 14 },
        { month: 'September', percentage: 95.5, present: 21, total: 22 },
        { month: 'October', percentage: 92.5, present: 22, total: 24 }
      ],
      statusLabel: 'Exemplary'
    },
    assignments: {
      totalAssigned: 18,
      submittedCount: 17,
      pendingCount: 1,
      overdueCount: 0,
      completionRate: 94.4,
      averageScore: 96.1,
      recentItems: [
        { id: 'ASN-S1', title: 'Harmonic Oscillation Lab', subject: 'AP Physics C', score: 48, maxScore: 50, submittedDate: 'Oct 19, 2026', status: 'Graded' },
        { id: 'ASN-S2', title: 'Taylor Series Polynomial Expansion', subject: 'AP Calculus BC', score: 50, maxScore: 50, submittedDate: 'Oct 17, 2026', status: 'Graded' },
        { id: 'ASN-S3', title: 'Macroeconomic Fiscal Policy Brief', subject: 'AP Microeconomics', score: 96, maxScore: 100, submittedDate: 'Oct 12, 2026', status: 'Graded' }
      ]
    },
    principalRemark: 'Ethan has provided sterling leadership as Student Government President and captain of the Robotics Team. An Ivy-League caliber scholar.',
    advisorRemark: 'College recommendation portfolios have been finalized. Ethan is on track for National Merit Finalist recognition.',
    verificationHash: 'SHA256:39a812bc88094ef351982bca01297e6190ab77114402'
  }
};
