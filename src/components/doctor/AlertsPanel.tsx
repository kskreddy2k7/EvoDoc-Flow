import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

type AlertItem = {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  patientName: string;
};

type AlertsPanelProps = {
  alerts: AlertItem[];
};

const severityColors: Record<string, string> = {
  high: 'bg-red-500 text-white',
  medium: 'bg-amber-500 text-white',
  low: 'bg-green-500 text-white',
};

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => (
  <Card className="border-none shadow-sm mb-6">
    <CardHeader>
      <CardTitle className="text-xl">Alerts</CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      {alerts.length > 0 ? (
        alerts.map((a) => (
          <div
            key={a.id}
            className={cn('flex items-center gap-3 p-2 rounded-md mb-2', severityColors[a.severity])}
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-sm">{a.title}</p>
              <p className="text-xs opacity-90">{a.patientName}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted text-sm">No alerts at the moment.</p>
      )}
    </CardContent>
  </Card>
);
