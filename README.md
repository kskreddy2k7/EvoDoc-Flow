# EvoDoc Flow 🏥

**Reimagining Clinical Workflows** — A modern, production-ready healthcare management platform designed for seamless patient intake and physician workflow optimization.

## 🚀 Overview

EvoDoc Flow is a role-based healthcare application built to bridge the gap between administrative intake and clinical consultation. It features dedicated portals for Nurses/Receptionists and Doctors, providing a unified source of truth for patient care.

## ✨ Key Features

### 🔐 Multi-Role Auth System
- **Nurse/Receptionist Portal**: Optimized for speed and accuracy during patient registration.
- **Doctor Portal**: Data-rich environment for clinical assessment and notes.
- Simulated authentication with persistent role sessions.

### 👩‍⚕️ Nurse / Receptionist Portal
- **Smart Patient Intake**: Multi-section form with auto-calculating age logic and medical history capture.
- **Appointment Management**: Quick-booking interface with doctor availability tracking and filterable tables.
- **Draft Mode**: Ability to save progress during registration.

### 👨‍⚕️ Doctor Portal
- **Clinical Dashboard**: Overview of today's schedule, "Next Patient" highlights, and clinical stats.
- **Longitudinal Patient Details**: Tabbed interface covering medical history, past visits, and current medications.
- **Session Notes**: High-performance rich-text area for clinical observations and session recording.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with Persist Middleware)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Notifications**: React Hot Toast

## 📂 Folder Structure

```
src/
├── app/               # Next.js App Router (Pages & Layouts)
│   ├── doctor/        # Doctor Portal Routes
│   ├── nurse/         # Nurse Portal Routes
│   ├── login/         # Authentication
│   └── globals.css    # Global styling & animations
├── components/        
│   └── ui/            # Reusable Atomic UI Components
├── store/             # Zustand Global State
├── lib/               # Utility functions (cn, date helpers)
└── types/             # TypeScript Definitions
```

## ⚙️ Setup Instructions

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Decisions

- **Color Palette**: Primary Blue (`#2563EB`) chosen for trust and clarity in medical environments.
- **Typography**: Inter (System-optimized sans-serif) for high readability in data-intensive tables.
- **UX Flow**: Minimized clicks and clear visual hierarchy (Badges for status, glassmorphism for modern feel).
- **Responsive**: Mobile-first grid layouts ensuring usability on tablets in clinical settings.

---

Built with ❤️ for Healthcare Excellence.
