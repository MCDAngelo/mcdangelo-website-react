import { BentoCard } from '@/components/ui/BentoCard';

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="mb-12 text-6xl font-bold">
        Portfolio
      </h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BentoCard
          title="About"
          description="Learn about my background"
          href="/about"
        />
        
        <BentoCard
          title="Projects"
          description="Featured work"
          size="2x"
          href="/development"
        />
        
        <BentoCard title="Adventures">
          <p>Photo galleries coming soon!</p>
        </BentoCard>
      </div>
    </div>
  );
}