import { z } from 'zod';

export const patientSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  contactNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Valid phone number is required (e.g. +1234567890)'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  allergies: z.string(),
  chronicConditions: z.string(),
  currentMedications: z.string(),
  emergencyName: z.string().min(2, 'Emergency contact name required'),
  emergencyPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Valid emergency phone required (e.g. +1234567890)'),
});

export const appointmentSchema = z.object({
  patientId: z.string().min(1, 'Please select a patient'),
  doctorId: z.string().min(1, 'Please select a physician'),
  date: z.string().min(1, 'Date is required'),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  type: z.enum(['Consultation', 'Follow-up', 'Emergency', 'Procedure', 'Lab Review']),
  notes: z.string(),
});

export interface PatientFormValues {
  fullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  contactNumber: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies: string;
  chronicConditions: string;
  currentMedications: string;
  emergencyName: string;
  emergencyPhone: string;
}

export interface AppointmentFormValues {
  patientId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  type: 'Consultation' | 'Follow-up' | 'Emergency' | 'Procedure' | 'Lab Review';
  notes: string;
}
