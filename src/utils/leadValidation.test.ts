import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLeadForm, cleanPhoneNumber, formatExportText } from './leadValidation.ts';

test('validateLeadForm validates correct enquiry input', () => {
  const result = validateLeadForm({
    name: 'Dr. Debabrata Mishra',
    phone: '9861012345',
    email: 'principal@koustuvtech.ac.in',
    organization: 'Koustuv Institute of Technology',
    serviceId: 'college-erp',
    message: 'We need biometric face attendance for 1,800 students and parent SMS notification.',
    consent: true,
    type: 'general_enquiry',
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateLeadForm rejects empty inputs and missing consent', () => {
  const result = validateLeadForm({
    name: '',
    phone: '123',
    email: 'not-an-email',
    organization: '',
    consent: false,
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.email);
  assert.ok(result.errors.organization);
  assert.ok(result.errors.consent);
});

test('validateLeadForm enforces preferredDate for demo requests', () => {
  const result = validateLeadForm({
    name: 'Sushant Jena',
    phone: '9437098765',
    email: 'admin@cutm.ac.in',
    organization: 'Centurion University',
    serviceId: 'college-erp',
    consent: true,
    type: 'demo_request',
    // Missing preferredDate
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.preferredDate);
});

test('cleanPhoneNumber formats 10-digit Indian numbers nicely', () => {
  assert.equal(cleanPhoneNumber('9861012345'), '+91 98610 12345');
  assert.equal(cleanPhoneNumber('+919861012345'), '+91 98610 12345');
});

test('formatExportText outputs complete lead document with contact info', () => {
  const text = formatExportText(
    {
      name: 'Dr. Debabrata Mishra',
      phone: '9861012345',
      email: 'principal@koustuvtech.ac.in',
      organization: 'Koustuv Institute of Technology',
      serviceId: 'college-erp',
      message: 'Need 5 biometric devices and cloud dashboard.',
      consent: true,
      type: 'demo_request',
      preferredDate: '2026-11-15',
      preferredTime: '11:00 AM - 12:00 PM',
      institutionType: 'Engineering College',
    },
    'DHAN-2026-8812'
  );

  assert.ok(text.includes('DHAN-2026-8812'));
  assert.ok(text.includes('Dr. Debabrata Mishra'));
  assert.ok(text.includes('Koustuv Institute of Technology'));
  assert.ok(text.includes('Bhubaneswar, Odisha'));
});
