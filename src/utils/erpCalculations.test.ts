import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAttendanceSummary, filterStudents, generateParentAlertMessage } from './erpCalculations.ts';
import { StudentAttendanceRecord } from '../types/index.ts';

const mockStudents: StudentAttendanceRecord[] = [
  {
    id: 's1',
    rollNo: 'CSE-001',
    name: 'Aarav Patnaik',
    department: 'Computer Science',
    semester: '6th Sem',
    status: 'present',
    checkInTime: '08:42 AM',
    method: 'Biometric Face Scan',
    attendanceRate: 88,
    parentPhone: '+919876543210',
    parentName: 'Ramesh Patnaik',
  },
  {
    id: 's2',
    rollNo: 'CSE-002',
    name: 'Priyanka Das',
    department: 'Computer Science',
    semester: '6th Sem',
    status: 'absent',
    checkInTime: '-',
    method: 'Faculty Portal',
    attendanceRate: 72, // Below 75%
    parentPhone: '+919876543211',
    parentName: 'Sunita Das',
  },
  {
    id: 's3',
    rollNo: 'ECE-015',
    name: 'Rohan Mohanty',
    department: 'Electronics',
    semester: '4th Sem',
    status: 'late',
    checkInTime: '09:25 AM',
    method: 'RFID Card',
    attendanceRate: 78,
    parentPhone: '+919876543212',
    parentName: 'Bijay Mohanty',
  },
  {
    id: 's4',
    rollNo: 'ME-020',
    name: 'Subhashree Nayak',
    department: 'Mechanical',
    semester: '8th Sem',
    status: 'present',
    checkInTime: '08:35 AM',
    method: 'Mobile GPS Geofence',
    attendanceRate: 68, // Below 75%
    parentPhone: '+919876543213',
    parentName: 'Pradeep Nayak',
  },
];

test('calculateAttendanceSummary computes accurate numbers and percentages', () => {
  const summary = calculateAttendanceSummary(mockStudents, 75);
  assert.equal(summary.total, 4);
  assert.equal(summary.presentCount, 2);
  assert.equal(summary.absentCount, 1);
  assert.equal(summary.lateCount, 1);
  assert.equal(summary.belowThresholdCount, 2); // s2 (72) and s4 (68)
  // (2 + 1*0.5) / 4 = 2.5 / 4 = 62.5 -> rounds to 63%
  assert.equal(summary.presentPercentage, 63);
});

test('calculateAttendanceSummary handles empty student list safely', () => {
  const summary = calculateAttendanceSummary([]);
  assert.equal(summary.total, 0);
  assert.equal(summary.presentCount, 0);
  assert.equal(summary.presentPercentage, 0);
  assert.equal(summary.belowThresholdCount, 0);
});

test('filterStudents filters by department and status correctly', () => {
  const cseOnly = filterStudents(mockStudents, 'Computer Science', 'all');
  assert.equal(cseOnly.length, 2);

  const absentsOnly = filterStudents(mockStudents, 'All', 'absent');
  assert.equal(absentsOnly.length, 1);
  assert.equal(absentsOnly[0].name, 'Priyanka Das');

  const criticalOnly = filterStudents(mockStudents, 'All', 'critical', 75);
  assert.equal(criticalOnly.length, 2);
  assert.ok(criticalOnly.some((s) => s.rollNo === 'CSE-002'));
  assert.ok(criticalOnly.some((s) => s.rollNo === 'ME-020'));
});

test('generateParentAlertMessage creates helpful notices for absent, late and present', () => {
  const absentMsg = generateParentAlertMessage(mockStudents[1], 'Utkal Tech Institute');
  assert.ok(absentMsg.includes('ABSENT'));
  assert.ok(absentMsg.includes('Priyanka Das'));
  assert.ok(absentMsg.includes('Sunita Das'));
  assert.ok(absentMsg.includes('72%'));

  const lateMsg = generateParentAlertMessage(mockStudents[2], 'Utkal Tech Institute');
  assert.ok(lateMsg.includes('LATE'));
  assert.ok(lateMsg.includes('09:25 AM'));
});
