'use client';

import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, Badge } from '@/components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { 
  Calendar, 
  Search, 
  ChevronRight, 
  Users,
  AlertCircle,
  ArrowLeft,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { formatDate, cn } from '@/lib/utils';
import { PatientRecordModal } from '@/components/PatientRecordModal';

export default function DoctorAppointmentsPage() {
  const { appointments } = useStore();
  const [filter, setFilter] = useState<'all' | 'Scheduled' | 'Completed' | 'Cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const filteredAppointments = appointments.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = app.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <Link
            href="/doctor/dashboard"
            className="mt-1 flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center bg-accent/60 border border-border-base hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 group"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5 text-muted group-hover:text-white transition-colors" />
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-text-base mb-2">Physician Schedule</h1>
            <p className="text-muted font-medium">Coordinate clinical encounters and patient reviews</p>
          </div>
        </div>
      <div className="flex flex-wrap items-center gap-3 bg-accent/40 p-1.5 rounded-2xl border border-border-base self-start">
          {(['all', 'Scheduled', 'Completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                filter === f ? "bg-primary text-white shadow-lg" : "text-muted hover:text-text-base"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-premium overflow-hidden">
             <CardHeader className="p-4 md:p-8 border-b border-border-base bg-surface">
               <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                 <input 
                   className="w-full h-12 pl-12 pr-4 bg-accent/30 rounded-2xl border border-border-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-sm transition-all"
                   placeholder="Search your patient roster..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
             </CardHeader>
             <CardContent className="p-0">
               {/* Mobile Card List */}
               <div className="md:hidden divide-y divide-border-base">
                 {filteredAppointments.length > 0 ? (
                   filteredAppointments.map((app) => (
                     <div
                       key={app.id}
                       onClick={() => setSelectedPatientId(app.patientId)}
                       className="p-5 hover:bg-accent/20 cursor-pointer transition-all group"
                     >
                       <div className="flex items-center justify-between gap-3 mb-3">
                         <div className="flex items-center gap-3 min-w-0">
                           <div className="h-11 w-11 flex-shrink-0 rounded-xl bg-primary text-white flex items-center justify-center font-black text-base shadow-md shadow-primary/20">
                             {app.patientName.charAt(0)}
                           </div>
                           <div className="min-w-0">
                             <p className="font-extrabold text-text-base group-hover:text-primary transition-colors truncate">{app.patientName}</p>
                             <p className="text-[10px] font-black text-muted tracking-tighter uppercase">{formatDate(app.date)}</p>
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
                       <div className="grid grid-cols-2 gap-2 text-xs">
                         <div className="flex items-center gap-2 bg-accent/60 rounded-xl p-2.5">
                           <Clock className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                           <span className="font-bold text-text-base">{app.timeSlot}</span>
                         </div>
                         <div className="flex items-center gap-2 bg-accent/60 rounded-xl p-2.5">
                           <Users className="h-3.5 w-3.5 text-muted flex-shrink-0" />
                           <span className="font-bold text-text-base truncate">{app.type}</span>
                         </div>
                       </div>
                     </div>
                   ))
                 ) : (
                   <div className="flex flex-col items-center justify-center space-y-3 py-20 px-6 text-center">
                     <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-muted mb-2">
                       <AlertCircle className="h-8 w-8 opacity-50" />
                     </div>
                     <span className="font-bold text-text-base text-lg">No Active Encounters</span>
                     <span className="font-medium text-muted text-sm">Queue is clear for this filter.</span>
                   </div>
                 )}
               </div>

               {/* Desktop Table */}
               <Table className="hidden md:table">
                 <TableHeader className="bg-accent/30">
                   <TableRow className="border-b border-border-base">
                     <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Encounter</TableHead>
                     <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest text-center">Timing</TableHead>
                     <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Type</TableHead>
                     <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                     <TableHead className="py-5 text-right"></TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((app) => (
                        <TableRow 
                          key={app.id} 
                          className="group border-b border-border-base hover:bg-accent/30 cursor-pointer transition-all"
                          onClick={() => setSelectedPatientId(app.patientId)}
                        >
                          <TableCell className="py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-md shadow-primary/20 group-hover:scale-110 transition-transform">
                                {app.patientName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-extrabold text-text-base group-hover:text-primary transition-colors">{app.patientName}</p>
                                <p className="text-[10px] font-black text-muted tracking-tighter uppercase mt-0.5">{formatDate(app.date)}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-black text-sm text-text-base/80">{app.timeSlot}</TableCell>
                          <TableCell className="text-xs font-bold text-muted">{app.type}</TableCell>
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
                             <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary hover:text-white transition-all group-hover:bg-primary/5 group-hover:text-primary">
                               <ChevronRight className="h-4 w-4" />
                             </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-64 text-center">
                          <div className="flex flex-col items-center justify-center space-y-3">
                             <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-muted mb-2">
                               <AlertCircle className="h-8 w-8 opacity-50" />
                             </div>
                             <span className="font-bold text-text-base text-lg">No Active Encounters</span>
                             <span className="font-medium text-muted text-sm max-w-[300px]">The clinical matrix is empty for the current filter criteria.</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                 </TableBody>
               </Table>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
           <Card className="border-none shadow-sm bg-primary text-white p-8 overflow-hidden relative">
              <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl" />
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-white/70">
                <Calendar className="h-4 w-4" /> Schedule Summary
              </h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm font-bold text-white/80">Pending Consults</span>
                    <span className="text-2xl font-black">{appointments.filter(a => a.status === 'Scheduled').length}</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm font-bold text-white/80">Completed Today</span>
                    <span className="text-2xl font-black">{appointments.filter(a => a.status === 'Completed').length}</span>
                 </div>
              </div>
              <Button className="w-full h-12 rounded-xl bg-white text-primary hover:bg-white/90 mt-8 border-none font-black shadow-lg">Download PDF Report</Button>
           </Card>

           <Card className="border-none shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-4 text-amber-600 bg-amber-50 p-4 rounded-2xl border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30">
                 <AlertCircle className="h-5 w-5 flex-shrink-0" />
                 <p className="text-xs font-bold leading-relaxed">3 patients in your queue have reported high-priority allergies. Review medical profiles before consultation.</p>
              </div>
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-muted uppercase tracking-widest">Queue Support</p>
                 <div className="flex items-center gap-4 p-4 rounded-2xl border border-border-base hover:border-primary/30 transition-all cursor-pointer">
                    <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                       <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                       <p className="text-sm font-black text-text-base">Nursing Station-B</p>
                       <p className="text-xs font-bold text-muted">Active • Ext: 402</p>
                    </div>
                 </div>
              </div>
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
