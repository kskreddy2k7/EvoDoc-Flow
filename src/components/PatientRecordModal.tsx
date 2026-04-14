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
    <Modal isOpen={isOpen} onClose={onClose} title="Clinical Record" className="sm:max-w-4xl bg-surface/95 backdrop-blur-xl border border-border-base/50">
      <div className="space-y-8 mt-2">
        
        {/* Header Profile */}
        <div className="relative overflow-hidden flex flex-col sm:flex-row gap-6 items-center sm:items-start p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-all">
          <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
            <User className="w-48 h-48" />
          </div>
          <div className="z-10 h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-4xl shadow-xl shadow-blue-500/30 flex-shrink-0 border border-white/20">
            {patient.fullName.charAt(0)}
          </div>
          <div className="z-10 flex-1 text-center sm:text-left space-y-4 w-full">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{patient.fullName}</h2>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Patient ID: #{patient.id.substring(0,8)}</p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 items-center">
              <span className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm whitespace-nowrap group hover:bg-white dark:hover:bg-slate-700 transition">
                <User className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" /> {patient.gender}
              </span>
              <span className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm whitespace-nowrap group hover:bg-white dark:hover:bg-slate-700 transition">
                <CalendarDays className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform" /> {patient.age} yrs
              </span>
              <span className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 whitespace-nowrap animate-pulse hover:animate-none">
                <Droplet className="h-4 w-4" /> {patient.bloodGroup}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Medical Indicators */}
          <div className="space-y-5">
            <h4 className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
               <Activity className="h-4 w-4 text-emerald-500" /> Health Overview
            </h4>
            
            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
              
              <div className="group">
                <p className="text-[11px] font-black text-amber-500 uppercase mb-3 tracking-widest flex items-center gap-1.5 leading-none">
                  <AlertCircle className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" /> Allergies
                </p>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.length > 0 ? patient.allergies.map((allergy, i) => (
                    <Badge key={i} variant="outline" className="bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors">{allergy}</Badge>
                  )) : <span className="text-sm font-medium text-slate-400 italic">No known allergies</span>}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-700/50 group">
                <p className="text-[11px] font-black text-blue-500 uppercase mb-3 tracking-widest flex items-center gap-1.5 leading-none">
                  <ShieldCheck className="h-3.5 w-3.5 transition-transform group-hover:scale-110" /> Chronic Conditions
                </p>
                <div className="flex flex-wrap gap-2">
                  {patient.chronicConditions.length > 0 ? patient.chronicConditions.map((cond, i) => (
                    <Badge key={i} variant="outline" className="bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20 font-bold px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">{cond}</Badge>
                  )) : <span className="text-sm font-medium text-slate-400 italic">None recorded</span>}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-700/50 group">
                <p className="text-[11px] font-black text-emerald-500 uppercase mb-3 tracking-widest flex items-center gap-1.5 leading-none">
                  <HeartPulse className="h-3.5 w-3.5 transition-transform group-hover:scale-110" /> Active Medications
                </p>
                <div className="flex flex-wrap gap-2">
                  {patient.currentMedications.length > 0 ? patient.currentMedications.map((med, i) => (
                    <Badge key={i} variant="outline" className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">{med}</Badge>
                  )) : <span className="text-sm font-medium text-slate-400 italic">None prescribed</span>}
                </div>
              </div>

            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-5">
            <h4 className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
               <Phone className="h-4 w-4 text-indigo-500" /> Contact Matrix
            </h4>
            
            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
              
              <div className="space-y-3">
                <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">Direct Patient Line</p>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all group hover:border-indigo-500/30 hover:shadow-md cursor-pointer">
                  <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-3 rounded-xl text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                    <Phone className="h-5 w-5 fill-white/20" />
                  </div>
                  <div>
                    <span className="block font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">{patient.contactNumber}</span>
                    <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Primary Contact</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-900/20 border border-rose-200 dark:border-rose-800/30 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:shadow-rose-500/5 transition-all cursor-pointer">
                <div className="absolute -top-4 -right-4 opacity-5 dark:opacity-10 group-hover:scale-110 transition-transform duration-500">
                   <AlertCircle className="h-32 w-32 text-rose-600 dark:text-rose-400 fill-rose-600/20" />
                </div>
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-500/10 w-fit px-3 py-1.5 rounded-full border border-rose-200/50 dark:border-rose-500/20">
                    <div className="h-2 w-2 rounded-full bg-rose-600 dark:bg-rose-400 animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Emergency Protocol</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl border border-rose-100 dark:border-rose-900/30 backdrop-blur-sm">
                       <p className="text-[10px] font-bold text-rose-800/60 dark:text-rose-300/60 uppercase tracking-widest mb-1">Point of Contact</p>
                       <p className="font-extrabold text-rose-950 dark:text-rose-100 text-lg tracking-tight truncate" title={patient.emergencyContact.name}>{patient.emergencyContact.name}</p>
                     </div>
                     <div className="bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl border border-rose-100 dark:border-rose-900/30 backdrop-blur-sm">
                       <p className="text-[10px] font-bold text-rose-800/60 dark:text-rose-300/60 uppercase tracking-widest mb-1">Secure Line</p>
                       <div className="font-extrabold text-rose-600 dark:text-rose-400 text-lg tracking-tight truncate" title={patient.emergencyContact.phone}>
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

