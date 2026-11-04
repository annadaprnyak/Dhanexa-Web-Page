import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { ServiceId } from '../types/index.ts';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectService: (serviceId: ServiceId) => void;
  onRequestDemo: () => void;
  onOpenAdminLeads: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectService,
  onRequestDemo,
  onOpenAdminLeads,
}) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                DX
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white">
                  Dhanexa Technologies
                </span>
                <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
                  Home of ShristiAI · Odisha’s Multilingual AI
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              We empower institutions and enterprises with automated biometric campus ERPs, native Odia language AI agents, and full-stack software systems that drive measurable digital impact.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/919439012345"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 font-semibold transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Helpline</span>
              </a>

              <a
                href="tel:+919439012345"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>+91 94390 12345</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Solutions &amp; Demos
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('erp-demo')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  College ERP Attendance Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shristi-ai')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  ShristiAI Multilingual Sandbox
                </button>
              </li>
              <li>
                <button
                  onClick={onRequestDemo}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Schedule Campus Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Regional Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdminLeads}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors text-left flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Leads View</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 7 Services Catalog */}
          <div>
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Our 7 Verticals
            </div>
            <ul className="space-y-2">
              {SERVICES_DATA.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      onSelectService(service.id);
                      onNavigate('services');
                    }}
                    className="hover:text-emerald-400 transition-colors text-left truncate max-w-[180px]"
                    title={service.title}
                  >
                    {service.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-emerald-400 hover:underline text-left font-medium"
                >
                  View All Services &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Headquarters & Legal */}
          <div>
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Odisha Headquarters
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              Dhanexa Technologies Pvt. Ltd.<br />
              Level 3, Infocity Tech Park, Patia<br />
              Bhubaneswar, Odisha 751024, India
            </p>
            <div className="mt-3 text-slate-400 space-y-1">
              <div>Email: contact@dhanexa.com</div>
              <div>CIN: U72900OR2024PTC045129</div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Dhanexa Technologies Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with pride in</span>
            <span className="text-emerald-400 font-semibold">Bhubaneswar, Odisha</span>
            <span>for the world</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>AICTE Compliance Guide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
