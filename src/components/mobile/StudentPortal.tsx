import React, { useState } from 'react';
import { 
  Student, 
  SubjectGrade, 
  Assignment, 
  TimetableSlot, 
  NoticeAnnouncement 
} from '../../types/school';
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
  AlertCircle
} from 'lucide-react';

interface StudentPortalProps {
  student: Student;
  grades: SubjectGrade[];
  assignments: Assignment[];
  timetable: TimetableSlot[];
  announcements: NoticeAnnouncement[];
  onSubmitAssignment: (assignmentId: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  student,
  grades,
  assignments,
  timetable,
  announcements,
  onSubmitAssignment
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'academics' | 'schedule' | 'idcard'>('home');
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);

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

        {/* TAB 1: HOME */}
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

            {/* Assignments Action Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  Pending Homework ({pendingAssignments.length})
                </h4>
                <button 
                  onClick={() => setActiveTab('academics')}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2">
                {pendingAssignments.slice(0, 2).map((asn) => (
                  <div 
                    key={asn.id}
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                          {asn.subject}
                        </span>
                        <h5 className="text-xs font-bold text-white mt-1.5">{asn.title}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          Due: {asn.dueDate} ({asn.dueTime})
                        </p>
                      </div>
                      <button
                        onClick={() => handleUploadClick(asn.id)}
                        disabled={submittingId === asn.id}
                        className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                      >
                        <Upload className="w-3 h-3" />
                        <span>{submittingId === asn.id ? 'Submitting...' : 'Turn In'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
