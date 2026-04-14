import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { usePatientStore } from '@/store/patientStore';
import { 
  Phone, 
  AlertCircle, 
  Droplet, 
  User, 
  Activity, 
  ShieldCheck, 
  HeartPulse,
  CalendarDays
} from 'lucide-react';
import { Badge } from '@/components/ui/Card';

export function PatientRecordModal({ 
  patientId, 
  isOpen, 
  onClose 
}: { 
  patientId: string | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const patients = usePatientStore((s) => s.patients);
  const patient = patients.find(p => p.id === patientId);

  if (!patient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Clinical Record" className="sm:max-w-3xl">
      <div className="space-y-6 sm:space-y-10 mt-1">
        
        {/* Header Profile */}
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start p-5 sm:p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-border-base shadow-inner">
          <div className="h-20 w-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-500/20 flex-shrink-0">
            {patient.fullName.charAt(0)}
          </div>
          <div className="flex-1 text-center sm:text-left space-y-3 w-full">
            <h2 className="text-2xl sm:text-4xl font-black text-text-base tracking-tighter leading-none">{patient.fullName}</h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 items-center">
              <span className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-border-base px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm whitespace-nowrap">
                <User className="h-4 w-4 text-blue-600" /> {patient.gender}
              </span>
              <span className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-border-base px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm whitespace-nowrap">
                <CalendarDays className="h-4 w-4 text-blue-600" /> {patient.age} yrs
              </span>
              <span className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 whitespace-nowrap">
                <Droplet className="h-4 w-4" /> {patient.bloodGroup}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {/* Medical Indicators */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-muted uppercase">
               <Activity className="h-4 w-4 text-blue-600" /> Health Overview
            </h4>
            
            <div className="bg-white dark:bg-slate-900 border border-border-base rounded-2xl p-5 shadow-sm space-y-6">
              <div>
                <p className="text-[10px] font-black text-amber-600 uppercase mb-3 tracking-widest flex items-center gap-1.5 leading-none">
                  <AlertCircle className="h-3 w-3" /> Allergies
                </p>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.length > 0 ? patient.allergies.map((allergy, i) => (
                    <Badge key={i} variant="outline" className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 font-bold px-3 py-1 rounded-lg">{allergy}</Badge>
                  )) : <span className="text-sm font-semibold text-muted italic">None</span>}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black text-blue-600 uppercase mb-3 tracking-widest flex items-center gap-1.5 leading-none">
                  <ShieldCheck className="h-3 w-3" /> Chronic Conditions
                </p>
                <div className="flex flex-wrap gap-2">
                  {patient.chronicConditions.length > 0 ? patient.chronicConditions.map((cond, i) => (
                    <Badge key={i} variant="outline" className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 font-bold px-3 py-1 rounded-lg">{cond}</Badge>
                  )) : <span className="text-sm font-semibold text-muted italic">None</span>}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black text-green-600 uppercase mb-3 tracking-widest flex items-center gap-1.5 leading-none">
                  <HeartPulse className="h-3 w-3" /> Medications
                </p>
                <div className="flex flex-wrap gap-2">
                  {patient.currentMedications.length > 0 ? patient.currentMedications.map((med, i) => (
                    <Badge key={i} variant="outline" className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 font-bold px-3 py-1 rounded-lg">{med}</Badge>
                  )) : <span className="text-sm font-semibold text-muted italic">None</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-muted uppercase">
               <Phone className="h-4 w-4 text-blue-600" /> Contact Matrix
            </h4>
            
            <div className="bg-white dark:bg-slate-900 border border-border-base rounded-2xl p-5 shadow-sm space-y-5">
              <div>
                <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 leading-none">Direct Patient Line</p>
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-border-base transition-all group hover:border-blue-500/30">
                  <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-extrabold text-lg tracking-tight text-text-base">{patient.contactNumber}</span>
                </div>
              </div>

              <div className="p-5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl relative overflow-hidden group">
                <div className="absolute -top-3 -right-3 opacity-5">
                   <Phone className="h-24 w-24 text-red-600" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Emergency Protocol</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                     <div>
                       <p className="text-[10px] font-black text-muted uppercase tracking-tighter mb-0.5">Point of Contact</p>
                       <p className="font-black text-text-base text-xl tracking-tight">{patient.emergencyContact.name}</p>
                     </div>
                     <div>
                       <p className="text-[10px] font-black text-muted uppercase tracking-tighter mb-0.5">Secure Line</p>
                       <div className="font-black text-red-600 dark:text-red-400 text-lg">
                          {patient.emergencyContact.phone}
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </Modal>
  );
}
