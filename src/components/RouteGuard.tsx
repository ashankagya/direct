'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

const PUBLIC_ROUTES = ['/agreement', '/onboarding'];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { hasAgreedToRules, isOnboarded } = useAppStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (!hasAgreedToRules && pathname !== '/agreement') {
      router.replace('/agreement');
    } else if (hasAgreedToRules && !isOnboarded && pathname !== '/onboarding') {
      router.replace('/onboarding');
    } else if (hasAgreedToRules && isOnboarded && PUBLIC_ROUTES.includes(pathname)) {
      router.replace('/');
    }
  }, [hasAgreedToRules, isOnboarded, pathname, router, isClient]);

  if (!isClient) return null; // Wait for hydration

  // Block rendering of protected routes until conditions are met
  if (!hasAgreedToRules && pathname !== '/agreement') return null;
  if (hasAgreedToRules && !isOnboarded && pathname !== '/onboarding') return null;

  return <>{children}</>;
}
