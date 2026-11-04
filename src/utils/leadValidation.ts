export interface LeadFormInput {
  name: string;
  phone: string;
  email: string;
  organization: string;
  serviceId?: string;
  message?: string;
  consent: boolean;
  type?: 'general_enquiry' | 'demo_request';
  preferredDate?: string;
  preferredTime?: string;
  institutionType?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  } else if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone.trim();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  // Validates standard 10 digit Indian number or 11/12 with country code
  return digits.length >= 10 && digits.length <= 13;
}

export function validateLeadForm(input: LeadFormInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please provide your full name (minimum 2 characters).';
  }

  if (!input.phone || !isValidPhone(input.phone)) {
    errors.phone = 'Please provide a valid contact number (10-digit phone/WhatsApp).';
  }

  if (!input.email || !isValidEmail(input.email)) {
    errors.email = 'Please provide a valid work or personal email address.';
  }

  if (!input.organization || input.organization.trim().length < 2) {
    errors.organization = 'Please provide your college, institution, or company name.';
  }

  if (!input.consent) {
    errors.consent = 'Please confirm consent to receive consultation and follow-up communications.';
  }

  if (input.type === 'demo_request') {
    if (!input.preferredDate) {
      errors.preferredDate = 'Please select a preferred date for the live demo.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatExportText(input: LeadFormInput, submissionId: string): string {
  const timestamp = new Date().toISOString();
  return `=== DHANEXA TECHNOLOGIES LEAD DISCOVERY BRIEF ===
Reference ID: ${submissionId}
Timestamp: ${timestamp}
Type: ${input.type === 'demo_request' ? 'College ERP Demo Request' : 'Service Consultation Enquiry'}

CONTACT INFORMATION:
- Name: ${input.name.trim()}
- Phone: ${cleanPhoneNumber(input.phone)}
- Email: ${input.email.trim()}
- Institution/Company: ${input.organization.trim()}

PROJECT / SERVICE SCOPE:
- Target Service: ${input.serviceId || 'General Technology Consultation'}
${input.institutionType ? `- Institution Type: ${input.institutionType}\n` : ''}${input.preferredDate ? `- Preferred Demo Date: ${input.preferredDate}\n` : ''}${input.preferredTime ? `- Preferred Demo Slot: ${input.preferredTime}\n` : ''}- Requirements & Message:
${input.message?.trim() || 'No additional note provided.'}

OFFICIAL DHANEXA HEADQUARTERS:
Dhanexa Technologies Pvt. Ltd., Infocity Road, Patia, Bhubaneswar, Odisha 751024
Direct Helpline: +91 94390 12345 | Email: contact@dhanexa.com
==================================================`;
}
