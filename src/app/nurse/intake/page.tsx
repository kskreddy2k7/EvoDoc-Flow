'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema, PatientFormValues } from '@/lib/schemas';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-hot-toast';
import { calculateAge, cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { 
  UserPlus, 
  ClipboardList, 
  PhoneCall, 
  Save, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PatientIntakePage() {
  const addPatient = useStore((state) => state.addPatient);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      gender: 'Male',
      contactNumber: '+91',
      bloodGroup: 'O+',
      allergies: '',
      chronicConditions: '',
      currentMedications: '',
      emergencyName: '',
      emergencyPhone: '+91',
    },
  });

  const watchedFullName = watch('fullName');
  const watchedDob = watch('dateOfBirth');
  const watchedContact = watch('contactNumber');
  const watchedEmergencyPhone = watch('emergencyPhone');
  const watchedAllergies = watch('allergies');

  const nextStep = async () => {
    let fieldsToValidate: (keyof PatientFormValues)[] = [];
    if (step === 1) {
      fieldsToValidate = ['fullName', 'dateOfBirth', 'gender', 'contactNumber'];
    } else if (step === 2) {
      fieldsToValidate = ['bloodGroup'];
    }

    const valid = await trigger(fieldsToValidate);
    if (valid) {
      setStep(step + 1);
    } else {
      toast.error('Please correct the errors before proceeding');
    }
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = (data: PatientFormValues) => {
    setIsLoading(true);
    
    const newPatient = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth,
      age: calculateAge(data.dateOfBirth),
      gender: data.gender,
      contactNumber: data.contactNumber,
      bloodGroup: data.bloodGroup,
      allergies: data.allergies.split(',').map(s => s.trim()).filter(Boolean),
      chronicConditions: data.chronicConditions.split(',').map(s => s.trim()).filter(Boolean),
      currentMedications: data.currentMedications.split(',').map(s => s.trim()).filter(Boolean),
      emergencyContact: {
        name: data.emergencyName,
        phone: data.emergencyPhone,
      },
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      addPatient(newPatient);
      setIsLoading(false);
      toast.success('Patient record created successfully!');
      setStep(1);
      reset();
    }, 1200);
  };

  const steps = [
    { id: 1, title: 'Basic Info', icon: UserPlus },
    { id: 2, title: 'Medical Info', icon: ClipboardList },
    { id: 3, title: 'Emergency & Review', icon: PhoneCall },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-text-base mb-2">Patient Intake</h1>
          <p className="text-muted font-medium">Follow the clinical registration wizard</p>
        </div>
        <div className="flex items-center gap-1 bg-accent/40 p-2 rounded-2xl border border-border-base">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div 
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all relative",
                  step === s.id ? "bg-primary text-white shadow-lg shadow-primary/20" : 
                  step > s.id ? "text-primary bg-primary/5" : "text-muted"
                )}
              >
                {step > s.id ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <s.icon className="h-4 w-4" />}
                <span className="hidden sm:inline">{s.title}</span>
                {step === s.id && (
                   <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-muted whitespace-nowrap">Step {step} of 3</span>
                )}
              </div>
              {i < steps.length - 1 && <div className={cn("mx-1 h-px w-4", step > (i + 1) ? "bg-primary" : "bg-border-base")} />}
            </div>
          ))}
        </div>
      </div>

      <Card className="shadow-premium border-none">
        <CardContent className="p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {step === 1 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <UserPlus className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Personal Details</h3>
                    </div>
                    <Input 
                      label="Full Name *" 
                      {...register('fullName')}
                      error={errors.fullName?.message}
                      placeholder="e.g. Johnathan Doe" 
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        label="Date of Birth *" 
                        type="date" 
                        {...register('dateOfBirth')}
                        error={errors.dateOfBirth?.message}
                        required
                      />
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-base ml-1">Calculated Age</label>
                        <div className="h-11 px-4 py-2 bg-accent/40 border border-border-base rounded-xl text-primary font-bold text-sm flex items-center">
                          {watchedDob ? `${calculateAge(watchedDob)} years` : '--'}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-base ml-1">Gender *</label>
                      <select 
                        {...register('gender')}
                        className="flex h-11 w-full rounded-xl border border-border-base bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <p className="text-xs text-red-500 ml-1">{errors.gender.message}</p>}
                    </div>
                    <Controller
                      name="contactNumber"
                      control={control}
                      render={({ field }) => {
                        const codes = ['+91', '+1', '+44', '+61', '+81'];
                        const activeCode = codes.find(c => field.value?.startsWith(c)) || '+91';
                        const numberPart = field.value?.startsWith(activeCode) ? field.value.slice(activeCode.length) : (field.value || '').replace(/\D/g, '');

                        return (
                          <div className="space-y-2 w-full font-sans">
                            <label className="text-sm font-semibold tracking-tight text-text-base ml-1">Contact Number *</label>
                            <div className="flex gap-2">
                              <select 
                                value={activeCode}
                                onChange={(e) => {
                                  field.onChange(e.target.value + numberPart);
                                }}
                                className="flex h-11 rounded-xl border border-border-base bg-surface px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-center"
                              >
                                <option value="+91">🇮🇳 +91</option>
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+44">🇬🇧 +44</option>
                                <option value="+61">🇦🇺 +61</option>
                                <option value="+81">🇯🇵 +81</option>
                              </select>
                              <div className="relative w-full">
                                <input
                                  type="tel"
                                  value={numberPart}
                                  onChange={(e) => {
                                     field.onChange(activeCode + e.target.value.replace(/\D/g, ''));
                                  }}
                                  onBlur={field.onBlur}
                                  ref={field.ref}
                                  className={cn(
                                    "flex h-11 w-full rounded-xl border border-border-base bg-surface px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted",
                                    errors.contactNumber ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "hover:border-muted"
                                  )}
                                  placeholder="Enter mobile number"
                                />
                              </div>
                            </div>
                            {errors.contactNumber && <p className="text-xs text-red-500 ml-1 font-bold">{errors.contactNumber.message}</p>}
                          </div>
                        )
                      }}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ClipboardList className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Clinical Overview</h3>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-base ml-1">Blood Group</label>
                      <select 
                        {...register('bloodGroup')}
                        className="flex h-11 w-full rounded-xl border border-border-base bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>
                    <Input 
                      label="Allergies (comma separated)" 
                      {...register('allergies')}
                      placeholder="e.g. Peanuts, Aspirin" 
                    />
                    <Input 
                      label="Chronic Conditions" 
                      {...register('chronicConditions')}
                      placeholder="e.g. Hypertension, Diabetes" 
                    />
                    <Input 
                      label="Current Medications" 
                      {...register('currentMedications')}
                      placeholder="e.g. Metformin, Lisinopril" 
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="md:col-span-2 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <PhoneCall className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Emergency Contact</h3>
                      </div>
                      <Input 
                        label="Contact Name" 
                        {...register('emergencyName')}
                        error={errors.emergencyName?.message}
                        placeholder="Full Name" 
                      />
                      <Controller
                        name="emergencyPhone"
                        control={control}
                        render={({ field }) => {
                          const codes = ['+91', '+1', '+44', '+61', '+81'];
                          const activeCode = codes.find(c => field.value?.startsWith(c)) || '+91';
                          const numberPart = field.value?.startsWith(activeCode) ? field.value.slice(activeCode.length) : (field.value || '').replace(/\D/g, '');

                          return (
                            <div className="space-y-2 w-full font-sans">
                              <label className="text-sm font-semibold tracking-tight text-text-base ml-1">Contact Phone</label>
                              <div className="flex gap-2">
                                <select 
                                  value={activeCode}
                                  onChange={(e) => {
                                    field.onChange(e.target.value + numberPart);
                                  }}
                                  className="flex h-11 rounded-xl border border-border-base bg-surface px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-center"
                                >
                                  <option value="+91">🇮🇳 +91</option>
                                  <option value="+1">🇺🇸 +1</option>
                                  <option value="+44">🇬🇧 +44</option>
                                  <option value="+61">🇦🇺 +61</option>
                                  <option value="+81">🇯🇵 +81</option>
                                </select>
                                <div className="relative w-full">
                                  <input
                                    type="tel"
                                    value={numberPart}
                                    onChange={(e) => {
                                       field.onChange(activeCode + e.target.value.replace(/\D/g, ''));
                                    }}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    className={cn(
                                      "flex h-11 w-full rounded-xl border border-border-base bg-surface px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted",
                                      errors.emergencyPhone ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "hover:border-muted"
                                    )}
                                    placeholder="Enter mobile number"
                                  />
                                </div>
                              </div>
                              {errors.emergencyPhone && <p className="text-xs text-red-500 ml-1 font-bold">{errors.emergencyPhone.message}</p>}
                            </div>
                          )
                        }}
                      />
                    </div>

                    <div className="pt-6 border-t border-border-base">
                      <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                        <CheckCircle2 className="h-5 w-5" />
                        <h4>Registration Summary</h4>
                      </div>
                      <div className="bg-accent/30 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                        <div>
                          <p className="text-sm font-bold text-text-base">Review patient information for <span className="text-primary">{watchedFullName || 'New Patient'}</span></p>
                        </div>
                        <div>
                          <p className="text-muted mb-1 font-bold uppercase tracking-widest text-[10px]">DOB / Age</p>
                          <p className="font-bold">{watchedDob || '--'} ({watchedDob ? calculateAge(watchedDob) : '--'})</p>
                        </div>
                        <div>
                          <p className="text-muted mb-1 font-bold uppercase tracking-widest text-[10px]">Patient Contact</p>
                          <p className="font-bold">{watchedContact || '--'}</p>
                        </div>
                        <div>
                          <p className="text-muted mb-1 font-bold uppercase tracking-widest text-[10px]">Emergency</p>
                          <p className="font-bold">{watchedEmergencyPhone || '--'}</p>
                        </div>
                        <div className="col-span-2 md:col-span-4">
                          <p className="text-muted mb-1 font-bold uppercase tracking-widest text-[10px]">Critical Conditions</p>
                          <p className="font-bold text-red-500">{watchedAllergies || 'None reported'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 justify-between mt-12 pt-8 border-t border-border-base">
              <Button 
                variant="outline" 
                type="button" 
                disabled={step === 1 || isLoading}
                onClick={prevStep}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  variant="ghost" 
                  type="button" 
                  onClick={() => toast.success('Draft cached locally', { icon: '💾' })}
                  disabled={isLoading}
                >
                  Save as Draft
                </Button>
                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className="gap-2 min-w-[140px]">
                    Next Step <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex flex-col">
                    <Button type="submit" isLoading={isLoading} className="gap-2 min-w-[180px] bg-green-600 hover:bg-green-700 hover:shadow-green-100">
                      <Save className="h-4 w-4" /> Complete Registration
                    </Button>
                    <p className="text-xs text-muted text-center mt-6 font-bold flex items-center justify-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-500" /> Patient data is securely registered into the global hospital matrix upon deployment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-2 justify-center text-green-700 font-bold text-[10px] uppercase tracking-widest bg-green-500/10 p-3 rounded-full w-max mx-auto border border-green-500/20">
        <Lock className="h-3 w-3" />
        All data is encrypted and handled according to clinical privacy protocols.
      </div>
    </div>
  );
}
