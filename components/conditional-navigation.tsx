'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './navigation';

export function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Don't show main navigation for admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return <Navigation />;
}