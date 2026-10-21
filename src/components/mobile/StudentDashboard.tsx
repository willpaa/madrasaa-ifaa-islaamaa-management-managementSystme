import React, { useState } from 'react';
import { 
  Student, 
  SubjectGrade, 
  Assignment, 
  ChatMessage 
} from '../../types/school';
import { INITIAL_TEACHERS, INITIAL_CHAT } from '../../data/mockSchoolData';
import { 
  FileText, 
  Award, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  Upload, 
  Send, 
  ChevronRight, 
  TrendingUp, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  GraduationCap,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export interface StudentDashboardProps {
  student: Student;
  grades: SubjectGrade[];
  assignments: Assignment[];
  chatMessages?: ChatMessage[];
  onSubmitAssignment?: (assignmentId: string) => void;
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
  onNavigateToAcademics?: () => void;
  onNavigateToChat?: () => void;
  onNavigateToSchedule?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  grades,
  assignments,
  chatMessages = INITIAL_CHAT,
  onSubmitAssignment,
  onSendMessage,
  onNavigateToAcademics,
  onNavigateToChat,
  onNavigateToSchedule
}) => {
  // Assignment filter state
  const [assignmentFilter, setAssignmentFilter] = useState<'pending' | 'submitted' | 'all'>('pending');
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submittedSuccessId, setSubmittedSuccessId] = useState<string | null>(null);

  // Quick-Chat state
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('TCH-01');
  const [quickMessageText, setQuickMessageText] = useState<string>('');
  const [justSentFeedback, setJustSentFeedback] = useState<boolean>(false);

  const selectedTeacher = INITIAL_TEACHERS.find(t => t.id === selectedTeacherId) || INITIAL_TEACHERS[0];

  // Derived calculations
  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const submittedAssignments = assignments.filter(a => a.status !== 'pending');

  const filteredAssignments = assignments.filter(a => {
    if (assignmentFilter === 'pending') return a.status === 'pending';
    if (assignmentFilter === 'submitted') return a.status !== 'pending';
    return true;
  });

  const averageGradeScore = grades.length > 0 
    ? Math.round(grades.reduce((acc, curr) => acc + curr.score, 0) / grades.length) 
    : 0;

  // Handler for quick homework turn-in
  const handleTurnInAssignment = (id: string) => {
    if (!onSubmitAssignment) return;
    setSubmittingId(id);
    setTimeout(() => {
      onSubmitAssignment(id);
      setSubmittingId(null);
      setSubmittedSuccessId(id);
      setTimeout(() => setSubmittedSuccessId(null), 3000);
    }, 850);
  };

  // Handler for sending quick chat message
  const handleSendQuickMessage = (customText?: string) => {
    const textToSend = (customText || quickMessageText).trim();
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

    setQuickMessageText('');
    setJustSentFeedback(true);
    setTimeout(() => setJustSentFeedback(false), 2500);
  };

  // Filter messages specifically for the selected teacher and this student
  const teacherMessages = chatMessages.filter(
    m => m.channel === 'teacher_student' &&
      (m.teacherId === selectedTeacher.id ||
       m.recipientName?.includes(selectedTeacher.name) ||
       m.senderName?.includes(selectedTeacher.name))
  );

  return (
    <div className="space-y-4">
      {/* 1. Academic Performance Summary KPI Strip */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-indigo-500/30 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Cumulative GPA</span>
            <span className="text-[10px] text-emerald-400 font-semibold">Honors</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white tabular-nums">
              {student.currentGpa.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 4.00</span>
          </div>
          <div className="mt-2 pt-2 border-t border-indigo-500/20 text-[11px] text-indigo-300 flex items-center justify-between">
            <span>Average Score:</span>
            <span className="font-bold tabular-nums">{averageGradeScore}%</span>
          </div>
        </div>

        <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Coursework</span>
            <span className="text-[10px] text-amber-400 font-semibold">{pendingAssignments.length} Due</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white tabular-nums">
              {pendingAssignments.length}
            </span>
            <span className="text-xs text-slate-400">Pending</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center justify-between">
            <span>Turned In:</span>
            <span className="font-bold tabular-nums">{submittedAssignments.length} Done</span>
          </div>
        </div>
      </div>

      {/* Global submission notification */}
      {submittedSuccessId && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Assignment uploaded successfully and logged in teacher gradebook.</span>
        </div>
      )}

      {/* 2. SECTION: CURRENT ASSIGNMENTS */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Current Assignments</h3>
              <p className="text-[10px] text-slate-400">
                {pendingAssignments.length} pending · {submittedAssignments.length} submitted
              </p>
            </div>
          </div>

          {onNavigateToAcademics && (
            <button 
              type="button"
              onClick={onNavigateToAcademics}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <span>All Tasks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setAssignmentFilter('pending')}
            className={`flex-1 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              assignmentFilter === 'pending'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pending ({pendingAssignments.length})
          </button>
          <button
            type="button"
            onClick={() => setAssignmentFilter('submitted')}
            className={`flex-1 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              assignmentFilter === 'submitted'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Completed ({submittedAssignments.length})
          </button>
          <button
            type="button"
            onClick={() => setAssignmentFilter('all')}
            className={`flex-1 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              assignmentFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({assignments.length})
          </button>
        </div>

        {/* Assignments List */}
        <div className="space-y-2">
          {filteredAssignments.length === 0 ? (
            <div className="p-4 text-center rounded-xl bg-slate-950/60 border border-slate-800/60 text-slate-500 text-xs">
              No assignments found in this view.
            </div>
          ) : (
            filteredAssignments.slice(0, 3).map((asn) => {
              const isPending = asn.status === 'pending';
              const isSubmitting = submittingId === asn.id;

              return (
                <div
                  key={asn.id}
                  className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-indigo-400">{asn.subject}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400 text-[11px]">{asn.teacherName}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{asn.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{asn.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-slate-300 block">
                        {asn.totalScore} pts
                      </span>
                      {isPending ? (
                        <span className="text-[10px] text-amber-400 flex items-center justify-end gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{asn.dueDate}</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                          <CheckCircle className="w-3 h-3" />
                          <span>Score: {asn.obtainedScore ?? asn.totalScore}/{asn.totalScore}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submission Action Bar */}
                  {isPending && onSubmitAssignment && (
                    <div className="mt-2.5 pt-2 border-t border-slate-900 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-slate-500" />
                        Due {asn.dueDate} · {asn.dueTime}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleTurnInAssignment(asn.id)}
                        disabled={isSubmitting}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs disabled:opacity-50"
                      >
                        <Upload className="w-3 h-3" />
                        <span>{isSubmitting ? 'Uploading...' : 'Turn In Work'}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 3. SECTION: RECENT GRADES & EVALUATION */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Subject Grades</h3>
              <p className="text-[10px] text-slate-400">Current semester academic standings</p>
            </div>
          </div>

          {onNavigateToAcademics && (
            <button 
              type="button"
              onClick={onNavigateToAcademics}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <span>Full Report</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Grades List Snapshot */}
        <div className="space-y-2.5">
          {grades.slice(0, 3).map((gr, idx) => (
            <div 
              key={idx}
              className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{gr.subject}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">({gr.code})</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Instructor: {gr.teacher}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-white tabular-nums block">{gr.score}%</span>
                    <span className="text-[10px] text-slate-400">{gr.credits} cr</span>
                  </div>
                  <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-xs font-extrabold">
                    {gr.letterGrade}
                  </span>
                </div>
              </div>

              {/* Score bar */}
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    gr.score >= 90 ? 'bg-emerald-400' :
                    gr.score >= 80 ? 'bg-indigo-400' : 'bg-amber-400'
                  }`}
                  style={{ width: `${Math.min(100, gr.score)}%` }}
                />
              </div>

              {/* Teacher remark quote */}
              {gr.comments && (
                <div className="text-[11px] text-slate-300 italic bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
                  &ldquo;{gr.comments}&rdquo;
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECTION: QUICK-CHAT WITH TEACHERS */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Quick Teacher Q&A</h3>
              <p className="text-[10px] text-slate-400">Ask questions directly to subject instructors</p>
            </div>
          </div>

          {onNavigateToChat && (
            <button
              type="button"
              onClick={onNavigateToChat}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <span>Full Inbox</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Teacher Selection Carousel */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Select Instructor:
          </span>
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
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-indigo-500/40"
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

        {/* Active Conversation Snippet */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-900 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{selectedTeacher.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">({selectedTeacher.subjectName})</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">Available</span>
          </div>

          {/* Recent 2 messages preview */}
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-0.5">
            {teacherMessages.length === 0 ? (
              <div className="py-3 text-center text-slate-500 text-xs">
                No recent messages with {selectedTeacher.name}. Use the quick prompts below to send a question.
              </div>
            ) : (
              teacherMessages.slice(-2).map((msg) => {
                const isStudent = msg.senderRole === 'student';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[90%] p-2 rounded-xl text-xs leading-relaxed ${
                        isStudent
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-900 text-slate-200 border border-slate-800'
                      }`}
                    >
                      <div className="text-[9px] opacity-75 font-semibold mb-0.5">
                        {isStudent ? 'You' : selectedTeacher.name.split(' ')[0]}
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

          {/* Quick Reply Prompts */}
          <div className="pt-2 border-t border-slate-900">
            <span className="text-[10px] text-slate-400 font-medium block mb-1.5">
              Quick Inquiries:
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              <button
                type="button"
                onClick={() => handleSendQuickMessage(`Assalamu alaikum teacher! Could you clarify the guidelines for our upcoming assignment?`)}
                className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer transition-colors"
              >
                📖 Assignment clarification
              </button>
              <button
                type="button"
                onClick={() => handleSendQuickMessage(`Can I schedule 10 minutes to review my recent grade and teacher comments?`)}
                className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer transition-colors"
              >
                📝 Review grade comments
              </button>
              <button
                type="button"
                onClick={() => handleSendQuickMessage(`What chapters should we focus on for the midterm assessment?`)}
                className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500 rounded-lg text-[10px] text-slate-300 hover:text-white shrink-0 cursor-pointer transition-colors"
              >
                🎯 Midterm preparation
              </button>
            </div>
          </div>

          {/* Quick Message Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuickMessage();
            }}
            className="flex gap-2 pt-2 border-t border-slate-900"
          >
            <input
              type="text"
              value={quickMessageText}
              onChange={(e) => setQuickMessageText(e.target.value)}
              placeholder={`Ask ${selectedTeacher.name.split(' ')[0]} a question...`}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!quickMessageText.trim()}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl cursor-pointer flex items-center justify-center transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {justSentFeedback && (
            <p className="text-[10px] text-emerald-400 font-medium animate-in fade-in">
              ✓ Message delivered to {selectedTeacher.name}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
