import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Download,
  Building2,
  User,
  ArrowRight
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { ServiceId, EnquirySubmission } from '../types/index.ts';
import {
  validateLeadForm,
  LeadFormInput,
  cleanPhoneNumber,
  formatExportText
} from '../utils/leadValidation.ts';

interface EnquirySectionProps {
  selectedServiceId: ServiceId;
  onServiceChange: (serviceId: ServiceId) => void;
  onEnquirySubmitted: (submission: EnquirySubmission) => void;
  onRequestDemo: () => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  selectedServiceId,
  onServiceChange,
  onEnquirySubmitted,
  onRequestDemo,
}) => {
  const [formData, setFormData] = useState<LeadFormInput>({
    name: '',
    phone: '',
    email: '',
    organization: '',
    serviceId: selectedServiceId,
    message: '',
    consent: true,
    type: 'general_enquiry',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<{ id: string; rawText: string } | null>(null);

  // Sync if parent updates selected service
  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, serviceId: selectedServiceId }));
  }, [selectedServiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const submissionId = `DX-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
      const currentService = SERVICES_DATA.find((s) => s.id === formData.serviceId);
      const serviceName = currentService ? currentService.title : 'General Consultation';

      const submission: EnquirySubmission = {
        id: submissionId,
        createdAt: new Date().toISOString(),
        name: formData.name.trim(),
        phone: cleanPhoneNumber(formData.phone),
        email: formData.email.trim(),
        organization: formData.organization.trim(),
        serviceId: (formData.serviceId as ServiceId) || 'college-erp',
        serviceName,
        message: formData.message || '',
        status: 'new',
        type: 'general_enquiry',
      };

      const exportText = formatExportText(formData, submissionId);
      onEnquirySubmitted(submission);
      setSubmittedBrief({ id: submissionId, rawText: exportText });
      setIsSubmitting(false);
    }, 400);
  };

  const handleDownloadBrief = () => {
    if (!submittedBrief) return;
    const blob = new Blob([submittedBrief.rawText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dhanexa_Project_Brief_${submittedBrief.id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetForm = () => {
    setSubmittedBrief(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      organization: '',
      serviceId: selectedServiceId,
      message: '',
      consent: true,
      type: 'general_enquiry',
    });
  };

  return (
    <section id="enquiry" className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Channels & Regional Office Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <span>Start a Project</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Fast 24-Hour Response</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let’s Engineer Your Next Solution
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Whether you need biometric College ERP rollout across campus, multilingual ShristiAI integration, or enterprise custom software, our engineering team in Bhubaneswar is ready to consult.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/919439012345?text=Hello%20Dhanexa%20Technologies,%20I%20would%20like%20to%20consult%20regarding%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct WhatsApp Helpline</div>
                    <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      +91 94390 12345
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400">Chat Now &rarr;</span>
              </a>

              <a
                href="tel:+919439012345"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Official Telephone Desk</div>
                    <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                      +91 94390 12345
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400">Call Direct</span>
              </a>

              <a
                href="mailto:contact@dhanexa.com"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Official Business Email</div>
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                      contact@dhanexa.com
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400">Email Us</span>
              </a>
            </div>

            {/* Office Location */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Odisha Corporate Headquarters</span>
              </div>
              <p className="leading-relaxed pl-6 text-slate-400">
                Dhanexa Technologies Pvt. Ltd., Level 3, Infocity Tech Park, Patia, Bhubaneswar, Odisha 751024, India.
              </p>
              <div className="flex items-center gap-2 pl-6 text-[11px] text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Monday – Saturday: 9:30 AM to 6:30 PM IST</span>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form & Downloadable Brief */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
              {submittedBrief ? (
                /* Submission Complete Card */
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-4">
                    Enquiry Logged Successfully!
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you! Reference ID <strong className="text-emerald-400 font-mono">{submittedBrief.id}</strong> has been assigned. Our senior solutions engineer from Bhubaneswar will contact you within 24 hours.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleDownloadBrief}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span>Download Project Brief (.txt)</span>
                    </button>

                    <button
                      onClick={handleResetForm}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                /* Enquiry Form */
                <div>
                  <h3 className="text-xl font-bold text-white">Project Consultation Form</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill in your project requirements below to receive a customized scope analysis and quote.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Name & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Priyabrata Mohanty"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          WhatsApp / Phone *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="10-digit number"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Email & College/Company Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@organization.com"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Company / College Name *
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            placeholder="e.g. Apex Institute of Management"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        {errors.organization && (
                          <p className="text-[11px] text-rose-400 mt-1">{errors.organization}</p>
                        )}
                      </div>
                    </div>

                    {/* Service Selection Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Service Interested In
                      </label>
                      <select
                        value={formData.serviceId}
                        onChange={(e) => {
                          const val = e.target.value as ServiceId;
                          setFormData({ ...formData, serviceId: val });
                          onServiceChange(val);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title} ({s.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Requirements or Specific Goals
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your campus size, required hardware integrations, current bottlenecks, or desired timeline..."
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Consent Checkbox */}
                    <div>
                      <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span>
                          I agree to be contacted by Dhanexa Technologies specialists via call, email, or WhatsApp.
                        </span>
                      </label>
                      {errors.consent && <p className="text-[11px] text-rose-400 mt-1">{errors.consent}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Project Enquiry'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
