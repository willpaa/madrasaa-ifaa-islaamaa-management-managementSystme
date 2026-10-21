import React, { useState } from 'react';
import { Student } from '../../types/school';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Radio, 
  ShieldAlert, 
  CheckCircle, 
  Search, 
  Filter, 
  Award, 
  FileText,
  AlertOctagon,
  Printer,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  BellRing,
  GraduationCap
} from 'lucide-react';

interface AdminPortalProps {
  students: Student[];
  onTriggerEmergencyBroadcast: (title: string, message: string) => void;
  onOpenPerformanceReports?: (studentId?: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  students,
  onTriggerEmergencyBroadcast,
  onOpenPerformanceReports
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'directory' | 'reports' | 'broadcast'>('overview');
  const [selectedStage, setSelectedStage] = useState<'all' | 'primary' | 'middle' | 'high'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('Campus Weather Alert: Early Dismissal 1:00 PM');
  const [broadcastMessage, setBroadcastMessage] = useState('Heavy snowfall forecasted across northern district. Buses will depart campus at 1:00 PM today.');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedStage === 'primary') return matchesSearch && s.grade <= 5;
    if (selectedStage === 'middle') return matchesSearch && s.grade >= 6 && s.grade <= 8;
    if (selectedStage === 'high') return matchesSearch && s.grade >= 9;
    return matchesSearch;
  });

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    onTriggerEmergencyBroadcast(broadcastTitle, broadcastMessage);
    setShowBroadcastModal(false);
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Principal Command</h2>
              <p className="text-[10px] text-slate-400">Madrasaa Ifaa Islaamaa (Gr 1-12)</p>
            </div>
          </div>
          <button
            onClick={() => setShowBroadcastModal(true)}
            className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold rounded-xl flex items-center gap-1 shadow-md shadow-rose-600/30 cursor-pointer transition-colors"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Alert</span>
          </button>
        </div>

        {/* Global KPIs Header Triad */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Students</span>
            <div className="text-sm font-bold text-white mt-0.5">1,248</div>
            <span className="text-[10px] text-indigo-400">Grades 1-12</span>
          </div>

          <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Attendance</span>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">96.8%</div>
            <span className="text-[10px] text-emerald-500 font-medium">Above SLA</span>
          </div>

          <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Fees YTD</span>
            <div className="text-sm font-bold text-amber-400 mt-0.5">$1.84M</div>
            <span className="text-[10px] text-slate-400">92% Collected</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {broadcastSent && (
          <div className="p-3 bg-rose-950/90 border border-rose-500/60 rounded-xl text-rose-200 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <div className="font-bold">Priority Broadcast Dispatched!</div>
              <div className="text-[10px] text-rose-300">Pushed to 1,248 parents, 78 faculty, and SMS emergency gate.</div>
            </div>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Quick Action: PDF Reports Banner */}
            {onOpenPerformanceReports && (
              <div className="p-4 bg-gradient-to-r from-indigo-950/70 to-slate-900 border border-indigo-500/40 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block">
                  Registrar Academic Dossiers
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  Official PDF Performance Reports
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Generate certified semester transcripts summarizing grades, attendance history, and recent assignment completion.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => onOpenPerformanceReports()}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/30 transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Launch PDF Report Center</span>
                  </button>
                </div>
              </div>
            )}

            {/* Daily Operational Health */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Today&apos;s Campus Health &amp; Operations
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Homeroom Attendance</span>
                  <span className="font-bold text-emerald-400">100% Rosters Synced</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Active Faculty</span>
                  <span className="font-bold text-white">76 of 78 on Campus</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Transit Bus Fleet</span>
                  <span className="font-bold text-emerald-400">All 8 Routes On Time</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Clinic Patient Slips</span>
                  <span className="font-bold text-indigo-300">3 Visits Logged</span>
                </div>
              </div>
            </div>

            {/* Admissions Queue Teaser */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Admissions Pipeline (2026-2027)</span>
                <span className="text-indigo-400 font-medium">18 Pending</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                4 Kindergarten applications, 8 High School AP transfers awaiting verification.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: DIRECTORY */}
        {activeTab === 'directory' && (
          <div className="space-y-4">
            {/* Grade Level Filter Tabs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Student Directory &amp; Transcripts
                </h4>
                <span className="text-[11px] text-slate-400">{filteredStudents.length} Students Listed</span>
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => setSelectedStage('all')}
                  className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                    selectedStage === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  All (1-12)
                </button>
                <button
                  onClick={() => setSelectedStage('primary')}
                  className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                    selectedStage === 'primary' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Primary (1-5)
                </button>
                <button
                  onClick={() => setSelectedStage('middle')}
                  className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                    selectedStage === 'middle' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Middle (6-8)
                </button>
                <button
                  onClick={() => setSelectedStage('high')}
                  className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                    selectedStage === 'high' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  High School (9-12)
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, grade, or roll number..."
                className="w-full bg-slate-900 border border-slate-800 pl-9 pr-3 py-2 text-xs text-white rounded-xl placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Student Records List with Report Quick-Launch */}
            <div className="space-y-2">
              {filteredStudents.map((st) => (
                <div 
                  key={st.id} 
                  className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={st.avatar} alt={st.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold text-white">{st.name}</h5>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300">
                          Grade {st.grade}-{st.section}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        GPA: <strong className="text-white">{st.currentGpa.toFixed(2)}</strong> • Att: <strong className="text-emerald-400">{st.attendanceRate}%</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {onOpenPerformanceReports && (
                      <button
                        onClick={() => onOpenPerformanceReports(st.id)}
                        className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
                        title="Generate PDF Performance Report"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Report</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PDF REPORTS LAUNCHER */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 mx-auto flex items-center justify-center">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">
                Academic Performance Reports Suite
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Generate official certified PDF transcripts for individual students or comprehensive school-wide master performance dossiers for Madrasaa Ifaa Islaamaa.
              </p>
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => onOpenPerformanceReports?.('STU-101')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open Individual Student Dossier</span>
                </button>

                <button
                  onClick={() => onOpenPerformanceReports?.()}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Open All-Students Master Report</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CAMPUS BROADCAST */}
        {activeTab === 'broadcast' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-2 text-rose-400 mb-2">
                <ShieldAlert className="w-5 h-5" />
                <h4 className="text-sm font-bold text-white font-heading">Campus Broadcast Dispatcher</h4>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Send urgent closure alerts or school-wide notices directly to 1,248 families and 78 faculty devices.
              </p>

              <form onSubmit={handleSendBroadcast} className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Alert Title</label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Message Body</label>
                  <textarea
                    rows={3}
                    required
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-600/30"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Dispatch Campus-Wide Alert</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Emergency Broadcast Trigger */}
      {showBroadcastModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form 
            onSubmit={handleSendBroadcast}
            className="bg-slate-900 border border-rose-500/50 p-5 rounded-2xl max-w-xs w-full shadow-2xl space-y-3"
          >
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
              <h4 className="text-sm font-bold text-white">Emergency Campus Broadcast</h4>
            </div>
            <p className="text-[11px] text-slate-400">
              High priority alert will push immediately to all Grades 1-12 parents and staff devices.
            </p>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-semibold">Broadcast Title</label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2 rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-semibold">Message Body</label>
              <textarea
                required
                rows={3}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2 rounded-lg mt-1"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBroadcastModal(false)}
                className="flex-1 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg cursor-pointer"
              >
                Dispatch Alert
              </button>
            </div>
          </form>
        </div>
      )}

      {/* INTERACTIVE BOTTOM NAVIGATION BAR FOR ADMIN PORTAL */}
      <div className="h-14 bg-slate-950/95 border-t border-slate-800 flex items-center justify-around px-2 z-20 shrink-0">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'overview' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'directory' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Students</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'reports' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>PDF Reports</span>
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'broadcast' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <BellRing className="w-4 h-4" />
          <span>Alerts</span>
        </button>
      </div>
    </div>
  );
};
