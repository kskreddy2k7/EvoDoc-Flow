import React from 'react';
import { cn } from '@/lib/utils';

export function Table({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm font-sans", className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <thead className={cn("[&_tr]:border-b bg-slate-50", className)}>{children}</thead>;
}

export function TableBody({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)}>{children}</tbody>;
}

export function TableRow({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement> & { className?: string; children?: React.ReactNode }) {
  return (
    <tr className={cn("border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-100", className)} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <th className={cn("h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0", className)}>
      {children}
    </th>
  );
}

export function TableCell({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement> & { className?: string; children?: React.ReactNode }) {
  return (
    <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props}>
      {children}
    </td>
  );
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-4 bg-accent/20 rounded-3xl border border-dashed border-border-base">
      <div className="h-16 w-16 bg-surface rounded-2xl flex items-center justify-center text-muted shadow-sm">
        <Icon size={32} />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-black text-text-base tracking-tight">{title}</h3>
        <p className="text-sm font-medium text-muted max-w-xs mx-auto leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
