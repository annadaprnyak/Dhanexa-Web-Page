import { ServiceDetail } from '../types/index.ts';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'college-erp',
    title: 'College ERP & Attendance System',
    tagline: 'Automated biometric, RFID & geofenced student/staff attendance with instant WhatsApp/SMS parent notifications.',
    category: 'Educational Technology',
    audience: 'Colleges, Universities, Polytechnics, Coaching Institutes, and CBSE/ICSE Schools in Odisha & Eastern India.',
    overview: 'Our flagship College ERP eliminates proxy attendance, paper registers, and manual tracking. Seamlessly integrating biometric face recognition machines, smart RFID turnstiles, and mobile geotagging, Dhanexa ERP guarantees 100% transparent attendance records synced directly with university UGC/AICTE compliance standards.',
    benefits: [
      'Eliminate 100% of proxy and duplicate attendance registers',
      'Instant automated WhatsApp & SMS alerts to parents when a student is absent',
      'AICTE / UGC 75% attendance rule compliance reports generated in one click',
      'Offline-first synchronization ensures zero downtime during campus network outages',
      'Integrated fee management, timetable planner, and examination eligibility module',
    ],
    keyFeatures: [
      {
        title: 'Multi-Device Biometric Integration',
        desc: 'Connects directly with high-speed AI face recognition cameras, fingerprint terminals, and RFID smart ID cards.',
      },
      {
        title: 'Automated Parent Notification Engine',
        desc: 'Sends automated bilingual (Odia/English/Hindi) WhatsApp and SMS alerts directly to parents within 5 minutes of class start.',
      },
      {
        title: 'Faculty Smart Portal & Mobile App',
        desc: 'Teachers take period-wise attendance in 20 seconds, upload internal marks, and approve student medical leaves.',
      },
      {
        title: '75% Threshold & Debarred Student Radar',
        desc: 'Automated warning letters and SMS blasts generated for students falling below semester exam eligibility criteria.',
      },
      {
        title: 'Role-Based Access (Principal, HOD, Teacher, Parent)',
        desc: 'Granular permissions ensure management gets macro analytics while parents only see their ward’s records.',
      },
    ],
    process: [
      'Campus Hardware & Network Assessment (Week 1)',
      'Student Master Database Migration & RFID Card Mapping (Week 2)',
      'Hardware Installation & Biometric Turnstile Sync (Week 3)',
      'Faculty & Administrative Staff Hands-On Training (Week 4)',
      'Live Campus Rollout & 24/7 Dedicated Support (Week 5 Onwards)',
    ],
    recommendedFor: ['Engineering Colleges', 'Autonomous Degree Colleges', 'Medical & Pharmacy Institutes', 'State Universities'],
    iconName: 'GraduationCap',
  },
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    tagline: 'Mission-critical enterprise software, billing systems, supply-chain CRMs, and internal cloud portals.',
    category: 'Core Engineering',
    audience: 'Growing businesses, manufacturing units, retail chains, and government agencies seeking automated internal workflows.',
    overview: 'We build custom, scalable software architectures that solve unique operational bottlenecks. From multi-branch inventory tracking to custom GST-compliant billing and role-based staff portals, our engineering team in Odisha crafts resilient cloud applications with zero bloated recurring license fees.',
    benefits: [
      '100% tailored to your business operations without forced cookie-cutter constraints',
      'Full source-code ownership and zero recurring third-party vendor lock-ins',
      'Seamless integration with existing tally, accounting, and legacy databases',
      'High-grade encryption with automated daily cloud database backups',
    ],
    keyFeatures: [
      {
        title: 'Cloud-Native Architecture',
        desc: 'High-availability microservices and RESTful APIs deployed on scalable infrastructure with 99.9% uptime SLA.',
      },
      {
        title: 'GST-Ready Billing & Accounting',
        desc: 'Integrated e-way bill generation, automated tax invoices, and multi-warehouse reconciliation.',
      },
      {
        title: 'Custom Workflow Automations',
        desc: 'Replace spreadsheets with validated multi-stage approval workflows, notifications, and audit trails.',
      },
    ],
    process: [
      'Operational Discovery & Requirement Specification',
      'Interactive Wireframe & Database Architecture Design',
      'Agile Sprint Development & Weekly Demos',
      'Security Audit, Data Migration & User Acceptance Testing',
      'Deployment & Post-Launch Maintenance Retainer',
    ],
    recommendedFor: ['Wholesalers & Distributors', 'Hospital Networks', 'Manufacturing Plants', 'Logistics Companies'],
    iconName: 'Cpu',
  },
  {
    id: 'web-development',
    title: 'High-Performance Web Development',
    tagline: 'Modern, high-conversion web applications, corporate portals, and headless e-commerce built on React & Next.js.',
    category: 'Core Engineering',
    audience: 'Enterprises, institutions, and startups aiming to dominate search rankings and turn visitors into qualified customers.',
    overview: 'Your website is the digital front door of your enterprise. Dhanexa engineers fast, accessible, and responsive web portals with sub-second page loads, pristine typography, structured Schema.org SEO, and seamless lead conversion funnels that establish immediate trust.',
    benefits: [
      'Sub-second load times with 95+ Google Core Web Vitals score',
      'Clean, responsive design adapted across mobile, tablet, and ultra-wide screens',
      'Integrated CMS allowing your marketing team to edit blogs and pages without touching code',
      'Built-in conversion funnels with WhatsApp, click-to-call, and CRM lead capture',
    ],
    keyFeatures: [
      {
        title: 'Modern Front-End Engineering',
        desc: 'Engineered with React 19, TypeScript, and modern CSS for fluid transitions and zero layout shifts.',
      },
      {
        title: 'SEO Architecture Built-In',
        desc: 'Semantic HTML5, automated XML sitemaps, OpenGraph social previews, and schema structured data.',
      },
      {
        title: 'Security & SSL Compliance',
        desc: 'Hardened against XSS/CSRF, automated SSL certificates, and zero-trust form sanitization.',
      },
    ],
    process: [
      'Brand Identity & Sitemap Planning',
      'High-Fidelity Figma Prototyping',
      'Clean Component Development & API Wiring',
      'Cross-Browser & Mobile Device Testing',
      'Domain Setup, SSL Deployment & Search Console Indexing',
    ],
    recommendedFor: ['Corporate Brands', 'Educational Campuses', 'Healthcare Providers', 'E-Commerce Retailers'],
    iconName: 'Globe',
  },
  {
    id: 'app-development',
    title: 'Mobile Application Development',
    tagline: 'Cross-platform Android & iOS applications with native performance, offline support, and push notifications.',
    category: 'Core Engineering',
    audience: 'Organizations needing direct mobile touchpoints for students, field executives, customers, or employees.',
    overview: 'From parent-facing campus companion apps to on-demand service platforms and field-executive trackers, we craft fluid mobile applications that users love opening every day. Tested across hundreds of Android and iOS devices for maximum battery efficiency.',
    benefits: [
      'Single codebase for both Google Play Store and Apple App Store saving 40% dev cost',
      'Instant push notifications with 98% open rates for announcements and promotions',
      'Offline cache allows users to browse data even in weak 3G/4G network zones',
      'Biometric fingerprint/Face ID instant login support',
    ],
    keyFeatures: [
      {
        title: 'React Native & Flutter Mastery',
        desc: 'Smooth 60fps animations with direct hardware access (camera, GPS, NFC, push alerts).',
      },
      {
        title: 'Geo-Tracking & Location Services',
        desc: 'Accurate geofencing for staff field visits, campus bus tracking, and route history.',
      },
      {
        title: 'App Store Submission & Compliance',
        desc: 'Complete handling of Google Play Console & Apple Developer account approvals and privacy policies.',
      },
    ],
    process: [
      'Mobile UX User Journey Wireframing',
      'Design System & Touch Ergonomics',
      'Cross-Platform Development & API Sync',
      'Beta Testing on Real Handsets via TestFlight & Internal Testing',
      'Play Store / App Store Publication',
    ],
    recommendedFor: ['College Campuses (Student & Parent Apps)', 'Logistics & Delivery', 'Customer Loyalty Clubs'],
    iconName: 'Smartphone',
  },
  {
    id: 'social-media',
    title: 'Social Media Management & Marketing',
    tagline: 'Data-driven content strategy, reels production, and community engagement that turns followers into buyers.',
    category: 'Growth & Marketing',
    audience: 'Brands, colleges seeking student admissions, lifestyle businesses, and B2B leaders wanting industry authority.',
    overview: 'Stop posting generic templates that get zero reach. Dhanexa creates magnetic visual narratives, viral short-form reels, student testimonials, and educational carousels that build brand prestige and drive direct DM inquiries across Instagram, LinkedIn, and Facebook.',
    benefits: [
      'Consistent weekly posting schedule with zero stress for your internal team',
      'High-production graphic design, motion posters, and script-to-screen video reels',
      'Active community management with <15 min response time on prospect DMs and comments',
      'Monthly transparency report tracking reach, follower growth, and conversion leads',
    ],
    keyFeatures: [
      {
        title: 'Editorial Calendar & Creative Direction',
        desc: 'Curated 30-day monthly content calendars covering promotional, educational, and behind-the-scenes content.',
      },
      {
        title: 'Short-Form Video Production (Reels / Shorts)',
        desc: 'Hook-driven vertical video editing with trendy captions, background audio, and branded motion graphics.',
      },
      {
        title: 'Campus & Founder Brand Positioning',
        desc: 'Showcasing campus infrastructure, faculty achievements, and student placement records to build immense trust.',
      },
    ],
    process: [
      'Brand Tone, Audience & Competitor Audit',
      'Monthly Content Matrix & Visual Theme Approval',
      'Asset Creation (Graphics, Motion, Copywriting)',
      'Scheduled Publishing & Active Engagement Moderation',
      'Performance Analytics & Campaign Iteration',
    ],
    recommendedFor: ['Higher Education Admissions', 'Local Retail & Hospitality', 'Healthcare Clinics', 'B2B Founders'],
    iconName: 'Share2',
  },
  {
    id: 'seo-services',
    title: 'Technical & Local SEO Services',
    tagline: 'Rank #1 on Google for high-intent regional and national keywords that bring organic, cost-free inquiries.',
    category: 'Growth & Marketing',
    audience: 'Institutions and businesses looking to dominate Google Maps and organic search without relying solely on paid ads.',
    overview: 'When a parent searches "best engineering college in Bhubaneswar" or a client searches "custom software company in Odisha", your business must appear at the top. We optimize your technical code, Google Business Profile, local citations, and authoritative backlinks to dominate search engine results.',
    benefits: [
      'Long-term organic traffic asset that continues delivering leads without ad spend',
      'Dominate Google Maps Local 3-Pack for local search intent in Odisha and surrounding states',
      'Eliminate technical crawling errors, duplicate pages, and broken redirects',
      'Transparent keyword ranking tracker updated weekly',
    ],
    keyFeatures: [
      {
        title: 'Google Business Profile Domination',
        desc: 'Complete optimization with local geo-tagged photos, service categories, review generation, and weekly updates.',
      },
      {
        title: 'Technical Site Audit & Core Web Vitals',
        desc: 'Fixing canonical issues, indexation bottlenecks, image compression, and schema microdata.',
      },
      {
        title: 'High-Intent Content Strategy',
        desc: 'Authoring in-depth comparison guides and local landing pages targeted to high-converting buyer searches.',
      },
    ],
    process: [
      'Comprehensive Technical & Competitor Gap Audit',
      'High-Intent Keyword Research & Mapping',
      'On-Page Optimization & Schema Implementation',
      'Google Maps & Local Citation Building',
      'Monthly Keyword Progression & Traffic Reporting',
    ],
    recommendedFor: ['Colleges & Educational Academies', 'Specialist Clinics & Hospitals', 'B2B Service Providers'],
    iconName: 'Search',
  },
  {
    id: 'digital-marketing',
    title: 'Performance Digital Marketing',
    tagline: 'High-ROI Google Search Ads, Meta Lead Ads, and retargeting campaigns optimized for qualified student admissions and business leads.',
    category: 'Growth & Marketing',
    audience: 'Colleges during admission season, real estate firms, e-commerce brands, and businesses wanting predictable lead pipelines.',
    overview: 'We treat every rupee of your marketing budget like our own. Our performance marketing unit crafts hyper-targeted Meta (Facebook/Instagram) and Google Ads campaigns that capture warm intent, qualify leads through custom landing pages, and route inquiries straight to your admissions or sales counselors via WhatsApp.',
    benefits: [
      'Predictable cost-per-lead (CPL) with transparent daily spend dashboards',
      'Instant lead delivery to your phone via WhatsApp and Google Sheets webhook within 10 seconds',
      'High-converting landing pages engineered specifically for high conversion rates',
      'Hyper-localized demographic and psychographic audience targeting',
    ],
    keyFeatures: [
      {
        title: 'Google Search & Intent Ads',
        desc: 'Target people actively searching for your exact solutions right at the moment of peak purchase intent.',
      },
      {
        title: 'Meta Hyper-Targeted Lead Campaigns',
        desc: 'Laser-focused campaigns targeting parents, students, and key decision-makers across demographic cohorts.',
      },
      {
        title: 'Conversion Rate Optimization (CRO)',
        desc: 'A/B testing ad headlines, creative imagery, form length, and call-to-action triggers to lower acquisition cost.',
      },
    ],
    process: [
      'Offer Positioning & Audience Persona Definition',
      'High-Converting Landing Page & Funnel Setup',
      'Ad Creative Production & Copywriting',
      'Pixel Tracking, Conversion API & Webhook Automation',
      'Daily Bid Optimization & Budget Scaling',
    ],
    recommendedFor: ['Admission Campaign Drives', 'Real Estate & Properties', 'B2B SaaS & Services', 'E-Commerce Launches'],
    iconName: 'TrendingUp',
  },
];
