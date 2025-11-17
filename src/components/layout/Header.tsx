'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from './Navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md transition-transform duration-300 supports-[backdrop-filter]:bg-white/60 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-[2100px] px-[4vw]">
        <div className="flex h-20 items-center justify-between py-[2vw]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-light text-gray-500">by</span>
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-70"
            >
              <Image
                src="/images/natural-state-logo.png"
                alt="Natural State"
                width={200}
                height={50}
                className="h-[50px] w-auto"
                priority
              />
            </Link>
            <span className="text-lg text-gray-400">,</span>
            <span className="text-sm font-light text-gray-500">for</span>
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-70"
            >
              <Image
                src="/images/eiendomsspar-logo.png"
                alt="Eiendomsspar"
                width={140}
                height={70}
                className="h-[40px] w-auto"
              />
            </Link>
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
