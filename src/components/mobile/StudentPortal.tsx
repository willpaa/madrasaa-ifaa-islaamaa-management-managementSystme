import React, { useState } from 'react';
import { 
  Student, 
  SubjectGrade, 
  Assignment, 
  TimetableSlot, 
  NoticeAnnouncement,
  ChatMessage,
  ChatChannel
} from '../../types/school';
import { 
  INITIAL_TEACHERS, 
  INITIAL_CHAT 
} from '../../data/mockSchoolData';
import { 
  Calendar, 
  Clock, 
  Award, 
  BookOpen, 
  CheckCircle, 
  FileText, 
  Upload, 
  QrCode, 
  ShieldCheck, 
  Bell, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  MessageCircle,
  Send,
  Sparkles
} from 'lucide-react';
import { StudentDashboard } from './StudentDashboard';

export { StudentDashboard };


interface StudentPortalProps {
  student: Student;
  grades: SubjectGrade[];
  assignments: Assignment[];
  timetable: TimetableSlot[];
  announcements: NoticeAnnouncement[];
  onSubmitAssignment: (assignmentId: string) => void;
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

export const StudentPortal: React.FC<StudentPortalProps> = ({
  student,
  grades,
  assignments,
  timetable,
  announcements,
  onSubmitAssignment,
  chatMessages = INITIAL_CHAT,
  onSendMessage
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'academics' | 'schedule' | 'chat' | 'idcard'>('home');
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);

  // Student <-> Teacher Chat state
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('TCH-01'); // Ustaz Ahmad Al-Hadi
  const [studentChatInput, setStudentChatInput] = useState<string>('');

  const selectedTeacher = INITIAL_TEACHERS.find(t => t.id === selectedTeacherId) || INITIAL_TEACHERS[0];

  const handleStudentSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || studentChatInput).trim();
    if (!textToSend || !onSendMessage) return;

    onSendMessage({
      text: textToSend,
      channel: 'teacher_student',
      senderRole: 'student',
      senderName: student.name,
      recipientRole: 'teacher',
      recipientName: selectedTeacher.name,
      teacherId: selectedTeacher.id,
      studentId: student.id
    });

