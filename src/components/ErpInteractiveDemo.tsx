import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Filter,
  Send,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { INITIAL_STUDENTS } from '../data/mockErpData.ts';
import { StudentAttendanceRecord } from '../types/index.ts';
import {
  calculateAttendanceSummary,
  filterStudents,
  generateParentAlertMessage
} from '../utils/erpCalculations.ts';

interface ErpInteractiveDemoProps {
  onRequestDemo: () => void;
}

export const ErpInteractiveDemo: React.FC<ErpInteractiveDemoProps> = ({
  onRequestDemo,
}) => {
  const [students, setStudents] = useState<StudentAttendanceRecord[]>(INITIAL_STUDENTS);
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'present' | 'absent' | 'late' | 'critical'>('all');
  const [activeAlertStudent, setActiveAlertStudent] = useState<StudentAttendanceRecord | null>(null);
  const [parentAlertLog, setParentAlertLog] = useState<{ id: string; time: string; msg: string; recipient: string }[]>([]);

  const departments = ['All', 'Computer Science', 'Electronics', 'Mechanical', 'Civil Engg', 'MBA'];
  const summary = calculateAttendanceSummary(students, 75);
  const filteredList = filterStudents(students, selectedDept, statusFilter, 75);

  const toggleStudentStatus = (id: string, newStatus: 'present' | 'absent' | 'late') => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== id) return student;
        const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return {
          ...student,
          status: newStatus,
          checkInTime: newStatus === 'absent' ? '-' : nowTime,
          attendanceRate:
            newStatus === 'absent'
              ? Math.max(student.attendanceRate - 2, 45)
              : Math.min(student.attendanceRate + 1, 99),
        };
      })
    );
  };

  const handleSendParentAlert = (student: StudentAttendanceRecord) => {
    const alertMsg = generateParentAlertMessage(student, 'Utkal Tech Institute (Bhubaneswar)');
    setActiveAlertStudent(student);

    setParentAlertLog((prev) => [
      {
        id: `alert-${Date.now()}`,
        time: new Date().toLocaleTimeString(),
        msg: alertMsg,
        recipient: `${student.parentName} (${student.parentPhone})`,
      },
      ...prev.slice(0, 4),
    ]);
  };

  const handleExportCsv = () => {
    const headers = 'Roll No,Student Name,Department,Semester,Status,Check-In Time,Method,Cumulative Attendance,Parent Name,Parent Phone\n';
    const rows = students
      .map(
        (s) =>
          `"${s.rollNo}","${s.name}","${s.department}","${s.semester}","${s.status.toUpperCase()}","${s.checkInTime}","${s.method}","${s.attendanceRate}%","${s.parentName}","${s.parentPhone}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dhanexa_College_ERP_Attendance_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="erp-demo" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Flagship Campus Solution</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>100% Proxy Elimination</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive College ERP & Attendance Demo
            </h2>
            <p className="mt-3 text-slate-300 text-base leading-relaxed">
              Explore how Dhanexa ERP streamlines campus attendance, detects low-attendance students before exams, and notifies parents via automated WhatsApp alerts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors"
              title="Download CSV attendance sheet"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export CSV Report</span>
            </button>

            <button
              onClick={onRequestDemo}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Full Campus Demo</span>
            </button>
          </div>
        </div>

        {/* Dummy Data Disclaimer Notice as requested in brief */}
        <div className="mt-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
          <Info className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Simulated Demo Sandbox:</strong> All student names, roll numbers, and contact credentials shown below are synthetic dummy data for demonstration purposes. Live client systems operate on encrypted, private on-premise or dedicated cloud servers.
          </span>
        </div>

        {/* Live Attendance Macro Metrics Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="text-xs text-slate-400">Enrolled Students</div>
            <div className="text-2xl font-bold text-white mt-1">{summary.total}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Across 5 Departments</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-emerald-900/30">
            <div className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Present</span>
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{summary.presentCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Biometric & RFID verified</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-rose-900/30">
            <div className="text-xs text-rose-400 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              <span>Absent</span>
            </div>
            <div className="text-2xl font-bold text-rose-400 mt-1">{summary.absentCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Trigger parent alerts</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-amber-900/30">
            <div className="text-xs text-amber-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Late Entry</span>
            </div>
            <div className="text-2xl font-bold text-amber-400 mt-1">{summary.lateCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">After 09:15 AM cut-off</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="text-xs text-slate-400">Overall Rate</div>
            <div className="text-2xl font-bold text-white mt-1">{summary.presentPercentage}%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Campus Average Today</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-rose-900/40 bg-rose-950/10">
            <div className="text-xs text-rose-300 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>&lt; 75% Critical</span>
            </div>
            <div className="text-2xl font-bold text-rose-400 mt-1">{summary.belowThresholdCount}</div>
            <div className="text-[11px] text-rose-300 mt-0.5">Debarment warning zone</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Department:</span>
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDept === dept
                    ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Status Segmented Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                statusFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({students.length})
            </button>
            <button
              onClick={() => setStatusFilter('present')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                statusFilter === 'present' ? 'bg-emerald-950 text-emerald-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Present ({summary.presentCount})
            </button>
            <button
              onClick={() => setStatusFilter('absent')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                statusFilter === 'absent' ? 'bg-rose-950 text-rose-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Absent ({summary.absentCount})
            </button>
            <button
              onClick={() => setStatusFilter('critical')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                statusFilter === 'critical' ? 'bg-amber-950 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              &lt; 75% ({summary.belowThresholdCount})
            </button>
          </div>
        </div>

        {/* Student Attendance Table & Alert Engine Side-by-Side */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Table */}
          <div className="lg:col-span-8 overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-[11px] uppercase tracking-wider font-semibold text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Roll & Name</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Cumulative</th>
                    <th className="px-4 py-3">Status & Time</th>
                    <th className="px-4 py-3 text-right">Interactive Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-normal">
                  {filteredList.map((student) => {
                    const isCritical = student.attendanceRate < 75;
                    return (
                      <tr key={student.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-white">{student.name}</div>
                          <div className="text-xs text-slate-400">{student.rollNo}</div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="text-slate-200">{student.department}</div>
                          <div className="text-xs text-slate-400">{student.semester}</div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-bold text-sm ${
                                isCritical ? 'text-rose-400' : 'text-emerald-400'
                              }`}
                            >
                              {student.attendanceRate}%
                            </span>
                            {isCritical && (
                              <span className="text-[10px] text-rose-400 font-semibold uppercase">
                                Debar Risk
                              </span>
                            )}
                          </div>
                          <div className="w-24 bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isCritical ? 'bg-rose-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${student.attendanceRate}%` }}
                            />
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            {student.status === 'present' && (
                              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Present</span>
                              </span>
                            )}
                            {student.status === 'absent' && (
                              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Absent</span>
                              </span>
                            )}
                            {student.status === 'late' && (
                              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Late</span>
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {student.checkInTime} · {student.method}
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Toggle Quick Status */}
                            <button
                              onClick={() => toggleStudentStatus(student.id, 'present')}
                              title="Mark Present"
                              className={`p-1.5 rounded-lg text-xs transition-colors ${
                                student.status === 'present'
                                  ? 'bg-emerald-500 text-slate-950 font-bold'
                                  : 'bg-slate-900 text-slate-400 hover:text-emerald-400'
                              }`}
                            >
                              P
                            </button>
                            <button
                              onClick={() => toggleStudentStatus(student.id, 'absent')}
                              title="Mark Absent"
                              className={`p-1.5 rounded-lg text-xs transition-colors ${
                                student.status === 'absent'
                                  ? 'bg-rose-500 text-slate-950 font-bold'
                                  : 'bg-slate-900 text-slate-400 hover:text-rose-400'
                              }`}
                            >
                              A
                            </button>
                            <button
                              onClick={() => toggleStudentStatus(student.id, 'late')}
                              title="Mark Late"
                              className={`p-1.5 rounded-lg text-xs transition-colors ${
                                student.status === 'late'
                                  ? 'bg-amber-500 text-slate-950 font-bold'
                                  : 'bg-slate-900 text-slate-400 hover:text-amber-400'
                              }`}
                            >
                              L
                            </button>

                            {/* Trigger Parent Alert */}
                            <button
                              onClick={() => handleSendParentAlert(student)}
                              className="ml-1 p-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800/50 text-indigo-300 text-xs flex items-center gap-1"
                              title="Generate Parent Alert Preview"
                            >
                              <MessageSquare className="w-3 h-3 text-indigo-400" />
                              <span className="hidden sm:inline">Alert</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Automated WhatsApp/SMS Alert Engine Simulator */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Automated Parent WhatsApp Engine</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Click any student's &quot;Alert&quot; button to preview instant parent WhatsApp messages sent via Dhanexa Cloud Gateway.
              </p>

              {activeAlertStudent ? (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-emerald-900/40 relative">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                    <span className="font-semibold text-emerald-400">WhatsApp Notification</span>
                    <span>To: {activeAlertStudent.parentName}</span>
                  </div>
                  <div className="mt-3 text-xs leading-relaxed text-slate-200 whitespace-pre-wrap font-sans">
                    {generateParentAlertMessage(activeAlertStudent)}
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Delivered via Dhanexa ShristiAI Engine</span>
                    <span className="text-emerald-400 font-medium">Status: Delivered ✓✓</span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-6 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-400">
                  Select a student from the table to preview real-time automated parent alert copy.
                </div>
              )}

              {/* Recent Alerts Feed */}
              {parentAlertLog.length > 0 && (
                <div className="mt-6">
                  <div className="text-[11px] font-semibold uppercase text-slate-400 mb-2">
                    Recent Simulated Dispatches:
                  </div>
                  <div className="space-y-2">
                    {parentAlertLog.map((log) => (
                      <div
                        key={log.id}
                        className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 text-[11px]"
                      >
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="text-indigo-400 font-medium">{log.recipient}</span>
                          <span>{log.time}</span>
                        </div>
                        <p className="text-slate-300 mt-1 line-clamp-2">{log.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* University Compliance Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>AICTE & UGC 75% Rule Compliance</span>
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Autonomous colleges across Odisha use Dhanexa ERP to automatically calculate eligibility lists before semester exams, preventing last-minute student grievances and litigation.
              </p>
              <button
                onClick={onRequestDemo}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Campus Implementation Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
