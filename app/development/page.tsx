'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, getProjectsByCategory } from '@/lib/content';

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Apps' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'terminal', label: 'Terminal' },
] as const;

export default function DevelopmentPage() {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : getProjectsByCategory(filter as any);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
          Development
        </h1>
        <p className="max-w-2xl text-lg text-foreground/60">
          A collection of web applications, desktop tools, and terminal utilities.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12 flex flex-wrap gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
              filter === category.id
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                : 'bg-white/5 text-foreground/60 hover:bg-white/10 hover:text-foreground'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-teal-500/30 hover:bg-white/10"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/20">
                {project.imageUrl && (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4">
                  <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-foreground/60">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-teal-500/10 px-2 py-1 text-xs font-medium text-teal-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 border-t border-white/10 pt-4">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="text-sm font-medium text-foreground/80 hover:text-teal-400"
                      >
                        GitHub →
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="text-sm font-medium text-foreground/80 hover:text-teal-400"
                      >
                        Live Demo →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

