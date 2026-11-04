export type SupportedLanguage = 'odia' | 'english' | 'hindi';

export interface ShristiPromptExample {
  id: string;
  label: string;
  lang: SupportedLanguage;
  prompt: string;
  category: 'Education' | 'Governance' | 'Business' | 'Agriculture';
}

export interface ShristiResponse {
  query: string;
  lang: SupportedLanguage;
  responseText: string;
  odiaTranslation?: string;
  suggestedActions: string[];
  latencyMs: number;
}

export const SAMPLE_PROMPTS: ShristiPromptExample[] = [
  {
    id: 'p-1',
    label: 'College ERP Parent Notice (Odia)',
    lang: 'odia',
    prompt: 'ଛାତ୍ର ଅନୁପସ୍ଥିତି ଥିବା ବାବଦରେ ଅଭିଭାବକଙ୍କୁ ଓଡ଼ିଆରେ WhatsApp ସନ୍ଦେଶ ପ୍ରସ୍ତୁତ କରନ୍ତୁ।',
    category: 'Education',
  },
  {
    id: 'p-2',
    label: 'Odisha Higher Education Scholarships',
    lang: 'odia',
    prompt: 'ଓଡ଼ିଶା ରାଜ୍ୟର ମେଧାବୃତ୍ତି (Scholarships) ଏବଂ କଲେଜ ଯୋଗ୍ୟତା ମାନଦଣ୍ଡ କ’ଣ?',
    category: 'Education',
  },
  {
    id: 'p-3',
    label: 'Enterprise ERP Capabilities',
    lang: 'english',
    prompt: 'How does Dhanexa ERP prevent proxy attendance in large colleges with 3000+ students?',
    category: 'Business',
  },
  {
    id: 'p-4',
    label: 'Multilingual Voice AI for MSMEs',
    lang: 'english',
    prompt: 'Can ShristiAI be integrated into WhatsApp to handle customer inquiries in Odia and English?',
    category: 'Business',
  },
  {
    id: 'p-5',
    label: 'Farmer Agriculture Advisories (Odia)',
    lang: 'odia',
    prompt: 'ଖରିଫ୍ ଋତୁ ଧାନ ଫସଲ ସୁରକ୍ଷା ପାଇଁ କୃଷି ପରାମର୍ଶ ଦିଅନ୍ତୁ।',
    category: 'Agriculture',
  },
];

