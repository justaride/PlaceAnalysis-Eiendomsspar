'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavItem = {
  href: string;
  label: string;
  icon?: string;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Forside' },
  { href: '/eiendommer', label: 'Eiendommer' },
  // { href: '/sammenlign', label: 'Sammenlign', icon: '⚖️' }, // Hidden - under development
  { href: '/om-prosjektet', label: 'Om Prosjektet' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-2">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== '/' && pathname?.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-1.5',
              isActive
                ? 'bg-lokka-primary text-white shadow-sm'
                : 'text-lokka-secondary hover:bg-gray-50 hover:text-lokka-primary'
            )}
          >
            {item.icon && <span className="text-base">{item.icon}</span>}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
