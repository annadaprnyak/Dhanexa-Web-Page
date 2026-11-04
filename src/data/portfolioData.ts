import { CaseStudy } from '../types/index.ts';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Automated Campus ERP & Biometric Face Attendance',
    client: 'Utkal Institute of Engineering & Technology',
    location: 'Bhubaneswar, Odisha',
    category: 'Educational Technology',
    summary: 'Replaced manual register attendance for 2,400+ students and 140 faculty members with 8 high-speed biometric face terminals, parent WhatsApp notifications, and automated semester debarment warnings.',
    metrics: [
      { label: 'Proxy Reduction', value: '100%' },
      { label: 'Parent Alert Speed', value: '< 2 mins' },
      { label: 'Administrative Hours Saved / Mo', value: '160+ hrs' },
    ],
    technologies: ['Dhanexa ERP Core', 'Biometric Face SDK', 'WhatsApp Business Cloud API', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'case-2',
    title: 'Multi-Branch Inventory & GST Billing Cloud Suite',
    client: 'Kalinga Industrial Spares & Equipment',
    location: 'Cuttack, Odisha',
    category: 'Custom Software',
    summary: 'Engineered a real-time multi-depot stock allocation, barcode scanning, and GST e-invoicing engine connecting 5 regional godowns across Eastern India with zero sync lag.',
    metrics: [
      { label: 'Stock Discrepancy Drop', value: '94%' },
      { label: 'Invoice Generation Time', value: '12 sec' },
      { label: 'Annual Saved Overhead', value: '₹14.2 Lakhs' },
    ],
    technologies: ['React', 'Node.js Microservices', 'Tailwind CSS', 'Redis Cache', 'GST Portal Webhook'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'case-3',
    title: 'High-Conversion Admissions Growth & Performance Marketing',
    client: 'Apex Group of Professional Institutions',
    location: 'Rourkela, Odisha',
    category: 'Digital Marketing & SEO',
    summary: 'Architected high-intent Meta and Google Search campaigns combined with instant counselor WhatsApp routing, driving 3,800+ qualified admission inquiries during the 2026 academic intake season.',
    metrics: [
      { label: 'Verified Inquiries', value: '3,840+' },
      { label: 'Cost Per Qualified Lead', value: '₹48 (62% lower)' },
      { label: 'Seat Fill Rate', value: '98.5%' },
    ],
    technologies: ['Google Ads', 'Meta Conversions API', 'Next.js Fast Funnel', 'WhatsApp Cloud Routing'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'case-4',
    title: 'Global Handloom D2C Commerce & Global SEO Engine',
    client: 'Sambalpuri Heritage Weaves',
    location: 'Bargarh, Odisha',
    category: 'Web & E-Commerce',
    summary: 'Developed an ultra-fast headless e-commerce store with international currency switching, weaver storytelling videos, and technical SEO ranking #1 for authentic Odia handloom keywords worldwide.',
    metrics: [
      { label: 'Organic Search Traffic', value: '+340%' },
      { label: 'International Orders', value: '28 Countries' },
      { label: 'Mobile Conversion Rate', value: '4.6%' },
    ],
    technologies: ['Headless React', 'Stripe & Razorpay', 'Cloudflare Workers', 'Semantic SEO'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
  },
];
