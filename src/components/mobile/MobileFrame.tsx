import React, { ReactNode } from 'react';
import { Wifi, Battery, Signal, Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface MobileFrameProps {
  children: ReactNode;
  activeRole: string;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  title?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeRole,
  isExpanded,
  onToggleExpanded,
  title = "EduPulse Mobile"
}) => {
  const currentTime = "09:41";

  if (isExpanded) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[720px] transition-all">
        {/* Expanded Top Bar */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {title} • Fullscreen Mode ({activeRole.toUpperCase()})
            </span>
          </div>
          <button
            onClick={onToggleExpanded}
            className="flex items-center gap-1.5 px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Switch to Mobile Phone Frame"
          >
            <Minimize2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Mobile Device Frame</span>
          </button>
        </div>
        <div className="flex-1 bg-slate-950 overflow-y-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Device Bezel */}
      <div className="relative w-[380px] sm:w-[390px] h-[810px] bg-slate-950 rounded-[50px] p-3 shadow-2xl border-4 border-slate-800 shadow-indigo-950/40 ring-1 ring-slate-700/50 flex flex-col select-none">
        {/* Physical buttons styling */}
        <div className="absolute -left-[7px] top-28 w-[3px] h-10 bg-slate-700 rounded-l" />
        <div className="absolute -left-[7px] top-42 w-[3px] h-12 bg-slate-700 rounded-l" />
        <div className="absolute -right-[7px] top-32 w-[3px] h-16 bg-slate-700 rounded-r" />

        {/* Screen container */}
        <div className="relative w-full h-full bg-slate-900 rounded-[40px] overflow-hidden flex flex-col border border-slate-800/80">
          
          {/* Status Bar */}
          <div className="h-10 bg-slate-950/95 backdrop-blur-md px-6 flex items-center justify-between text-white text-xs font-semibold z-30 shrink-0">
            <span>{currentTime}</span>

            {/* Dynamic Island / Camera pill */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-2 border border-slate-800/50">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px]">98%</span>
                <Battery className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* App Screen Content */}
          <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 flex flex-col relative">
            {children}
          </div>

          {/* Home Indicator bar */}
          <div className="h-5 bg-slate-950 flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Frame switch hint */}
      <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
          Mobile Simulation
        </span>
        <span>•</span>
        <button
          onClick={onToggleExpanded}
          className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
        >
          <Maximize2 className="w-3 h-3" />
          Expand to tablet/desktop view
        </button>
      </div>
    </div>
  );
};
