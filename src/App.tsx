import React, { useState, useEffect } from 'react';
import { 
  UserRole, 
  Student, 
  AttendanceRecord, 
  SubjectGrade, 
  Assignment, 
  FeeInvoice, 
  TimetableSlot, 
  NoticeAnnouncement, 
  ChatMessage,
  StudentScoreInput
} from './types/school';
import { 
  INITIAL_STUDENTS, 
  INITIAL_ATTENDANCE, 
  INITIAL_GRADES_SOPHIA, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_INVOICES, 
  INITIAL_TIMETABLE, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_CHAT,
  INITIAL_MULTI_TEACHER_SCORES
} from './data/mockSchoolData';

import { MobileFrame } from './components/mobile/MobileFrame';
import { StudentPortal } from './components/mobile/StudentPortal';
import { ParentPortal } from './components/mobile/ParentPortal';
import { TeacherPortal } from './components/mobile/TeacherPortal';
import { AdminPortal } from './components/mobile/AdminPortal';

import { HomePage } from './components/home/HomePage';
import { LoginPage } from './components/auth/LoginPage';
import { SrsViewer } from './components/srs/SrsViewer';
import { UseCaseDiagram } from './components/srs/UseCaseDiagram';
import { SequenceDiagramViewer } from './components/srs/SequenceDiagramViewer';
import { DesignPatternsViewer } from './components/srs/DesignPatternsViewer';
import { GradeTaxonomyViewer } from './components/srs/GradeTaxonomyViewer';
import { PerformanceReportsViewer } from './components/admin/PerformanceReportsViewer';
import { 
  TypographyToolbar, 
  FontScale, 
  FontWeightPreference, 
  FontStyleFamily 
} from './components/common/TypographyToolbar';

