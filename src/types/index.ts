export type ServiceId =
  | 'college-erp'
  | 'custom-software'
  | 'web-development'
  | 'app-development'
  | 'social-media'
  | 'seo-services'
  | 'digital-marketing';

export interface ServiceDetail {
  id: ServiceId;
  title: string;
  tagline: string;
  category: 'Educational Technology' | 'Core Engineering' | 'Growth & Marketing';
  audience: string;
  overview: string;
  benefits: string[];
  keyFeatures: { title: string; desc: string }[];
  process: string[];
  recommendedFor: string[];
  iconName: string;
}

export interface StudentAttendanceRecord {
  id: string;
  rollNo: string;
  name: string;
  department: string;
  semester: string;
  status: 'present' | 'absent' | 'late';
  checkInTime: string;
  method: 'Biometric Face Scan' | 'RFID Card' | 'Mobile GPS Geofence' | 'Faculty Portal';
  attendanceRate: number; // percentage e.g. 84
  parentPhone: string;
  parentName: string;
  lastAlertSent?: string;
}

export interface EnquirySubmission {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  serviceId: ServiceId;
  serviceName: string;
  message: string;
  status: 'new' | 'contacted' | 'demo_scheduled' | 'closed';
  type: 'general_enquiry' | 'demo_request';
  preferredDate?: string;
  preferredTime?: string;
  institutionType?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  category: string;
  summary: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  image: string;
}
