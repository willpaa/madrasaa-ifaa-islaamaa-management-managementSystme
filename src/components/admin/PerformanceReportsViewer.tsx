import React, { useState } from 'react';
import { Student } from '../../types/school';
import { STUDENT_REPORT_DOSSIERS, StudentReportDossier } from '../../data/studentReportData';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Award, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  QrCode, 
  ShieldCheck, 
  Users, 
  ChevronRight, 
  Filter, 
  Sparkles,
  BookOpen,
  ArrowRight,
  School,
  ExternalLink
} from 'lucide-react';

interface PerformanceReportsViewerProps {
  students: Student[];
  initialStudentId?: string;
  onClose?: () => void;
}

export const PerformanceReportsViewer: React.FC<PerformanceReportsViewerProps> = ({
  students,
  initialStudentId = 'STU-101',
  onClose
}) => {
  const [reportType, setReportType] = useState<'individual' | 'all_students'>('individual');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(initialStudentId);
  const [copied, setCopied] = useState(false);
  const [filterStage, setFilterStage] = useState<'all' | 'primary' | 'middle' | 'high'>('all');

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const dossier: StudentReportDossier = STUDENT_REPORT_DOSSIERS[selectedStudent.id] || STUDENT_REPORT_DOSSIERS['STU-101'];

  // Handle native browser print to PDF
  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    let text = `ACADEMIC PERFORMANCE REPORT - ${selectedStudent.name}\n`;
    text += `Madrasaa Ifaa Islaamaa • ${dossier.semester}\n`;
    text += `Grade: ${selectedStudent.grade}-${selectedStudent.section} | GPA: ${selectedStudent.currentGpa.toFixed(2)} | Standing: ${dossier.academicStanding}\n`;
    text += `Attendance: ${dossier.attendance.ratePercentage}% (${dossier.attendance.presentDays}/${dossier.attendance.totalSchoolDays} Days)\n`;
    text += `Coursework Completion: ${dossier.assignments.completionRate}% (Avg Score: ${dossier.assignments.averageScore}%)\n\n`;
    text += `SUBJECT GRADES:\n`;
    dossier.grades.forEach(g => {
      text += `- ${g.subject} (${g.code}): ${g.score}% [${g.letterGrade}] - ${g.comments}\n`;
    });
    text += `\nVerification Hash: ${dossier.verificationHash}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDossier = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dossier, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ReportCard_${selectedStudent.name.replace(/\s+/g, '_')}_Fall2026.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredStudents = students.filter(s => {
    if (filterStage === 'primary') return s.grade <= 5;
    if (filterStage === 'middle') return s.grade >= 6 && s.grade <= 8;
    if (filterStage === 'high') return s.grade >= 9;
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Action & Mode Switcher Bar */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Registrar Administrative Portal
            </span>
            <span className="text-xs text-slate-400 font-mono">Fall Semester 2026-2027</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 tracking-tight">
            Official Academic Performance Dossier System
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Generates certified PDF-standard transcripts summarizing grades, attendance history, and assignment metrics.
          </p>
        </div>

        {/* Mode Buttons & Print */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setReportType('individual')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                reportType === 'individual'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👤 Individual Student
            </button>
            <button
              onClick={() => setReportType('all_students')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                reportType === 'all_students'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👥 All Students Master Report
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/30 transition-all"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: INDIVIDUAL STUDENT PERFORMANCE REPORT (PDF-STYLE DOSSIER)          */}
      {/* ========================================================================= */}
      {reportType === 'individual' && (
        <div className="space-y-4">
          {/* Student Selector Quick Pills */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-3 overflow-x-auto print:hidden">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 ml-1">
              Select Student:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto">
              {students.map((st) => {
                const isSelected = st.id === selectedStudentId;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStudentId(st.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold shrink-0 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <img src={st.avatar} alt={st.name} className="w-5 h-5 rounded-full object-cover" />
                    <span>{st.name}</span>
                    <span className="text-[10px] font-mono opacity-80">(Gr {st.grade})</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopySummary}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
                title="Copy Text Summary"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleDownloadDossier}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
                title="Download JSON Dossier"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* OFFICIAL PDF-STYLE TRANSCRIPT CONTAINER */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-slate-100 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
            
            {/* Watermark Logo in Background */}
            <div className="absolute right-10 top-20 opacity-5 pointer-events-none select-none">
              <School className="w-96 h-96 text-indigo-400" />
            </div>

            {/* Official Header & Letterhead */}
            <div className="border-b-2 border-indigo-500/40 pb-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 p-3 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
                  <School className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white print:text-black">
                    Madrasaa Ifaa Islaamaa
                  </h1>
                  <p className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
                    Office of the Registrar &amp; Academic Dean • Grades 1–12 Global Campus
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5 print:text-slate-600">
                    Accreditation: Cognia Worldwide • IB World School #08429 • ISO 21001 Certified
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-right shrink-0">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 inline-block uppercase tracking-wider">
                  Official Performance Dossier
                </span>
                <div className="text-xs text-slate-400 font-mono mt-1.5">
                  Report Date: <strong className="text-white print:text-black">{dossier.reportDate}</strong>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Document ID: STU-REP-{selectedStudent.id}-2026
                </div>
              </div>
            </div>

            {/* Student Demographic & Standing Banner */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 print:bg-slate-100 print:border-slate-300">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedStudent.avatar} 
                  alt={selectedStudent.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-md"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Student Name</span>
                  <h3 className="text-base font-bold text-white print:text-black">{selectedStudent.name}</h3>
                  <span className="text-xs font-mono text-indigo-400">Roll #{selectedStudent.rollNumber}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Grade &amp; Section</span>
                <div className="text-sm font-bold text-slate-200 print:text-black">
                  Grade {selectedStudent.grade}-{selectedStudent.section} ({selectedStudent.grade <= 5 ? 'Primary Wing' : selectedStudent.grade <= 8 ? 'Middle Stage' : 'Senior High'})
                </div>
                <span className="text-xs text-slate-400">Homeroom: {selectedStudent.houseOrHomeroom}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Academic Standing</span>
                <div className="text-xs font-bold text-emerald-400 mt-0.5 print:text-emerald-700">
                  {dossier.academicStanding}
                </div>
                <span className="text-xs text-slate-400">Class Rank: <strong className="text-white print:text-black">{dossier.rankInClass}</strong></span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Parent / Guardian Link</span>
                <div className="text-xs font-semibold text-slate-200 print:text-black">{selectedStudent.parentName}</div>
                <span className="text-[11px] text-slate-400 font-mono">{selectedStudent.parentPhone}</span>
              </div>
            </div>

            {/* Core KPI Triad Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Gauge 1: Cumulative GPA */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 text-center flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Cumulative GPA (4.0 Scale)</span>
                <div className="my-2 flex items-center justify-center gap-2">
                  <Award className="w-6 h-6 text-indigo-400" />
                  <span className="text-3xl font-black text-white print:text-black">{selectedStudent.currentGpa.toFixed(2)}</span>
                </div>
                <div className="text-xs text-indigo-300 font-semibold">
                  Status: {selectedStudent.currentGpa >= 3.8 ? 'Summa Cum Laude / Honors' : selectedStudent.currentGpa >= 3.5 ? 'Magna Cum Laude' : 'Good Academic Standing'}
                </div>
              </div>

              {/* Gauge 2: Attendance Rate */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 text-center flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Semester Attendance Rate</span>
                <div className="my-2 flex items-center justify-center gap-2">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                  <span className="text-3xl font-black text-emerald-400 print:text-emerald-700">{dossier.attendance.ratePercentage}%</span>
                </div>
                <div className="text-xs text-emerald-300 font-semibold">
                  {dossier.attendance.presentDays} of {dossier.attendance.totalSchoolDays} Days Attended ({dossier.attendance.statusLabel})
                </div>
              </div>

              {/* Gauge 3: Coursework Completion */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/30 text-center flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Assignment Completion Rate</span>
                <div className="my-2 flex items-center justify-center gap-2">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                  <span className="text-3xl font-black text-amber-300 print:text-amber-700">{dossier.assignments.completionRate}%</span>
                </div>
                <div className="text-xs text-amber-300 font-semibold">
                  {dossier.assignments.submittedCount}/{dossier.assignments.totalAssigned} Work Items (Avg: {dossier.assignments.averageScore}%)
                </div>
              </div>
            </div>

            {/* SECTION 1: COURSE GRADES & ACADEMIC PERFORMANCE TABLE */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  1. Current Semester Subject Gradebook ({dossier.semester})
                </h4>
                <span className="text-xs text-slate-400 font-mono">Total Credits: 18.5 Credits</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 print:border-slate-300">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800 print:bg-slate-200 print:text-black">
                      <th className="py-2.5 px-3 font-semibold">Course Code &amp; Subject</th>
                      <th className="py-2.5 px-2 font-semibold">Faculty Educator</th>
                      <th className="py-2.5 px-2 font-semibold text-center">Credits</th>
                      <th className="py-2.5 px-2 font-semibold text-center">Score %</th>
                      <th className="py-2.5 px-2 font-semibold text-center">Letter</th>
                      <th className="py-2.5 px-3 font-semibold">Educator Qualitative Appraisal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 print:divide-slate-300">
                    {dossier.grades.map((gr, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="py-3 px-3 font-bold text-white print:text-black">
                          <div>{gr.subject}</div>
                          <div className="text-[10px] text-indigo-400 font-mono">{gr.code}</div>
                        </td>
                        <td className="py-3 px-2 text-slate-300 print:text-slate-700">{gr.teacher}</td>
                        <td className="py-3 px-2 text-center text-slate-400 font-mono">{gr.credits}</td>
                        <td className="py-3 px-2 text-center font-bold text-white font-mono print:text-black">
                          {gr.score}%
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            gr.letterGrade.startsWith('A')
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : gr.letterGrade.startsWith('B')
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {gr.letterGrade}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-300 text-[11px] italic leading-relaxed print:text-slate-800">
                          &ldquo;{gr.comments}&rdquo;
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 2: ATTENDANCE HISTORY BREAKDOWN */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  2. Attendance History &amp; Truancy Telemetry
                </h4>
                <span className="text-xs text-emerald-400 font-bold">
                  Status: {dossier.attendance.statusLabel} ({dossier.attendance.ratePercentage}%)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl print:bg-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Semester Days</span>
                  <div className="text-base font-bold text-white mt-0.5 print:text-black">{dossier.attendance.totalSchoolDays}</div>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl print:bg-slate-100">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold block">Days Present</span>
                  <div className="text-base font-bold text-emerald-400 mt-0.5 print:text-emerald-700">{dossier.attendance.presentDays}</div>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl print:bg-slate-100">
                  <span className="text-[10px] text-amber-400 uppercase font-bold block">Late Arrivals</span>
                  <div className="text-base font-bold text-amber-400 mt-0.5 print:text-amber-700">{dossier.attendance.lateDays}</div>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl print:bg-slate-100">
                  <span className="text-[10px] text-rose-400 uppercase font-bold block">Absences (Excused)</span>
                  <div className="text-base font-bold text-rose-300 mt-0.5 print:text-rose-700">{dossier.attendance.absentDays} ({dossier.attendance.excusedDays})</div>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl print:bg-slate-100">
                  <span className="text-[10px] text-indigo-400 uppercase font-bold block">Active Streak</span>
                  <div className="text-base font-bold text-indigo-300 mt-0.5 print:text-indigo-700">{dossier.attendance.streakDays} Days</div>
                </div>
              </div>

              {/* Monthly Attendance Progress Bars */}
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                  Monthly Longitudinal Attendance Record
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {dossier.attendance.monthlyLog.map((log, i) => (
                    <div key={i} className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="font-semibold text-slate-200">{log.month}</span>
                        <span className="text-emerald-400 font-bold">{log.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full" 
                          style={{ width: `${log.percentage}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">{log.present} of {log.total} school days</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 3: RECENT ASSIGNMENT PROGRESS */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
                  <Clock className="w-4 h-4 text-amber-400" />
                  3. Recent Assignment &amp; Coursework Progress
                </h4>
                <span className="text-xs text-amber-300 font-mono">
                  {dossier.assignments.submittedCount} Submitted • {dossier.assignments.pendingCount} Pending • {dossier.assignments.overdueCount} Overdue
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 print:border-slate-300">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800 print:bg-slate-200 print:text-black">
                      <th className="py-2.5 px-3 font-semibold">Assignment Title</th>
                      <th className="py-2.5 px-2 font-semibold">Subject</th>
                      <th className="py-2.5 px-2 font-semibold">Submission Date</th>
                      <th className="py-2.5 px-2 font-semibold text-center">Score / Max</th>
                      <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 print:divide-slate-300">
                    {dossier.assignments.recentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-900/40">
                        <td className="py-2.5 px-3 font-bold text-white print:text-black">
                          {item.title}
                        </td>
                        <td className="py-2.5 px-2 text-slate-300">{item.subject}</td>
                        <td className="py-2.5 px-2 text-slate-400 font-mono">{item.submittedDate}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-white font-mono print:text-black">
                          {item.score} / {item.maxScore} pts ({Math.round((item.score / item.maxScore) * 100)}%)
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {item.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 4: OFFICIAL REMARKS & FACULTY ENDORSEMENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 print:bg-slate-100 print:border-slate-300">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                  Academic Advisor Commentary
                </span>
                <p className="text-xs text-slate-300 italic leading-relaxed print:text-black">
                  &ldquo;{dossier.advisorRemark}&rdquo;
                </p>
                <div className="mt-2 text-[11px] font-semibold text-slate-400">
                  — {dossier.advisorName}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 print:bg-slate-100 print:border-slate-300">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">
                  Principal&apos;s Official Commendation
                </span>
                <p className="text-xs text-slate-300 italic leading-relaxed print:text-black">
                  &ldquo;{dossier.principalRemark}&rdquo;
                </p>
                <div className="mt-2 text-[11px] font-semibold text-slate-400">
                  — Dr. Arthur Pendelton, Head of School
                </div>
              </div>
            </div>

            {/* SECTION 5: OFFICIAL CRYPTOGRAPHIC VERIFICATION & SIGNATURES */}
            <div className="pt-6 border-t-2 border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* QR Verification */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white p-1.5 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                  <QrCode className="w-12 h-12 text-slate-950" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Cryptographically Signed Academic Dossier</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Hash: {dossier.verificationHash}
                  </div>
                  <div className="text-[9px] text-slate-500">
                    Scan QR to authenticate transcript validity on the Madrasaa Ifaa Islaamaa Registrar Portal.
                  </div>
                </div>
              </div>

              {/* Signature Blocks */}
              <div className="flex items-center gap-8 text-center">
                <div>
                  <div className="font-serif italic text-base text-indigo-300 font-bold border-b border-slate-700 pb-1 mb-1 print:text-black">
                    Arthur Pendelton, Ed.D.
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Dr. Arthur Pendelton
                  </div>
                  <div className="text-[9px] text-slate-500">Head of School / Principal</div>
                </div>

                <div>
                  <div className="font-serif italic text-base text-indigo-300 font-bold border-b border-slate-700 pb-1 mb-1 print:text-black">
                    Evelyn Vance, Ph.D.
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Dr. Evelyn Vance
                  </div>
                  <div className="text-[9px] text-slate-500">Dean of Academic Affairs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: ALL-STUDENTS MASTER PERFORMANCE DOSSIER (SCHOOL-WIDE LEDGER)       */}
      {/* ========================================================================= */}
      {reportType === 'all_students' && (
        <div className="space-y-6">
          {/* Executive Overview Statistics */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block">
                  Comprehensive Academic Ledger
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Fall Semester School-Wide Performance Audit (Grades 1–12)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Aggregated analytics across 1,248 enrolled students with individual cohort breakdowns.
                </p>
              </div>

              {/* Filter by Grade Stage */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setFilterStage('all')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                    filterStage === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All (Gr 1-12)
                </button>
                <button
                  onClick={() => setFilterStage('primary')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                    filterStage === 'primary' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Primary (1-5)
                </button>
                <button
                  onClick={() => setFilterStage('middle')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                    filterStage === 'middle' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Middle (6-8)
                </button>
                <button
                  onClick={() => setFilterStage('high')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                    filterStage === 'high' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  High School (9-12)
                </button>
              </div>
            </div>

            {/* School-Wide Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Cohort Sample</span>
                <div className="text-xl font-black text-white mt-1">{filteredStudents.length} Students</div>
                <span className="text-[10px] text-indigo-400">1,248 Total Campus</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mean Cumulative GPA</span>
                <div className="text-xl font-black text-indigo-300 mt-1">3.86 / 4.0</div>
                <span className="text-[10px] text-emerald-400">+0.12 vs Fall 2025</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mean Attendance Rate</span>
                <div className="text-xl font-black text-emerald-400 mt-1">96.5%</div>
                <span className="text-[10px] text-emerald-500">Above District SLA</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Assignment Compliance</span>
                <div className="text-xl font-black text-amber-300 mt-1">89.7%</div>
                <span className="text-[10px] text-slate-400">Term Average</span>
              </div>
            </div>
          </div>

          {/* Master Student Performance Table */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Student Roster Master Ledger ({filteredStudents.length} Students)
              </h4>
              <span className="text-xs text-slate-400">Click any row to view individual official dossier</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                    <th className="py-3 px-3 font-semibold">Student &amp; ID</th>
                    <th className="py-3 px-2 font-semibold">Grade &amp; Section</th>
                    <th className="py-3 px-2 font-semibold text-center">GPA</th>
                    <th className="py-3 px-2 font-semibold text-center">Attendance %</th>
                    <th className="py-3 px-2 font-semibold text-center">Assignments</th>
                    <th className="py-3 px-3 font-semibold">Academic Standing</th>
                    <th className="py-3 px-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredStudents.map((st) => {
                    const stDossier = STUDENT_REPORT_DOSSIERS[st.id] || STUDENT_REPORT_DOSSIERS['STU-101'];
                    return (
                      <tr 
                        key={st.id} 
                        className="hover:bg-slate-950/60 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedStudentId(st.id);
                          setReportType('individual');
                        }}
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <img src={st.avatar} alt={st.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700" />
                            <div>
                              <div className="font-bold text-white hover:text-indigo-400 transition-colors">{st.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">#{st.rollNumber}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-2 font-medium text-slate-300">
                          Grade {st.grade}-{st.section}
                        </td>

                        <td className="py-3 px-2 text-center">
                          <span className="font-bold text-indigo-300 font-mono text-xs">
                            {st.currentGpa.toFixed(2)}
                          </span>
                        </td>

                        <td className="py-3 px-2 text-center">
                          <span className={`font-bold font-mono text-xs ${
                            stDossier.attendance.ratePercentage >= 95 ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            {stDossier.attendance.ratePercentage}%
                          </span>
                          <span className="block text-[9px] text-slate-500">
                            {stDossier.attendance.presentDays}/{stDossier.attendance.totalSchoolDays}d
                          </span>
                        </td>

                        <td className="py-3 px-2 text-center">
                          <span className="font-mono text-slate-300 text-xs">
                            {stDossier.assignments.completionRate}%
                          </span>
                          <span className="block text-[9px] text-slate-500">
                            {stDossier.assignments.submittedCount}/{stDossier.assignments.totalAssigned}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            stDossier.academicStanding.includes('High Honors') || stDossier.academicStanding.includes('Valedictorian')
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : stDossier.academicStanding.includes('Distinguished') || stDossier.academicStanding.includes('Summa')
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {stDossier.academicStanding.split('(')[0].trim()}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudentId(st.id);
                              setReportType('individual');
                            }}
                            className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Dossier</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
