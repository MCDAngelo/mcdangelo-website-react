# Personal Website - Next.js

A modern, performant personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Storage:** Supabase Storage
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account (for storage)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mcdangelo-website-react
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your Supabase credentials:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── development/       # Development portfolio
│   ├── art/               # Art portfolio
│   └── adventures/        # Adventures gallery
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── sections/         # Page sections
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client
│   └── constants.ts      # Site constants
└── public/               # Static assets
```

## Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Create storage buckets:
   - `portfolio-images` - For project and art images
   - `pdfs` - For downloadable files (CV, etc.)
3. Set bucket policies to public for read access
4. Copy your project URL and anon key to `.env.local`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically deploy on every push to main.

## Performance

This site is optimized for performance with:

- Next.js automatic code splitting
- Image optimization with next/image
- Supabase CDN for fast asset delivery
- Edge network deployment via Vercel
- Lazy loading and prefetching

Target metrics:

- Lighthouse Performance: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

## License

Private project - All rights reserved
