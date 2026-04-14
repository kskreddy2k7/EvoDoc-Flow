import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: string;
  bg: string;
  trend?: 'up' | 'down';
  trendValue?: string;
};

export function StatsCard({ label, value, icon, color, bg, trend, trendValue }: StatsCardProps) {
  return (
  <Card className="border-none shadow-sm h-full">
    <CardContent className="p-4 sm:p-6">
      <div className={cn('inline-flex p-2.5 rounded-2xl mb-3', bg, color)}>{icon}</div>
      <p className="text-muted text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl sm:text-3xl font-black text-text-base flex items-center gap-2">
        {value}
        {trend && (
          <span className={trend === 'up' ? 'trend-up' : 'trend-down'}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
        )}
      </h3>
    </CardContent>
  </Card>
  );
}
