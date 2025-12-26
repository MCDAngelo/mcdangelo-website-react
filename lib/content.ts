/**
 * Website content - projects, art, and adventures
 */

import { getAssetUrl } from './assets';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  featured?: boolean;
  category: 'web' | 'desktop' | 'terminal';
}

export interface ArtPiece {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  year?: number;
  medium?: string;
  category: 'sewing' | 'knitting';
}

export interface Adventure {
  id: string;
  title: string;
  location: string;
  date: string;
  imageUrl: string;
  description?: string;
  category: 'hiking' | 'scuba';
}

// ===== PROJECTS =====

export const projects: Project[] = [
  // Web Apps
  {
    id: 'quiltspiration',
    title: 'Quiltspiration',
    description: 'A web app built using express JS to serve you inspiration for your next quilt.',
    imageUrl: getAssetUrl('projects/quiltspiration.png') || '',
    githubUrl: 'https://github.com/MCDAngelo/quilt-spiration_from_MET',
    liveUrl: 'https://quilt-spiration-from-met.onrender.com',
    tags: ['Express.js', 'Node.js', 'Web App', 'API'],
    featured: true,
    category: 'web',
  },
  {
    id: 'checkitoff',
    title: 'Check It Off',
    description: 'Create and save to do lists to help you stay organized.',
    imageUrl: getAssetUrl('projects/checkitoff-multiple_images.png') || '',
    githubUrl: 'https://github.com/MCDAngelo/to_do_list_website',
    tags: ['Web App', 'To-Do', 'Organization'],
    featured: false,
    category: 'web',
  },
  {
    id: 'remote-work-cafes',
    title: 'Coffee Shops for Remote work',
    description: 'Find coffee shops that have the amenities you need to work remotely.',
    imageUrl: getAssetUrl('projects/remote_work_cafes-homepage.png') || '',
    githubUrl: 'https://github.com/MCDAngelo/remote_work_coffee_shops_website',
    liveUrl: 'https://remote-work-coffee-shops-website.onrender.com',
    tags: ['Web App', 'Database', 'Remote Work'],
    featured: true,
    category: 'web',
  },
  
  // Desktop Apps
  {
    id: 'write-it-or-lose-it',
    title: 'Write it or Lose it',
    description: "Desktop app to motivate you to write more - because if you stop, you'll lose your progress.",
    imageUrl: getAssetUrl('projects/write_it_or_lose_it.png') || '',
    githubUrl: 'https://github.com/MCDAngelo/writing_disappearing_text_app',
    tags: ['Python', 'Desktop App', 'Tkinter', 'Productivity'],
    featured: false,
    category: 'desktop',
  },
  {
    id: 'breakout-game',
    title: 'Breakout',
    description: 'Play the classic game, Breakout, in this desktop app.',
    imageUrl: getAssetUrl('projects/breakout-game.png') || '',
    githubUrl: 'https://github.com/MCDAngelo/breakout_game',
    tags: ['Python', 'Game', 'Desktop App'],
    featured: false,
    category: 'desktop',
  },
  {
    id: 'typing-test',
    title: 'Typing Test',
    description: 'Find out your typing speed and improve it with this desktop app.',
    imageUrl: getAssetUrl('projects/typing-test-in-progress.png') || '',
    githubUrl: 'https://github.com/MCDAngelo/typing_test',
    tags: ['Python', 'Desktop App', 'Tkinter'],
    featured: false,
    category: 'desktop',
  },
  {
    id: 'watermark-app',
    title: 'Watermark App',
    description: 'Protect your work with configurable watermarks.',
    imageUrl: getAssetUrl('projects/watermark-app.png') || '',
    githubUrl: 'https://github.com/MCDAngelo/image_watermark_desktop_app',
    tags: ['Python', 'Desktop App', 'Image Processing'],
    featured: false,
    category: 'desktop',
  },
  
  // Terminal Apps
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    description: 'Tic Tac Toe from the comfort of your terminal.',
    imageUrl: getAssetUrl('projects/tic-tac-toe-home.png') || '',
    githubUrl: 'https://github.com/MCDAngelo/tic_tac_toe',
    liveUrl: 'https://replit.com/@dangelomaria1/tictactoe',
    tags: ['Python', 'Terminal App', 'Game'],
    featured: false,
    category: 'terminal',
  },
  {
    id: 'morse-code-converter',
    title: 'Morse Code Converter',
    description: 'A lightweight program to convert text to morse code.',
    imageUrl: getAssetUrl('projects/morse-code-converter.png') || '',
    githubUrl: 'https://github.com/MCDAngelo/morse_code_converter',
    liveUrl: 'https://replit.com/@dangelomaria1/morsecodeconverter',
    tags: ['Python', 'Terminal App', 'Converter'],
    featured: false,
    category: 'terminal',
  },
];

// ===== ART PIECES =====