export function getShristiResponse(query: string, lang: SupportedLanguage): ShristiResponse {
  const lower = query.toLowerCase();

  if (lang === 'odia' || /[\u0B00-\u0B7F]/.test(query)) {
    if (lower.includes('ଅନୁପସ୍ଥିତ') || lower.includes('attendance') || lower.includes('erp')) {
      return {
        query,
        lang: 'odia',
        responseText:
          'ନମସ୍କାର! ଧନେକ୍ସା କଲେଜ୍ ERP ଅଭିଭାବକ ସୂଚନା ସନ୍ଦେଶ:\n\n"ପ୍ରିୟ ଅଭିଭାବକ, ଆପଣଙ୍କ ସନ୍ତାନ ଆଜି କଲେଜ୍‌ରେ ଅନୁପସ୍ଥିତ ଅଛନ୍ତି। ସେମିଷ୍ଟାର ପରୀକ୍ଷା ପାଇଁ ୭୫% ଉପସ୍ଥାନ ବାଧ୍ୟତାମୂଳକ। ବିଶେଷ ସୂଚନା ପାଇଁ କଲେଜ ପ୍ରଶାସନ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।"\n\nଏହି ସନ୍ଦେଶ ସ୍ୱୟଂଚାଳିତ ଭାବେ WhatsApp ଏବଂ SMS ମାଧ୍ୟମରେ ପ୍ରେରିତ ହୋଇପାରିବ।',
        suggestedActions: [
          'କଲେଜ୍ ERP ଡେମୋ ଅନୁରୋଧ କରନ୍ତୁ',
          'ସ୍ୱୟଂଚାଳିତ WhatsApp ସେଟିଂସ୍ ଦେଖନ୍ତୁ',
          'ଧନେକ୍ସା ଦଳ ସହ କଥା ହୁଅନ୍ତୁ',
        ],
        latencyMs: 142,
      };
    }

    if (lower.includes('scholarship') || lower.includes('ବୃତ୍ତି') || lower.includes('ଶିକ୍ଷା')) {
      return {
        query,
        lang: 'odia',
        responseText:
          'ଓଡ଼ିଶା ରାଜ୍ୟ ସ୍କଲାରସିପ୍ ପୋର୍ଟାଲ୍ ଅଧୀନରେ ମେଧାବୃତ୍ତି, ପ୍ରେରଣା, ଏବଂ ନବକୃଷ୍ଣ ଚୌଧୁରୀ ଯୋଜନା ଉପଲବ୍ଧ। ଧନେକ୍ସା କଲେଜ ERP ସିଧାସଳଖ ଛାତ୍ର ଉପସ୍ଥାନ ଏବଂ ମାର୍କ ରେକର୍ଡକୁ ସ୍କଲାରସିପ୍ ଯୋଗ୍ୟତା ପାଇଁ ଯାଞ୍ଚ କରିଥାଏ।',
        suggestedActions: [
          'ସ୍କଲାରସିପ୍ ରିପୋର୍ଟ ଜେନେରେଟ୍ କରନ୍ତୁ',
          '୭୫% ଉପସ୍ଥାନ ତାଲିକା ଯାଞ୍ଚ କରନ୍ତୁ',
        ],
        latencyMs: 165,
      };
    }

    return {
      query,
      lang: 'odia',
      responseText:
        'ନମସ୍କାର! ମୁଁ ସୃଷ୍ଟି AI (ShristiAI) — ଓଡ଼ିଶାର ପ୍ରଥମ ବହୁଭାଷୀ କୃତ୍ରିମ ବୁଦ୍ଧିମତା (AI) ସହାୟକ। ଧନେକ୍ସା ଟେକ୍ନୋଲୋଜିସ୍ ଦ୍ୱାରା ପ୍ରସ୍ତୁତ। ମୁଁ ଶିକ୍ଷା, ବ୍ୟବସାୟ ଏବଂ ପ୍ରଶାସନ କ୍ଷେତ୍ରରେ ଓଡ଼ିଆ ଓ ଇଂରାଜୀ ଭାଷାରେ ଆପଣଙ୍କୁ ସହଯୋଗ କରିପାରିବି। ଆପଣ କ’ଣ ଜାଣିବାକୁ ଚାହାଁନ୍ତି?',
      suggestedActions: [
        'କଲେଜ ERP ବ୍ୟବସ୍ଥା ବିଷୟରେ ଜାଣନ୍ତୁ',
        'ଆମର ସେବା ସମୂହ ଦେଖନ୍ତୁ',
        'ସୃଷ୍ଟି AI ପାର୍ଟନରସିପ୍ ବିଷୟରେ ପଚାରନ୍ତୁ',
      ],
      latencyMs: 130,
    };
  }

  // English queries
  if (lower.includes('attendance') || lower.includes('erp') || lower.includes('proxy')) {
    return {
      query,
      lang: 'english',
      responseText:
        'Dhanexa College ERP eliminates proxy attendance through a dual-authentication mechanism: AI-powered facial recognition with live liveness detection paired with geofenced biometric kiosks. Attendance data syncs instantly, generating real-time parent WhatsApp alerts and automated UGC/AICTE 75% compliance debarment warnings.',
      odiaTranslation:
        'ଧନେକ୍ସା କଲେଜ ERP ଫେସ୍ ରେକଗ୍ନିସନ ଏବଂ ବାୟୋମେଟ୍ରିକ୍ ସାହାଯ୍ୟରେ ନକଲି ଉପସ୍ଥାନକୁ ସମ୍ପୂର୍ଣ୍ଣ ରୋକିଥାଏ ଏବଂ ଅଭିଭାବକଙ୍କୁ ତୁରନ୍ତ ସୂଚନା ଦିଏ।',
      suggestedActions: [
        'Launch Interactive Attendance Simulator',
        'Book Campus Technical Assessment',
        'Download ERP Feature Matrix',
      ],
      latencyMs: 120,
    };
  }

  if (lower.includes('whatsapp') || lower.includes('multilingual') || lower.includes('shristi')) {
    return {
      query,
      lang: 'english',
      responseText:
        'ShristiAI is purpose-built for regional linguistic nuance. It integrates directly into WhatsApp Business Cloud API, official college portals, and enterprise CRMs to communicate seamlessly in Odia (both formal and colloquial Sambalpuri/Kosal dialects), English, and Hindi without translation degradation.',
      odiaTranslation:
        'ସୃଷ୍ଟି AI ଓଡ଼ିଆ, ଇଂରାଜୀ ଏବଂ ହିନ୍ଦୀ ଭାଷାରେ WhatsApp ଏବଂ ୱେବ୍ ପୋର୍ଟାଲ୍ ସହ ସହଜରେ କାର୍ଯ୍ୟ କରିଥାଏ।',
      suggestedActions: [
        'Explore ShristiAI Integration',
        'Schedule Institution Demo',
        'Contact AI Engineering Team',
      ],
      latencyMs: 135,
    };
  }

  return {
    query,
    lang: 'english',
    responseText:
      'Welcome to Dhanexa Technologies & ShristiAI. We are Odisha’s pioneering AI and digital solutions house, specializing in high-impact Educational ERPs, multilingual voice/text AI agents, bespoke software, and full-spectrum digital marketing. How can we empower your organization today?',
    suggestedActions: [
      'Explore College ERP Solutions',
      'Test Multilingual ShristiAI Demo',
      'Submit Project Enquiry',
    ],
    latencyMs: 110,
  };
}
