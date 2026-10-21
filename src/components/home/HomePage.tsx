import React from 'react';
import { UserRole, NoticeAnnouncement } from '../../types/school';
import { 
  School, 
  Smartphone, 
  FileText, 
  Printer, 
  Workflow, 
  GitCommit, 
  Boxes, 
  Globe, 
  Users, 
  Award, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Bell, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Coffee,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface HomePageProps {
  announcements: NoticeAnnouncement[];
  onNavigate: (view: 'mobile_app' | 'srs_doc' | 'use_cases' | 'sequences' | 'design_patterns' | 'grade_taxonomy' | 'performance_reports' | 'login') => void;
  onSelectRoleAndOpenApp: (role: UserRole) => void;
  isAuthenticated: boolean;
  currentUserRole?: UserRole;
  currentUserName?: string;
  onLogout: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  announcements,
  onNavigate,
  onSelectRoleAndOpenApp,
  isAuthenticated,
  currentUserRole,
  currentUserName,
  onLogout
}) => {
  return (
    <div className="space-y-10 max-w-6xl mx-auto py-2">
      
      {/* 1. HERO INSTITUTIONAL BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 p-8 sm:p-12 shadow-2xl">
        {/* Glow & radial blur background assets */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Academic Year 2026–2027 • Fall Semester Active</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading leading-tight">
            Madrasaa Ifaa Islaamaa{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
              K–12 Digital Campus
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
            Welcome to the centralized mobile and administrative portal for Grades 1 through 12. Providing unified student information, live attendance telemetry, real-time parent messaging, and certified PDF academic dossiers.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('mobile_app')}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Launch Mobile Simulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('performance_reports')}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 border border-slate-700 cursor-pointer transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>PDF Performance Reports</span>
            </button>

            <button
              onClick={() => onNavigate('srs_doc')}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-xs sm:text-sm rounded-xl border border-slate-800 cursor-pointer transition-colors"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Full SRS Specification</span>
            </button>
          </div>
        </div>

        {/* Live Campus Telemetry Pill in Bottom Right */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Campus Status</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Bell Period 2 Active
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Today&apos;s Attendance</span>
            <span className="text-white font-bold font-mono mt-0.5">96.8% (Target: 95%)</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Total Enrollment</span>
            <span className="text-white font-bold font-mono mt-0.5">1,248 Students (Gr 1-12)</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Accreditation</span>
            <span className="text-indigo-300 font-semibold mt-0.5">Cognia • IB Continuum</span>
          </div>
        </div>
      </div>

      {/* 2. ROLE LAUNCHPAD CARDS (1-CLICK ENTRY) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight font-heading">
              Select Your Portal Experience
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Test the dedicated mobile features crafted for each school stakeholder role:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Student */}
          <div 
            onClick={() => onSelectRoleAndOpenApp('student')}
            className="p-5 bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                🎒
              </div>
              <h3 className="text-base font-bold text-white font-heading">Student Portal</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Period timetable, GPA progress (3.92 A+), digital NFC student ID badge, and homework submission.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-400 font-semibold">
              <span>Demo as Sophia (Gr 10)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Parent */}
          <div 
            onClick={() => onSelectRoleAndOpenApp('parent')}
            className="p-5 bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                👨‍👩‍👧
              </div>
              <h3 className="text-base font-bold text-white font-heading">Parent Portal</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Multi-child switcher, live school bus GPS ETA, tuition checkout with instant receipts, and teacher chat.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Demo as David Chen</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Teacher */}
          <div 
            onClick={() => onSelectRoleAndOpenApp('teacher')}
            className="p-5 bg-slate-900 border border-slate-800 hover:border-amber-500/60 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                👩‍🏫
              </div>
              <h3 className="text-base font-bold text-white font-heading">Faculty &amp; Teacher</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                One-tap attendance sheet, offline classroom sync, lab rubric gradebook, and parent broadcast notices.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>Demo as Dr. Evelyn Vance</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Administrator */}
          <div 
            onClick={() => onSelectRoleAndOpenApp('admin')}
            className="p-5 bg-slate-900 border border-slate-800 hover:border-rose-500/60 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-xl mb-3 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                🏫
              </div>
              <h3 className="text-base font-bold text-white font-heading">Principal Command</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                School-wide KPIs, emergency broadcast system, PDF performance dossier generator, and admissions queue.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-rose-400 font-semibold">
              <span>Demo as Principal Pendelton</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. TODAY'S CAMPUS BRIEFING & ANNOUNCEMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Campus Life & Schedule Highlights */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Daily Campus Schedule
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
              <span className="text-[10px] text-indigo-400 font-mono font-semibold block">08:00 – 08:25 AM</span>
              <div className="font-bold text-white mt-0.5">Homeroom &amp; Attendance Check-In</div>
              <span className="text-[11px] text-slate-400">All Grades 1-12 • Automated Parent Alerts</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-indigo-500/40 border-l-4">
              <span className="text-[10px] text-emerald-400 font-mono font-semibold block">10:00 – 11:15 AM (NOW)</span>
              <div className="font-bold text-white mt-0.5">Period 2: Pre-Calculus &amp; STEM Labs</div>
              <span className="text-[11px] text-slate-400">High School Wing • Room 204</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
              <span className="text-[10px] text-amber-400 font-mono font-semibold block">12:00 – 01:15 PM</span>
              <div className="font-bold text-white mt-0.5 flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-amber-400" />
                <span>Cafeteria Farm-to-Table Lunch</span>
              </div>
              <span className="text-[11px] text-slate-400">Lemon Herb Chicken / Quinoa Bowl</span>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Live Announcements Bulletin */}
        <div className="md:col-span-2 p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                Campus Bulletin Board ({announcements.length} Active)
              </h3>
            </div>
            <span className="text-xs text-indigo-400 font-medium">Updated 15 mins ago</span>
          </div>

          <div className="space-y-3">
            {announcements.map((item) => (
              <div key={item.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.category === 'Urgent'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : item.category === 'Academic'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {item.category}
                    </span>
                    <span className="font-semibold text-slate-300">{item.sender}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{item.date}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. ARCHITECTURE & SPECIFICATION SUITE SHORTCUTS */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Technical Documentation &amp; Architecture Blueprints
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <button
            onClick={() => onNavigate('srs_doc')}
            className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-left cursor-pointer transition-colors"
          >
            <FileText className="w-4 h-4 text-indigo-400 mb-1" />
            <div className="font-bold text-white">Full SRS Specification</div>
            <div className="text-[10px] text-slate-400">IEEE 29148 Standard</div>
          </button>

          <button
            onClick={() => onNavigate('use_cases')}
            className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-left cursor-pointer transition-colors"
          >
            <Workflow className="w-4 h-4 text-indigo-400 mb-1" />
            <div className="font-bold text-white">UML Use Cases</div>
            <div className="text-[10px] text-slate-400">Actor boundaries &amp; flows</div>
          </button>

          <button
            onClick={() => onNavigate('sequences')}
            className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-left cursor-pointer transition-colors"
          >
            <GitCommit className="w-4 h-4 text-indigo-400 mb-1" />
            <div className="font-bold text-white">Sequence Diagrams</div>
            <div className="text-[10px] text-slate-400">Step-by-step playback</div>
          </button>

          <button
            onClick={() => onNavigate('design_patterns')}
            className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-left cursor-pointer transition-colors"
          >
            <Boxes className="w-4 h-4 text-indigo-400 mb-1" />
            <div className="font-bold text-white">Design Patterns</div>
            <div className="text-[10px] text-slate-400">Clean Architecture + MVVM</div>
          </button>
        </div>
      </div>
    </div>
  );
};