export const artPieces: ArtPiece[] = [
  // Sewing
  {
    id: 'geometric-quilt',
    title: 'Geometric Quilt',
    description: 'Created for my son, pattern by The Weekend Quilter.',
    imageUrl: getAssetUrl('art/geometric-quilt.png') || '',
    year: 2023,
    medium: 'Quilting cottons',
    category: 'sewing',
  },
  {
    id: 'animal-patchwork-quilt',
    title: 'Forest Friends Patchwork Quilt',
    description: "Created for my dear friend's daughter.",
    imageUrl: getAssetUrl('art/animal-patchwork-quilt.png') || '',
    year: 2023,
    medium: 'Quilting cottons',
    category: 'sewing',
  },
  {
    id: 'first-quilt',
    title: 'My First Quilt',
    description: 'Made following the youtube tutorials by the late (and great) Melanie Ham.',
    imageUrl: getAssetUrl('art/first-quilt.png') || '',
    year: 2022,
    medium: 'Quilting cottons',
    category: 'sewing',
  },
  {
    id: 'bird-costume',
    title: 'Little Bird',
    description: "Costume made for my daughter's second Halloween.",
    imageUrl: getAssetUrl('art/bird-costume.png') || '',
    year: 2022,
    medium: 'Random assortment of fabrics found in the remnants bin for the cape + felt feathers',
    category: 'sewing',
  },
  
  // Knitting & Crochet
  {
    id: 'yoda-costume',
    title: 'Baby Yoda',
    description: "Costume made for my daughter's first Halloween.",
    imageUrl: getAssetUrl('art/yoda-costume.png') || '',
    year: 2021,
    medium: 'Acrylic yarns',
    category: 'knitting',
  },
  {
    id: 'knit-baby-blanket',
    title: 'Rainbow Star Blanket',
    description: 'Created for my daughter, using Fly Away pattern by tin can knits.',
    imageUrl: getAssetUrl('art/knit-baby-blanket.png') || '',
    year: 2021,
    medium: 'Small-batch hand-dyed wool by Hypothesis Yarns',
    category: 'knitting',
  },
  {
    id: 'baby-sweater-yellow',
    title: 'Mini Fade Flax Sweater',
    description: 'Started the week prior to my due date, completed over the fourth trimester, pattern by tin can knits.',
    imageUrl: getAssetUrl('art/baby-sweater-yellow.png') || '',
    year: 2021,
    medium: 'Small-batch hand-dyed wool by Hypothesis Yarns',
    category: 'knitting',
  },
  {
    id: 'geometric-shawl',
    title: 'Geometric Shawl',
    description: 'Created for my lovely mother-in-law, using the Forgotten Garden Shawl pattern by Rose Beck.',
    imageUrl: getAssetUrl('art/geometric-shawl.png') || '',
    year: 2020,
    medium: 'Merino wool',
    category: 'knitting',
  },
  {
    id: 'transition-sweater',
    title: 'Transitions',
    description: 'Sweater created leading up to the dissolution of my first marriage. Pattern by tin can knits',
    imageUrl: getAssetUrl('art/transition-sweater.png') || '',
    year: 2018,
    medium: 'Merino wool',
    category: 'knitting',
  },
];

// ===== ADVENTURES =====

export const adventures: Adventure[] = [
  // Hiking & Backpacking
  {
    id: 'canmore-2023',
    title: 'Canmore 2023',
    location: 'Canmore, Alberta',
    date: '2023',
    imageUrl: getAssetUrl('adventures/canmore-engine-bridge-summer-2.png') || '',
    description: 'Getaways to our home away from home.',
    category: 'hiking',
  },
  {
    id: 'torres-del-paine',
    title: 'O-Circuit in Torres del Paine',
    location: 'Torres del Paine, Chile',
    date: '2020',
    imageUrl: getAssetUrl('adventures/torres-del-paine-end.png') || '',
    description: 'Breathtaking views, high winds, and new friends.',
    category: 'hiking',
  },
  {
    id: 'tronador',
    title: 'Weekend in Tronador',
    location: 'Tronador, Argentina',
    date: '2020',
    imageUrl: getAssetUrl('adventures/tronador-evening.png') || '',
    description: 'A refugio surrounded by glaciers.',
    category: 'hiking',
  },
  {
    id: 'banff-winter',
    title: 'Banff Winter',
    location: 'Banff, Alberta',
    date: '2023',
    imageUrl: getAssetUrl('adventures/banff-winter.png') || '',
    description: 'Winter adventures in the Canadian Rockies.',
    category: 'hiking',
  },
  {
    id: 'ha-ling-summit',
    title: 'Ha Ling Peak',
    location: 'Canmore, Alberta',
    date: '2023',
    imageUrl: getAssetUrl('adventures/ha-ling-summit.png') || '',
    description: 'Summit hike with stunning views.',
    category: 'hiking',
  },
  
  // Scuba
  {
    id: 'hawaii-dive',
    title: 'Hawaii 2020',
    location: 'Hawaii',
    date: '2020',
    imageUrl: getAssetUrl('adventures/hawaii-dive-boat.png') || '',
    description: 'A family trip full of diving, including a night dive!',
    category: 'scuba',
  },
  {
    id: 'akumal-bay',
    title: 'Akumal Bay 2023',
    location: 'Akumal Bay, Mexico',
    date: '2023',
    imageUrl: getAssetUrl('adventures/akumal-fish.png') || '',
    description: 'Visiting the home of the turtles and colourful fish.',
    category: 'scuba',
  },
];

// ===== HELPER FUNCTIONS =====

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: 'web' | 'desktop' | 'terminal'): Project[] {
  return projects.filter(p => p.category === category);
}

/**
 * Get art pieces by category
 */
export function getArtByCategory(category: 'sewing' | 'knitting'): ArtPiece[] {
  return artPieces.filter(a => a.category === category);
}

/**
 * Get adventures by category
 */
export function getAdventuresByCategory(category: 'hiking' | 'scuba'): Adventure[] {
  return adventures.filter(a => a.category === category);
}

