import React, { useState } from 'react';
import { USE_CASE_CATALOG } from '../../data/srsData';
import { UseCaseItem } from '../../types/school';
import { 
  Users, 
  Workflow, 
  CheckCircle2, 
  Layers, 
  Filter, 
  Info,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const UseCaseDiagram: React.FC = () => {
  const [selectedActor, setSelectedActor] = useState<string>('All');
  const [activeUseCase, setActiveUseCase] = useState<UseCaseItem | null>(USE_CASE_CATALOG[0]);

  const actors = [
    { name: 'All', icon: '🌐', count: 12 },
    { name: 'Teacher', icon: '👩‍🏫', count: 4, desc: 'Takes attendance, grades coursework, messages parents' },
    { name: 'Parent', icon: '👨‍👩‍👧', count: 4, desc: 'Tracks bus, pays fees, reviews report cards, signs excuse slips' },
    { name: 'Student', icon: '🎒', count: 3, desc: 'Submits homework, inspects GPA, displays digital gate pass' },
    { name: 'Administrator', icon: '🏫', count: 3, desc: 'Campus broadcast, admissions pipeline, faculty oversight' }
  ];

  const filteredUseCases = selectedActor === 'All' 
    ? USE_CASE_CATALOG 
    : USE_CASE_CATALOG.filter(uc => uc.actor.toLowerCase() === selectedActor.toLowerCase());

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">
            UML Use Case Architecture Diagram
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Visual actor-to-system interactions across the K-12 mobile ecosystem. Select an actor to spotlight their discrete system boundary, primary preconditions, and alternative flows.
        </p>

        {/* Actor Selector Pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {actors.map((act) => (
            <button
              key={act.name}
              onClick={() => setSelectedActor(act.name)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                selectedActor === act.name
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{act.icon}</span>
              <span>{act.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Use Case Canvas */}
      <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden">
        {/* System Boundary Box */}
        <div className="border-2 border-dashed border-indigo-500/30 rounded-2xl p-6 bg-slate-900/40 relative">
          <div className="absolute -top-3 left-6 px-3 py-0.5 bg-indigo-600 text-[11px] font-bold uppercase tracking-wider text-white rounded-full">
            System Boundary: EduPulse K-12 Mobile Core
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {filteredUseCases.map((uc) => {
              const isSelected = activeUseCase?.id === uc.id;
              return (
                <div
                  key={uc.id}
                  onClick={() => setActiveUseCase(uc)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-950/70 border-indigo-400 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-400'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">
                        {uc.id}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        Actor: <strong className="text-white">{uc.actor}</strong>
                      </span>
                    </div>

                    {/* Ellipse-styled Use Case Representation */}
                    <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center my-2 group-hover:border-indigo-500/40">
                      <span className="text-xs font-bold text-slate-100">{uc.name}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                      {uc.preconditions}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-indigo-300">
                    <span>{uc.primaryFlow.length} Flow Steps</span>
                    <span className="flex items-center gap-1 font-semibold">
                      Inspect Flow <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Use Case Specification Inspector */}
      {activeUseCase && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/30">
                  {activeUseCase.id} Detailed Specification
                </span>
                <span className="text-xs text-slate-400">Module: {activeUseCase.relatedModule}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1.5">{activeUseCase.name}</h3>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Actor</span>
              <span className="text-sm font-bold text-indigo-300">{activeUseCase.actor}</span>
            </div>
          </div>

          {/* Pre & Post Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Pre-Conditions
              </span>
              <p className="text-slate-300 leading-relaxed">{activeUseCase.preconditions}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                Post-Conditions
              </span>
              <p className="text-slate-300 leading-relaxed">{activeUseCase.postconditions}</p>
            </div>
          </div>

          {/* Primary Flow Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Primary Flow of Events (Main Success Scenario)
            </h4>
            <div className="space-y-2">
              {activeUseCase.primaryFlow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Flow */}
          {activeUseCase.alternativeFlow && (
            <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-amber-200">
              <span className="font-bold text-amber-400 block mb-1">Alternative / Offline Exception Flow:</span>
              <p className="leading-relaxed">{activeUseCase.alternativeFlow[0]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
