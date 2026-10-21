import React, { useState } from 'react';
import { 
  FUNCTIONAL_REQUIREMENTS, 
  NON_FUNCTIONAL_REQUIREMENTS, 
  REQUIREMENTS_GATHERING_METHODOLOGY,
  SRS_METADATA 
} from '../../data/srsData';
import { FunctionalRequirement, NonFunctionalRequirement } from '../../types/school';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Download, 
  Copy, 
  Check, 
  Filter, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const SrsViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  const [expandedReq, setExpandedReq] = useState<string | null>(null);

  const categories = ['All', 'Academics', 'Attendance', 'Grading', 'Communication', 'Finance', 'Safety & Transport', 'Security & RBAC', 'Administration'];

  const filteredFR = FUNCTIONAL_REQUIREMENTS.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || req.category === selectedCategory;
    const matchesPriority = selectedPriority === 'All' || req.priority === selectedPriority;
    return matchesSearch && matchesCat && matchesPriority;
  });

  const handleCopySRS = () => {
    let md = `# ${SRS_METADATA.documentTitle}\n\n`;
    md += `**System**: ${SRS_METADATA.systemName}\n`;
    md += `**Standard**: ${SRS_METADATA.standard}\n`;
    md += `**Scope**: ${SRS_METADATA.gradeScope}\n\n`;
    md += `## Functional Requirements\n\n`;
    FUNCTIONAL_REQUIREMENTS.forEach(fr => {
      md += `### [${fr.id}] ${fr.title} (${fr.priority})\n`;
      md += `- **Category**: ${fr.category}\n`;
      md += `- **Grade Levels**: ${fr.gradeLevels}\n`;
      md += `- **Description**: ${fr.description}\n`;
      md += `- **Acceptance Criteria**:\n`;
      fr.acceptanceCriteria.forEach(ac => {
        md += `  - ${ac}\n`;
      });
      md += `\n`;
    });
    md += `## Non-Functional Requirements\n\n`;
    NON_FUNCTIONAL_REQUIREMENTS.forEach(nfr => {
      md += `### [${nfr.id}] ${nfr.title}\n`;
      md += `- **Category**: ${nfr.category}\n`;
      md += `- **Metric**: ${nfr.metric}\n`;
      md += `- **Standard Reference**: ${nfr.standardReference}\n`;
      md += `- **Specification**: ${nfr.specification}\n\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    let md = `# ${SRS_METADATA.documentTitle}\n\n`;
    md += `**System**: ${SRS_METADATA.systemName}\n`;
    md += `**Standard**: ${SRS_METADATA.standard}\n`;
    md += `**Scope**: ${SRS_METADATA.gradeScope}\n\n`;
    md += `## 1. Requirements Gathering Methodology\n\n`;
    REQUIREMENTS_GATHERING_METHODOLOGY.phases.forEach(p => {
      md += `### ${p.title}\n${p.description}\n**Deliverables**: ${p.deliverables.join(', ')}\n\n`;
    });
    md += `## 2. Functional Requirements\n\n`;
    FUNCTIONAL_REQUIREMENTS.forEach(fr => {
      md += `### [${fr.id}] ${fr.title} (${fr.priority})\n`;
      md += `- **Category**: ${fr.category} | **Grades**: ${fr.gradeLevels}\n`;
      md += `- **Description**: ${fr.description}\n`;
      md += `- **Acceptance Criteria**:\n`;
      fr.acceptanceCriteria.forEach(ac => md += `  - ${ac}\n`);
      md += `\n`;
    });
    md += `## 3. Non-Functional Requirements\n\n`;
    NON_FUNCTIONAL_REQUIREMENTS.forEach(nfr => {
      md += `### [${nfr.id}] ${nfr.title} (${nfr.category})\n`;
      md += `- **Target Metric**: ${nfr.metric}\n`;
      md += `- **Standard**: ${nfr.standardReference}\n`;
      md += `- **Details**: ${nfr.specification}\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'EduPulse_K12_School_Management_SRS.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Document Header Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {SRS_METADATA.standard}
              </span>
              <span className="text-xs text-slate-400 font-mono">{SRS_METADATA.version}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-2 tracking-tight">
              {SRS_METADATA.documentTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Covering {SRS_METADATA.gradeScope} • Worldwide Best Practices
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySRS}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SRS!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-600/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .MD</span>
            </button>
          </div>
        </div>

        {/* Executive Meta Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Target Scope</span>
            <span className="text-slate-200 font-medium">Grades 1 to 12</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Stakeholder Actors</span>
            <span className="text-slate-200 font-medium">Admin, Teacher, Student, Parent, Bursar</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Primary Compliance</span>
            <span className="text-slate-200 font-medium">FERPA, COPPA, GDPR Art. 8</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Sync Architecture</span>
            <span className="text-slate-200 font-medium">Offline-First SQLite Cache</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: REQUIREMENTS GATHERING METHODOLOGY */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">
            1. End-to-End Requirements Gathering Lifecycle
          </h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          From initial stakeholder discovery in real-world schools to formal SRS baselining and agile mobile implementation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {REQUIREMENTS_GATHERING_METHODOLOGY.phases.map((phase) => (
            <div key={phase.step} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center mb-2">
                  0{phase.step}
                </span>
                <h4 className="text-xs font-bold text-white">{phase.title.replace(/^[0-9]\.\s*/, '')}</h4>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{phase.description}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800/80">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Deliverables</span>
                <ul className="text-[10px] text-indigo-300 space-y-0.5 mt-1">
                  {phase.deliverables.map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: FUNCTIONAL REQUIREMENTS MATRIX */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white tracking-tight">
                2. Functional Requirements Matrix (FR)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified criteria across Grades 1 through 12 modules.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search requirements..."
                className="bg-slate-900 border border-slate-800 pl-8 pr-3 py-1.5 text-xs text-white rounded-lg placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-300 py-1.5 px-2 rounded-lg cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Requirements Cards */}
        <div className="space-y-3">
          {filteredFR.map((fr) => {
            const isExpanded = expandedReq === fr.id;
            return (
              <div 
                key={fr.id}
                className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl transition-colors hover:border-slate-700"
              >
                <div 
                  onClick={() => setExpandedReq(isExpanded ? null : fr.id)}
                  className="flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {fr.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {fr.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {fr.gradeLevels}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {fr.priority}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white pt-1">{fr.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{fr.description}</p>
                  </div>

                  <button className="text-slate-400 hover:text-white p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-3 animate-in fade-in">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Acceptance Criteria (Verification Tests)
                      </span>
                      <ul className="mt-1.5 space-y-1 text-xs text-slate-300">
                        {fr.acceptanceCriteria.map((ac, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{ac}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                      <span>Applicable Roles:</span>
                      <div className="flex gap-1.5">
                        {fr.applicableRoles.map(role => (
                          <span key={role} className="capitalize bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: NON-FUNCTIONAL REQUIREMENTS MATRIX */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">
            3. Non-Functional Requirements Matrix (NFR)
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Strict technical constraints covering security, low-latency mobile operations, and global compliance regulations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {NON_FUNCTIONAL_REQUIREMENTS.map((nfr) => (
            <div key={nfr.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono font-bold text-indigo-400">{nfr.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                    {nfr.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{nfr.title}</h4>
                <div className="mt-2 p-2 rounded bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                    Target Metric
                  </span>
                  <div className="text-xs text-emerald-300 font-mono mt-0.5">{nfr.metric}</div>
                </div>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{nfr.specification}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                Standard: <strong className="text-indigo-300">{nfr.standardReference}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
