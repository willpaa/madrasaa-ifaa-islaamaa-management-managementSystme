import React, { useState, useEffect } from 'react';
import { Type, Sliders, Check, RotateCcw, X } from 'lucide-react';

export type FontScale = 'compact' | 'standard' | 'spacious';
export type FontWeightPreference = 'normal' | 'medium' | 'bold';
export type FontStyleFamily = 'modern' | 'geometric' | 'academic';

interface TypographyToolbarProps {
  fontScale: FontScale;
  onChangeFontScale: (scale: FontScale) => void;
  fontWeight: FontWeightPreference;
  onChangeFontWeight: (weight: FontWeightPreference) => void;
  fontStyle: FontStyleFamily;
  onChangeFontStyle: (style: FontStyleFamily) => void;
}

export const TypographyToolbar: React.FC<TypographyToolbarProps> = ({
  fontScale,
  onChangeFontScale,
  fontWeight,
  onChangeFontWeight,
  fontStyle,
  onChangeFontStyle
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 cursor-pointer transition-colors"
        title="Customize Font Size, Weight, and Style"
      >
        <Type className="w-3.5 h-3.5 text-indigo-400" />
        <span className="hidden sm:inline">Typography</span>
        <span className="text-[10px] text-indigo-400 uppercase font-mono px-1 bg-indigo-500/10 rounded">
          {fontScale[0].toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 w-72 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white font-heading">Typography Customizer</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1. Font Size Scale */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Font Size Scale:
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => onChangeFontScale('compact')}
                className={`py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  fontScale === 'compact' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Compact (85%)
              </button>
              <button
                onClick={() => onChangeFontScale('standard')}
                className={`py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  fontScale === 'standard' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => onChangeFontScale('spacious')}
                className={`py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  fontScale === 'spacious' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Spacious (115%)
              </button>
            </div>
          </div>

          {/* 2. Font Weight Preference */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Font Weight &amp; Readability:
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => onChangeFontWeight('normal')}
                className={`py-1.5 rounded-lg font-normal transition-all cursor-pointer ${
                  fontWeight === 'normal' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => onChangeFontWeight('medium')}
                className={`py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  fontWeight === 'medium' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => onChangeFontWeight('bold')}
                className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  fontWeight === 'bold' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                High Contrast
              </button>
            </div>
          </div>

          {/* 3. Font Family Style */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Font Family Style:
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => onChangeFontStyle('modern')}
                className={`py-1.5 rounded-lg transition-all cursor-pointer font-sans ${
                  fontStyle === 'modern' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Modern Sans
              </button>
              <button
                onClick={() => onChangeFontStyle('geometric')}
                className={`py-1.5 rounded-lg transition-all cursor-pointer font-heading ${
                  fontStyle === 'geometric' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Geometric
              </button>
              <button
                onClick={() => onChangeFontStyle('academic')}
                className={`py-1.5 rounded-lg transition-all cursor-pointer font-serif ${
                  fontStyle === 'academic' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Academic
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Settings saved automatically</span>
            <button
              onClick={() => {
                onChangeFontScale('standard');
                onChangeFontWeight('medium');
                onChangeFontStyle('modern');
              }}
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
