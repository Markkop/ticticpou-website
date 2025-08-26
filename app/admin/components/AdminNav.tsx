'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AdminNavProps {
  userRole: string;
}

export function AdminNav({ userRole }: AdminNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      roles: ['super-admin', 'ambassador'],
    },
    {
      href: '/admin/matches',
      label: 'Matches',
      roles: ['super-admin', 'ambassador'],
    },
    {
      href: '/admin/users',
      label: 'Users',
      roles: ['super-admin'],
    },
  ];

  const allowedItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-lg font-semibold text-gray-900">
              Tic Tic Pou
            </Link>
            <div className="flex space-x-4">
              {allowedItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {userRole}
            </span>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}