export type Role = 'nurse' | 'doctor';

export interface User {
  id: string;
  name: string;
  role: Role | null;
  email?: string;
  specialization?: string;
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Gender = 'Male' | 'Female' | 'Other';

export interface Patient {
  id: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: Gender;
  contactNumber: string;
  bloodGroup: BloodGroup;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  emergencyContact: {
    name: string;
    phone: string;
  };
  createdAt: string;
}

export type AppointmentStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'In Progress' | 'Waiting';
export type AppointmentType = 'Consultation' | 'Follow-up' | 'Emergency' | 'Procedure' | 'Lab Review';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  type: AppointmentType;
  notes: string;
  clinicalNotes?: string;
}

export interface ClinicalNote {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  content: string;
  timestamp: string;
}
