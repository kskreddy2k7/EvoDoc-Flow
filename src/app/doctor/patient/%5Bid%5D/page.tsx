'use client';

import { useState, use } from 'react';
import { useAppointmentStore } from '@/store/appointmentStore';
import { usePatientStore } from '@/store/patientStore';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Modal';
import { toast } from 'react-hot-toast';
import { 
  User, 
  Phone, 
  Droplets, 
  AlertTriangle, 
  Plus, 
  ChevronLeft,
  FileText,
  History,
  Activity,
  Save,
  Stethoscope,
  Heart,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function PatientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const patients = usePatientStore((s) => s.patients);
  const appointments = useAppointmentStore((s) => s.appointments);
  const updateAppointment = useAppointmentStore((s) => s.updateAppointment);
  const patient = patients.find(p => p.id === resolvedParams.id);
  const patientAppointments = appointments.filter(app => app.patientId === resolvedParams.id);

  const [activeTab, setActiveTab] = useState('overview');
  const [isUpdating, setIsUpdating] = useState(false);
  const [clinicalNote, setClinicalNote] = useState('');

  if (!patient) return <div className="p-8 text-center font-bold text-muted">Patient not found.</div>;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'history', label: 'Medical History' },
    { id: 'visits', label: 'Visits' },
    { id: 'notes', label: 'Clinical Notes' },
  ];

  const handleAddNote = () => {
    if (!clinicalNote.trim()) return;
    
    if (patientAppointments.length > 0) {
      // Add note to the most recent appointment
      const latestApp = patientAppointments[0];
      const newNotes = latestApp.clinicalNotes ? latestApp.clinicalNotes + '\n\n' + clinicalNote : clinicalNote;
      updateAppointment(latestApp.id, { clinicalNotes: newNotes, status: 'Completed' });
      toast.success('Clinical note synchronized to EHR');
      setClinicalNote('');
    } else {
      toast.error('No active encounter to attach notes to.');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-6 -ml-2 text-muted hover:text-primary font-bold group"
        >
          <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Schedule
        </Button>
      </motion.div>

      {/* Header Profile Section */}
      <Card className="border-none shadow-premium bg-surface overflow-hidden">
        <div className="h-3 bg-primary w-full" />
        <CardContent className="p-10">
          <div className="flex flex-col lg:flex-row gap-10 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="h-32 w-32 rounded-[3.5rem] bg-accent text-primary flex items-center justify-center text-5xl font-black shadow-inner ring-8 ring-bg-base/50">
                  {patient.fullName.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-surface rounded-2xl shadow-xl flex items-center justify-center border border-border-base">
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                </div>
              </div>
              <div className="text-center md:text-left space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <h1 className="text-4xl font-extrabold text-text-base tracking-tight">{patient.fullName}</h1>
                  <Badge variant="outline" className="h-7 px-3 text-[10px] font-black uppercase tracking-widest border-border-base bg-accent/20">PID-{patient.id.toUpperCase()}</Badge>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 text-sm font-bold text-muted uppercase tracking-widest">
                  <span className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {patient.gender}, {patient.age}Y</span>
                  <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {patient.contactNumber}</span>
                  <span className="flex items-center gap-2"><Droplets className="h-4 w-4 text-red-500" /> {patient.bloodGroup}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-2xl gap-2">
                <ExternalLink className="h-4 w-4" /> Export File
              </Button>
              <Button onClick={() => setIsUpdating(!isUpdating)} className="flex-1 md:flex-none h-12 rounded-2xl px-8 shadow-lg shadow-primary/20">
                {isUpdating ? 'Cancel' : 'Update Profile'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="sticky top-0 z-10 bg-bg-base/80 backdrop-blur-md py-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="border-none shadow-sm h-full">
                      <CardHeader className="bg-accent/30 border-b border-border-base/50 p-6">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-surface flex items-center justify-center border shadow-sm">
                            <Activity className="h-4 w-4 text-primary" />
                          </div>
                          <CardTitle className="text-base font-black">Demographics & Vital</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Emergency Contact</p>
                            <p className="text-sm font-extrabold text-text-base mb-1">{patient.emergencyContact.name}</p>
                            <p className="text-xs font-medium text-primary">{patient.emergencyContact.phone}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Registration</p>
                            <p className="text-sm font-extrabold text-text-base mb-1">Clinic Center-A</p>
                            <p className="text-xs font-medium text-muted">{formatDate(patient.createdAt)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-red-500/10 bg-red-500/5 shadow-none overflow-hidden h-full">
                      <div className="p-6 bg-red-500/90 text-white flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <AlertTriangle className="h-5 w-5" />
                           <span className="text-sm font-black uppercase tracking-tighter">Critical Medical Alerts</span>
                         </div>
                         <Badge variant="error" className="bg-white text-red-600 border-none pulse">High Priority</Badge>
                      </div>
                      <CardContent className="p-8">
                         <p className="text-[10px] font-black text-red-900/60 uppercase tracking-widest mb-4">Known Allergies</p>
                         <div className="flex flex-wrap gap-2">
                           {patient.allergies.length > 0 ? (
                             patient.allergies.map(a => (
                               <Badge key={a} variant="error" className="px-4 py-1.5 rounded-xl font-black text-[10px] shadow-sm shadow-red-200">
                                 {a.toUpperCase()}
                               </Badge>
                             ))
                           ) : <span className="text-sm font-medium text-red-400 italic">No reported allergies.</span>}
                         </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-none shadow-sm">
                    <CardHeader className="p-8 border-b border-border-base pb-6">
                      <CardTitle className="text-xl font-black tracking-tight">Recent Patient History</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border-base">
                        {patientAppointments.map(app => (
                          <div key={app.id} className="p-6 flex items-center justify-between hover:bg-accent/20 transition-all">
                            <div className="flex items-center gap-6">
                              <div className="h-12 w-12 flex items-center justify-center bg-accent rounded-2xl border border-border-base/50 font-black text-primary text-xs">
                                {formatDate(app.date).split(' ')[0]}
                              </div>
                              <div>
                                <p className="text-sm font-black text-text-base">{formatDate(app.date)}</p>
                                <p className="text-xs font-bold text-muted">{app.type} • {app.doctorName}</p>
                              </div>
                            </div>
                            <Badge variant={app.status === 'Completed' ? 'success' : 'default'} className="rounded-lg h-7">
                              {app.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="grid md:grid-cols-2 gap-10">
                  <Card className="border-none shadow-premium h-full overflow-hidden">
                    <CardHeader className="bg-primary text-white p-6">
                      <div className="flex items-center gap-3">
                        <History className="h-5 w-5" />
                        <CardTitle className="text-base font-extrabold">Chronic Conditions</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <ul className="space-y-4">
                        {patient.chronicConditions.map((c, i) => (
                          <li key={i} className="flex items-center gap-4 bg-accent/30 p-4 rounded-2xl border border-border-base/50 group hover:border-primary/50 transition-all">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-sm font-black text-text-base">{c}</span>
                          </li>
                        ))}
                        {patient.chronicConditions.length === 0 && <p className="text-sm text-muted font-bold italic py-10 text-center">No conditions in health record.</p>}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-premium h-full overflow-hidden">
                    <CardHeader className="bg-green-600 text-white p-6">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5" />
                        <CardTitle className="text-base font-extrabold">Current Medications</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <ul className="space-y-4">
                        {patient.currentMedications.map((m, i) => (
                          <li key={i} className="flex items-center gap-4 bg-accent/30 p-4 rounded-2xl border border-border-base/50 group hover:border-green-500/50 transition-all">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-sm font-black text-text-base">{m}</span>
                          </li>
                        ))}
                        {patient.currentMedications.length === 0 && <p className="text-sm text-muted font-bold italic py-10 text-center">No active prescriptions.</p>}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'visits' && (
                <div className="space-y-10">
                  {patientAppointments.map((app, idx) => (
                    <Card key={app.id} className="border-none shadow-sm overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between p-6 bg-surface border-b border-border-base">
                        <div className="flex items-center gap-6">
                          <div className="h-14 w-14 flex items-center justify-center bg-accent rounded-2xl border border-border-base/50 text-xl font-black text-primary shadow-sm shadow-primary/5">
                            {patientAppointments.length - idx}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-black tracking-tight">{formatDate(app.date)}</CardTitle>
                            <p className="text-xs font-bold text-muted uppercase tracking-widest">{app.type} Consultation</p>
                          </div>
                        </div>
                        <Badge className="h-8 px-4 rounded-xl">{app.status}</Badge>
                      </CardHeader>
                      <CardContent className="p-10 bg-accent/5">
                        <div className="grid md:grid-cols-2 gap-12">
                           <div className="space-y-6">
                             <p className="text-[10px] font-black text-muted uppercase tracking-widest">Chief Complaint / Notes</p>
                             <p className="text-sm font-bold text-text-base italic bg-surface p-6 rounded-2xl border-l-4 border-primary shadow-sm leading-relaxed">
                               &quot;{app.notes || 'Routine follow-up for health monitoring.'}&quot;
                             </p>
                           </div>
                           <div className="space-y-6">
                             <p className="text-[10px] font-black text-muted uppercase tracking-widest">Clinical Findings</p>
                             <p className="text-sm font-medium text-text-base leading-relaxed bg-surface/50 p-6 rounded-2xl border border-border-base border-dashed">
                               {app.clinicalNotes || 'Session record pending physician synchronization.'}
                             </p>
                           </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'notes' && (
                <Card className="border-none shadow-premium overflow-hidden">
                  <CardHeader className="bg-primary/5 p-8 border-b border-primary/10">
                    <CardTitle className="text-2xl font-black tracking-tight text-primary flex items-center gap-3">
                       <FileText className="h-6 w-6" /> Clinical Session Record
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 space-y-8">
                    <textarea
                      className="flex w-full min-h-[300px] rounded-3xl border border-border-base bg-bg-base/50 px-8 py-6 text-base font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-inner leading-relaxed"
                      placeholder="Enter detailed clinical observations, diagnostics, and longitudinal treatment plans..."
                      value={clinicalNote}
                      onChange={(e) => setClinicalNote(e.target.value)}
                    />
                    <div className="flex justify-end gap-4 pt-4">
                      <Button variant="ghost" onClick={() => setClinicalNote('')} className="h-14 px-8 rounded-2xl text-muted font-extrabold hover:bg-accent">Clear Entry</Button>
                      <Button onClick={handleAddNote} className="h-14 px-12 rounded-2xl gap-3 text-base shadow-xl shadow-primary/30 font-black tracking-tight">
                        <Save className="h-5 w-5" /> Sync to EHR Vault
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Center Sidebar */}
        <div className="space-y-8">
          <Card className="bg-primary text-white border-none shadow-2xl overflow-hidden group">
            <CardHeader className="bg-primary-dark/30 border-b border-white/10">
              <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-white/70 flex items-center gap-2">
                <Stethoscope className="h-4 w-4" /> Physician Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
               {[
                 { label: 'E-Prescription', icon: FileText },
                 { label: 'Laboratory Request', icon: TrendingUp },
                 { label: 'Clinical Referral', icon: ExternalLink }
               ].map((action, i) => (
                 <button key={i} className="w-full text-left p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-between text-sm font-black group/btn">
                   {action.label}
                   <Plus className="h-5 w-5 group-hover/btn:rotate-90 transition-transform" />
                 </button>
               ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
               <CardTitle className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Billing & Insurance</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="p-6 bg-accent/40 rounded-3xl border border-border-base/50 flex items-center gap-6">
                 <div className="h-12 w-12 bg-white rounded-2xl border border-border-base flex items-center justify-center text-primary shadow-sm ring-4 ring-primary/5">
                    <Save className="h-5 w-5" />
                 </div>
                 <div>
                   <p className="font-black text-text-base text-sm">Verified Carrier</p>
                   <p className="text-xs font-bold text-muted mt-1 uppercase tracking-widest">Active File: 2026-Q4</p>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
