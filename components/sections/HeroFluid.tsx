'use client';

import { motion } from 'framer-motion';

/**
 * Hero Section - Option B: Abstract/Fluid
 * 
 * Features:
 * - Floating, blurred "orbs" providing a lava-lamp effect
 * - Glassmorphism card for content
 * - More dynamic, artistic feel
 */
export function HeroFluid() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center pt-20 pb-10">
      {/* 
        Animated Background Orbs 
        - Large blurred circles moving in the background
        - Complex animation paths with different durations for organic feel
        - Extended gradient mask for softer fade
      */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}
      >
        <motion.div
          className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-teal-500/30 blur-[80px]"
          style={{ mixBlendMode: 'screen' }}
          animate={{
            x: [0, 150, -50, 100, 0],
            y: [0, 80, 150, 40, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-[30%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-500/30 blur-[80px]"
          style={{ mixBlendMode: 'screen' }}
          animate={{
            x: [0, -150, -20, -100, 0],
            y: [0, -80, 50, -120, 0],
            scale: [1, 1.1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-[10%] left-[20%] h-[400px] w-[400px] rounded-full bg-purple-500/30 blur-[80px]"
          style={{ mixBlendMode: 'screen' }}
          animate={{
            x: [0, 100, -80, 150, 0],
            y: [0, -120, -50, -100, 0],
            scale: [1, 1.3, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* 
        Content Container
        - Uses a subtle glass effect to pop against the orbs
      */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text pb-2 text-5xl font-bold tracking-tight text-transparent md:text-7xl"
          >
            Maria D&apos;Angelo, PhD
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl font-light text-foreground/90 md:text-3xl"
          >
            Data Scientist &bull; Developer &bull; Artist
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70"
          >
            Blending analytical rigor with creative expression to build meaningful digital experiences.
          </motion.p>
        </motion.div>
      </div>

       {/* Scroll Indicator */}
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <svg 
          className="h-8 w-8 text-foreground/30" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}

