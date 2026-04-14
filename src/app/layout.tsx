import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from '@/context/SidebarContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'EvoDoc Flow | Enterprise Clinical Workflow',
  description: 'Pro-grade clinical logic, multi-physician scheduling, and secure patient intake for modern healthcare facilities.',
  keywords: ['healthcare saas', 'clinical workflow', 'doctor scheduling', 'patient intake', 'medical record management'],
  authors: [{ name: 'EvoDoc Team' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://evodoc-flow.com',
    title: 'EvoDoc Flow - Clinical Intelligence',
    description: 'The future of patient management and physician orchestration.',
    siteName: 'EvoDoc Flow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EvoDoc Flow | Enterprise Clinical Workflow',
    description: 'Pro-grade clinical logic and physician orchestration.',
    creator: '@evodoc',
  },
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-bg-base text-text-base antialiased`}>
        <ErrorBoundary>
          <ThemeProvider>
            <SidebarProvider>
              {children}
              <Toaster position="top-right" />
            </SidebarProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
