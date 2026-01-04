'use client';

import { motion } from 'framer-motion';

interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

interface TimelineProps {
    items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
    return (
        <div className="relative border-l-2 border-white/20 ml-4 md:ml-12 space-y-12 py-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* The Dot */}
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-teal-500 ring-4 ring-background" />
            
            {/* The Content */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-mono text-teal-400 font-semibold tracking-wider">
                {item.year}
              </span>
              <h3 className="text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-white/60 leading-relaxed max-w-prose">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    );
}
