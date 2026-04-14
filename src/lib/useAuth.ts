import { useEffect, useSyncExternalStore } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useStore(state => state.user);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!isClient) return;

    if (!user) {
      if (pathname !== '/login' && pathname !== '/') {
        router.push('/login');
      }
    } else {
      // Prevent nurses from accessing doctor pages and vice versa
      if (pathname.startsWith('/doctor') && user.role !== 'doctor') {
        router.push('/nurse/dashboard'); // Or any default nurse page
      } else if (pathname.startsWith('/nurse') && user.role !== 'nurse') {
        router.push('/doctor/dashboard');
      } else if (pathname === '/login' || pathname === '/') {
        // Redirection on root or login when already authenticated
        if (user.role === 'doctor') {
          router.push('/doctor/dashboard');
        } else if (user.role === 'nurse') {
          router.push('/nurse/appointments');
        }
      }
    }
  }, [user, pathname, router, isClient]);

  return { user, isClient };
}
