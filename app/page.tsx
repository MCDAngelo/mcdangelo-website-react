/**
 * HOME PAGE
 * 
 * This is the main landing page with a hero section and bento grid layout.
 * The bento grid showcases featured content from different sections of the portfolio.
 */

'use client';

import { motion } from 'framer-motion';
import { BentoCard } from '@/components/ui/BentoCard';
import { Hero } from '@/components/sections/Hero';
import { getFeaturedProjects, artPieces, adventures } from '@/lib/content';
import { getAssetUrl } from '@/lib/assets';

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const featuredProject = featuredProjects[0];
  const featuredArt = artPieces[0];
  const featuredAdventure = adventures[0];
  const academicCvUrl = getAssetUrl('MCDAngelo-AcademicCV-Oct2024.pdf');
  const artsCvUrl = getAssetUrl('MCDAngelo-ArtsCV-Oct2024.pdf');

  return (
    <main>
      <Hero />
      <div className="container mx-auto px-4 pb-20">
        <h2 className="mb-12 text-4xl font-bold md:text-5xl">
          Featured Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <BentoCard
                title={featuredProject.title}
                description={featuredProject.description}
                image={featuredProject.imageUrl}
                href="/development"
              >
                <div className="mt-auto flex flex-wrap gap-2">
                  {featuredProject.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-medium text-teal-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </BentoCard>
            </motion.div>
          )}

          {featuredArt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <BentoCard
                title={featuredArt.title}
                description={featuredArt.description}
                image={featuredArt.imageUrl}
                href="/art"
              >
                {featuredArt.year && (
                  <div className="mt-auto">
                    <span className="text-sm font-medium text-foreground/60">
                      {featuredArt.year}
                    </span>
                  </div>
                )}
              </BentoCard>
            </motion.div>
          )}

          {featuredAdventure && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <BentoCard
                title={featuredAdventure.title}
                description={featuredAdventure.description}
                image={featuredAdventure.imageUrl}
                href="/adventures"
              >
                <div className="mt-auto flex items-center gap-2 text-sm text-foreground/60">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{featuredAdventure.location}</span>
                </div>
              </BentoCard>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <BentoCard
              title="Curriculum Vitae"
              description="Download my CV"
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            >
              <div className="flex flex-col gap-3">
                {academicCvUrl && (
                  <a
                    href={academicCvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-500 transition-colors hover:bg-teal-500/20"
                  >
                    Academic CV
                  </a>
                )}
                {artsCvUrl && (
                  <a
                    href={artsCvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-500/20"
                  >
                    Arts CV
                  </a>
                )}
              </div>
            </BentoCard>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
