import React, { useState } from 'react';
import { 
  Student, 
  AttendanceRecord, 
  Assignment 
} from '../../types/school';
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
  MessageSquare
} from 'lucide-react';

interface TeacherPortalProps {
  students: Student[];
  assignments: Assignment[];
  onAddAssignment: (assignment: Partial<Assignment>) => void;
  onRecordAttendance: (records: AttendanceRecord[]) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  students,
  assignments,
  onAddAssignment,
  onRecordAttendance
}) => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'gradebook' | 'assignments' | 'broadcast'>('attendance');
  
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('AP Biology');
  const [newPoints, setNewPoints] = useState(50);
  const [newDueDate, setNewDueDate] = useState('2026-10-28');

  // Teacher Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('Biology Lab Prep for Friday');
  const [broadcastText, setBroadcastText] = useState('Please remind students to bring their lab goggles and aprons for the enzyme kinetics experiment.');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const grade10Students = students.filter(s => s.grade === 10);

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
        recordedBy: 'Dr. Evelyn Vance',
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
      teacherName: 'Dr. Evelyn Vance',
      description: 'Review the chapter lab guidelines and submit through student portal.'
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
    <div className="flex-1 flex flex-col justify-between">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 bg-gradient-to-b from-indigo-950/80 to-slate-950 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              EV
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Dr. Evelyn Vance</h2>
              <p className="text-[11px] text-slate-400 font-medium">Department Head • Grade 10-A Homeroom</p>
            </div>
          </div>

          <span className="px-2 py-0.5 text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full font-medium">
            Period 1 Active
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {attendanceSubmitted && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Attendance recorded! Parent SMS alerts queued.</span>
            </div>
          </div>
        )}

        {broadcastSuccess && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Class broadcast sent to Grade 10-A parents!</span>
          </div>
        )}

        {/* TAB 1: ATTENDANCE SHEET */}
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

        {/* TAB 2: GRADEBOOK */}
        {activeTab === 'gradebook' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">AP Biology Grade Distribution</span>
                <span className="text-emerald-400 font-medium">Class Avg: 92.4%</span>
              </div>
              <div className="mt-3 flex gap-1 h-3 rounded-full overflow-hidden bg-slate-800">
                <div style={{ width: '45%' }} className="bg-emerald-500" title="A Grade (45%)" />
                <div style={{ width: '35%' }} className="bg-indigo-500" title="B Grade (35%)" />
                <div style={{ width: '15%' }} className="bg-amber-500" title="C Grade (15%)" />
                <div style={{ width: '5%' }} className="bg-rose-500" title="D/F (5%)" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                <span>A: 45%</span>
                <span>B: 35%</span>
                <span>C: 15%</span>
                <span>Needs Help: 5%</span>
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Student Lab Evaluations
            </h4>
            <div className="space-y-2">
              {grade10Students.map(s => (
                <div key={s.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h5 className="text-xs font-bold text-white">{s.name}</h5>
                      <span className="text-[10px] text-slate-400">GPA: {s.currentGpa.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-slate-800 text-xs font-mono font-bold text-indigo-300">
                      {s.id === 'STU-101' ? '96/100 (A+)' : s.id === 'STU-104' ? '98/100 (A+)' : '88/100 (B+)'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ASSIGNMENTS & HOMEWORK */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Active Assignments
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
                  <p className="text-[10px] text-slate-400 mt-1">Due: {a.dueDate} ({a.dueTime})</p>
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
                <span className="text-[10px] text-indigo-300 font-mono">Grade 10-A (32 Families)</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Post notifications directly to all registered student and parent mobile portals.
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
      </div>

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
                placeholder="e.g. Enzyme Kinetics Lab Report"
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
                <option>AP Biology</option>
                <option>Science Discovery</option>
                <option>General Chemistry</option>
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
          onClick={() => setActiveTab('attendance')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'attendance' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>Attendance</span>
        </button>

        <button
          onClick={() => setActiveTab('gradebook')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'gradebook' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Gradebook</span>
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
