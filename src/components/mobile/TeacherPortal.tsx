import React, { useState } from 'react';
import { 
  Student, 
  AttendanceRecord, 
  Assignment,
  TeacherProfile,
  StudentScoreInput,
  ChatMessage,
  ChatChannel
} from '../../types/school';
import { 
  INITIAL_TEACHERS, 
  INITIAL_MULTI_TEACHER_SCORES, 
  calculateScoreMetrics,
  INITIAL_CHAT
} from '../../data/mockSchoolData';
import { 
  CheckCheck, 
  Clock, 
  XCircle, 
  Send, 
  PlusCircle, 
  BookOpen, 
  CheckCircle, 
  Users, 
  FilePlus, 
  GraduationCap, 
  ChevronRight,
  Sparkles, 
  Search, 
  ClipboardCheck, 
  Award, 
  Bell, 
  FileSpreadsheet,
  CheckCircle2,
  Trophy,
  BarChart3,
  Edit3,
  ArrowRight,
  Save,
  UserCheck,
  RefreshCw,
  Printer,
  X,
  FileText,
  ShieldCheck,
  Calendar,
  MessageSquare,
  MessageCircle,
  HelpCircle,
  Building,
  UserCheck2
} from 'lucide-react';

interface TeacherPortalProps {
  students: Student[];
  assignments: Assignment[];
  onAddAssignment: (assignment: Partial<Assignment>) => void;
  onRecordAttendance: (records: AttendanceRecord[]) => void;
  scoresData?: Record<string, Record<string, StudentScoreInput>>;
  onUpdateScores?: (scores: Record<string, Record<string, StudentScoreInput>>) => void;
  chatMessages?: ChatMessage[];
  onSendMessage?: (msg: {
    text: string;
    channel: 'parent_teacher' | 'teacher_student' | 'teacher_admin';
    senderRole: 'parent' | 'teacher' | 'student' | 'admin';
    senderName: string;
    recipientRole: 'parent' | 'teacher' | 'student' | 'admin';
    recipientName: string;
    teacherId?: string;
    studentId?: string;
  }) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  students,
  assignments,
  onAddAssignment,
  onRecordAttendance,
  scoresData,
  onUpdateScores,
  chatMessages = INITIAL_CHAT,
  onSendMessage
}) => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'gradebook' | 'assignments' | 'chat' | 'broadcast'>('gradebook');
  
  // Active Teacher Profile selection
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('TCH-01'); // Default Ustaz Ahmad Al-Hadi
  const activeTeacher = INITIAL_TEACHERS.find(t => t.id === selectedTeacherId) || INITIAL_TEACHERS[0];
  
  // Gradebook sub-mode: Individual Teacher Entry vs Master Consolidated Ledger
  const [gradebookMode, setGradebookMode] = useState<'entry' | 'master_ledger'>('entry');

  // Internal score state if not passed from parent
  const [localScores, setLocalScores] = useState<Record<string, Record<string, StudentScoreInput>>>(
    scoresData || INITIAL_MULTI_TEACHER_SCORES
  );

  // Status for save feedback
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Modal for individual student's consolidated report card
  const [viewingReportStudentId, setViewingReportStudentId] = useState<string | null>(null);

  // Grade 10 students roster
  const grade10Students = students.filter(s => s.grade === 10);

  // Local state for today's attendance sheet
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'present' | 'late' | 'absent' | 'excused'>>(() => {
    const map: Record<string, 'present' | 'late' | 'absent' | 'excused'> = {};
    students.forEach(s => {
      map[s.id] = 'present';
    });
    return map;
  });
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assignment Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState(activeTeacher.subjectName);
  const [newPoints, setNewPoints] = useState(50);
  const [newDueDate, setNewDueDate] = useState('2026-10-28');

  // Teacher Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState(`Notice from ${activeTeacher.name}`);
  const [broadcastText, setBroadcastText] = useState(`Review the ${activeTeacher.subjectName} study packet for the upcoming assessment.`);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Teacher Multi-Channel Chat State (Student, Admin, Parent)
  const [chatChannelTab, setChatChannelTab] = useState<'student' | 'admin' | 'parent'>('student');
  const [selectedStudentContactId, setSelectedStudentContactId] = useState<string>('STU-101'); // Sophia Chen
  const [teacherChatInput, setTeacherChatInput] = useState<string>('');

  const handleTeacherSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || teacherChatInput).trim();
    if (!textToSend || !onSendMessage) return;

    if (chatChannelTab === 'student') {
      const studentObj = students.find(s => s.id === selectedStudentContactId) || students[0];
      onSendMessage({
        text: textToSend,
        channel: 'teacher_student',
        senderRole: 'teacher',
        senderName: activeTeacher.name,
        recipientRole: 'student',
        recipientName: studentObj.name,
        teacherId: activeTeacher.id,
        studentId: studentObj.id
      });
    } else if (chatChannelTab === 'admin') {
      onSendMessage({
        text: textToSend,
        channel: 'teacher_admin',
        senderRole: 'teacher',
        senderName: activeTeacher.name,
        recipientRole: 'admin',
        recipientName: 'Principal Ustaz Ibrahim',
        teacherId: activeTeacher.id
      });
    } else {
      const studentObj = students.find(s => s.id === selectedStudentContactId) || students[0];
      onSendMessage({
        text: textToSend,
        channel: 'parent_teacher',
        senderRole: 'teacher',
        senderName: activeTeacher.name,
        recipientRole: 'parent',
        recipientName: studentObj.parentName,
        teacherId: activeTeacher.id,
        studentId: studentObj.id
      });
    }
    setTeacherChatInput('');
  };

  // Helper to get score for a student and subject
  const getStudentScore = (studentId: string, subjectCode: string): StudentScoreInput => {
    if (localScores[studentId] && localScores[studentId][subjectCode]) {
      return localScores[studentId][subjectCode];
    }
    const student = students.find(s => s.id === studentId);
    return {
      studentId,
      studentName: student?.name || '',
      rollNumber: student?.rollNumber || '',
      grade: 10,
      section: 'A',
      subjectCode,
      assignmentScore: 18,
      quizScore: 18,
      midtermScore: 18,
      finalExamScore: 36,
      totalScore: 90,
      letterGrade: 'A',
      gpaPoint: 3.9,
      remarks: 'Satisfactory performance. Keep reviewing daily lessons.'
    };
  };

  // Update a single score field for active teacher's subject
  const handleScoreFieldChange = (
    studentId: string, 
    field: 'assignmentScore' | 'quizScore' | 'midtermScore' | 'finalExamScore' | 'remarks',
    value: string | number
  ) => {
    setLocalScores(prev => {
      const currentStudentScores = prev[studentId] || {};
      const currentEntry = currentStudentScores[activeTeacher.subjectCode] || getStudentScore(studentId, activeTeacher.subjectCode);

      let updatedEntry = { ...currentEntry };
      if (field === 'remarks') {
        updatedEntry.remarks = String(value);
      } else {
        const numVal = Math.max(0, Number(value) || 0);
        if (field === 'assignmentScore') updatedEntry.assignmentScore = Math.min(20, numVal);
        if (field === 'quizScore') updatedEntry.quizScore = Math.min(20, numVal);
        if (field === 'midtermScore') updatedEntry.midtermScore = Math.min(20, numVal);
        if (field === 'finalExamScore') updatedEntry.finalExamScore = Math.min(40, numVal);

        const metrics = calculateScoreMetrics(
          updatedEntry.assignmentScore,
          updatedEntry.quizScore,
          updatedEntry.midtermScore,
          updatedEntry.finalExamScore
        );
        updatedEntry.totalScore = metrics.total;
        updatedEntry.letterGrade = metrics.letter;
        updatedEntry.gpaPoint = metrics.gpa;
      }

      const updated = {
        ...prev,
        [studentId]: {
          ...currentStudentScores,
          [activeTeacher.subjectCode]: updatedEntry
        }
      };

      if (onUpdateScores) {
        onUpdateScores(updated);
      }
      return updated;
    });
  };

  // Auto-fill realistic marks for the active teacher
  const handleAutoFillActiveSubject = () => {
    setLocalScores(prev => {
      const updated = { ...prev };
      grade10Students.forEach((student, idx) => {
        const cur = updated[student.id] || {};
        // Generate realistic high-achieving scores with slight natural variation
        const assign = 18 + (idx % 3 === 0 ? 2 : idx % 2 === 0 ? 1 : 0);
        const quiz = 18 + (idx % 2 === 0 ? 2 : 0);
        const mid = 17 + (idx % 4 === 0 ? 3 : 2);
        const finalEx = 36 + (idx % 3 === 0 ? 4 : idx % 2 === 0 ? 2 : 0);
        const metrics = calculateScoreMetrics(assign, quiz, mid, finalEx);

        let remark = 'Demonstrates deep attentiveness and rigorous effort.';
        if (activeTeacher.subjectCode === 'QRN-10') {
          remark = metrics.total >= 95 ? 'Muntaz! Flawless Tajweed rules and melodic recitation.' : 'Good Tajweed application; continue daily Hifz revision.';
        } else if (activeTeacher.subjectCode === 'ARB-10') {
          remark = metrics.total >= 95 ? 'Mastery of Nahw sentence structure and classical vocabulary.' : 'Strong comprehension of grammar rules.';
        } else if (activeTeacher.subjectCode === 'MTH-10') {
          remark = metrics.total >= 95 ? 'Exceptional problem-solving speed and algebraic precision.' : 'Solid analytical progress.';
        } else if (activeTeacher.subjectCode === 'ISL-10') {
          remark = metrics.total >= 95 ? 'Comprehensive understanding of Fiqh al-Ibadat and Hadith ethics.' : 'Good grasp of Islamic history.';
        }

        cur[activeTeacher.subjectCode] = {
          studentId: student.id,
          studentName: student.name,
          rollNumber: student.rollNumber,
          grade: 10,
          section: 'A',
          subjectCode: activeTeacher.subjectCode,
          assignmentScore: assign,
          quizScore: quiz,
          midtermScore: mid,
          finalExamScore: finalEx,
          totalScore: metrics.total,
          letterGrade: metrics.letter,
          gpaPoint: metrics.gpa,
          remarks: remark
        };
        updated[student.id] = cur;
      });

      if (onUpdateScores) {
        onUpdateScores(updated);
      }
      return updated;
    });

    setSaveSuccessMsg(`Auto-filled sample scores for ${activeTeacher.subjectName}!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Save active teacher's subject grades
  const handleSaveActiveSubjectGrades = () => {
    if (onUpdateScores) {
      onUpdateScores(localScores);
    }
    setSaveSuccessMsg(`Grades saved and published for ${activeTeacher.subjectName} (${grade10Students.length} students)!`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Switch to next teacher
  const handleNextTeacher = () => {
    const curIdx = INITIAL_TEACHERS.findIndex(t => t.id === selectedTeacherId);
    const nextIdx = (curIdx + 1) % INITIAL_TEACHERS.length;
    setSelectedTeacherId(INITIAL_TEACHERS[nextIdx].id);
    setSaveSuccessMsg(`Switched to ${INITIAL_TEACHERS[nextIdx].name} (${INITIAL_TEACHERS[nextIdx].subjectName})`);
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  // Simulate all other teachers submitting their grades
  const handleSimulateAllTeachers = () => {
    setLocalScores(prev => {
      const updated = { ...prev };
      INITIAL_TEACHERS.forEach(tch => {
        grade10Students.forEach((student, idx) => {
          const cur = updated[student.id] || {};
          if (!cur[tch.subjectCode]) {
            const assign = 17 + ((idx + tch.id.length) % 4);
            const quiz = 18 + ((idx * 2) % 3);
            const mid = 18 + (idx % 3);
            const finalEx = 35 + ((idx * 3) % 6);
            const metrics = calculateScoreMetrics(assign, quiz, mid, finalEx);

            cur[tch.subjectCode] = {
              studentId: student.id,
              studentName: student.name,
              rollNumber: student.rollNumber,
              grade: 10,
              section: 'A',
              subjectCode: tch.subjectCode,
              assignmentScore: assign,
              quizScore: quiz,
              midtermScore: mid,
              finalExamScore: finalEx,
              totalScore: metrics.total,
              letterGrade: metrics.letter,
              gpaPoint: metrics.gpa,
              remarks: `Evaluated by ${tch.name}: consistent progress and commendable participation.`
            };
          }
          updated[student.id] = cur;
        });
      });

      if (onUpdateScores) {
        onUpdateScores(updated);
      }
      return updated;
    });

    setSaveSuccessMsg('All 6 subject teachers have submitted their grades into the Master Ledger!');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Compute consolidated master ledger rows for all Grade 10-A students
  const consolidatedRows = grade10Students.map(student => {
    const studentGrades = localScores[student.id] || {};
    let totalMarks = 0;
    let subjectCount = 0;
    let gpaSum = 0;

    INITIAL_TEACHERS.forEach(tch => {
      const entry = studentGrades[tch.subjectCode];
      if (entry) {
        totalMarks += entry.totalScore;
        gpaSum += entry.gpaPoint;
        subjectCount++;
      } else {
        // Fallback default
        totalMarks += 85;
        gpaSum += 3.5;
        subjectCount++;
      }
    });

    const maxMarks = INITIAL_TEACHERS.length * 100;
    const avgPercentage = subjectCount > 0 ? (totalMarks / (subjectCount * 100)) * 100 : 0;
    const avgGpa = subjectCount > 0 ? gpaSum / subjectCount : 0;
    
    let overallGrade = 'A';
    if (avgPercentage >= 95) overallGrade = 'A+';
    else if (avgPercentage >= 90) overallGrade = 'A';
    else if (avgPercentage >= 85) overallGrade = 'B+';
    else if (avgPercentage >= 80) overallGrade = 'B';
    else if (avgPercentage >= 75) overallGrade = 'C+';
    else if (avgPercentage >= 65) overallGrade = 'C';
    else overallGrade = 'D';

    return {
      student,
      totalMarks,
      maxMarks,
      avgPercentage,
      avgGpa,
      overallGrade,
      subjectGrades: studentGrades
    };
  }).sort((a, b) => b.totalMarks - a.totalMarks);

  // Student being inspected in the modal
  const viewingStudent = viewingReportStudentId 
    ? grade10Students.find(s => s.id === viewingReportStudentId) 
    : null;

  // Attendance handlers
  const toggleStudentStatus = (studentId: string) => {
    setAttendanceMap(prev => {
      const current = prev[studentId] || 'present';
      const order: ('present' | 'late' | 'absent' | 'excused')[] = ['present', 'late', 'absent', 'excused'];
      const nextIdx = (order.indexOf(current) + 1) % order.length;
      return { ...prev, [studentId]: order[nextIdx] };
    });
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, 'present' | 'late' | 'absent' | 'excused'> = {};
    grade10Students.forEach(s => {
      updated[s.id] = 'present';
    });
    setAttendanceMap(updated);
  };

  const handleSubmitAttendance = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const records: AttendanceRecord[] = grade10Students.map(s => ({
        id: `ATT-${Date.now()}-${s.id}`,
        studentId: s.id,
        studentName: s.name,
        grade: s.grade,
        section: s.section,
        date: '2026-10-21',
        status: attendanceMap[s.id] || 'present',
        recordedBy: activeTeacher.name,
        time: '08:15 AM'
      }));
      onRecordAttendance(records);
      setIsSubmitting(false);
      setAttendanceSubmitted(true);
      setTimeout(() => setAttendanceSubmitted(false), 3500);
    }, 900);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddAssignment({
      title: newTitle,
      subject: newSubject,
      grade: 10,
      totalScore: Number(newPoints),
      dueDate: newDueDate,
      dueTime: '11:59 PM',
      teacherName: activeTeacher.name,
      description: 'Review the chapter guidelines and submit through student portal.'
    });
    setNewTitle('');
    setShowAddModal(false);
  };

  const handleSendTeacherBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 3500);
  };

  const presentCount = grade10Students.filter(s => (attendanceMap[s.id] || 'present') === 'present').length;
  const absentCount = grade10Students.filter(s => attendanceMap[s.id] === 'absent').length;
  const lateCount = grade10Students.filter(s => attendanceMap[s.id] === 'late').length;

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-950 text-slate-100">
      
      {/* Top Header: Active Teacher Profile & Quick Switcher */}
      <div className="px-4 pt-3 pb-3 bg-gradient-to-b from-indigo-950/90 via-slate-900 to-slate-950 border-b border-slate-800 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <img 
              src={activeTeacher.avatar} 
              alt={activeTeacher.name} 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/50 shrink-0" 
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs font-bold text-white truncate">{activeTeacher.name}</h2>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[9px] font-mono">
                  Active
                </span>
              </div>
              <p className="text-[10px] text-indigo-300 font-medium truncate">
                {activeTeacher.subjectName} • Gr 10-A
              </p>
            </div>
          </div>

          {/* Quick Teacher Switcher Button */}
          <button
            onClick={handleNextTeacher}
            title="Switch to next subject teacher"
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors shrink-0 shadow-xs"
          >
            <RefreshCw className="w-3 h-3 text-indigo-400" />
            <span>Switch Teacher</span>
          </button>
        </div>

        {/* Horizontal Teacher Avatars / Subject Pills */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
          {INITIAL_TEACHERS.map(tch => {
            const isSelected = tch.id === selectedTeacherId;
            return (
              <button
                key={tch.id}
                onClick={() => setSelectedTeacherId(tch.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all cursor-pointer border shrink-0 ${
                  isSelected 
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm' 
                    : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-semibold">{tch.subjectCode.replace('-10', '')}</span>
                <span className="opacity-80 text-[9px] truncate max-w-[80px]">{tch.name.split(' ')[1] || tch.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto">
        
        {/* Feedback Alert Banners */}
        {saveSuccessMsg && (
          <div className="p-2.5 bg-emerald-950/90 border border-emerald-500/60 rounded-xl text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{saveSuccessMsg}</span>
          </div>
        )}

        {attendanceSubmitted && (
          <div className="p-2.5 bg-emerald-950/90 border border-emerald-500/60 rounded-xl text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Attendance recorded! Parent notifications queued.</span>
          </div>
        )}

        {broadcastSuccess && (
          <div className="p-2.5 bg-indigo-950/90 border border-indigo-500/60 rounded-xl text-indigo-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Class announcement sent to Grade 10-A student & parent portals!</span>
          </div>
        )}

        {/* TAB 1: GRADEBOOK WITH BOTH TEACHER SCORE ENTRY & MASTER CONSOLIDATED LEDGER */}
        {activeTab === 'gradebook' && (
          <div className="space-y-3.5">
            
            {/* Sub-view Switcher: Teacher Score Entry vs Master Consolidated Ledger */}
            <div className="p-1 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-1 shadow-inner">
              <button
                onClick={() => setGradebookMode('entry')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  gradebookMode === 'entry'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Teacher Score Entry</span>
              </button>
              <button
                onClick={() => setGradebookMode('master_ledger')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  gradebookMode === 'master_ledger'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Master Ledger (All Teachers)</span>
              </button>
            </div>

            {/* SUB-VIEW A: TEACHER SCORE ENTRY */}
            {gradebookMode === 'entry' && (
              <div className="space-y-3">
                {/* Subject & Component Info Card */}
                <div className="p-3 bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                          Subject Marksheet
                        </span>
                        <span className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded text-[9px] font-mono">
                          {activeTeacher.subjectCode}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-0.5">
                        {activeTeacher.subjectName}
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        Instructor: {activeTeacher.name} • Class: Grade 10-A ({grade10Students.length} Students)
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <button
                        onClick={handleAutoFillActiveSubject}
                        className="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        <span>Auto-Fill Marks</span>
                      </button>
                    </div>
                  </div>

                  {/* Grading Breakdown Legend */}
                  <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-800/80 text-center">
                    <div className="p-1 bg-slate-950/60 rounded border border-slate-800/60">
                      <span className="text-[9px] text-slate-400 block font-semibold">Assign</span>
                      <span className="text-[11px] font-bold text-indigo-400">/ 20</span>
                    </div>
                    <div className="p-1 bg-slate-950/60 rounded border border-slate-800/60">
                      <span className="text-[9px] text-slate-400 block font-semibold">Quiz/Hifz</span>
                      <span className="text-[11px] font-bold text-indigo-400">/ 20</span>
                    </div>
                    <div className="p-1 bg-slate-950/60 rounded border border-slate-800/60">
                      <span className="text-[9px] text-slate-400 block font-semibold">Midterm</span>
                      <span className="text-[11px] font-bold text-indigo-400">/ 20</span>
                    </div>
                    <div className="p-1 bg-slate-950/60 rounded border border-slate-800/60">
                      <span className="text-[9px] text-slate-400 block font-semibold">Final Exam</span>
                      <span className="text-[11px] font-bold text-indigo-400">/ 40</span>
                    </div>
                  </div>
                </div>

                {/* List of all students in class with direct score inputs */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Student Roster & Score Inputs ({grade10Students.length})
                    </span>
                    <span className="text-[10px] text-indigo-300 font-mono">
                      Max Total: 100 pts
                    </span>
                  </div>

                  {grade10Students.map((st) => {
                    const score = getStudentScore(st.id, activeTeacher.subjectCode);
                    const letterColor = 
                      score.totalScore >= 90 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
                      score.totalScore >= 80 ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' :
                      score.totalScore >= 70 ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
                      'text-rose-400 bg-rose-500/10 border-rose-500/30';

                    return (
                      <div 
                        key={st.id} 
                        className="p-3 bg-slate-900/95 border border-slate-800 rounded-xl space-y-2 hover:border-slate-700 transition-all shadow-xs"
                      >
                        {/* Student Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img 
                              src={st.avatar} 
                              alt={st.name} 
                              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700 shrink-0" 
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-white">{st.name}</h4>
                                <span className="text-[9px] font-mono text-slate-400">#{st.rollNumber}</span>
                              </div>
                              <span className="text-[9px] text-slate-400">GPA: {st.currentGpa.toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Calculated Total & Letter Badge */}
                          <div className="flex items-center gap-1.5">
                            <div className="text-right">
                              <span className="text-xs font-extrabold text-white font-mono block">
                                {score.totalScore}/100
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono">
                                GPA {score.gpaPoint.toFixed(1)}
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-xs font-black border ${letterColor}`}>
                              {score.letterGrade}
                            </span>
                          </div>
                        </div>

                        {/* Direct Score Breakdown Inputs */}
                        <div className="grid grid-cols-4 gap-1.5">
                          <div>
                            <label className="text-[8px] uppercase font-bold text-slate-400 block mb-0.5">
                              Assign (20)
                            </label>
                            <input 
                              type="number"
                              min={0}
                              max={20}
                              value={score.assignmentScore}
                              onChange={(e) => handleScoreFieldChange(st.id, 'assignmentScore', e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs text-white font-mono font-bold text-center py-1 rounded-lg focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[8px] uppercase font-bold text-slate-400 block mb-0.5">
                              Quiz (20)
                            </label>
                            <input 
                              type="number"
                              min={0}
                              max={20}
                              value={score.quizScore}
                              onChange={(e) => handleScoreFieldChange(st.id, 'quizScore', e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs text-white font-mono font-bold text-center py-1 rounded-lg focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[8px] uppercase font-bold text-slate-400 block mb-0.5">
                              Mid (20)
                            </label>
                            <input 
                              type="number"
                              min={0}
                              max={20}
                              value={score.midtermScore}
                              onChange={(e) => handleScoreFieldChange(st.id, 'midtermScore', e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs text-white font-mono font-bold text-center py-1 rounded-lg focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[8px] uppercase font-bold text-slate-400 block mb-0.5">
                              Final (40)
                            </label>
                            <input 
                              type="number"
                              min={0}
                              max={40}
                              value={score.finalExamScore}
                              onChange={(e) => handleScoreFieldChange(st.id, 'finalExamScore', e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs text-white font-mono font-bold text-center py-1 rounded-lg focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Teacher Remark Input */}
                        <div>
                          <input 
                            type="text"
                            placeholder="Add teacher evaluation note..."
                            value={score.remarks || ''}
                            onChange={(e) => handleScoreFieldChange(st.id, 'remarks', e.target.value)}
                            className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-indigo-500 text-[10px] text-slate-300 px-2 py-1 rounded-lg focus:outline-none truncate"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Save & Action Buttons */}
                <div className="pt-1 flex gap-2">
                  <button
                    onClick={handleSaveActiveSubjectGrades}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/30 transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save {activeTeacher.subjectCode} Grades</span>
                  </button>

                  <button
                    onClick={handleNextTeacher}
                    className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
                    title="Switch to next teacher to enter their marks"
                  >
                    <span>Next Teacher</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                </div>
              </div>
            )}

            {/* SUB-VIEW B: MASTER CONSOLIDATED LEDGER (ALL TEACHERS' SCORES IN ONE PLACE) */}
            {gradebookMode === 'master_ledger' && (
              <div className="space-y-3.5">
                
                {/* Master Broadsheet Header */}
                <div className="p-3.5 bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl shadow-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-black text-indigo-400 tracking-wider flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-amber-400" />
                        Madrasaa Ifaa Islaamaa
                      </span>
                      <h3 className="text-sm font-extrabold text-white mt-0.5">
                        Grade 10-A Master Consolidated Ledger
                      </h3>
                      <p className="text-[10px] text-slate-300">
                        Unified Academic Registry • Fall Semester
                      </p>
                    </div>

                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-[10px] font-bold">
                      All Scores Aggregated
                    </span>
                  </div>

                  {/* Summary Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 bg-slate-950/70 rounded-xl border border-slate-800">
                      <span className="text-[9px] text-slate-400 block font-semibold">Total Subjects</span>
                      <span className="text-xs font-black text-white font-mono">6 Disciplines</span>
                    </div>
                    <div className="p-2 bg-slate-950/70 rounded-xl border border-slate-800">
                      <span className="text-[9px] text-slate-400 block font-semibold">Max Aggregate</span>
                      <span className="text-xs font-black text-indigo-400 font-mono">600 Marks</span>
                    </div>
                    <div className="p-2 bg-slate-950/70 rounded-xl border border-slate-800">
                      <span className="text-[9px] text-slate-400 block font-semibold">Reporting Teachers</span>
                      <span className="text-xs font-black text-emerald-400 font-mono">6/6 Submitted</span>
                    </div>
                  </div>

                  {/* Submission Status of Each Teacher */}
                  <div className="p-2 bg-slate-950/50 rounded-xl border border-slate-800/80">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1.5">
                      Teacher Submission Checklist:
                    </span>
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      {INITIAL_TEACHERS.map(tch => (
                        <div key={tch.id} className="flex items-center gap-1 text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{tch.subjectCode.replace('-10','')}: {tch.name.split(' ')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar inside Master Ledger */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleSimulateAllTeachers}
                      className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Re-sync All Teachers</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Print Ledger</span>
                    </button>
                  </div>
                </div>

                {/* Ranked Student List with All Teachers' Scores Aggregated */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Official Class Rank & Composite Marks
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Sorted by Aggregate Score
                    </span>
                  </div>

                  {consolidatedRows.map((row, index) => {
                    const rankBadge = 
                      index === 0 ? 'bg-amber-500 text-slate-950 font-black' :
                      index === 1 ? 'bg-slate-300 text-slate-950 font-black' :
                      index === 2 ? 'bg-amber-700 text-white font-black' :
                      'bg-slate-800 text-slate-300 font-bold';

                    return (
                      <div 
                        key={row.student.id} 
                        className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5 hover:border-indigo-500/40 transition-all shadow-xs"
                      >
                        {/* Student Rank & Composite Metrics */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${rankBadge} shrink-0`}>
                              #{index + 1}
                            </span>
                            <img 
                              src={row.student.avatar} 
                              alt={row.student.name} 
                              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700 shrink-0" 
                            />
                            <div>
                              <div className="flex items-center gap-1">
                                <h4 className="text-xs font-bold text-white">{row.student.name}</h4>
                                <span className="text-[9px] text-slate-400 font-mono">#{row.student.rollNumber}</span>
                              </div>
                              <span className="text-[9px] text-emerald-400 font-medium">
                                Standing: {index === 0 ? 'Valedictorian Track' : row.avgPercentage >= 90 ? 'High Honors' : 'Promoted'}
                              </span>
                            </div>
                          </div>

                          {/* Aggregate Score & Grade */}
                          <div className="text-right">
                            <div className="flex items-center gap-1.5 justify-end">
                              <span className="text-xs font-extrabold text-white font-mono">
                                {row.totalMarks} / {row.maxMarks}
                              </span>
                              <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-[10px] font-black">
                                {row.overallGrade}
                              </span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono">
                              Avg: {row.avgPercentage.toFixed(1)}% • GPA {row.avgGpa.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Subject Marks Grid (All 6 Teachers' Marks Side by Side) */}
                        <div className="grid grid-cols-6 gap-1 pt-1 border-t border-slate-800/80">
                          {INITIAL_TEACHERS.map(tch => {
                            const subScore = row.subjectGrades[tch.subjectCode] || getStudentScore(row.student.id, tch.subjectCode);
                            return (
                              <div 
                                key={tch.id} 
                                className="p-1 bg-slate-950/80 border border-slate-800/80 rounded text-center"
                                title={`${tch.subjectName} (${tch.name}): ${subScore.totalScore}/100 [${subScore.letterGrade}]`}
                              >
                                <span className="text-[8px] font-bold text-slate-400 block truncate">
                                  {tch.subjectCode.replace('-10', '')}
                                </span>
                                <span className="text-[10px] font-black text-indigo-300 font-mono block">
                                  {subScore.totalScore}
                                </span>
                                <span className="text-[8px] text-slate-400 font-mono">
                                  {subScore.letterGrade}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Full Report Card Button */}
                        <div className="pt-0.5 flex justify-end">
                          <button
                            onClick={() => setViewingReportStudentId(row.student.id)}
                            className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Full Official Report Card</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ATTENDANCE SHEET */}
        {activeTab === 'attendance' && (
          <div className="space-y-4">
            {/* Roster Controls */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Roster: Grade 10-A
                </span>
                <div className="text-xs text-white font-medium mt-0.5">
                  Present: <strong className="text-emerald-400">{presentCount}</strong> | 
                  Late: <strong className="text-amber-400">{lateCount}</strong> | 
                  Absent: <strong className="text-rose-400">{absentCount}</strong>
                </div>
              </div>
              <button
                onClick={handleMarkAllPresent}
                className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg border border-slate-700 cursor-pointer"
              >
                All Present
              </button>
            </div>

            {/* Students List */}
            <div className="space-y-2">
              {grade10Students.map((st) => {
                const status = attendanceMap[st.id] || 'present';
                return (
                  <div
                    key={st.id}
                    className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white">{st.name}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">#{st.rollNumber}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          Guardian: {st.parentName.split('&')[0]}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill Toggle Button */}
                    <button
                      onClick={() => toggleStudentStatus(st.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                        status === 'present'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : status === 'late'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : status === 'absent'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                      }`}
                    >
                      {status}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Submission Button */}
            <button
              onClick={handleSubmitAttendance}
              disabled={isSubmitting}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Syncing to Ledger...' : 'Submit & Broadcast to Parents'}</span>
            </button>
          </div>
        )}

        {/* TAB 3: ASSIGNMENTS & HOMEWORK */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Active Coursework Tasks
              </h4>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Task</span>
              </button>
            </div>

            <div className="space-y-2">
              {assignments.map(a => (
                <div key={a.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-indigo-400 font-semibold">{a.subject}</span>
                    <span className="text-slate-400 font-mono">Max: {a.totalScore} pts</span>
                  </div>
                  <h5 className="text-xs font-bold text-white mt-1">{a.title}</h5>
                  <p className="text-[10px] text-slate-400 mt-1">Due: {a.dueDate} ({a.dueTime}) • {a.teacherName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TEACHER BROADCAST */}
        {activeTab === 'broadcast' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Class Announcement Dispatcher
                </h4>
                <span className="text-[10px] text-indigo-300 font-mono">Grade 10-A ({grade10Students.length} Students)</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Post notifications directly to all registered student and parent mobile portals for {activeTeacher.subjectName}.
              </p>

              <form onSubmit={handleSendTeacherBroadcast} className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Announcement Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Message Body
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={broadcastText}
                    onChange={(e) => setBroadcastText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Notice to Grade 10-A</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: MULTI-CHANNEL TEACHER CHAT (STUDENTS, ADMIN, PARENTS) */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[530px] space-y-2">
            {/* Communication Target Channel Switcher */}
            <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex items-center gap-1">
              <button
                type="button"
                onClick={() => setChatChannelTab('student')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  chatChannelTab === 'student'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Students</span>
              </button>

              <button
                type="button"
                onClick={() => setChatChannelTab('admin')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  chatChannelTab === 'admin'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Administration</span>
              </button>

              <button
                type="button"
                onClick={() => setChatChannelTab('parent')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  chatChannelTab === 'parent'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck2 className="w-3.5 h-3.5" />
                <span>Parents</span>
              </button>
            </div>

            {/* CHANNEL 1: STUDENT CHAT */}
            {chatChannelTab === 'student' && (
              <div className="flex-1 flex flex-col min-h-0 bg-slate-900/60 border border-slate-800 rounded-2xl p-3">
                {/* Horizontal Student Contacts Bar */}
                <div className="mb-2 pb-2 border-b border-slate-800/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Grade 10-A Student Inquiries</span>
                    <span className="text-[9px] text-indigo-400 font-mono">
                      {grade10Students.length} Enrolled
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {grade10Students.map((stu) => {
                      const isSelected = selectedStudentContactId === stu.id;
                      return (
                        <button
                          key={stu.id}
                          type="button"
                          onClick={() => setSelectedStudentContactId(stu.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border shrink-0 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-xs'
                              : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <img
                            src={stu.avatar}
                            alt={stu.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-[11px] font-bold leading-tight">{stu.name.split(' ')[0]}</p>
                            <p className="text-[9px] text-slate-400 font-mono">#{stu.rollNumber}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Student Header */}
                {(() => {
                  const currentStudent = students.find(s => s.id === selectedStudentContactId) || students[0];
                  const studentMessages = chatMessages.filter(
                    m => m.channel === 'teacher_student' &&
                      (m.studentId === currentStudent.id ||
                       m.recipientName?.includes(currentStudent.name) ||
                       m.senderName?.includes(currentStudent.name))
                  );

                  return (
                    <>
                      <div className="flex items-center justify-between p-2 bg-slate-950/80 border border-slate-800/80 rounded-xl mb-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={currentStudent.avatar}
                            alt={currentStudent.name}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/50"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white">{currentStudent.name}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                Student • Gr {currentStudent.grade}-{currentStudent.section}
                              </span>
                            </div>
                            <span className="text-[10px] text-emerald-400">Course: {activeTeacher.subjectName}</span>
                          </div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Active"></span>
                      </div>

                      {/* Chat Messages Feed */}
                      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                        {studentMessages.length === 0 ? (
                          <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500">
                            <MessageCircle className="w-8 h-8 mb-1 text-slate-600" />
                            <p className="text-xs">No previous messages with {currentStudent.name}.</p>
                            <p className="text-[10px] text-slate-600">Send homework guidance or Tajweed feedback below.</p>
                          </div>
                        ) : (
                          studentMessages.map((msg) => {
                            const isMe = msg.senderRole === 'teacher';
                            return (
                              <div
                                key={msg.id}
                                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                              >
                                <div
                                  className={`max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                                    isMe
                                      ? 'bg-indigo-600 text-white rounded-br-xs'
                                      : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-xs'
                                  }`}
                                >
                                  <div className="text-[9px] font-semibold opacity-75 mb-0.5">
                                    {isMe ? activeTeacher.name : msg.senderName}
                                  </div>
                                  {msg.text}
                                </div>
                                <span className="text-[9px] text-slate-500 mt-0.5 px-1 font-mono">
                                  {msg.timestamp}
                                </span>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Quick Reply Pills */}
                      <div className="flex gap-1.5 overflow-x-auto py-1.5 scrollbar-thin">
                        <button
                          type="button"
                          onClick={() => handleTeacherSendMessage(undefined, `Makharij & Tajweed rule approved. Great recitation practice!`)}
                          className="px-2 py-0.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer"
                        >
                          📖 Tajweed approved
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTeacherSendMessage(undefined, `Please review Section 3 of the homework packet before tomorrow's class.`)}
                          className="px-2 py-0.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer"
                        >
                          📝 Check Section 3
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTeacherSendMessage(undefined, `Deadline extended by 24 hours. Submit by 5:00 PM tomorrow.`)}
                          className="px-2 py-0.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer"
                        >
                          ⏰ +24h Extension
                        </button>
                      </div>

                      {/* Input Box */}
                      <form onSubmit={handleTeacherSendMessage} className="flex gap-2 pt-1 border-t border-slate-800/80">
                        <input
                          type="text"
                          value={teacherChatInput}
                          onChange={(e) => setTeacherChatInput(e.target.value)}
                          placeholder={`Reply to ${currentStudent.name.split(' ')[0]}...`}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl cursor-pointer flex items-center justify-center shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </>
                  );
                })()}
              </div>
            )}

            {/* CHANNEL 2: ADMIN & PRINCIPAL CHAT */}
            {chatChannelTab === 'admin' && (
              <div className="flex-1 flex flex-col min-h-0 bg-slate-900/60 border border-slate-800 rounded-2xl p-3">
                {/* Admin Contact Header */}
                <div className="flex items-center justify-between p-2.5 bg-slate-950/80 border border-slate-800/80 rounded-xl mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-xs">
                      PI
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">Principal Ustaz Ibrahim</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Office of the Principal
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Academic Directorate & Faculty Affairs</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                    Desk Online
                  </span>
                </div>

                {/* Admin Chat Feed */}
                {(() => {
                  const adminMessages = chatMessages.filter(
                    m => m.channel === 'teacher_admin'
                  );

                  return (
                    <>
                      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                        {adminMessages.map((msg) => {
                          const isMe = msg.senderRole === 'teacher';
                          return (
                            <div
                              key={msg.id}
                              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                            >
                              <div
                                className={`max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                                  isMe
                                    ? 'bg-indigo-600 text-white rounded-br-xs'
                                    : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-xs'
                                }`}
                              >
                                <div className="text-[9px] font-semibold opacity-75 mb-0.5 flex items-center justify-between gap-3">
                                  <span>{isMe ? activeTeacher.name : msg.senderName}</span>
                                  <span className="text-[8px] uppercase tracking-wider text-indigo-200">
                                    {isMe ? 'Faculty' : 'Administration'}
                                  </span>
                                </div>
                                {msg.text}
                              </div>
                              <span className="text-[9px] text-slate-500 mt-0.5 px-1 font-mono">
                                {msg.timestamp}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Quick Admin Action Chips */}
                      <div className="flex gap-1.5 overflow-x-auto py-1.5 scrollbar-thin">
                        <button
                          type="button"
                          onClick={() => handleTeacherSendMessage(undefined, `Exam rooms & recitation staging confirmed for Grade 10.`)}
                          className="px-2 py-0.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer"
                        >
                          🏛️ Rooms confirmed
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTeacherSendMessage(undefined, `Scores for all 20 students have been finalized in the master ledger.`)}
                          className="px-2 py-0.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer"
                        >
                          📊 Scores locked
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTeacherSendMessage(undefined, `Submitting curriculum syllabus review for next term.`)}
                          className="px-2 py-0.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer"
                        >
                          📄 Syllabus ready
                        </button>
                      </div>

                      {/* Admin Message Input */}
                      <form onSubmit={handleTeacherSendMessage} className="flex gap-2 pt-1 border-t border-slate-800/80">
                        <input
                          type="text"
                          value={teacherChatInput}
                          onChange={(e) => setTeacherChatInput(e.target.value)}
                          placeholder="Message Principal / Directorate..."
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl cursor-pointer flex items-center justify-center shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </>
                  );
                })()}
              </div>
            )}

            {/* CHANNEL 3: PARENTS CHAT */}
            {chatChannelTab === 'parent' && (
              <div className="flex-1 flex flex-col min-h-0 bg-slate-900/60 border border-slate-800 rounded-2xl p-3">
                <div className="mb-2 pb-2 border-b border-slate-800/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Parent & Guardian Directory
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {grade10Students.map((stu) => {
                      const isSelected = selectedStudentContactId === stu.id;
                      return (
                        <button
                          key={stu.id}
                          type="button"
                          onClick={() => setSelectedStudentContactId(stu.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border shrink-0 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-xs'
                              : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                            {stu.parentName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[11px] font-bold leading-tight">{stu.parentName}</p>
                            <p className="text-[9px] text-slate-400">Parent of {stu.name.split(' ')[0]}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {(() => {
                  const currentStudent = students.find(s => s.id === selectedStudentContactId) || students[0];
                  const parentMessages = chatMessages.filter(
                    m => m.channel === 'parent_teacher' &&
                      (m.studentId === currentStudent.id ||
                       m.recipientName?.includes(currentStudent.parentName) ||
                       m.senderName?.includes(currentStudent.parentName))
                  );

                  return (
                    <>
                      <div className="flex items-center justify-between p-2 bg-slate-950/80 border border-slate-800/80 rounded-xl mb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{currentStudent.parentName}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                              Guardian of {currentStudent.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">Phone: {currentStudent.parentPhone}</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                        {parentMessages.length === 0 ? (
                          <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500">
                            <MessageCircle className="w-8 h-8 mb-1 text-slate-600" />
                            <p className="text-xs">No prior messages with {currentStudent.parentName}.</p>
                            <p className="text-[10px] text-slate-600">You can message them regarding student progress.</p>
                          </div>
                        ) : (
                          parentMessages.map((msg) => {
                            const isMe = msg.senderRole === 'teacher';
                            return (
                              <div
                                key={msg.id}
                                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                              >
                                <div
                                  className={`max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                                    isMe
                                      ? 'bg-indigo-600 text-white rounded-br-xs'
                                      : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-xs'
                                  }`}
                                >
                                  {msg.text}
                                </div>
                                <span className="text-[9px] text-slate-500 mt-0.5 px-1 font-mono">
                                  {msg.timestamp}
                                </span>
                              </div>
                            );
                          })
                        )}
                      </div>

                      <form onSubmit={handleTeacherSendMessage} className="flex gap-2 pt-1 border-t border-slate-800/80">
                        <input
                          type="text"
                          value={teacherChatInput}
                          onChange={(e) => setTeacherChatInput(e.target.value)}
                          placeholder={`Message ${currentStudent.parentName}...`}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl cursor-pointer flex items-center justify-center shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL: COMBINED OFFICIAL STUDENT REPORT CARD (ALL TEACHERS) */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Official Academic Report Card
                  </h4>
                  <p className="text-[10px] text-slate-300">
                    Madrasaa Ifaa Islaamaa • Fall Semester
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewingReportStudentId(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto space-y-4">
              {/* Student Identification */}
              <div className="flex items-center justify-between p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <img 
                    src={viewingStudent.avatar} 
                    alt={viewingStudent.name} 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/50" 
                  />
                  <div>
                    <h5 className="text-sm font-bold text-white">{viewingStudent.name}</h5>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Roll #{viewingStudent.rollNumber} • Grade {viewingStudent.grade}-{viewingStudent.section}
                    </p>
                    <p className="text-[10px] text-indigo-300">
                      Parent: {viewingStudent.parentName}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Attendance</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {viewingStudent.attendanceRate}%
                  </span>
                </div>
              </div>

              {/* All Teacher Grades Table */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Course Marks from All Subject Teachers
                </span>

                <div className="space-y-1.5">
                  {INITIAL_TEACHERS.map(tch => {
                    const score = getStudentScore(viewingStudent.id, tch.subjectCode);
                    return (
                      <div 
                        key={tch.id}
                        className="p-2.5 bg-slate-950/90 border border-slate-800/90 rounded-xl space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {tch.subjectName}
                            </span>
                            <span className="text-[9px] text-slate-400">
                              Teacher: {tch.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white font-mono">
                              {score.totalScore}/100
                            </span>
                            <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-[10px] font-black">
                              {score.letterGrade}
                            </span>
                          </div>
                        </div>

                        {score.remarks && (
                          <p className="text-[9px] text-slate-400 italic bg-slate-900/60 p-1.5 rounded">
                            "{score.remarks}"
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Official Seal & Authentication */}
              <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2 text-indigo-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Authenticated by Registrar Office</span>
                </div>
                <span className="text-slate-400 font-mono">MD-IFAA-2026-VERIFIED</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => setViewingReportStudentId(null)}
                className="flex-1 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 rounded-xl cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Assignment */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form 
            onSubmit={handleCreateAssignment}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl max-w-xs w-full shadow-2xl space-y-3"
          >
            <h4 className="text-sm font-bold text-white">Create New Assignment</h4>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-semibold">Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Surah Al-Mulk Memorization Exam"
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2 rounded-lg mt-1 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-semibold">Subject</label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2 rounded-lg mt-1"
              >
                {INITIAL_TEACHERS.map(t => (
                  <option key={t.id} value={t.subjectName}>{t.subjectName} ({t.name.split(' ')[1]})</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Max Points</label>
                <input
                  type="number"
                  value={newPoints}
                  onChange={(e) => setNewPoints(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2 rounded-lg mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2 rounded-lg mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg cursor-pointer"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      )}

      {/* INTERACTIVE BOTTOM NAVIGATION BAR FOR TEACHER PORTAL */}
      <div className="h-14 bg-slate-950/95 border-t border-slate-800 flex items-center justify-around px-2 z-20 shrink-0">
        <button
          onClick={() => setActiveTab('gradebook')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'gradebook' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Gradebook & Ledger</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'attendance' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>Attendance</span>
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'assignments' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Homework</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer relative ${
            activeTab === 'chat' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Messages</span>
          <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-950"></span>
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'broadcast' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notice</span>
        </button>
      </div>

    </div>
  );
};
