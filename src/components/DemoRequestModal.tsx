import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  X,
  CheckCircle2,
  Building2,
  User,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { validateLeadForm, LeadFormInput, cleanPhoneNumber } from '../utils/leadValidation.ts';
import { EnquirySubmission } from '../types/index.ts';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDemoSubmitted: (submission: EnquirySubmission) => void;
}

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({
  isOpen,
  onClose,
  onDemoSubmitted,
}) => {
  const [formData, setFormData] = useState<LeadFormInput>({
    name: '',
    phone: '',
    email: '',
    organization: '',
    serviceId: 'college-erp',
    institutionType: 'Engineering College',
    preferredDate: '',
    preferredTime: '11:00 AM - 12:00 PM',
    message: 'We would like a live walkthrough of biometric face attendance and parent WhatsApp alerts.',
    consent: true,
    type: 'demo_request',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedTicket, setSubmittedTicket] = useState<EnquirySubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

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
      const ticketId = `DX-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
      const submission: EnquirySubmission = {
        id: ticketId,
        createdAt: new Date().toISOString(),
        name: formData.name.trim(),
        phone: cleanPhoneNumber(formData.phone),
        email: formData.email.trim(),
        organization: formData.organization.trim(),
        serviceId: 'college-erp',
        serviceName: 'College ERP & Attendance System',
        message: formData.message || '',
        status: 'demo_scheduled',
        type: 'demo_request',
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        institutionType: formData.institutionType,
      };

      onDemoSubmitted(submission);
      setSubmittedTicket(submission);
      setIsSubmitting(false);
    }, 450);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Close Demo Request"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedTicket ? (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="mt-4 text-xs font-semibold uppercase text-emerald-400">
              Live Walkthrough Reserved
            </div>

            <h3 className="text-2xl font-bold text-white mt-1">
              Demo Request Confirmed!
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{submittedTicket.name}</strong>. Our senior solutions engineer from Bhubaneswar will conduct the live walkthrough of Dhanexa College ERP for <strong className="text-white">{submittedTicket.organization}</strong>.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Reference Ticket ID:</span>
                <span className="font-mono text-emerald-400 font-bold">{submittedTicket.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Scheduled Date:</span>
                <span className="text-slate-200 font-medium">{submittedTicket.preferredDate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Time Slot:</span>
                <span className="text-slate-200 font-medium">{submittedTicket.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmation Sent To:</span>
                <span className="text-slate-200 font-medium">{submittedTicket.email}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/919439012345?text=Hello%20Dhanexa%20Team,%20I%20have%20scheduled%20a%20College%20ERP%20demo%20with%20reference%20ID%20${submittedTicket.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Sync</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-400">
              <Calendar className="w-4 h-4" />
              <span>Campus Consultation</span>
              <span aria-hidden="true">·</span>
              <span>Online or In-Person (Odisha)</span>
            </div>

            <h3 className="text-2xl font-bold text-white mt-1">
              Schedule College ERP & ShristiAI Demo
            </h3>

            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Experience the live biometric face scan integration, 75% attendance threshold reports, and automated WhatsApp parent notices with your campus leadership.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Institution Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  College / Institution Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. CV Raman Global University / Utkal College"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                {errors.organization && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.organization}</p>
                )}
              </div>

              {/* Institution Type Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Institution Type
                </label>
                <select
                  value={formData.institutionType}
                  onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Engineering College">Engineering & Technology College</option>
                  <option value="Autonomous Degree College">Autonomous Degree / Autonomous College</option>
                  <option value="State / Private University">State / Private University</option>
                  <option value="Polytechnic / ITI">Polytechnic / ITI Institute</option>
                  <option value="CBSE / ICSE School Network">Senior Secondary School Network</option>
                  <option value="Enterprise / Business Corporation">Enterprise Business / Corporation</option>
                </select>
              </div>

              {/* Name & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Ramesh Tripathy"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit number e.g. 9439012345"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Official Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="principal@college.ac.in or admin@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>

              {/* Preferred Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  {errors.preferredDate && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM (Morning)</option>
                    <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM (Midday)</option>
                    <option value="02:30 PM - 03:30 PM">02:30 PM - 03:30 PM (Afternoon)</option>
                    <option value="04:30 PM - 05:30 PM">04:30 PM - 05:30 PM (Evening)</option>
                  </select>
                </div>
              </div>

              {/* Consent */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>
                    I authorize Dhanexa Technologies engineers to contact me via phone, email, and WhatsApp regarding this demo session.
                  </span>
                </label>
                {errors.consent && <p className="text-[11px] text-rose-400 mt-1">{errors.consent}</p>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Confirming Demo Slot...' : 'Confirm Demo Reservation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
