import React, { useState } from 'react';
import {
  GraduationCap,
  Cpu,
  Globe,
  Smartphone,
  Share2,
  Search,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  X,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { ServiceDetail, ServiceId } from '../types/index.ts';

interface ServicesSectionProps {
  onSelectServiceForEnquiry: (serviceId: ServiceId) => void;
  onRequestDemo: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForEnquiry,
  onRequestDemo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);

  const categories = ['All', 'Educational Technology', 'Core Engineering', 'Growth & Marketing'];

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (selectedCategory === 'All') return true;
    return s.category === selectedCategory;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-rose-400" />;
      case 'Search':
        return <Search className="w-5 h-5 text-emerald-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-purple-400" />;
      default:
        return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <span>End-to-End Capabilities</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>7 Specialized Verticals</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Software, AI & Digital Growth Services
          </h2>

          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            From smart biometric campus automation to high-performance cloud platforms and ROI-driven marketing campaigns, our engineering team in Odisha delivers high-reliability digital transformation.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header Icon & Category (Zero static pills: quiet unboxed text) */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    {service.category}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>

                {/* Tagline */}
                <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                  {service.tagline}
                </p>

                {/* Benefits Bullet Points */}
                <div className="mt-4 pt-4 border-t border-slate-900 space-y-2">
                  {service.benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Detailed Specs</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    if (service.id === 'college-erp') {
                      onRequestDemo();
                    } else {
                      onSelectServiceForEnquiry(service.id);
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {service.id === 'college-erp' ? 'Request Demo' : 'Get Quote'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Service Specs Modal */}
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
              {/* Close Button */}
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close Service Details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-400">
                <span>{activeModalService.category}</span>
                <span aria-hidden="true">·</span>
                <span>Dhanexa Engineering Protocol</span>
              </div>

              <h3 className="text-2xl font-bold text-white mt-2">
                {activeModalService.title}
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {activeModalService.overview}
              </p>

              {/* Target Audience */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-semibold uppercase text-slate-400">Target Audience</div>
                <div className="text-xs text-slate-200 mt-1 font-medium">
                  {activeModalService.audience}
                </div>
              </div>

              {/* Key Features Breakdown */}
              <div className="mt-6">
                <h4 className="text-sm font-bold text-white mb-3">Key Architectural Features</h4>
                <div className="space-y-3">
                  {activeModalService.keyFeatures.map((feat, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                      <div className="text-xs font-bold text-emerald-400">{feat.title}</div>
                      <div className="text-xs text-slate-300 mt-1">{feat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5-Week Rollout Process */}
              <div className="mt-6">
                <h4 className="text-sm font-bold text-white mb-3">Implementation Roadmap</h4>
                <div className="space-y-2">
                  {activeModalService.process.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-emerald-400 shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = activeModalService.id;
                    setActiveModalService(null);
                    if (id === 'college-erp') {
                      onRequestDemo();
                    } else {
                      onSelectServiceForEnquiry(id);
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2"
                >
                  <span>Enquire For This Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
