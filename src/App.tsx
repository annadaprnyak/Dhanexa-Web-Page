/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ShristiAiShowcase } from './components/ShristiAiShowcase.tsx';
import { ErpInteractiveDemo } from './components/ErpInteractiveDemo.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { PortfolioSection } from './components/PortfolioSection.tsx';
import { EnquirySection } from './components/EnquirySection.tsx';
import { Footer } from './components/Footer.tsx';
import { DemoRequestModal } from './components/DemoRequestModal.tsx';
import { AdminLeadsDrawer } from './components/AdminLeadsDrawer.tsx';
import { ServiceId, EnquirySubmission } from './types/index.ts';

const INITIAL_SEEDED_LEADS: EnquirySubmission[] = [
  {
    id: 'DX-DEMO-481920',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    name: 'Dr. Debabrata Mishra',
    phone: '+91 98610 12345',
    email: 'principal@koustuvtech.ac.in',
    organization: 'Koustuv Institute of Technology',
    serviceId: 'college-erp',
    serviceName: 'College ERP & Attendance System',
    message: 'We require 6 biometric face terminals for 2,200 students with instant parent WhatsApp alert sync.',
    status: 'demo_scheduled',
    type: 'demo_request',
    preferredDate: '2026-11-12',
    preferredTime: '11:30 AM - 12:30 PM',
    institutionType: 'Engineering College',
  },
  {
    id: 'DX-ENQ-918231',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    name: 'Smruti Ranjan Das',
    phone: '+91 94370 98765',
    email: 'smruti@kalingaindustries.in',
    organization: 'Kalinga Industrial Spares',
    serviceId: 'custom-software',
    serviceName: 'Custom Software Development',
    message: 'Looking for a multi-warehouse inventory and billing ERP with GST portal integration.',
    status: 'contacted',
    type: 'general_enquiry',
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('college-erp');
  const [leads, setLeads] = useState<EnquirySubmission[]>(() => {
    try {
      const stored = localStorage.getItem('dhanexa_leads_records');
      return stored ? JSON.parse(stored) : INITIAL_SEEDED_LEADS;
    } catch {
      return INITIAL_SEEDED_LEADS;
    }
  });

  // Persist leads locally
  useEffect(() => {
    try {
      localStorage.setItem('dhanexa_leads_records', JSON.stringify(leads));
    } catch {
      // Ignore localStorage quotas if any
    }
  }, [leads]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForEnquiry = (serviceId: ServiceId) => {
    setSelectedServiceId(serviceId);
    scrollToSection('enquiry');
  };

  const handleLeadSubmitted = (submission: EnquirySubmission) => {
    setLeads((prev) => [submission, ...prev]);
  };

  const handleUpdateLeadStatus = (id: string, status: EnquirySubmission['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  const handleClearLeads = () => {
    if (window.confirm('Are you sure you want to clear the local leads history?')) {
      setLeads([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onRequestDemo={() => setIsDemoModalOpen(true)}
        onOpenAdminLeads={() => setIsAdminDrawerOpen(true)}
        leadCount={leads.length}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <div id="hero">
          <Hero
            onExploreErp={() => scrollToSection('erp-demo')}
            onExploreShristiAi={() => scrollToSection('shristi-ai')}
            onRequestDemo={() => setIsDemoModalOpen(true)}
            onOpenEnquiry={() => scrollToSection('enquiry')}
          />
        </div>

        {/* ShristiAI Multilingual AI Engine Section */}
        <ShristiAiShowcase
          onRequestDemo={() => setIsDemoModalOpen(true)}
          onExploreErp={() => scrollToSection('erp-demo')}
        />

        {/* Flagship College ERP & Biometric Attendance Interactive Demo */}
        <ErpInteractiveDemo
          onRequestDemo={() => setIsDemoModalOpen(true)}
        />

        {/* 7 Verticals & Services Showcase */}
        <ServicesSection
          onSelectServiceForEnquiry={handleSelectServiceForEnquiry}
          onRequestDemo={() => setIsDemoModalOpen(true)}
        />

        {/* Vision & Heritage / Mission Manifesto */}
        <AboutSection
          onRequestDemo={() => setIsDemoModalOpen(true)}
          onOpenEnquiry={() => scrollToSection('enquiry')}
        />

        {/* Verified Regional Case Studies */}
        <PortfolioSection
          onRequestDemo={() => setIsDemoModalOpen(true)}
          onOpenEnquiry={() => scrollToSection('enquiry')}
        />

        {/* Lead Capture & Project Enquiry Section */}
        <EnquirySection
          selectedServiceId={selectedServiceId}
          onServiceChange={setSelectedServiceId}
          onEnquirySubmitted={handleLeadSubmitted}
          onRequestDemo={() => setIsDemoModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onSelectService={(sId) => {
          setSelectedServiceId(sId);
          scrollToSection('services');
        }}
        onRequestDemo={() => setIsDemoModalOpen(true)}
        onOpenAdminLeads={() => setIsAdminDrawerOpen(true)}
      />

      {/* Demo Request Booking Modal */}
      <DemoRequestModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onDemoSubmitted={(demoSubmission) => {
          handleLeadSubmitted(demoSubmission);
        }}
      />

      {/* Admin Leads Management Drawer */}
      <AdminLeadsDrawer
        isOpen={isAdminDrawerOpen}
        onClose={() => setIsAdminDrawerOpen(false)}
        leads={leads}
        onUpdateStatus={handleUpdateLeadStatus}
        onClearLeads={handleClearLeads}
      />
    </div>
  );
}
