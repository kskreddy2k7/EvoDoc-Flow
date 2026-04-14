import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, Users, CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type NextPatientProps = {
  patient?: {
    id: string;
    name: string;
    timeSlot: string;
    type: string;
    notes?: string;
    priority?: 'high' | 'medium' | 'low';
    contactNumber?: string;
  };
  onStart?: () => void;
};

type Priority = Exclude<NonNullable<NextPatientProps['patient']>['priority'], undefined>;

const priorityColors: Record<Priority, string> = {
  high: 'bg-red-500 text-white',
  medium: 'bg-amber-500 text-white',
  low: 'bg-green-500 text-white',
};

export function NextPatientCard({ patient, onStart }: NextPatientProps) {
  if (!patient) {
    return (
      <Card className="border-none shadow-sm p-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <CheckCircle2 className="h-12 w-12 text-muted" />
          <p className="font-bold text-muted">No active consultations</p>
          <Button onClick={onStart} className="mt-2">
            Start New Session
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-premium relative overflow-hidden bg-primary text-white p-1">
      <CardHeader className="bg-surface rounded-[calc(1rem-1px)] p-5 sm:p-8">
        <div className="flex items-center justify-between mb-5">
          <Badge variant="success" pulse className="px-4 py-1.5 rounded-full">
            Next Patient
          </Badge>
          {patient.priority && (
            <span className={cn('px-3 py-1 rounded-full text-xs font-bold', priorityColors[patient.priority])}>
              {patient.priority.charAt(0).toUpperCase() + patient.priority.slice(1)}
            </span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="relative flex-shrink-0">
            <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-[2rem] bg-accent text-primary flex items-center justify-center text-3xl sm:text-4xl font-black shadow-inner ring-4 ring-bg-base">
              {patient.name.charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-xl text-white shadow-lg">
              <Clock className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="flex-1 space-y-4 text-center sm:text-left w-full">
            <h2 className="text-2xl sm:text-3xl font-black text-text-base tracking-tight mb-2">
              {patient.name}
            </h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm text-muted font-bold uppercase tracking-widest mt-2">
              <span className="flex items-center gap-1.5 bg-accent px-3 py-1 rounded-lg text-xs">
                <Clock className="h-3.5 w-3.5 text-primary" /> {patient.timeSlot}
              </span>
              <span className="flex items-center gap-1.5 bg-accent px-3 py-1 rounded-lg text-xs">
                <Users className="h-3.5 w-3.5 text-primary" /> {patient.type}
              </span>
              {patient.contactNumber && (
                <span className="flex items-center gap-1.5 bg-accent px-3 py-1 rounded-lg text-xs">
                  <Phone className="h-3.5 w-3.5 text-primary" /> {patient.contactNumber}
                </span>
              )}
            </div>
            {patient.notes && (
              <div className="bg-bg-base/50 p-4 rounded-2xl border border-border-base/50">
                <p className="text-[10px] font-bold text-muted uppercase mb-1">Notes</p>
                <p className="text-sm font-medium italic text-text-base">{patient.notes}</p>
              </div>
            )}
            <Link href={`/doctor/patient/${patient.id}`}>
              <Button className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-2xl gap-3 text-base shadow-xl shadow-primary/30">
                Start Consultation <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
