'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export function OnboardingTour() {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!isMounted) return;

    // Check if they have already completed the tour
    const hasSeenTour = localStorage.getItem('evodoc_tour_completed');
    if (hasSeenTour) return;

    const driverObj = driver({
      showProgress: true,
      animate: true,
      smoothScroll: true,
      doneBtnText: 'Finish Tour',
      nextBtnText: 'Next ✨',
      prevBtnText: 'Back',
      popoverClass: 'evodoc-driver-theme', // For optional global styling later if needed
      steps: [
        {
          popover: {
            title: 'Welcome to EvoDoc Flow! 👋',
            description: 'Let us show you around your new clinical workspace. It will only take a moment.',
            side: 'over',
            align: 'center'
          }
        },
        {
          element: '#tour-sidebar-nav',
          popover: {
            title: 'Navigation Hub',
            description: 'Use this sidebar to quickly jump between active Patient Intake forms and your clinical queue.',
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '#tour-nav-intake',
          popover: {
            title: 'Patient Intake',
            description: 'Securely register new patients into the global database here.',
            side: 'right',
            align: 'center'
          }
        },
        {
          element: '#tour-nav-appointments',
          popover: {
            title: 'Clinical Schedule',
            description: 'Manage the active hospital queue. You can schedule encounters for doctors here.',
            side: 'right',
            align: 'center'
          }
        },
        {
          element: '#tour-theme-toggle',
          popover: {
            title: 'Visual Comfort',
            description: 'Swap between clinical visual themes depending on your terminal lighting!',
            side: 'right',
            align: 'end'
          }
        }
      ],
      onDestroyed: () => {
        // Tag local storage so the tour never bothers them again mapping to their browser
        localStorage.setItem('evodoc_tour_completed', 'true');
      }
    });

    // 600ms delay to ensure the entire DOM is perfectly painted and mounted
    setTimeout(() => {
      driverObj.drive();
    }, 600);

  }, [isMounted]);

  return null;
}
