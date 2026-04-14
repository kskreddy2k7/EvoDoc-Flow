import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { Clock, User } from 'lucide-react';

type ActivityItem = {
  id: string;
  type: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  timeSlot: string; // e.g., '2 min ago'
  patientName: string;
};

type ActivityTimelineProps = {
  items: ActivityItem[];
};

const statusColors: Record<string, string> = {
  Scheduled: 'bg-blue-500',
  Completed: 'bg-green-500',
  Cancelled: 'bg-red-500',
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ items }) => (
  <Card className="border-none shadow-sm">
    <CardHeader>
      <CardTitle className="text-xl">Activity Timeline</CardTitle>
    </CardHeader>
    <CardContent className="px-8 pb-8">
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-border-base">
        {items.map((item) => (
          <div key={item.id} className="relative flex items-start gap-8">
            <div
              className={cn(
                'absolute left-0 top-1 h-2.5 w-2.5 rounded-full ring-4 ring-surface shadow-sm text-white',
                statusColors[item.status]
              )}
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-text-base">
                  {item.type} {item.status}
                </p>
                <span className="text-[10px] font-black uppercase text-muted tracking-tighter">
                  {item.timeSlot}
                </span>
              </div>
              <p className="text-xs font-bold text-muted flex items-center gap-1.5">
                <User className="h-3 w-3" /> {item.patientName}
              </p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-sm text-center text-muted font-bold italic py-4">No recent activity</div>
        )}
      </div>
    </CardContent>
  </Card>
);
);
