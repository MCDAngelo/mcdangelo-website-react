'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_ITEMS, SITE_CONFIG } from '@/lib/constants';


export function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
  
    // Close mobile menu when route changes
    useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [pathname]); // pathname is the dependency that triggers the effect
  
    // Prevent body scroll when mobile menu is open
    useEffect(() => {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isMobileMenuOpen]);
  
    return (
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo/Name */}
          <Link 
            href="/" 
            className="text-xl font-semibold tracking-tight transition-colors hover:text-teal-500"
          >
            {SITE_CONFIG.name}
          </Link>
  
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors hover:text-teal-500 ${
                  pathname === item.href ? 'text-teal-500' : 'text-foreground/80'
                }`}
              >
                {item.label}
                {/* Active indicator underline */}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
  
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex h-6 w-6 flex-col justify-center gap-1.5">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-6 bg-foreground transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-0.5 w-6 bg-foreground transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-6 bg-foreground transition-all"
              />
            </div>
          </button>
        </nav>
  
        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 h-full w-64 border-l border-white/10 bg-background p-6 md:hidden"
              >
                <div className="mt-16 flex flex-col gap-6">
                  {NAVIGATION_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`text-lg font-medium transition-colors hover:text-teal-500 ${
                          pathname === item.href ? 'text-teal-500' : 'text-foreground'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    );
  }