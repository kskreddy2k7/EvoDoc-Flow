'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { 
  Activity, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  ClipboardCheck,
  CalendarDays,
  Stethoscope,
  Lock,
  MousePointer2,
  Clock,
  Layers,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Smart Intake Workflow",
      description: "Efficient multi-step patient registration with real-time validation and automated age calculation.",
      icon: ClipboardCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Unified Scheduling System",
      description: "Manage doctor availability, appointments, and patient flow from a single intelligent interface.",
      icon: CalendarDays,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Clinical Insights Dashboard",
      description: "Access patient history, notes, and activity timelines with high-visibility alerts.",
      icon: Stethoscope,
      color: "text-sky-600",
      bgColor: "bg-sky-50"
    }
  ];

  const workflowSteps = [
    { id: "01", title: "Register Patient", description: "Seamless intake through our smart stepper." },
    { id: "02", title: "Assign Doctor", description: "Match patients with top-tier clinical experts." },
    { id: "03", title: "Schedule Appt", description: "Deploy appointments into the global clinical calendar." },
    { id: "04", title: "Manage Data", description: "Centralize intelligence for high-accuracy care." }
  ];

  const trustLogos = ["CareOne", "MedCore", "HealthPlus", "BioLabs"];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border py-3 shadow-sm" : "bg-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200 group-hover:rotate-12 transition-all">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tighter">EvoDoc</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {['Platform', 'Security', 'Clinical Workflow'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-sm font-bold text-muted hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px]"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" className="text-xs font-black uppercase tracking-widest hover:bg-surface">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-100 transition-all active:scale-95">
                Join Platform
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Subtle Background Elements for Depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px]" />
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
        </div>

        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center text-center">
          <div className="max-w-5xl mx-auto px-6 space-y-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-surface border border-border-base text-[10px] font-black uppercase tracking-[0.2em] text-muted"
            >
              <Zap className="h-3 w-3 text-blue-600" />
              <span>Precision Patient Management Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-foreground">
                Intelligent <br className="hidden md:block" /> 
                <span className="bg-gradient-to-b from-blue-600 to-blue-800 bg-clip-text text-transparent italic mr-2">Clinical</span>
                <br className="md:hidden" />
                Workflows.
              </h1>
              <p className="text-xl md:text-2xl font-black italic text-blue-600/60 dark:text-blue-400/80 tracking-tight">Built for Modern Healthcare Systems.</p>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted font-bold max-w-2xl mx-auto leading-relaxed"
            >
              Streamline patient intake, optimize physician scheduling, and centralize clinical intelligence — all within a unified, high-performance platform designed for real-world care teams.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4"
            >
              <Link href="/login">
                <Button className="h-20 px-12 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white text-xl font-black shadow-2xl shadow-blue-500/20 group transition-all hover:scale-105 active:scale-95">
                  Enter Clinical Portal <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" className="h-20 px-12 rounded-3xl text-xl font-black border-4 border-border-base hover:border-slate-200 transition-all active:scale-95">
                  Explore Platform
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* --- TRUST BAR --- */}
        <section className="py-20 border-y border-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted/60 mb-12">Trusted by global medicine leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 hover:opacity-100 transition-all duration-700">
              {trustLogos.map((logo) => (
                <div key={logo} className="text-3xl font-black tracking-tighter text-text-base italic uppercase">{logo}</div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section id="platform" className="py-40 bg-surface/50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-24 space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">Precision Clinical Modules</h2>
              <p className="text-blue-600 font-black uppercase text-xs tracking-widest leading-loose border-l-4 border-blue-600 pl-6">
                Engineered for speed. <br /> Built for absolute clinical accuracy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-surface p-12 rounded-[2.5rem] border border-border-base transition-all shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity">
                    <feature.icon className="h-32 w-32 -mr-16 -mt-16 text-foreground" />
                  </div>
                  <div className={cn("p-5 rounded-2xl w-fit mb-10 transition-all group-hover:rotate-6", feature.bgColor, "dark:bg-slate-800")}>
                    <feature.icon className={cn("h-8 w-8", feature.color)} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-foreground tracking-tight leading-none">{feature.title}</h3>
                  <p className="text-muted font-bold leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- WORKFLOW SECTION --- */}
        <section id="clinical-workflow" className="py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-base mb-4">Built Around Real <br /> Clinical Workflows</h2>
              <div className="h-1.5 w-24 bg-blue-600 rounded-full" />
            </div>

            <div className="grid md:grid-cols-4 gap-12">
              {workflowSteps.map((step) => (
                <div key={step.id} className="relative space-y-6">
                  <div className="text-6xl font-black text-slate-100 dark:text-slate-800/50 absolute -top-10 -left-4 select-none -z-0">{step.id}</div>
                  <div className="relative z-10 space-y-4">
                    <h4 className="text-xl font-bold text-foreground">{step.title}</h4>
                    <p className="text-muted font-medium text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECURITY SECTION --- */}
        <section id="security" className="py-32 bg-slate-900 text-white overflow-hidden relative">
          {/* Subtle accent blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="p-3 bg-blue-600 rounded-2xl w-fit shadow-lg shadow-blue-500/20">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95]">Enterprise-grade <br /> Clinical Security</h2>
                <p className="text-muted text-lg font-medium leading-relaxed max-w-lg">
                  Patient safety extends to data integrity. EvoDoc uses bank-level encryption and HIPAA-ready infrastructure to protect every interaction.
                </p>
                
                <div className="space-y-4 pt-4">
                  {[
                    "HIPAA-ready architecture with full audit trails",
                    "AES-256 end-to-end data encryption",
                    "Secure role-based patient data handling"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="font-bold text-muted/60 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Lock, label: "Vaulted" },
                  { icon: MousePointer2, label: "Monitored" },
                  { icon: Activity, label: "Healthy" },
                  { icon: Layers, label: "Layered" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, backgroundColor: "#1E293B" }}
                    className="p-8 rounded-[2rem] bg-slate-800/50 border border-slate-700 text-center space-y-4"
                  >
                    <stat.icon className="h-8 w-8 text-blue-500 mx-auto" />
                    <p className="font-bold uppercase tracking-widest text-[10px] text-muted">{stat.label}</p>
                    <p className="text-2xl font-black transition-all">Verified</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- VALUE SECTION --- */}
        <section className="py-32 bg-background">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">Designed for Speed and Accuracy</h2>
              <div className="h-1 mx-auto w-20 bg-blue-600 rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { label: "Faster patient intake", icon: Clock },
                { label: "Reduced scheduling errors", icon: X },
                { label: "Improved clinical coordination", icon: Layers }
              ].map((value) => (
                <div key={value.label} className="space-y-6">
                  <div className="h-16 w-16 mx-auto bg-surface dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-border-base dark:border-slate-700">
                    <value.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <p className="font-bold text-foreground text-lg leading-snug">{value.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="py-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-blue-600 rounded-[3rem] p-12 md:p-24 text-center text-white space-y-10 shadow-2xl shadow-blue-500/30 overflow-hidden relative">
              {/* Decorative radial */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
              
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-none">Ready to Flow?</h2>
                <p className="text-blue-100 text-lg md:text-xl font-medium max-w-xl mx-auto">
                  Start managing your clinical workflows with precision today. Join the community of modern clinics.
                </p>
                <Link href="/login" className="inline-block pt-4">
                  <Button className="h-16 px-12 rounded-[2rem] bg-white text-blue-600 hover:bg-slate-100 text-xl font-bold shadow-2xl shadow-blue-900/20 active:scale-95 transition-all">
                    Launch EvoDoc Platform
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-surface dark:bg-slate-900 pt-32 pb-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1 rounded-lg">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <span className="font-black text-xl tracking-tight">EvoDoc</span>
              </div>
              <p className="text-muted text-sm font-medium leading-relaxed">
                The high-performance clinical OS for the next generation of patient care.
              </p>
            </div>
            
            {['Platform', 'Security', 'Company'].map((title) => (
              <div key={title} className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-text-base">{title}</h4>
                <div className="flex flex-col gap-4">
                  <Link href="#" className="text-muted hover:text-blue-600 text-sm font-bold transition-colors">Documentation</Link>
                  <Link href="#" className="text-muted hover:text-blue-600 text-sm font-bold transition-colors">Infrastructure</Link>
                  <Link href="#" className="text-muted hover:text-blue-600 text-sm font-bold transition-colors">Compliance</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-border-base flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted">
              © 2026 EvoDoc Flow. Handcrafted for clinical excellence.
            </p>
            <div className="flex gap-8">
              <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-blue-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
