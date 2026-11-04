import React from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  PlayCircle,
  Building2,
  Users
} from 'lucide-react';

interface HeroProps {
  onExploreErp: () => void;
  onExploreShristiAi: () => void;
  onRequestDemo: () => void;
  onOpenEnquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreErp,
  onExploreShristiAi,
  onRequestDemo,
  onOpenEnquiry,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          {/* Editorial Kicker */}
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-wider uppercase text-emerald-400">
            <span>Dhanexa Technologies</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Bhubaneswar, Odisha</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Home of ShristiAI</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Software, AI & Digital Solutions from Odisha.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
            We empower universities, colleges, and forward-thinking enterprises with{' '}
            <strong className="text-white font-semibold">ShristiAI</strong> — Odisha’s first multilingual AI assistant — and our battle-tested{' '}
            <strong className="text-white font-semibold">College ERP Attendance System</strong> that eliminates proxy attendance and keeps parents informed in real time.
          </p>

          {/* Value Highlights */}
          <div className="mt-8 flex flex-wrap gap-y-3 gap-x-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Biometric & RFID Smart Attendance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Bilingual WhatsApp Parent Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Native Odia & Regional Language AI</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onRequestDemo}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              <span>Request College ERP Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreErp}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-base transition-all hover:border-slate-600"
            >
              <PlayCircle className="w-4 h-4 text-emerald-400" />
              <span>Try Interactive Sandbox</span>
            </button>

            <button
              onClick={onExploreShristiAi}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 font-semibold text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Experience ShristiAI</span>
            </button>
          </div>
        </div>

        {/* Hero Proof Metrics Strip (Zero-Pill Discipline: unboxed clean typographic stats) */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">18+</div>
            <div className="text-sm font-medium text-slate-400 mt-1">Colleges & Campuses</div>
            <p className="text-xs text-slate-400 mt-0.5">Automated across Odisha & Eastern India</p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">100%</div>
            <div className="text-sm font-medium text-slate-400 mt-1">Proxy Elimination</div>
            <p className="text-xs text-slate-400 mt-0.5">With liveness face recognition & RFID</p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">120K+</div>
            <div className="text-sm font-medium text-slate-400 mt-1">Daily Student Check-Ins</div>
            <p className="text-xs text-slate-400 mt-0.5">Real-time attendance logs processed</p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight">Odia + 3</div>
            <div className="text-sm font-medium text-slate-400 mt-1">Multilingual AI Engine</div>
            <p className="text-xs text-slate-400 mt-0.5">Odia, English, Hindi & Sambalpuri</p>
          </div>
        </div>
      </div>
    </section>
  );
};
