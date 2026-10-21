import React, { useState } from 'react';
import { DESIGN_PATTERNS } from '../../data/srsData';
import { DesignPatternItem } from '../../types/school';
import { 
  Code2, 
  Cpu, 
  Layers, 
  CheckCircle, 
  Copy, 
  Check, 
  Terminal, 
  Boxes,
  ArrowRight
} from 'lucide-react';

export const DesignPatternsViewer: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<DesignPatternItem>(DESIGN_PATTERNS[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <Boxes className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">
            Software Architecture &amp; GoF Design Patterns
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Production patterns applied specifically to solve K-12 mobile domain challenges: offline classroom sync, multi-curriculum GPA calculation, asynchronous parent push alerts, and modular role governance.
        </p>

        {/* Pattern Selector Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {DESIGN_PATTERNS.map((pattern) => {
            const isSelected = selectedPattern.name === pattern.name;
            return (
              <button
                key={pattern.name}
                onClick={() => setSelectedPattern(pattern)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-mono ${
                  isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-indigo-300'
                }`}>
                  {pattern.type}
                </span>
                <span>{pattern.name.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pattern Detail Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                {selectedPattern.type} Pattern
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{selectedPattern.name}</h3>
          </div>
          <button
            onClick={() => handleCopy(selectedPattern.codeSnippet)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 cursor-pointer self-start sm:self-auto"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied Snippet' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Domain Problem Statement
            </span>
            <p className="text-slate-300 leading-relaxed">{selectedPattern.problemStatement}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Architectural Solution
            </span>
            <p className="text-slate-300 leading-relaxed">{selectedPattern.solution}</p>
          </div>
        </div>

        {/* School Specific Context */}
        <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs">
          <span className="font-bold text-indigo-300 block mb-1">K-12 School Implementation Context:</span>
          <p className="text-indigo-200 leading-relaxed">{selectedPattern.schoolContextExample}</p>
        </div>

        {/* Code Snippet Box */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950 px-4 py-2 rounded-t-xl border-t border-x border-slate-800 font-mono">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              TypeScript Domain Implementation
            </span>
            <span className="text-[10px] text-slate-500">production-grade</span>
          </div>
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-b-xl overflow-x-auto text-xs font-mono text-indigo-300 leading-relaxed">
            <code>{selectedPattern.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
