import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Phone,
  MessageSquare,
  Menu,
  X,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import { ServiceId } from '../types/index.ts';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onRequestDemo: () => void;
  onOpenAdminLeads: () => void;
  leadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onRequestDemo,
  onOpenAdminLeads,
  leadCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'shristi-ai', label: 'ShristiAI (Odia AI)' },
    { id: 'erp-demo', label: 'College ERP' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'portfolio', label: 'Case Studies' },
    { id: 'enquiry', label: 'Enquiry' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Regional Trust Strip */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border-b border-slate-800 text-xs py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">Headquartered in Infocity, Bhubaneswar, Odisha</span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="hidden sm:inline text-slate-400">Powering Higher Education & Multilingual AI across Eastern India</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+919439012345"
              className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
              aria-label="Direct Phone Line"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 94390 12345</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://wa.me/919439012345?text=Hello%20Dhanexa%20Technologies,%20I%20am%20interested%20in%20College%20ERP%20and%20software%20solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              aria-label="WhatsApp Us"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Quick Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            aria-label="Dhanexa Technologies Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/10 group-hover:scale-105 transition-transform">
              DX
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">Dhanexa</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  Odisha AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
                Technologies &bull; ShristiAI
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'text-white bg-slate-800'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Admin Lead Tracker Pill / Button */}
            <button
              onClick={onOpenAdminLeads}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
              aria-label="Open Leads Dashboard"
              title="View submitted inquiries and demo requests (Local Admin Tracker)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Leads Tracker</span>
              {leadCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-indigo-500 text-white font-bold text-[10px]">
                  {leadCount}
                </span>
              )}
            </button>

            {/* Request Demo Primary Button */}
            <button
              onClick={onRequestDemo}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-95"
              aria-label="Request a Demo"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Request a Demo</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onRequestDemo}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                onRequestDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule College ERP Demo</span>
            </button>
            <button
              onClick={() => {
                onOpenAdminLeads();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 text-sm"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>View Lead Management ({leadCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
