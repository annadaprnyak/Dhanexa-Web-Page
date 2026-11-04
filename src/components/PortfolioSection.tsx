import React from 'react';
import { CASE_STUDIES } from '../data/portfolioData.ts';
import { CheckCircle2, ArrowRight, ExternalLink, MapPin } from 'lucide-react';

interface PortfolioSectionProps {
  onRequestDemo: () => void;
  onOpenEnquiry: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onRequestDemo,
  onOpenEnquiry,
}) => {
  return (
    <section id="portfolio" className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <span>Client Impact & Deployments</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Verifiable Results</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Selected Case Studies & Regional Transformations
          </h2>

          <p className="mt-3 text-slate-300 text-base leading-relaxed font-normal">
            See how higher education campuses, state distributors, and high-growth brands across Eastern India achieve operational excellence with Dhanexa engineering.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
            >
              <div>
                {/* Image Banner */}
                <div className="h-48 w-full overflow-hidden relative">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold text-emerald-400">{study.category}</span>
                    <span className="flex items-center gap-1 text-slate-300 text-[11px]">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{study.location}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs text-slate-400 font-medium">{study.client}</div>
                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {study.summary}
                  </p>

                  {/* Impact Metrics (Unboxed clean text) */}
                  <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-3 gap-3">
                    {study.metrics.map((metric, i) => (
                      <div key={i}>
                        <div className="text-base sm:text-lg font-bold text-emerald-400 tracking-tight">
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack List */}
                  <div className="mt-5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-400 mr-1">Stack:</span>
                    {study.technologies.map((tech, idx) => (
                      <span key={idx} className="after:content-['·'] after:ml-1.5 last:after:content-none text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={onRequestDemo}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Request Similar Case Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
