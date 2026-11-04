import React from 'react';
import {
  Sparkles,
  Users,
  Compass,
  HeartHandshake,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface AboutSectionProps {
  onRequestDemo: () => void;
  onOpenEnquiry: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onRequestDemo,
  onOpenEnquiry,
}) => {
  return (
    <section id="about" className="py-20 bg-slate-900/30 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
          <span>Our Vision & Heritage</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Bhubaneswar, Odisha</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl">
          Language-First AI & High-Impact Software for Odisha and Beyond
        </h2>

        {/* Goal Statement Card as clarified by the user */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/20 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
            <Compass className="w-4 h-4" />
            <span>The Dhanexa Mission Manifesto</span>
          </div>

          <blockquote className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed italic border-l-2 border-emerald-400 pl-4 py-1">
            &ldquo;Our goal is to build a trusted digital home for Dhanexa Technologies and ShristiAI — showing how multilingual AI can empower Odisha’s people, preserve local languages, and make technology accessible to everyone.&rdquo;
          </blockquote>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Headquartered in Bhubaneswar, Dhanexa Technologies combines elite software engineering with linguistic research. By solving high-stakes automation problems in higher education and pioneering Odisha’s first multilingual AI model, we prove that world-class deep tech originates right here in Eastern India.
          </p>
        </div>

        {/* 4 Core Strategic Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">01. Inclusive Regional AI</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
              ShristiAI makes advanced artificial intelligence accessible to 45M+ native Odia speakers in their mother tongue across voice and text channels.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">02. Higher Education Trust</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
              Our College ERP safeguards institutional integrity by replacing proxy-prone paper attendance with tamper-proof biometric and RFID automation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">03. Open Partnerships</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
              We collaborate with colleges, state research bodies, angel investors, and enterprise partners who share our commitment to digital equity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">04. Local Tech Talent</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
              Providing premier engineering careers for Odisha’s brightest graduates, computer scientists, and computational linguists right here in Bhubaneswar.
            </p>
          </div>
        </div>

        {/* Talent & Partnership Callouts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                For Campuses & Enterprises
              </div>
              <h4 className="text-xl font-bold text-white mt-1">
                Deploy College ERP & ShristiAI in Your Institution
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Join our pilot cohort of colleges across Odisha. We provide on-premise hardware setup, biometrics integration, and faculty onboarding within 30 days.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={onRequestDemo}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2"
              >
                <span>Book Institutional Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                For Investors, Researchers & Engineers
              </div>
              <h4 className="text-xl font-bold text-white mt-1">
                Collaborate with Odisha's Flagship AI Venture
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                We are actively looking for AI researchers, NLP linguists, full-stack developers, and strategic ecosystem partners passionate about regional language AI.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={onOpenEnquiry}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2"
              >
                <span>Partner or Join Our Team</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
