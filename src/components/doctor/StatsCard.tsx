import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string; // text color class
  bg: string; // background class
  trend?: 'up' | 'down';
  trendValue?: string;
};

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, color, bg, trend, trendValue }) => (
  <Card className="border-none shadow-sm h-full">
    <CardContent className="p-4 sm:p-6">
      <div className={cn('inline-flex p-2.5 rounded-2xl mb-3', bg, color)}>{icon}</div>
      <p className="text-muted text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl sm:text-3xl font-black text-text-base flex items-center gap-2">
        {value}
        {trend && (
          <span className={trend === 'up' ? 'trend-up' : 'trend-down'}>{trend === 'up' ? '↑' : '↓'} {trendValue}</span>
        )}
      </h3>
    </CardContent>
  </Card>
);
