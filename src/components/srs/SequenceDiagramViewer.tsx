import React, { useState, useEffect } from 'react';
import { SEQUENCE_DIAGRAMS } from '../../data/srsData';
import { SequenceDiagramFlow, SequenceStep } from '../../types/school';
import { 
  GitCommit, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Layers, 
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const SequenceDiagramViewer: React.FC = () => {
  const [selectedFlowId, setSelectedFlowId] = useState<string>(SEQUENCE_DIAGRAMS[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeFlow = SEQUENCE_DIAGRAMS.find(f => f.id === selectedFlowId) || SEQUENCE_DIAGRAMS[0];

  // Auto-player effect
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= activeFlow.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeFlow.steps.length]);

  const handleSelectFlow = (id: string) => {
    setSelectedFlowId(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < activeFlow.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const currentStep = activeFlow.steps[currentStepIndex];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header & Flow Selector */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">
            UML System Sequence Diagrams
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Interactive message exchange timeline across mobile clients, backend microservices, event queues, and external gateway actors.
        </p>

        {/* Sequence Flow Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
          {SEQUENCE_DIAGRAMS.map((flow) => (
            <button
              key={flow.id}
              onClick={() => handleSelectFlow(flow.id)}
              className={`p-3 text-left rounded-xl border text-xs transition-all cursor-pointer ${
                selectedFlowId === flow.id
                  ? 'bg-indigo-950/80 border-indigo-500/80 text-white shadow-md shadow-indigo-950/50 ring-1 ring-indigo-500'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="font-mono text-[10px] text-indigo-400 font-bold">{flow.id}</div>
              <div className="font-semibold text-slate-200 mt-1 line-clamp-1">{flow.title.replace(/^[0-9]\.\s*/, '')}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{flow.steps.length} Synchronous &amp; Async Steps</div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Playback Controls */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Playback' : 'Play Sequence'}</span>
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepIndex >= activeFlow.steps.length - 1}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Next Step</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
            title="Reset to step 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Step {currentStepIndex + 1} of {activeFlow.steps.length}</span>
          <div className="flex gap-1">
            {activeFlow.steps.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentStepIndex(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                  i === currentStepIndex
                    ? 'bg-indigo-500 scale-125'
                    : i < currentStepIndex
                    ? 'bg-emerald-500/80'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Visual Sequence Lifelines Canvas */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
        <div className="min-w-[680px]">
          {/* Lifeline Participants (Columns) */}
          <div className="grid gap-2 text-center" style={{ gridTemplateColumns: `repeat(${activeFlow.participants.length}, minmax(0, 1fr))` }}>
            {activeFlow.participants.map((p, idx) => {
              const isSource = currentStep.from === p;
              const isTarget = currentStep.to === p;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                    isSource || isTarget
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}>
                    {p}
                  </div>
                  {/* Vertical dashed lifeline */}
                  <div className={`w-0.5 h-8 border-r-2 border-dashed ${
                    isSource || isTarget ? 'border-indigo-400' : 'border-slate-800'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Active Message Highlight Box */}
          <div className="my-4 p-4 rounded-xl bg-slate-950 border border-indigo-500/40 relative">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {currentStep.step}
                </span>
                <span className="font-bold text-white font-mono">{currentStep.action}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                currentStep.type === 'sync'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {currentStep.type === 'sync' ? 'Synchronous REST/RPC' : 'Asynchronous Event / Push'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 py-1">
              <span className="font-semibold text-indigo-400">{currentStep.from}</span>
              <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="font-semibold text-indigo-400">{currentStep.to}</span>
            </div>

            <p className="mt-2 text-xs text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 font-mono">
              Payload / Action Detail: {currentStep.detail}
            </p>
          </div>

          {/* Full Sequence Timeline List */}
          <div className="mt-6 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Full Execution Trace ({activeFlow.steps.length} Steps)
            </h4>
            {activeFlow.steps.map((st, i) => {
              const isCurrent = i === currentStepIndex;
              const isDone = i < currentStepIndex;
              return (
                <div
                  key={i}
                  onClick={() => setCurrentStepIndex(i)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-indigo-950/60 border-indigo-500 text-white'
                      : isDone
                      ? 'bg-slate-950/70 border-slate-800/80 text-slate-400'
                      : 'bg-slate-950/30 border-slate-900 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-indigo-600 text-white'
                        : isDone
                        ? 'bg-emerald-600/40 text-emerald-300'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {st.step}
                    </span>
                    <div>
                      <span className="font-bold text-slate-200">{st.action}</span>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {st.from} ➔ {st.to}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {st.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
