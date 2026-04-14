'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/lib/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { toast } from 'react-hot-toast';
import { Activity, Stethoscope, UserCog, ArrowRight, ShieldCheck, Lock, Eye, EyeOff, AlertCircle, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LoginPage() {
  useAuth();
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const [role, setRole] = useState<'nurse' | 'doctor'>('nurse');
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id.trim() || !form.password.trim()) {
      setError('Please fill in both Email/Staff ID and Password.');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate Auth
    setTimeout(() => {
      const userData = {
        id: '1',
        name: role === 'nurse' ? 'Nurse Joy' : 'Dr. Gregory House',
        role: role,
        email: `${role}@evodoc.com`,
      };
      
      setUser(userData);
      setIsLoading(false);
      toast.success(`Authenticated as ${role === 'nurse' ? 'Clinical Staff' : 'Senior Physician'}`);
      
      if (role === 'nurse') {
        router.push('/nurse/intake');
      } else {
        router.push('/doctor/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-bg-base relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
         <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-blob" />
         <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      </div>

      <div className="flex flex-col justify-center px-8 py-12 lg:p-20 space-y-8 lg:space-y-12 relative z-10 bg-primary text-white overflow-hidden rounded-b-[2.5rem] lg:rounded-none shadow-xl lg:shadow-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
         <div className="flex items-center gap-3 lg:gap-4 lg:mb-20 justify-center lg:justify-start">
            <div className="bg-white p-2 lg:p-3 rounded-2xl shadow-2xl">
              <Activity className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <span className="font-black text-2xl lg:text-4xl tracking-tighter">EvoDoc</span>
         </div>
         
         <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tighter"
            >
              The New Era of <br className="hidden lg:block" />
              <span className="text-white/40">Patient Logic.</span>
            </motion.h1>
            <p className="text-sm sm:text-base lg:text-xl font-bold text-white/70 max-w-lg mx-auto lg:mx-0 leading-relaxed">
               Secure, rapid, and clinical. Login to your clinical environment to manage patient flows with precision.
            </p>
         </div>

         <div className="hidden lg:grid grid-cols-2 gap-6 pt-12">
            {[
              { label: 'HIPAA Shield', icon: ShieldCheck },
              { label: 'EHR Sync', icon: Activity }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
                <item.icon className="h-6 w-6 mb-3 opacity-60" />
                <p className="font-black text-sm uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
         </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-8 relative z-10 mb-10 w-full">
        <div className="absolute top-4 lg:top-8 left-4 lg:right-8 z-50 flex items-center gap-4 w-full px-6 lg:px-12 justify-between pointer-events-none">
           <Link href="/" className="pointer-events-auto">
             <Button variant="ghost" className="gap-2 font-bold hover:bg-accent/50 rounded-xl group transition-all">
               <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
               Back to Home
             </Button>
           </Link>
           <div className="pointer-events-auto">
             <ThemeToggle />
           </div>
        </div>
        
        <div className="w-full max-w-lg mx-auto space-y-10 lg:mt-0 mt-8">
          <div className="text-center space-y-3">
             <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-text-base">Portal Access</h2>
             <p className="text-muted font-bold tracking-tight">Select your clinical role to proceed</p>
          </div>

          <div className="flex flex-col sm:flex-row bg-accent/50 p-1.5 rounded-3xl border border-border-base relative overflow-hidden gap-1.5">
             <button 
               type="button"
               onClick={() => setRole('nurse')}
               className={cn(
                 "relative flex-1 flex flex-col items-center gap-2 py-6 rounded-2xl transition-all z-10 hover:scale-[1.02]",
                 role === 'nurse' ? "text-primary ring-2 ring-primary bg-primary/5" : "text-muted hover:text-text-base hover:bg-accent"
               )}
             >
                {role === 'nurse' && (
                  <motion.div layoutId="roleBg" className="absolute inset-0 bg-surface shadow-2xl shadow-primary/5 rounded-2xl z-[-1]" />
                )}
                <UserCog className="h-6 w-6" />
                <span className="text-sm font-black uppercase tracking-widest">Clinical Team</span>
                <span className="text-[10px] font-medium opacity-80 pt-1 border-t border-border-base/50">Nurses & Reception</span>
             </button>
             <button 
               type="button"
               onClick={() => setRole('doctor')}
               className={cn(
                 "relative flex-1 flex flex-col items-center gap-2 py-6 rounded-2xl transition-all z-10 hover:scale-[1.02]",
                 role === 'doctor' ? "text-primary ring-2 ring-primary bg-primary/5" : "text-muted hover:text-text-base hover:bg-accent"
               )}
             >
                {role === 'doctor' && (
                  <motion.div layoutId="roleBg" className="absolute inset-0 bg-surface shadow-2xl shadow-primary/5 rounded-2xl z-[-1]" />
                )}
                <Stethoscope className="h-6 w-6" />
                <span className="text-sm font-black uppercase tracking-widest">Physician</span>
                <span className="text-[10px] font-medium opacity-80 pt-1 border-t border-border-base/50">Doctors & Specialists</span>
             </button>
          </div>

          <Card className="border-none shadow-premium rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-10">
              <form onSubmit={handleLogin} className="space-y-6">
                <Input 
                  label="Email or Staff ID" 
                  placeholder={role === 'nurse' ? 'nurse@evodoc.com' : 'doctor@evodoc.com'}
                  value={form.id}
                  onChange={(e) => { setForm({...form, id: e.target.value}); setError(''); }}
                  required
                  className="focus:ring-2 focus:ring-primary/20"
                />
                <div className="relative">
                  <Input 
                    label="Password" 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => { setForm({...form, password: e.target.value}); setError(''); }}
                    required
                    className="focus:ring-2 focus:ring-primary/20"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[2.35rem] right-4 text-muted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-0.5"
                  >
                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, y: -10 }} 
                      animate={{ opacity: 1, height: 'auto', y: 0 }} 
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm font-bold bg-red-500/10 p-3 rounded-xl flex items-center gap-2 border border-red-500/20"
                    >
                      <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <Button 
                   type="submit" 
                   disabled={isLoading}
                   className={cn(
                     "w-full h-14 rounded-2xl text-lg font-black gap-3 shadow-xl hover:shadow-2xl transition-all outline-none",
                     "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0"
                   )}
                   isLoading={isLoading}
                >
                  {isLoading ? 'Authenticating...' : (
                    <>Confirm Authorization <ArrowRight className="h-5 w-5" /></>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center space-y-5">
            <p className="text-xs font-bold text-muted uppercase tracking-[0.2em] max-w-[280px] mx-auto leading-relaxed">
               Access restricted to authorized medical personnel. IP Logging active.
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] text-green-600 font-bold bg-green-500/10 w-max mx-auto px-4 py-2 rounded-full border border-green-500/20">
              <Lock className="h-3 w-3" /> Secure login • Encrypted access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
