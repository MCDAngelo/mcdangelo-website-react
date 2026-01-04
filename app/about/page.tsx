import { ABOUT_CONTENT } from '@/lib/about';
import { Timeline } from '@/components/ui/Timeline';

export const metadata = {
  title: 'About | Maria D\'Angelo',
  description: 'Data Scientist, Developer, and Artist.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-20 md:py-32">
      {/* Header */}
      <div className="mb-16 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          About Me
        </h1>
        <div className="prose prose-invert prose-lg max-w-none text-foreground/80">
          {ABOUT_CONTENT.bio.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-20">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-teal-400">
          Skills & Technologies
        </h2>
        <div className="flex flex-wrap gap-3">
          {ABOUT_CONTENT.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-teal-500/50 hover:bg-teal-500/10"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-teal-400">
          Journey
        </h2>
        <Timeline items={ABOUT_CONTENT.timeline} />
      </div>
    </div>
  );
}

