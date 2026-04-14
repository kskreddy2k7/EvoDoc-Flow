'use client';

import { Sidebar } from '@/components/Sidebar';
import { LayoutDashboard, Calendar, Menu, Activity } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/lib/useAuth';

const doctorItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/doctor/dashboard' },
  { icon: Calendar, label: 'Appointments', href: '/doctor/appointments' },
];

import { PageTransition } from '@/components/PageTransition';

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isClient } = useAuth();
  const { toggleMobile } = useSidebar();

  if (!isClient || !user || user.role !== 'doctor') return null;

  return (
    <div className="flex min-h-screen bg-bg-base text-text-base">
      <Sidebar items={doctorItems} />
      <main className="flex-1 overflow-x-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 flex items-center justify-between px-6 border-b border-border-base bg-surface sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-extrabold text-lg tracking-tight">EvoDoc</span>
          </div>
          <button 
            onClick={toggleMobile}
            className="p-2 hover:bg-accent rounded-xl transition-colors text-muted"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>
        
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>
    </div>
  );
}
