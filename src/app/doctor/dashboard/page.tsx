'use client';

import { useAuthStore } from '@/store/authStore';
import { useAppointmentStore } from '@/store/appointmentStore';
import { usePatientStore } from '@/store/patientStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { 
  Users, 
  Calendar, 
  Clock,
  ArrowRight, 
  Bell, 
  Activity,
  User,
  CheckCircle2,
  CalendarDays,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import { formatDate, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PatientRecordModal } from '@/components/PatientRecordModal';

export default function DoctorDashboard() {
  const user = useAuthStore((s) => s.user);
  const appointments = useAppointmentStore((s) => s.appointments);
  const patients = usePatientStore((s) => s.patients);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(app => app.date === today && app.status !== 'Cancelled');
  const nextPatient = todayAppointments.find(app => app.status === 'Scheduled');
  const nextPatientData = nextPatient ? patients.find(p => p.id === nextPatient.patientId) : null;

  const stats = [
    { label: 'Today’s Sessions', value: todayAppointments.length, icon: CalendarDays, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Weekly Appointments', value: appointments.length, icon: Calendar, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Total Patients Managed', value: patients.length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { label: 'Average Wait Time', value: '0m', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-text-base mb-1"
          >
            Welcome, Dr. {user?.name?.replace('Dr. ', '')}
          </motion.h1>
          <p className="text-muted font-medium text-sm">Here’s your clinical overview for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsNotifsOpen(!isNotifsOpen)}
              className="relative h-10 w-10 rounded-xl flex-shrink-0"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-surface animate-pulse"></span>
            </Button>
            
            <AnimatePresence>
              {isNotifsOpen && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
                   className="absolute top-14 right-0 z-50 w-[320px] sm:w-80 bg-surface border border-border-base rounded-2xl shadow-premium overflow-hidden"
                 >
                   <div className="p-4 border-b border-border-base flex justify-between items-center bg-accent/30">
                     <span className="font-black text-text-base">Notifications</span>
                     <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full">2 New</span>
                   </div>
                   <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                     <div className="p-3 hover:bg-accent/50 rounded-xl cursor-pointer transition-colors relative group">
                       <span className="absolute top-5 left-3 h-2 w-2 bg-red-500 rounded-full flex-shrink-0"></span>
                       <div className="pl-5 space-y-1">
                         <p className="text-sm font-bold text-text-base leading-tight">High-priority allergy reported</p>
                         <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Michael Chen • 5m ago</p>
                       </div>
                     </div>
                     <div className="p-3 hover:bg-accent/50 rounded-xl cursor-pointer transition-colors relative group">
                       <span className="absolute top-5 left-3 h-2 w-2 bg-primary rounded-full flex-shrink-0"></span>
                       <div className="pl-5 space-y-1">
                         <p className="text-sm font-bold text-text-base leading-tight">New lab results uploaded</p>
                         <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Sarah Jenkins • 1hr ago</p>
                       </div>
                     </div>
                   </div>
                   <div className="p-3 border-t border-border-base text-center">
                     <button 
                       onClick={() => setIsNotifsOpen(false)}
                       className="text-xs font-black text-primary uppercase tracking-widest hover:underline"
                     >
                       Mark all as read
                     </button>
                   </div>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/doctor/appointments">
            <Button className="gap-2 px-5 h-10 rounded-xl shadow-lg shadow-primary/20 text-sm">
              <CalendarDays className="h-4 w-4" />
              Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <Card key={idx} hoverEffect className="border-none shadow-sm h-full">
            <CardContent className="p-4 sm:p-6">
              <div className={cn("inline-flex p-2.5 rounded-2xl mb-3", s.bg)}>
                <s.icon className={cn("h-5 w-5", s.color)} />
              </div>
              <p className="text-muted text-[10px] font-bold uppercase tracking-widest mb-1">{s.label}</p>
              <h3 className="text-2xl sm:text-3xl font-black text-text-base">{s.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Patient Focus */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-premium relative overflow-hidden bg-primary text-white p-1">
            <div className="bg-surface rounded-[calc(1rem-1px)] p-5 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <Badge variant="success" pulse className="px-4 py-1.5 rounded-full">Primary Focus</Badge>
                <span className="text-xs font-bold text-muted uppercase tracking-tighter">30 min</span>
              </div>
              
              {nextPatient ? (
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="relative flex-shrink-0">
                    <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-[2rem] bg-accent text-primary flex items-center justify-center text-3xl sm:text-4xl font-black shadow-inner ring-4 ring-bg-base">
                      {nextPatient.patientName.charAt(0)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-xl text-white shadow-lg">
                      <Clock className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4 text-center sm:text-left w-full">
                    <div>
                       <h2 className="text-2xl sm:text-3xl font-black text-text-base tracking-tight mb-2">{nextPatient.patientName}</h2>
                       <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm text-muted font-bold uppercase tracking-widest mt-2">
                         <span className="flex items-center gap-1.5 bg-accent px-3 py-1 rounded-lg text-xs"><Clock className="h-3.5 w-3.5 text-primary" /> {nextPatient.timeSlot}</span>
                         <span className="flex items-center gap-1.5 bg-accent px-3 py-1 rounded-lg text-xs"><Users className="h-3.5 w-3.5 text-primary" /> {nextPatient.type}</span>
                         {nextPatientData && (
                           <>
                             <span className="flex items-center gap-1.5 bg-accent px-3 py-1 rounded-lg text-xs"><Phone className="h-3.5 w-3.5 text-primary" /> {nextPatientData.contactNumber}</span>
                           </>
                         )}
                       </div>
                    </div>
                    
                    <div className="bg-bg-base/50 p-4 rounded-2xl border border-border-base/50">
                       <p className="text-[10px] font-bold text-muted uppercase mb-1">Registration Notes</p>
                       <p className="text-sm font-medium italic text-text-base">&quot;{nextPatient.notes || "Standard follow-up consultation."}&quot;</p>
                    </div>

                    <Link href={`/doctor/patient/${nextPatient.patientId}`} className="block">
                      <Button className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-2xl gap-3 text-base shadow-xl shadow-primary/30">
                        Start Consultation <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-muted font-bold italic h-64 flex flex-col items-center justify-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-primary">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  No active consultations at the moment.
                </div>
              )}
            </div>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border-base pb-6">
              <CardTitle className="text-2xl font-black tracking-tight">Daily Queue</CardTitle>
              <Link href="/doctor/appointments" className="text-sm font-bold text-primary hover:underline underline-offset-4">Full Schedule</Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border-base">
                {todayAppointments.length > 0 ? (
                  todayAppointments.slice(0, 5).map((app) => (
                    <div 
                      key={app.id} 
                      onClick={() => setSelectedPatientId(app.patientId)}
                      className="p-6 flex items-center justify-between hover:bg-accent/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="h-12 w-12 rounded-2xl bg-accent group-hover:bg-primary/10 transition-colors flex items-center justify-center font-black text-sm text-primary">
                          {app.patientName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-text-base group-hover:text-primary transition-colors">{app.patientName}</p>
                          <p className="text-xs font-bold text-muted flex items-center gap-2">
                             <Clock className="h-3.5 w-3.5" /> {app.timeSlot} • {app.type}
                          </p>
                        </div>
                      </div>
                      <Badge variant={app.status === 'Scheduled' ? 'default' : 'success'}>
                        {app.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="p-16 text-center flex flex-col items-center justify-center gap-3">
                    <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center text-muted">
                       <CalendarDays className="h-8 w-8 opacity-50" />
                    </div>
                    <p className="font-bold text-text-base">Your schedule is clear for today</p>
                    <p className="text-xs font-medium text-muted max-w-[200px]">No appointments scheduled yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar activity timeline */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-10 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-border-base">
                {appointments.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-8">
                    <div className={cn("absolute left-0 top-1 h-2.5 w-2.5 rounded-full ring-4 ring-surface shadow-sm text-primary bg-primary")}></div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                         <p className="text-sm font-black text-text-base">{item.type} {item.status}</p>
                         <span className="text-[10px] font-black uppercase text-muted tracking-tighter">{item.timeSlot}</span>
                      </div>
                      <p className="text-xs font-bold text-muted flex items-center gap-1.5">
                        <User className="h-3 w-3" /> {item.patientName}
                      </p>
                    </div>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <div className="text-sm text-center text-muted font-bold italic py-4">No recent activity</div>
                )}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
      <PatientRecordModal 
        isOpen={!!selectedPatientId} 
        onClose={() => setSelectedPatientId(null)} 
        patientId={selectedPatientId} 
      />
    </div>
  );
}