import { 
  Home,
  Smartphone, 
  FileText, 
  Workflow, 
  GitCommit, 
  Boxes, 
  Globe, 
  Sparkles, 
  GraduationCap,
  Users,
  CheckCircle2,
  Bell,
  Printer,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function App() {
  // Navigation Mode (now includes 'home' and 'login')
  const [activeView, setActiveView] = useState<
    'home' | 'login' | 'mobile_app' | 'performance_reports' | 'srs_doc' | 'use_cases' | 'sequences' | 'design_patterns' | 'grade_taxonomy'
  >('home');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: UserRole }>({
    name: 'David & Elena Chen',
    role: 'parent'
  });

  // Typography Preferences (Font size, style, font weight)
  const [fontScale, setFontScale] = useState<FontScale>('standard');
  const [fontWeight, setFontWeight] = useState<FontWeightPreference>('medium');
  const [fontStyle, setFontStyle] = useState<FontStyleFamily>('modern');

  // Active Role in Mobile Simulator
  const [mobileRole, setMobileRole] = useState<UserRole>('parent');
  const [isFrameExpanded, setIsFrameExpanded] = useState<boolean>(false);
  const [reportSelectedStudentId, setReportSelectedStudentId] = useState<string>('STU-101');

  // Shared School Application State
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedChildId, setSelectedChildId] = useState<string>('STU-101');
  const [grades, setGrades] = useState<SubjectGrade[]>(INITIAL_GRADES_SOPHIA);
  const [multiTeacherScores, setMultiTeacherScores] = useState<Record<string, Record<string, StudentScoreInput>>>(
    INITIAL_MULTI_TEACHER_SCORES
  );
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [invoices, setInvoices] = useState<FeeInvoice[]>(INITIAL_INVOICES);
  const [timetable] = useState<TimetableSlot[]>(INITIAL_TIMETABLE);
  const [announcements, setAnnouncements] = useState<NoticeAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [emergencyAlertBanner, setEmergencyAlertBanner] = useState<{ title: string; message: string } | null>(null);

  // Sync font attributes to body tag
  useEffect(() => {
    document.body.setAttribute('data-font-scale', fontScale);
  }, [fontScale]);

  // Current selected student
  const activeStudent = students.find(s => s.id === selectedChildId) || students[0];
  const parentChildren = students.filter(s => s.parentId === 'PAR-88');

  // Login handler
  const handleLoginSuccess = (role: UserRole, userDisplayName: string) => {
    setIsAuthenticated(true);
    setCurrentUser({ name: userDisplayName, role });
    setMobileRole(role);
    setActiveView('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('login');
  };

  const handleSelectRoleAndOpenApp = (role: UserRole) => {
    setMobileRole(role);
    setCurrentUser(prev => ({ ...prev, role }));
    setActiveView('mobile_app');
  };

  // Interactive Handlers that propagate across all roles
  const handleSubmitAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return { ...a, status: 'submitted', obtainedScore: a.totalScore };
      }
      return a;
    }));
  };

  const handlePayInvoice = (invoiceId: string) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status: 'paid',
          paidDate: '2026-10-21',
          receiptNumber: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          paymentMethod: 'Apple Pay (Verified)'
        };
      }
      return inv;
    }));
  };

  const handleSendChatMessage = (msg: {
    text: string;
    channel: 'parent_teacher' | 'teacher_student' | 'teacher_admin';
    senderRole: 'parent' | 'teacher' | 'student' | 'admin';
    senderName: string;
    recipientRole: 'parent' | 'teacher' | 'student' | 'admin';
    recipientName: string;
    teacherId?: string;
    studentId?: string;
  }) => {
    const newMsg: ChatMessage = {
      id: `MSG-${Date.now()}`,
      senderRole: msg.senderRole,
      senderName: msg.senderName,
      recipientRole: msg.recipientRole,
      recipientName: msg.recipientName,
      teacherId: msg.teacherId,
      studentId: msg.studentId,
      channel: msg.channel,
      text: msg.text,
      timestamp: 'Just now',
      isRead: true
    };
    setChatMessages(prev => [...prev, newMsg]);

    setTimeout(() => {
      let replyText = 'Message received with thanks.';
      let replyRole: 'parent' | 'teacher' | 'student' | 'admin' = 'teacher';
      let replyName = msg.recipientName;

      if (msg.channel === 'teacher_student') {
        if (msg.senderRole === 'student') {
          replyRole = 'teacher';
          replyName = msg.recipientName;
          replyText = `Wa alaikum assalam! Great question regarding your course work. Review the study guidelines in the portal, and we will practice it further in class tomorrow!`;
        } else {
          replyRole = 'student';
          replyName = msg.recipientName;
          replyText = `JazakAllah khair teacher for the clarification! I will revise my notes accordingly.`;
        }
      } else if (msg.channel === 'teacher_admin') {
        if (msg.senderRole === 'teacher') {
          replyRole = 'admin';
          replyName = 'Principal Ustaz Ibrahim';
          replyText = `Acknowledged and confirmed. Administrative log has been updated for Madrasaa records. Barakallahu feekum.`;
        } else {
          replyRole = 'teacher';
          replyName = msg.recipientName;
          replyText = `Received Sheikh. I will ensure all syllabus benchmarks and student assessments meet the deadline.`;
        }
      } else {
        if (msg.senderRole === 'parent') {
          replyRole = 'teacher';
          replyName = msg.recipientName || 'Dr. Evelyn Vance';
          replyText = `Thank you for reaching out! We appreciate your engagement with your child's progress.`;
        } else {
          replyRole = 'parent';
          replyName = msg.recipientName || 'David Chen';
          replyText = `Thank you for keeping us informed!`;
        }
      }

      const replyMsg: ChatMessage = {
        id: `MSG-${Date.now() + 1}`,
        senderRole: replyRole,
        senderName: replyName,
        recipientRole: msg.senderRole,
        recipientName: msg.senderName,
        teacherId: msg.teacherId,
        studentId: msg.studentId,
        channel: msg.channel,
        text: replyText,
        timestamp: 'Just now',
        isRead: true
      };
      setChatMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  const handleSendMessage = (text: string) => {
    handleSendChatMessage({
      text,
      channel: 'parent_teacher',
      senderRole: 'parent',
      senderName: 'David Chen',
      recipientRole: 'teacher',
      recipientName: 'Dr. Evelyn Vance',
      teacherId: 'TCH-03',
      studentId: 'STU-101'
    });
  };

  const handleAddAssignment = (newAsn: Partial<Assignment>) => {
    const created: Assignment = {
      id: `ASN-${Date.now()}`,
      title: newAsn.title || 'Untitled Homework',
      subject: newAsn.subject || 'AP Biology',
      grade: newAsn.grade || 10,
      teacherName: newAsn.teacherName || 'Dr. Evelyn Vance',
      dueDate: newAsn.dueDate || '2026-10-28',
      dueTime: newAsn.dueTime || '11:59 PM',
      status: 'pending',
      totalScore: newAsn.totalScore || 50,
      description: newAsn.description || 'Assigned via mobile teacher portal.'
    };
    setAssignments(prev => [created, ...prev]);
  };

  const handleRecordAttendance = (records: AttendanceRecord[]) => {
    records.forEach(rec => {
      if (rec.status === 'absent' || rec.status === 'late') {
        setStudents(prev => prev.map(s => {
          if (s.id === rec.studentId) {
            return {
              ...s,
              attendanceRate: Math.max(88, Number((s.attendanceRate - 0.5).toFixed(1)))
            };
          }
          return s;
        }));
      }
    });
  };

  const handleEmergencyBroadcast = (title: string, message: string) => {
    setEmergencyAlertBanner({ title, message });
    const newNotice: NoticeAnnouncement = {
      id: `EMG-${Date.now()}`,
      title,
      category: 'Urgent',
      date: 'Today',
      targetAudience: 'All',
      content: message,
      sender: 'Principal Command Office'
    };
    setAnnouncements(prev => [newNotice, ...prev]);
  };

  const handleOpenPerformanceReports = (studentId?: string) => {
    if (studentId) {
      setReportSelectedStudentId(studentId);
    }
    setActiveView('performance_reports');
  };

  // Typography styling classes mapped to container
  const fontStyleClass = 
    fontStyle === 'geometric' ? 'font-heading' : 
    fontStyle === 'academic' ? 'font-serif' : 'font-sans';

  const fontWeightClass = 
    fontWeight === 'bold' ? 'font-semibold tracking-tight' :
    fontWeight === 'medium' ? 'font-medium' : 'font-normal';

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white ${fontStyleClass} ${fontWeightClass}`}>
      {/* Emergency Alert Banner if triggered by Admin */}
      {emergencyAlertBanner && (
        <div className="bg-rose-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span className="font-bold uppercase tracking-wider bg-rose-800 px-2 py-0.5 rounded text-[10px]">
              CAMPUS EMERGENCY ALERT
            </span>
            <span className="truncate">{emergencyAlertBanner.title}: {emergencyAlertBanner.message}</span>
          </div>
          <button 
            onClick={() => setEmergencyAlertBanner(null)}
            className="text-white hover:text-rose-200 underline text-xs cursor-pointer ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Main Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white tracking-tight text-base sm:text-lg font-heading">
                  EduPulse K-12
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:inline-block">
                  Global Campus
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                Madrasaa Ifaa Islaamaa (Grades 1-12)
              </p>
            </div>
          </div>

          {/* Primary View Switcher Navigation */}
          <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto max-w-[55vw] sm:max-w-none">
            {/* 1. Home Page */}
            <button
              onClick={() => setActiveView('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeView === 'home'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            {/* 2. Live Mobile App */}
            <button
              onClick={() => setActiveView('mobile_app')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeView === 'mobile_app'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Live App</span>
            </button>

            {/* 3. PDF Performance Reports */}
            <button
              onClick={() => setActiveView('performance_reports')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeView === 'performance_reports'
                  ? 'bg-gradient-to-r from-emerald-600 to-indigo-600 text-white shadow-xs'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/60'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF Reports</span>
            </button>

            {/* 4. SRS Document */}
            <button
              onClick={() => setActiveView('srs_doc')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeView === 'srs_doc'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden md:inline">SRS Doc</span>
            </button>

            {/* 5. UML Diagrams */}
            <button
              onClick={() => setActiveView('use_cases')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeView === 'use_cases'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Use Cases</span>
            </button>

            <button
              onClick={() => setActiveView('sequences')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeView === 'sequences'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Sequences</span>
            </button>

            <button
              onClick={() => setActiveView('design_patterns')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeView === 'design_patterns'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Patterns</span>
            </button>
          </nav>

          {/* Right Header Utility Area: Typography Customizer + Auth Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Typography Customizer (Font size, weight, family) */}
            <TypographyToolbar
              fontScale={fontScale}
              onChangeFontScale={setFontScale}
              fontWeight={fontWeight}
              onChangeFontWeight={setFontWeight}
              fontStyle={fontStyle}
              onChangeFontStyle={setFontStyle}
            />

            {/* User Session / Login / Logout */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div 
                  onClick={() => setActiveView('home')}
                  className="hidden sm:flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-1 ring-indigo-400">
                    {currentUser.name[0]}
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-bold text-white leading-none line-clamp-1 max-w-[100px]">
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <span className="text-[10px] text-emerald-400 capitalize font-medium">
                      {currentUser.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-400 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors cursor-pointer"
                  title="Sign Out of Portal"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveView('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Portal Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* VIEW 0: HOME PAGE */}
        {activeView === 'home' && (
          <HomePage
            announcements={announcements}
            onNavigate={(view) => setActiveView(view)}
            onSelectRoleAndOpenApp={handleSelectRoleAndOpenApp}
            isAuthenticated={isAuthenticated}
            currentUserRole={currentUser.role}
            currentUserName={currentUser.name}
            onLogout={handleLogout}
          />
        )}

        {/* VIEW 1: LOGIN PAGE */}
        {activeView === 'login' && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onExploreAsGuest={() => setActiveView('home')}
          />
        )}

        {/* VIEW 2: PDF-STYLE PERFORMANCE REPORTS */}
        {activeView === 'performance_reports' && (
          <PerformanceReportsViewer 
            students={students}
            initialStudentId={reportSelectedStudentId}
          />
        )}

        {/* VIEW 3: LIVE MOBILE APP SIMULATOR */}
        {activeView === 'mobile_app' && (
          <div className="flex flex-col items-center space-y-6">
            {/* Role Switcher Toolbar */}
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 p-2 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400 ml-2" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Active Mobile Simulator Role:
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1 w-full sm:w-auto">
                <button
                  onClick={() => setMobileRole('student')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mobileRole === 'student'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  🎒 Student
                </button>

                <button
                  onClick={() => setMobileRole('parent')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mobileRole === 'parent'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  👨‍👩‍👧 Parent
                </button>

                <button
                  onClick={() => setMobileRole('teacher')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mobileRole === 'teacher'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  👩‍🏫 Teacher
                </button>

                <button
                  onClick={() => setMobileRole('admin')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mobileRole === 'admin'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  🏫 Admin
                </button>
              </div>
            </div>

            {/* Mobile Device Frame */}
            <MobileFrame
              activeRole={mobileRole}
              isExpanded={isFrameExpanded}
              onToggleExpanded={() => setIsFrameExpanded(!isFrameExpanded)}
              title="EduPulse Mobile"
            >
              {mobileRole === 'student' && (
                <StudentPortal
                  student={activeStudent}
                  grades={grades}
                  assignments={assignments}
                  timetable={timetable}
                  announcements={announcements}
                  onSubmitAssignment={handleSubmitAssignment}
                  chatMessages={chatMessages}
                  onSendMessage={handleSendChatMessage}
                />
              )}

              {mobileRole === 'parent' && (
                <ParentPortal
                  childrenList={parentChildren}
                  selectedChild={activeStudent}
                  onSelectChild={(child) => setSelectedChildId(child.id)}
                  invoices={invoices}
                  onPayInvoice={handlePayInvoice}
                  chatMessages={chatMessages}
                  onSendMessage={handleSendMessage}
                  announcements={announcements}
                  grades={grades}
                />
              )}

              {mobileRole === 'teacher' && (
                <TeacherPortal
                  students={students}
                  assignments={assignments}
                  onAddAssignment={handleAddAssignment}
                  onRecordAttendance={handleRecordAttendance}
                  scoresData={multiTeacherScores}
                  onUpdateScores={setMultiTeacherScores}
                  chatMessages={chatMessages}
                  onSendMessage={handleSendChatMessage}
                />
              )}

              {mobileRole === 'admin' && (
                <AdminPortal
                  students={students}
                  onTriggerEmergencyBroadcast={handleEmergencyBroadcast}
                  onOpenPerformanceReports={handleOpenPerformanceReports}
                  chatMessages={chatMessages}
                  onSendMessage={handleSendChatMessage}
                />
              )}
            </MobileFrame>
          </div>
        )}

        {/* VIEW 4: COMPLETE SRS DOCUMENT */}
        {activeView === 'srs_doc' && <SrsViewer />}

        {/* VIEW 5: USE CASE ARCHITECTURE DIAGRAMS */}
        {activeView === 'use_cases' && <UseCaseDiagram />}

        {/* VIEW 6: SYSTEM SEQUENCE DIAGRAMS */}
        {activeView === 'sequences' && <SequenceDiagramViewer />}

        {/* VIEW 7: DESIGN PATTERNS BLUEPRINT */}
        {activeView === 'design_patterns' && <DesignPatternsViewer />}

        {/* VIEW 8: GLOBAL GRADES 1-12 TAXONOMY */}
        {activeView === 'grade_taxonomy' && <GradeTaxonomyViewer />}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 py-6 bg-slate-950 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Madrasaa Ifaa Islaamaa • EduPulse K-12 Mobile School Management System (ISO/IEC/IEEE 29148 Standard)
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>FERPA &amp; COPPA Hardened</span>
            <span>•</span>
            <span>Clean Architecture + MVVM</span>
            <span>•</span>
            <span>Grades 1-12 Worldwide</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