    setStudentChatInput('');
  };

  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const submittedAssignments = assignments.filter(a => a.status !== 'pending');

  const handleUploadClick = (id: string) => {
    setSubmittingId(id);
    setTimeout(() => {
      onSubmitAssignment(id);
      setSubmittingId(null);
      setShowSubmissionSuccess(true);
      setTimeout(() => setShowSubmissionSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Top App Header */}
      <div className="px-5 pt-4 pb-3 bg-gradient-to-b from-indigo-950/80 to-slate-950 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={student.avatar} 
              alt={student.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/60 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white tracking-tight">{student.name}</h2>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                  Gr {student.grade}-{student.section}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">Roll: {student.rollNumber}</p>
            </div>
          </div>
          <div className="relative">
            <button className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white">
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
          </div>
        </div>

        {/* Quick Stats Pill Header */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Attendance</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400">{student.attendanceRate}%</span>
            </div>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">GPA (4.0)</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-sm font-bold text-indigo-300">{student.currentGpa.toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Due Work</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-sm font-bold text-amber-400">{pendingAssignments.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {showSubmissionSuccess && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Assignment submitted successfully to teacher gradebook!</span>
          </div>
        )}

        {/* TAB 1: HOME - STUDENT DASHBOARD */}
        {activeTab === 'home' && (
          <>
            {/* Live Next Class Card */}
            <div className="p-4 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between text-[11px] text-indigo-300 font-semibold mb-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  UPCOMING CLASS TODAY
                </span>
                <span>Period 2 • 10:00 AM</span>
              </div>
              <h3 className="text-base font-bold text-white">Pre-Calculus Honors</h3>
              <p className="text-xs text-slate-300 mt-0.5">Prof. Robert Thorne • Room 204</p>
              <div className="mt-3 pt-2.5 border-t border-indigo-500/20 flex items-center justify-between text-xs text-slate-400">
                <span>Topic: Trigonometric Identities</span>
                <span className="text-indigo-400 font-medium">Lab Prep Ready</span>
              </div>
            </div>

            {/* Dedicated Student Dashboard: Current Assignments, Recent Grades, & Quick-Chat */}
            <StudentDashboard
              student={student}
              grades={grades}
              assignments={assignments}
              chatMessages={chatMessages}
              onSubmitAssignment={onSubmitAssignment}
              onSendMessage={onSendMessage}
              onNavigateToAcademics={() => setActiveTab('academics')}
              onNavigateToChat={() => setActiveTab('chat')}
              onNavigateToSchedule={() => setActiveTab('schedule')}
            />

            {/* School Noticeboard Snippet */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                Latest School Bulletin
              </h4>
              <div className="space-y-2">
                {announcements.slice(0, 2).map((item) => (
                  <div key={item.id} className="p-3 bg-slate-900/70 border border-slate-800/80 rounded-xl">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-semibold text-indigo-400">{item.sender}</span>
                      <span>{item.date}</span>
                    </div>
                    <h5 className="text-xs font-semibold text-slate-200">{item.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: ACADEMICS & GRADES */}
        {activeTab === 'academics' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400">Cumulative GPA (High School)</span>
                  <div className="text-2xl font-bold text-white mt-0.5">3.92 / 4.00</div>
                  <span className="text-xs text-emerald-400 font-medium">Dean&apos;s Honor Roll • Top 5%</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-indigo-500/10 border-2 border-indigo-500/40 flex items-center justify-center text-lg font-bold text-indigo-400">
                  A+
                </div>
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Fall Term Gradebook</h4>
            <div className="space-y-2">
              {grades.map((gr, idx) => (
                <div key={idx} className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{gr.subject}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({gr.code})</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Educator: {gr.teacher}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {gr.letterGrade} ({gr.score}%)
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">{gr.credits} Credits</span>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-300 italic bg-slate-950/60 p-2 rounded border border-slate-800/60">
                    &ldquo;{gr.comments}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* Homework List */}
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider pt-2">All Coursework</h4>
            <div className="space-y-2">
              {assignments.map(a => (
                <div key={a.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-300">{a.subject}</span>
                    {a.status === 'submitted' ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Graded: {a.obtainedScore}/{a.totalScore}
                      </span>
                    ) : (
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due {a.dueDate}
                      </span>
                    )}
                  </div>
                  <h5 className="text-xs font-bold text-white mt-1">{a.title}</h5>
                  <p className="text-[11px] text-slate-400 mt-1">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
              <span className="font-bold text-white">Daily Schedule: Monday</span>
              <span className="text-slate-400 font-mono">Bell Schedule A</span>
            </div>

            <div className="space-y-2">
              {timetable.map((slot) => (
                <div key={slot.id} className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-indigo-400 font-mono block">{slot.time}</span>
                    <h5 className="text-xs font-bold text-white mt-0.5">{slot.subject}</h5>
                    <p className="text-[11px] text-slate-400">{slot.teacher}</p>
                  </div>
                  <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700">
                    {slot.room}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DIGITAL ID CARD */}
        {activeTab === 'idcard' && (
          <div className="space-y-4">
            <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 border border-indigo-500/40 shadow-xl">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-indigo-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Madrasaa Ifaa Islaamaa</h4>
                    <p className="text-[10px] text-indigo-300">Official K-12 Student Pass • 2026-2027</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>

              {/* Student Details */}
              <div className="flex gap-4 mt-4 items-center">
                <img 
                  src={student.avatar} 
                  alt={student.name}
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-400"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{student.name}</h3>
                  <div className="text-xs text-slate-300">
                    Grade {student.grade}-{student.section} • Roll #{student.rollNumber}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    DOB: {student.dob} | Blood: {student.bloodGroup}
                  </div>
                </div>
              </div>

              {/* Barcode & QR Telemetry */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-mono text-slate-400 block">Digital Token RFID ID</span>
                  <div className="font-mono text-xs tracking-widest text-indigo-300">STU-2026-894-CC</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3 h-3" /> NFC Gate Pass Authenticated
                  </div>
                </div>
                <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-slate-900" />
                </div>
              </div>
            </div>

            {/* Emergency & Transportation Card */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1.5">
              <div className="text-slate-400 font-semibold uppercase text-[10px]">Campus Transit & Emergency</div>
              <div className="text-slate-200">Bus: <span className="text-white font-medium">{student.busRoute}</span></div>
              <div className="text-slate-200">Parent Hotline: <span className="text-indigo-400 font-mono">{student.parentPhone}</span></div>
            </div>
          </div>
        )}

        {/* TAB 5: CHAT WITH TEACHERS */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[520px] space-y-2.5">
            {/* Header: Teacher Roster Selector */}
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Select Subject Teacher
                </span>
                <span className="text-[10px] text-indigo-400 font-medium">Direct Q&A</span>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {INITIAL_TEACHERS.map((tch) => {
                  const isSelected = selectedTeacherId === tch.id;
                  return (
                    <button
                      key={tch.id}
                      type="button"
                      onClick={() => setSelectedTeacherId(tch.id)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border shrink-0 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-950/90 border-indigo-500 text-white shadow-xs'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <img
                        src={tch.avatar}
                        alt={tch.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/50"
                      />
                      <div>
                        <p className="text-[11px] font-bold leading-tight text-white">{tch.name.split(' ')[0]} {tch.name.split(' ')[1] || ''}</p>
                        <p className="text-[9px] text-slate-400 font-medium">{tch.subjectCode}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Teacher Active Chat Window */}
            {(() => {
              const teacherMessages = chatMessages.filter(
                m => m.channel === 'teacher_student' &&
                  (m.teacherId === selectedTeacher.id ||
                   m.recipientName?.includes(selectedTeacher.name) ||
                   m.senderName?.includes(selectedTeacher.name))
              );

              return (
                <div className="flex-1 flex flex-col min-h-0 bg-slate-900/60 border border-slate-800 rounded-2xl p-3">
                  {/* Teacher Info Strip */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-950/80 border border-slate-800/80 rounded-xl mb-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={selectedTeacher.avatar}
                        alt={selectedTeacher.name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/50"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white">{selectedTeacher.name}</h4>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {selectedTeacher.subjectCode}
                          </span>
                        </div>
                        <p className="text-[10px] text-emerald-400 font-medium">
                          {selectedTeacher.subjectName} • Online
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                    {teacherMessages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500">
                        <MessageCircle className="w-8 h-8 mb-1 text-slate-600" />
                        <p className="text-xs">No previous messages with {selectedTeacher.name}.</p>
                        <p className="text-[10px] text-slate-600">Ask a question regarding homework, exam preparation, or recitation.</p>
                      </div>
                    ) : (
                      teacherMessages.map((msg) => {
                        const isStudent = msg.senderRole === 'student';
                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'}`}
                          >
                            <div
                              className={`max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                                isStudent
                                  ? 'bg-indigo-600 text-white rounded-br-xs'
                                  : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-xs'
                              }`}
                            >
                              <div className="text-[9px] font-semibold opacity-75 mb-0.5">
                                {isStudent ? student.name : selectedTeacher.name}
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

                  {/* Quick Student Suggestions */}
                  <div className="flex gap-1.5 overflow-x-auto py-1.5 scrollbar-thin">
                    <button
                      type="button"
                      onClick={() => handleStudentSendMessage(undefined, `Assalamu alaikum teacher! Could you clarify the key rules for our upcoming assessment?`)}
                      className="px-2 py-0.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer"
                    >
                      📖 Rules clarification
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStudentSendMessage(undefined, `Can I review my recent assignment submission feedback with you?`)}
                      className="px-2 py-0.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer"
                    >
                      📝 Homework feedback
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStudentSendMessage(undefined, `Are you available for 10 minutes after Asr prayer for recitation practice?`)}
                      className="px-2 py-0.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer"
                    >
                      ⏰ Practice request
                    </button>
                  </div>

                  {/* Message Input Box */}
                  <form onSubmit={handleStudentSendMessage} className="flex gap-2 pt-1 border-t border-slate-800/80">
                    <input
                      type="text"
                      value={studentChatInput}
                      onChange={(e) => setStudentChatInput(e.target.value)}
                      placeholder={`Ask ${selectedTeacher.name.split(' ')[0]} a question...`}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl cursor-pointer flex items-center justify-center shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Bottom Mobile Navigation */}
      <div className="h-14 bg-slate-950/95 border-t border-slate-800 flex items-center justify-around px-2 z-20">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('academics')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'academics' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Academics</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer relative ${
            activeTab === 'chat' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask Teacher</span>
          <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-950"></span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'schedule' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Timetable</span>
        </button>

        <button
          onClick={() => setActiveTab('idcard')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'idcard' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>ID Pass</span>
        </button>
      </div>
    </div>
  );
};
