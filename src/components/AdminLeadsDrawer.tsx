import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  Filter,
  UserCheck
} from 'lucide-react';
import { EnquirySubmission } from '../types/index.ts';

interface AdminLeadsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leads: EnquirySubmission[];
  onUpdateStatus: (id: string, status: EnquirySubmission['status']) => void;
  onClearLeads: () => void;
}

export const AdminLeadsDrawer: React.FC<AdminLeadsDrawerProps> = ({
  isOpen,
  onClose,
  leads,
  onUpdateStatus,
  onClearLeads,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'demo_request' | 'general_enquiry'>('all');

  if (!isOpen) return null;

  const filtered = leads.filter((lead) => {
    if (filterType === 'all') return true;
    return lead.type === filterType;
  });

  const handleExportCsv = () => {
    if (leads.length === 0) return;

    const headers = 'ID,Date,Type,Name,Organization,Phone,Email,Service,Status,Preferred Date,Preferred Time,Message\n';
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.createdAt}","${l.type}","${l.name}","${l.organization}","${l.phone}","${l.email}","${l.serviceName}","${l.status}","${l.preferredDate || ''}","${l.preferredTime || ''}","${(l.message || '').replace(/"/g, '""')}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dhanexa_Inquiries_and_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-2xl h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Internal Lead Tracker (Phase 4 Spec)</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Active Enquiries &amp; Demo Requests ({leads.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              disabled={leads.length === 0}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
              title="Export all leads to CSV"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close Leads Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <span className="text-slate-400 mr-2">Filter:</span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md ${
                filterType === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({leads.length})
            </button>
            <button
              onClick={() => setFilterType('demo_request')}
              className={`px-2.5 py-1 rounded-md ${
                filterType === 'demo_request'
                  ? 'bg-emerald-950 text-emerald-300 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Demo Requests ({leads.filter((l) => l.type === 'demo_request').length})
            </button>
            <button
              onClick={() => setFilterType('general_enquiry')}
              className={`px-2.5 py-1 rounded-md ${
                filterType === 'general_enquiry'
                  ? 'bg-indigo-950 text-indigo-300 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Consultations ({leads.filter((l) => l.type === 'general_enquiry').length})
            </button>
          </div>

          {leads.length > 0 && (
            <button
              onClick={onClearLeads}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-[11px]"
              title="Clear all leads"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Leads Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p>No enquiries or demo requests found in this view.</p>
              <p className="mt-1 text-slate-400">
                Submit an inquiry on the homepage or book a demo to populate this tracker.
              </p>
            </div>
          ) : (
            filtered.map((lead) => (
              <div
                key={lead.id}
                className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all text-xs space-y-3"
              >
                {/* Header Line */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400 font-bold">{lead.id}</span>
                    <span className="text-slate-600">·</span>
                    <span
                      className={`text-[11px] font-semibold ${
                        lead.type === 'demo_request' ? 'text-amber-400' : 'text-indigo-400'
                      }`}
                    >
                      {lead.type === 'demo_request' ? 'Demo Request' : 'Service Consultation'}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={lead.status}
                    onChange={(e) => onUpdateStatus(lead.id, e.target.value as EnquirySubmission['status'])}
                    className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[11px] focus:outline-none"
                  >
                    <option value="new">Status: New</option>
                    <option value="demo_scheduled">Status: Scheduled</option>
                    <option value="contacted">Status: Contacted</option>
                    <option value="closed">Status: Closed</option>
                  </select>
                </div>

                {/* Lead Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-400">Contact:</span>{' '}
                    <strong className="text-white">{lead.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Organization:</span>{' '}
                    <strong className="text-white">{lead.organization}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lead.email}</span>
                  </div>
                </div>

                {/* Target Service & Scheduling Data */}
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <div>
                    <span className="text-slate-400">Target Service:</span>{' '}
                    <span className="text-emerald-400 font-medium">{lead.serviceName}</span>
                  </div>
                  {lead.preferredDate && (
                    <div>
                      <span className="text-slate-400">Preferred Slot:</span>{' '}
                      <span className="text-slate-200">
                        {lead.preferredDate} ({lead.preferredTime})
                      </span>
                    </div>
                  )}
                  {lead.message && (
                    <div className="pt-1 text-slate-300 italic text-[11px]">
                      &ldquo;{lead.message}&rdquo;
                    </div>
                  )}
                </div>

                {/* Quick Action Strip */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">
                    Logged: {new Date(lead.createdAt).toLocaleString('en-IN')}
                  </span>

                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                      lead.name
                    )},%20this%20is%20Dhanexa%20Technologies%20regarding%20your%20inquiry%20(Ref:%20${lead.id})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 font-medium text-[11px] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Direct WhatsApp Lead</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
