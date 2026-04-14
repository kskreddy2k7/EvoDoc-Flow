import { useMemo } from 'react';

// Types
export type Patient = {
  id: string;
  name: string;
  notes?: string;
  priority?: 'high' | 'medium' | 'low';
  contactNumber?: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., '09:30 AM'
  type: string; // Consultation, Follow‑up, etc.
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
};

export type Alert = {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  patientName: string;
};

export const useDoctorData = () => {
  // Mock patients
  const patients = useMemo<Patient[]>(
    () => [
      { id: 'p1', name: 'John Doe', notes: 'Allergic to penicillin', priority: 'high', contactNumber: '+1 555-1234' },
      { id: 'p2', name: 'Jane Smith', notes: 'Diabetic', priority: 'medium', contactNumber: '+1 555-5678' },
      { id: 'p3', name: 'Bob Johnson', priority: 'low', contactNumber: '+1 555-9012' },
    ],
    [],
  );

  // Mock appointments
  const today = new Date().toISOString().split('T')[0];
  const appointments = useMemo<Appointment[]>(
    () => [
      {
        id: 'a1',
        patientId: 'p1',
        patientName: 'John Doe',
        date: today,
        timeSlot: '09:00 AM',
        type: 'Consultation',
        status: 'Scheduled',
        notes: 'Follow-up on blood work',
      },
      {
        id: 'a2',
        patientId: 'p2',
        patientName: 'Jane Smith',
        date: today,
        timeSlot: '10:30 AM',
        type: 'Follow-up',
        status: 'Scheduled',
      },
      {
        id: 'a3',
        patientId: 'p3',
        patientName: 'Bob Johnson',
        date: today,
        timeSlot: '11:15 AM',
        type: 'Consultation',
        status: 'Completed',
      },
    ],
    [today],
  );

  // Mock alerts
  const alerts = useMemo<Alert[]>(
    () => [
      { id: 'al1', title: 'High blood pressure', severity: 'high', patientName: 'John Doe' },
      { id: 'al2', title: 'Pending lab results', severity: 'medium', patientName: 'Jane Smith' },
    ],
    [],
  );

  return { patients, appointments, alerts };
};
