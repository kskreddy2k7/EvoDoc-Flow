'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { 
  Activity, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '@/context/SidebarContext';
import { useEffect } from 'react';

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
  id?: string;
}

export function Sidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { 
    collapsed: isCollapsed, 
    toggle: toggleCollapse,
    mobileOpen,
    toggleMobile,
    setMobileOpen
  } = useSidebar();

  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobile}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-50 h-screen transition-all duration-500 ease-in-out border-r border-border-base bg-surface shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
        "flex flex-col",
        isCollapsed ? "w-20" : "w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
      <div className="p-6 h-20 flex items-center justify-between border-b border-border-base">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-text-base">EvoDoc</span>
          </motion.div>
        )}
        {isCollapsed && <Activity className="h-8 w-8 text-primary mx-auto" />}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleCollapse}
            className="hidden lg:block p-2 hover:bg-accent rounded-xl transition-colors text-muted hover:text-text-base"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          <button 
            onClick={toggleMobile}
            className="lg:hidden p-2 hover:bg-accent rounded-xl transition-colors text-muted hover:text-text-base border border-border-base"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav id="tour-sidebar-nav" className="flex-1 p-4 space-y-2 overflow-y-auto">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href}>
              <div
                id={item.id}
                onClick={() => setMobileOpen(false)}
                className={cn(
                "group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted hover:bg-accent hover:text-text-base",
                isCollapsed && "justify-center px-0"
              )}>
                <item.icon className={cn("h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-muted group-hover:text-primary")} />
                {!isCollapsed && <span className="tracking-tight">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className={cn(
        "p-4 border-t border-border-base bg-bg-base/50 space-y-4",
        mobileOpen && "pb-10" // Add extra bottom padding for mobile browsers safe area
      )}>
        <div id="tour-theme-toggle" className={cn("px-2", isCollapsed && "flex justify-center")}>
           <ThemeToggle position="up" />
        </div>

        {!isCollapsed && user && (
          <div className="mx-2 flex items-center gap-3 bg-surface p-3 rounded-2xl border border-border-base shadow-sm group hover:border-primary/50 transition-colors">
            <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-[0_4px_12px_rgba(37,99,235,0.2)]">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 overflow-hidden">
              <p className="text-sm font-bold truncate text-text-base leading-tight">{user.name}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1 leading-none">{user.role}</p>
            </div>
          </div>
        )}

        {isCollapsed && user && (
          <div className="flex justify-center py-2">
            <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-[0_4px_12px_rgba(37,99,235,0.2)]">
              {user.name.charAt(0)}
            </div>
          </div>
        )}
        
        <div className="px-2">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full flex items-center gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl px-3 py-2.5 transition-all active:scale-95 group",
              isCollapsed ? "justify-center" : "justify-start"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 flex-shrink-0 transition-transform group-hover:-translate-x-1" />
            {!isCollapsed && <span className="font-bold">Log out</span>}
          </Button>
        </div>
      </div>
    </aside>
    </>
  );
}
