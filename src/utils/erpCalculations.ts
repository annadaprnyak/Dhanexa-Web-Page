import { StudentAttendanceRecord } from '../types/index.ts';

export interface AttendanceSummary {
  total: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  presentPercentage: number;
  belowThresholdCount: number; // below 75%
}

export function calculateAttendanceSummary(
  records: StudentAttendanceRecord[],
  threshold = 75
): AttendanceSummary {
  if (!records || records.length === 0) {
    return {
      total: 0,
      presentCount: 0,
      absentCount: 0,
      lateCount: 0,
      presentPercentage: 0,
      belowThresholdCount: 0,
    };
  }

  const total = records.length;
  let presentCount = 0;
  let absentCount = 0;
  let lateCount = 0;
  let belowThresholdCount = 0;

  for (const r of records) {
    if (r.status === 'present') presentCount++;
    else if (r.status === 'absent') absentCount++;
    else if (r.status === 'late') lateCount++;

    if (r.attendanceRate < threshold) {
      belowThresholdCount++;
    }
  }

  const presentPercentage = Math.round(((presentCount + lateCount * 0.5) / total) * 100);

  return {
    total,
    presentCount,
    absentCount,
    lateCount,
    presentPercentage,
    belowThresholdCount,
  };
}

export function filterStudents(
  records: StudentAttendanceRecord[],
  dept: string,
  statusFilter: 'all' | 'present' | 'absent' | 'late' | 'critical',
  threshold = 75
): StudentAttendanceRecord[] {
  return records.filter((student) => {
    const matchesDept = dept === 'All' || student.department === dept;
    if (!matchesDept) return false;

    if (statusFilter === 'all') return true;
    if (statusFilter === 'critical') return student.attendanceRate < threshold;
    return student.status === statusFilter;
  });
}

export function generateParentAlertMessage(
  student: StudentAttendanceRecord,
  collegeName = 'Dhanexa Partner College'
): string {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (student.status === 'absent') {
    return `Dear Parent (${student.parentName}), your ward ${student.name} (Roll: ${student.rollNo}, ${student.department}) is marked ABSENT today (${dateStr}) at ${collegeName}. Current cumulative attendance: ${student.attendanceRate}%. Immediate attention is advised. - Dhanexa ERP`;
  } else if (student.status === 'late') {
    return `Dear Parent (${student.parentName}), your ward ${student.name} arrived LATE at ${student.checkInTime} on ${dateStr} at ${collegeName}. - Dhanexa ERP`;
  } else {
    return `Dear Parent (${student.parentName}), your ward ${student.name} is PRESENT at ${student.checkInTime} on ${dateStr}. Cumulative attendance: ${student.attendanceRate}%. - Dhanexa ERP`;
  }
}
