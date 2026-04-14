'use client';

import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentSchema, AppointmentFormValues } from '@/lib/schemas';
import { useAppointmentStore } from '@/store/appointmentStore';
import { usePatientStore } from '@/store/patientStore';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, Badge } from '@/components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { PatientRecordModal } from '@/components/PatientRecordModal';
import { toast } from 'react-hot-toast';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  User, 
  XCircle,
  Stethoscope,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Edit2,
  CalendarClock,
  CalendarCheck,
  CheckCircle,
  ClipboardList,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { formatDate, cn } from '@/lib/utils';
import { Appointment } from '@/types';

const CLINIC_PHYSICIANS = [
  { id: 'd1', name: 'Dr. Gregory House', status: 'Available' },
  { id: 'd2', name: 'Dr. Allison Cameron', status: 'Available' },
  { id: 'd3', name: 'Dr. Robert Chase', status: 'Busy' },
  { id: 'd4', name: 'Dr. James Wilson', status: 'Available' }
];

export default function NurseAppointmentsPage() {
  const appointments = useAppointmentStore((s) => s.appointments);
  const addAppointment = useAppointmentStore((s) => s.addAppointment);
  const updateAppointment = useAppointmentStore((s) => s.updateAppointment);
  const deleteAppointment = useAppointmentStore((s) => s.deleteAppointment);
  const patients = usePatientStore((s) => s.patients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);
  
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientId: '',
      doctorId: '',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '',
      type: 'Consultation',
      notes: '',
    },
  });

  const selectedDoctorId = useWatch({ control, name: 'doctorId' });
  const selectedDate = useWatch({ control, name: 'date' });

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
  ];

  const bookedSlots = appointments
    .filter(app => app.doctorId === selectedDoctorId && app.date === selectedDate && app.status !== 'Cancelled' && app.id !== editingAppointmentId)
    .map(app => app.timeSlot);

  const nextAvailableSlot = timeSlots.find(slot => !bookedSlots.includes(slot));

  const filteredAppointments = appointments.filter(app => {
    const searchMatch = app.patientName.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                        app.doctorName.toLowerCase().includes(debouncedSearch.toLowerCase());
    const statusMatch = filterStatus === 'All' || app.status === filterStatus;
    return searchMatch && statusMatch;
  });

  const handleEditAppointment = (app: Appointment) => {
    setEditingAppointmentId(app.id);
    reset({
      patientId: app.patientId,
      doctorId: app.doctorId,
      date: app.date,
      timeSlot: app.timeSlot,
      type: app.type,
      notes: app.notes,
    });
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(window.confirm('Are you absolutely sure you want to securely purge this encounter?')) {
      deleteAppointment(id);
      toast.error('Clinical encounter securely purged from schedule.');
    }
  };

  const handleNewAppointment = () => {
    setEditingAppointmentId(null);
    reset({
      patientId: '',
      doctorId: '',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '',
      type: 'Consultation',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: AppointmentFormValues) => {
    const patient = patients.find(p => p.id === data.patientId);
    const doctor = CLINIC_PHYSICIANS.find(d => d.id === data.doctorId);
    
    if (editingAppointmentId) {
      updateAppointment(editingAppointmentId, {
        patientId: data.patientId,
        patientName: patient?.fullName || 'Unknown',
        doctorId: data.doctorId,
        doctorName: doctor?.name || 'Unknown',
        date: data.date,
        timeSlot: data.timeSlot,
        type: data.type,
        notes: data.notes,
      });
      toast.success('Clinical encounter securely updated.');
    } else {
      addAppointment({
        patientId: data.patientId,
        patientName: patient?.fullName || 'Unknown',
        doctorId: data.doctorId,
        doctorName: doctor?.name || 'Unknown',
        date: data.date,
        timeSlot: data.timeSlot,
        status: 'Scheduled',
        type: data.type,
        notes: data.notes,
      });
      toast.success('Appointment orchestrated successfully.');
    }

    setIsModalOpen(false);
    setEditingAppointmentId(null);
    reset();
  };

  return (
    <div className="space-y-10 relative">
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-start gap-4">
          <Link
            href="/nurse/intake"
            className="mt-1 flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center bg-accent/60 border border-border-base hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 group"
            aria-label="Back to Patient Intake"
          >
            <ArrowLeft className="h-5 w-5 text-muted group-hover:text-white transition-colors" />
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-text-base mb-2">Appointment Management</h1>
            <p className="text-muted font-medium">Schedule and manage patient visits efficiently</p>
          </div>
        </div>
        <Button onClick={handleNewAppointment} className="group h-14 px-8 rounded-full gap-3 text-base shadow-xl shadow-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all border border-primary/20">
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" /> Schedule Appointment
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {[
          { label: 'Active', value: appointments.filter(a => a.status === 'Scheduled').length, color: 'text-primary', icon: CalendarClock, bg: 'bg-primary/10' },
          { label: 'Completed', value: appointments.filter(a => a.status === 'Completed').length, color: 'text-green-600', icon: CheckCircle, bg: 'bg-green-500/10' },
          { label: 'Cancelled', value: appointments.filter(a => a.status === 'Cancelled').length, color: 'text-red-500', icon: XCircle, bg: 'bg-red-500/10' },
          { label: 'Available Slots', value: Math.max(0, 24 - appointments.filter(a => a.status === 'Scheduled').length), color: 'text-text-base', icon: CalendarCheck, bg: 'bg-accent' }
        ].map((stat, i) => (
          <Card key={i} className="border border-border-base/50 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-surface/50 backdrop-blur-xl rounded-[2rem]">
            <CardContent className="p-6 relative overflow-hidden">
               <div className="flex justify-between items-start mb-4">
                 <div className={cn("p-2.5 rounded-2xl", stat.bg)}>
                   <stat.icon className={cn("h-5 w-5", stat.color)} />
                 </div>
                 {stat.label !== 'Cancelled' ? (
                   <div className="flex items-center gap-1 text-green-600 bg-green-500/10 px-2 py-1 rounded-full">
                     <TrendingUp className="h-3 w-3" />
                   </div>
                 ) : (
                   <div className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-1 rounded-full">
                     <TrendingDown className="h-3 w-3" />
                   </div>
                 )}
               </div>
               <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">{stat.label}</p>
               <p className={cn("text-4xl font-extrabold tracking-tight", stat.color)}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-border-base/40 shadow-2xl shadow-black/5 rounded-[2rem] overflow-hidden relative z-10 bg-surface/80 backdrop-blur-2xl">
        <CardHeader className="p-4 md:p-8 border-b border-border-base/50 flex flex-col gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted group-focus-within:text-primary transition-colors" />
            <input 
              className="w-full h-12 md:h-14 pl-12 pr-12 bg-accent/40 rounded-2xl border border-transparent focus:bg-surface focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-semibold text-sm transition-all shadow-inner"
              placeholder="Search patient or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 bg-text-base text-surface hover:scale-110 transition-transform">
                 <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-3 items-center">
             <div className="relative flex-1">
               <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
               <select 
                 value={filterStatus}
                 onChange={(e) => setFilterStatus(e.target.value)}
                 className="w-full h-12 pl-10 pr-10 rounded-2xl border border-border-base bg-surface font-bold text-sm outline-none focus:ring-4 focus:ring-primary/10 transition-shadow appearance-none cursor-pointer"
               >
                 <option value="All">All Statuses</option>
                 <option value="Scheduled">Scheduled</option>
                 <option value="Completed">Completed</option>
                 <option value="Cancelled">Cancelled</option>
               </select>
               <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none rotate-90" />
             </div>
             <Button variant="outline" className="h-12 px-5 rounded-2xl gap-2 font-bold bg-surface border-border-base hover:bg-accent flex-shrink-0"><Calendar className="h-4 w-4" /><span className="hidden sm:inline">Today</span></Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-border-base/50">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedPatientId(app.patientId)}
                  className="p-5 hover:bg-primary/[0.03] cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-11 w-11 flex-shrink-0 rounded-full bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-white font-black text-base shadow-lg shadow-primary/20">
                        {app.patientName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-text-base group-hover:text-primary transition-colors truncate">{app.patientName}</p>
                        <p className="text-[10px] font-black text-primary/70 tracking-tighter uppercase">{formatDate(app.date)}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={app.status === 'Scheduled' ? 'default' : app.status === 'Completed' ? 'success' : 'error'}
                      pulse={app.status === 'Scheduled'}
                      className="flex-shrink-0 rounded-lg h-7 font-black tracking-tighter"
                    >
                      {app.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="flex items-center gap-2 bg-accent/60 rounded-xl p-2.5">
                      <Stethoscope className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      <span className="font-bold text-text-base truncate">{app.doctorName.replace('Dr. ', '')}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-accent/60 rounded-xl p-2.5">
                      <Clock className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      <span className="font-bold text-text-base">{app.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-accent/60 rounded-xl p-2.5 col-span-2">
                      <ClipboardList className="h-3.5 w-3.5 text-muted flex-shrink-0" />
                      <span className="font-bold text-text-base">{app.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEditAppointment(app); }} 
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-surface border border-border-base shadow-sm rounded-xl text-primary hover:bg-primary hover:text-white hover:border-primary/30 transition-all font-bold text-xs"
                    >
                      <Edit2 className="h-4 w-4" /> Edit
                    </button>
                    <button 
                      onClick={(e) => handleDeleteAppointment(app.id, e)} 
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-surface border border-border-base shadow-sm rounded-xl text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500/30 transition-all font-bold text-xs"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3 py-20 px-6 text-center">
                <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-muted mb-2">
                  <CalendarClock className="h-8 w-8 opacity-50" />
                </div>
                <span className="font-bold text-text-base text-lg">No appointments scheduled yet</span>
                <span className="font-medium text-muted text-sm">Queue is clear.</span>
                {(searchTerm || filterStatus !== 'All') && (
                  <Button onClick={() => { setSearchTerm(''); setFilterStatus('All'); }} variant="outline" className="mt-2 h-9 rounded-xl font-bold">Clear Filters</Button>
                )}
              </div>
            )}
          </div>

          {/* Desktop Table */}
          <Table className="hidden md:table">
            <TableHeader className="bg-accent/40">
              <TableRow className="border-b border-border-base">
                <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Patient</TableHead>
                <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Physician</TableHead>
                <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest text-center">Time</TableHead>
                <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Type</TableHead>
                <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                <TableHead className="py-5 text-right w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((app) => (
                  <TableRow 
                    key={app.id} 
                    className="group border-b border-border-base/50 hover:bg-primary/[0.03] cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedPatientId(app.patientId)}
                  >
                    <TableCell className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                          {app.patientName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-extrabold text-text-base text-base group-hover:text-primary transition-colors">{app.patientName}</p>
                          <p className="text-[10px] font-black text-primary/70 tracking-tighter uppercase mt-0.5">{formatDate(app.date)}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2 font-bold text-sm text-text-base/80">
                         <div className="p-1.5 bg-accent rounded-lg border border-border-base">
                           <Stethoscope className="h-3.5 w-3.5 text-primary" />
                         </div>
                         {app.doctorName}
                       </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-surface font-black border-border-base/80 text-muted px-3 py-1 text-xs gap-1.5 shadow-sm">
                        <Clock className="h-3 w-3 text-primary" /> {app.timeSlot}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-3.5 w-3.5 text-muted" />
                        <span className="text-xs font-bold text-text-base">{app.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={app.status === 'Scheduled' ? 'default' : app.status === 'Completed' ? 'success' : 'error'}
                        pulse={app.status === 'Scheduled'}
                        className="rounded-lg h-7 font-black tracking-tighter"
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <div className="flex justify-end gap-2">
                         <button 
                           onClick={(e) => { e.stopPropagation(); handleEditAppointment(app); }} 
                           className="p-2.5 bg-surface border border-border-base shadow-sm rounded-xl text-primary hover:text-white hover:border-primary/30 hover:bg-primary transition-all outline-none focus:ring-4 focus:ring-primary/10"
                         >
                           <Edit2 className="h-4 w-4" />
                         </button>
                         <button 
                           onClick={(e) => handleDeleteAppointment(app.id, e)} 
                           className="p-2.5 bg-surface border border-border-base shadow-sm rounded-xl text-red-500 hover:text-white hover:border-red-500/30 hover:bg-red-500 transition-all outline-none focus:ring-4 focus:ring-red-500/10"
                         >
                           <Trash2 className="h-4 w-4" />
                         </button>
                       </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                       <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-muted mb-2">
                         <CalendarClock className="h-8 w-8 opacity-50" />
                       </div>
                       <span className="font-bold text-text-base text-lg">No appointments scheduled yet</span>
                       <span className="font-medium text-muted text-sm max-w-[300px]">Queue is clear. Click &quot;Schedule Appointment&quot; to assign a patient.</span>
                       {(searchTerm || filterStatus !== 'All') && (
                         <Button onClick={() => { setSearchTerm(''); setFilterStatus('All'); }} variant="outline" className="mt-4 h-9 rounded-xl font-bold">Clear Filters</Button>
                       )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingAppointmentId ? "Modify Encounter" : "Schedule Encounter"}
        className="max-w-2xl bg-surface/95 backdrop-blur-3xl shadow-2xl border-white/20"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-1.5 col-span-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2 ml-1">
                 <User className="h-3.5 w-3.5" /> Patient Selection
              </label>
              <div className="relative">
                <select 
                  {...register('patientId')}
                  className="w-full h-12 px-4 py-2 rounded-xl border border-border-base bg-accent/30 font-bold focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none hover:border-primary/30 transition-all appearance-none"
                  required
                >
                  <option value="" disabled>Search and select a registered patient...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.fullName} (Age: {p.age})</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none rotate-90" />
              </div>
              {errors.patientId && <p className="text-xs text-red-500 ml-1 font-bold">{errors.patientId.message}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2 ml-1">
                 <ClipboardList className="h-3.5 w-3.5" /> Encounter Type
              </label>
              <div className="relative">
                <select 
                  {...register('type')}
                  className="w-full h-12 px-4 py-2 rounded-xl border border-border-base bg-accent/30 font-bold focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none hover:border-primary/30 transition-all appearance-none"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Procedure">Procedure</option>
                  <option value="Lab Review">Lab Review</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none rotate-90" />
              </div>
              {errors.type && <p className="text-xs text-red-500 ml-1 font-bold">{errors.type.message}</p>}
            </div>

            <div className="space-y-1.5">
               <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2 ml-1">
                  <Calendar className="h-3.5 w-3.5" /> Scheduled Date
               </label>
               <input 
                 type="date"
                 {...register('date')}
                 className="w-full h-12 px-4 py-2 rounded-xl border border-border-base bg-accent/30 font-bold focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none hover:border-primary/30 transition-all"
                 required
               />
               {errors.date && <p className="text-xs text-red-500 ml-1 font-bold">{errors.date.message}</p>}
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                   <Clock className="h-3.5 w-3.5" /> Time Slot
                </label>
                {selectedDoctorId && nextAvailableSlot && (
                  <span className="text-[10px] font-black text-primary bg-primary/10 px-2.5 py-0.5 rounded-full ring-1 ring-primary/20 shadow-sm animate-pulse-slow">✨ Next: {nextAvailableSlot}</span>
                )}
              </div>
              <div className="relative">
                <select 
                  {...register('timeSlot')}
                  className={cn(
                    "w-full h-12 px-4 py-2 rounded-xl border border-border-base bg-accent/30 font-bold focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none hover:border-primary/30 transition-all appearance-none cursor-pointer",
                    !selectedDoctorId && "opacity-60 cursor-not-allowed"
                  )}
                  disabled={!selectedDoctorId}
                >
                  <option value="" disabled>{selectedDoctorId ? "Select time slot..." : "Select physician first..."}</option>
                  {timeSlots.map(time => {
                    const isBooked = bookedSlots.includes(time);
                    return (
                      <option key={time} value={time} disabled={isBooked} className={isBooked ? 'text-muted/50 bg-accent/20' : 'text-text-base'}>
                        {time} {isBooked ? '(Booked)' : ''}
                      </option>
                    )
                  })}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none rotate-90" />
              </div>
              {errors.timeSlot && <p className="text-xs text-red-500 ml-1 font-bold">{errors.timeSlot.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2 ml-1">
                 <Stethoscope className="h-3.5 w-3.5" /> Assigned Physician
              </label>
              <div className="relative">
                <select 
                  {...register('doctorId')}
                  className="w-full h-12 px-4 py-2 rounded-xl border border-border-base bg-accent/30 font-bold focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none hover:border-primary/30 transition-all appearance-none"
                >
                  <option value="" disabled>Select an attending physician...</option>
                  {CLINIC_PHYSICIANS.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.name} • {doc.status}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none rotate-90" />
              </div>
              {errors.doctorId && <p className="text-xs text-red-500 ml-1 font-bold">{errors.doctorId.message}</p>}
            </div>

            <div className="col-span-2 space-y-1.5">
               <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2 ml-1">
                 <Edit2 className="h-3.5 w-3.5" /> Clinical Directives
               </label>
               <textarea 
                 {...register('notes')}
                 className="w-full h-28 px-4 py-4 rounded-xl border border-border-base bg-accent/30 font-medium text-sm focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none hover:border-primary/30 transition-all resize-none"
                 placeholder="Enter any necessary pre-clinical requirements, triage notes, or special directives here..."
               />
               {errors.notes && <p className="text-xs text-red-500 ml-1 font-bold">{errors.notes.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-border-base/50">
            <Button variant="ghost" type="button" onClick={() => { setIsModalOpen(false); reset(); }} className="h-12 px-6 rounded-xl font-bold hover:bg-accent border border-transparent hover:border-border-base transition-all">Discard</Button>
            <Button type="submit" className="h-12 px-10 rounded-xl font-black gap-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">{editingAppointmentId ? "Update Schedule" : "Schedule Appointment"} <ChevronRight className="h-4 w-4" /></Button>
          </div>
        </form>
      </Modal>

      <PatientRecordModal 
        isOpen={!!selectedPatientId} 
        onClose={() => setSelectedPatientId(null)} 
        patientId={selectedPatientId} 
      />
    </div>
  );
}
