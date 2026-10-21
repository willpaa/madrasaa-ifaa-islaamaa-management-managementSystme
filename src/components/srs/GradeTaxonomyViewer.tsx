import React, { useState } from 'react';
import { GLOBAL_GRADE_TAXONOMY } from '../../data/srsData';
import { 
  Globe, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  HelpCircle,
  School,
  Check
} from 'lucide-react';

export const GradeTaxonomyViewer: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<'us' | 'uk' | 'ib' | 'asia'>('us');

  const globalSystems = [
    {
      id: 'us',
      name: 'US / North American K-12',
      standards: 'Common Core, NGSS, AP (College Board)',
      primary: 'Elementary (Grades 1-5, Ages 6-11)',
      middle: 'Middle School / Junior High (Grades 6-8, Ages 11-14)',
      high: 'High School (Grades 9-12, Ages 14-18)',
      grading: 'GPA 4.0 / 5.0 (Weighted Honors & AP), Letter Grades A-F',
      laws: 'FERPA, COPPA, Title IX, McKinney-Vento'
    },
    {
      id: 'uk',
      name: 'UK & Commonwealth System',
      standards: 'National Curriculum, Ofsted Framework, GCSE & A-Levels',
      primary: 'Primary Key Stages 1-2 (Year 1-6, Ages 5-11)',
      middle: 'Lower Secondary Key Stage 3 (Year 7-9, Ages 11-14)',
      high: 'Upper Secondary & Sixth Form (Year 10-13, GCSEs & A-Levels)',
      grading: 'Levels 9 to 1 (GCSE), Grades A* to E (A-Levels)',
      laws: 'UK GDPR, Keeping Children Safe in Education (KCSIE)'
    },
    {
      id: 'ib',
      name: 'International Baccalaureate (IB)',
      standards: 'Geneva IBO Continuum (PYP, MYP, DP, CP)',
      primary: 'Primary Years Programme (PYP: Grades 1-5)',
      middle: 'Middle Years Programme (MYP: Grades 6-10)',
      high: 'Diploma Programme (DP 1-2: Grades 11-12)',
      grading: 'Criterion Bands 1 to 7 with Core points (TOK & Extended Essay)',
      laws: 'International Cross-Border Student Data Governance'
    },
    {
      id: 'asia',
      name: 'Asian & European Boards (CBSE/ICSE/EU)',
      standards: 'CBSE, ICSE, Singapore MOE, French Baccalauréat',
      primary: 'Primary Wing (Standards 1-5, Foundation)',
      middle: 'Middle Stage (Standards 6-8, Multilingual)',
      high: 'Secondary & Senior Secondary (Standards 9-12, Board Exams)',
      grading: 'Continuous & Comprehensive Evaluation (CCE), Marks & Percentiles',
      laws: 'National Education Policies (NEP 2020), Local Child Protection'
    }
  ];

  const currentSystem = globalSystems.find(s => s.id === selectedSystem) || globalSystems[0];

  const gradeMatrix = [
    { feature: "Student Mobile Login App", gr15: "Parent-managed (No student phone)", gr68: "Optional / Monitored", gr912: "Full Student Self-Service" },
    { feature: "Attendance Notification", gr15: "Immediate SMS + Guardian Push", gr68: "App Push + Email", gr912: "Student + Parent Push" },
    { feature: "Grading Model", gr15: "Qualitative (Exceeds / Meets / Badges)", gr68: "Letter Grades (A-F) + Rubrics", gr912: "Weighted GPA (4.0 / 5.0) + Transcripts" },
    { feature: "Live School Bus GPS Tracking", gr15: "Mandatory (Geo-fence & QR Pickup)", gr68: "Standard Route Tracking", gr912: "Self-Commute or Bus Pass" },
    { feature: "Homework & Lab Submissions", gr15: "Paper-based or Parent Upload", gr68: "In-App PDF / Camera scan", gr912: "Multi-file LMS, Code, Rubric annotations" },
    { feature: "Direct Teacher Messaging", gr15: "Parent ➔ Homeroom Teacher only", gr68: "Parent ➔ Subject Teachers", gr912: "Student & Parent ➔ Faculty & Counselors" },
    { feature: "Tuition Invoicing & Payments", gr15: "Tuition + Meals + Activity Fees", gr68: "Tuition + Clubs + Field Trips", gr912: "Tuition + AP Exam Fees + College Apps" }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">
            Global K-12 Educational Taxonomy &amp; World School Analysis
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Schools worldwide span Grades 1 to 12 under distinct curricula. EduPulse reconciles these global frameworks into a single unified mobile data model and role-based UX.
        </p>

        {/* Global System Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {globalSystems.map((sys) => (
            <button
              key={sys.id}
              onClick={() => setSelectedSystem(sys.id as any)}
              className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                selectedSystem === sys.id
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="font-bold">{sys.name}</div>
              <div className={`text-[10px] mt-0.5 ${selectedSystem === sys.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                {sys.standards.split(',')[0]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected System Breakdown */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">{currentSystem.name}</h3>
            <p className="text-xs text-slate-400">{currentSystem.standards}</p>
          </div>
          <span className="px-2.5 py-1 bg-slate-800 text-indigo-300 text-xs font-mono rounded-lg">
            Regulations: {currentSystem.laws}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
              Primary Stage (Gr 1-5)
            </span>
            <div className="text-xs font-bold text-white">{currentSystem.primary}</div>
            <p className="text-[11px] text-slate-400 mt-2">
              Foundations in language arts, elementary mathematics, social development, and physical education.
            </p>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Middle Stage (Gr 6-8)
            </span>
            <div className="text-xs font-bold text-white">{currentSystem.middle}</div>
            <p className="text-[11px] text-slate-400 mt-2">
              Transitional departmentalized courses: Pre-algebra, Earth &amp; Life sciences, Civics, Foreign languages.
            </p>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Secondary / High School (Gr 9-12)
            </span>
            <div className="text-xs font-bold text-white">{currentSystem.high}</div>
            <p className="text-[11px] text-slate-400 mt-2">
              Credit-bearing graduation requirements, standardized test tracking, and GPA calculations.
            </p>
          </div>
        </div>
      </div>

      {/* Stage-by-Stage Mobile App Requirements Differential Table */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white">
          Grade 1-12 Mobile Capability Matrix
        </h3>
        <p className="text-xs text-slate-400">
          How mobile app features adjust automatically based on the enrolled child&apos;s grade level:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-2.5 pr-4">Feature Domain</th>
                <th className="py-2.5 px-3 text-indigo-300">Primary (Grades 1-5)</th>
                <th className="py-2.5 px-3 text-emerald-300">Middle (Grades 6-8)</th>
                <th className="py-2.5 pl-3 text-amber-300">High School (Grades 9-12)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {gradeMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-950/40">
                  <td className="py-3 pr-4 font-bold text-slate-200">{row.feature}</td>
                  <td className="py-3 px-3 text-slate-300">{row.gr15}</td>
                  <td className="py-3 px-3 text-slate-300">{row.gr68}</td>
                  <td className="py-3 pl-3 text-slate-300">{row.gr912}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Grade Taxonomy Detailed Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">
          Pedagogical &amp; Operational Profiles Across Stages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GLOBAL_GRADE_TAXONOMY.map((stage, i) => (
            <div key={i} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                  {stage.grades}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{stage.stage}</h4>
                <p className="text-xs text-indigo-200 mt-2 p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20">
                  Focus: {stage.focus}
                </p>

                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  {stage.appCharacteristics.map((char, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{char}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
