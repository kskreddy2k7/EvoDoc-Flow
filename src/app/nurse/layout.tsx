'use client';

import { Sidebar } from '@/components/Sidebar';
import { UserPlus, Calendar, Menu, Activity } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/lib/useAuth';
const nurseItems = [
  { icon: UserPlus, label: 'Patient Intake', href: '/nurse/intake', id: 'tour-nav-intake' },
  { icon: Calendar, label: 'Appointments', href: '/nurse/appointments', id: 'tour-nav-appointments' },
];

import { PageTransition } from '@/components/PageTransition';
import { OnboardingTour } from '@/components/OnboardingTour';

export default function NurseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isClient } = useAuth();
  const { toggleMobile } = useSidebar();

  if (!isClient || !user || user.role !== 'nurse') return null;

  return (
    <div className="flex min-h-screen bg-bg-base text-text-base">
      <OnboardingTour />
      <Sidebar items={nurseItems} />
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
