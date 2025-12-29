'use client';

import { motion } from 'framer-motion';

/**
 * Hero Section Component
 * 
 * This is the banner at the top of the home page.
 * Features:
 * - Animated gradient background that shifts colors
 * - Large, responsive typography
 * - Fade-in animations for text elements
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
      {/* 
        Animated Gradient Background
        - Uses Framer Motion to animate between two gradient states
        - 'animate' prop cycles through color positions infinitely
        - Duration: 8 seconds per cycle, with 'reverse' to smoothly go back
        - Opacity at 20% so text remains readable
      */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
            'linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* 
        Content Container
        - relative z-10: ensures content appears above the animated background
        - max-w-7xl: constrains width for readability
        - mx-auto: centers the container
        - px-6: horizontal padding for mobile
      */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* 
          Main Heading - Your Name
          - motion.h1: Framer Motion wrapper for animation
          - initial: starting state (invisible, slightly below)
          - animate: end state (visible, in position)
          - transition: timing for the animation
          - text-5xl/6xl/7xl: responsive text sizes (mobile → tablet → desktop)
          - font-bold: heavy weight for impact
          - tracking-tight: slightly tighter letter spacing for modern look
          - bg-clip-text: allows gradient to show through text
          - text-transparent: makes text transparent so gradient shows
        */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl"
        >
          Maria D&apos;Angelo, PhD
        </motion.h1>

        {/* 
          Tagline/Subtitle
          - Animates 0.2s after the name (delay: 0.2)
          - Staggering creates a polished, professional feel
          - text-xl/2xl/3xl: responsive sizing, smaller than heading
          - text-foreground/80: uses CSS variable with 80% opacity for hierarchy
        */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl text-foreground/80 md:text-2xl lg:text-3xl"
        >
          Data Scientist, Developer, Artist, Adventurer
        </motion.p>

        {/* 
          Supporting Text
          - Animates last (delay: 0.4) for cascading effect
          - Smaller text for additional context
          - max-w-2xl: narrower than heading for better readability
          - mt-6: margin-top for spacing
        */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-6 max-w-2xl text-base text-foreground/70 md:text-lg"
        >
          Building web applications, creating watercolour and fiber art, and exploring the world through hiking and scuba diving.
        </motion.p>
      </div>
    </section>
  );
}

