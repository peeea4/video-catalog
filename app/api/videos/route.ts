import { NextResponse } from 'next/server';

type Video = {
    id: string;
    title: string;
    author: string;
    durationSec: number;
    publishedAt: string;
    thumbnail: string;
};

// Arrays of sample authors and titles to generate fake data
const AUTHORS = [
    'Alice Johnson',
    'Bob Smith',
    'Clara Lopez',
    'David Kim',
    'Evelyn Stone',
    'Frank Wu',
    'Grace Lee',
    'Hiro Tanaka',
];

const TITLES = [
    'Exploring the Future of AI',
    'Top 10 React Performance Tips',
    'Next.js 15 Deep Dive',
    'Building Scalable Design Systems',
    'Understanding Server Components',
    'How to Optimize Web Vitals',
    'The Art of Clean Architecture',
    'Microfrontends Explained',
    'From JS to TS: Best Practices',
    'Deploying on Vercel Like a Pro',
];

// Helper function to generate a random integer between min and max (inclusive)
function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate a random date within the last `days` days
function randomDateWithin(days: number) {
    const now = Date.now();
    const offset = randomInt(0, days) * 24 * 60 * 60 * 1000; // milliseconds
    return new Date(now - offset).toISOString();
}

// Generate a single video object
// id is passed in for uniqueness, durationSec determines length category
function generateVideo(id: number, durationSec: number): Video {
    return {
        id: id.toString(),
        title: TITLES[randomInt(0, TITLES.length - 1)], // Random title
        author: AUTHORS[randomInt(0, AUTHORS.length - 1)], // Random author
        durationSec,
        publishedAt: randomDateWithin(120), // Last 120 days
        thumbnail: `/seed/${id}/640/360`, // Stable image per id
    };
}

export async function GET() {
    // Simulate 10% API error to test error handling in UI
    if (Math.random() < 0.1) {
        return NextResponse.json({ message: 'Internal Server Error (simulated)' }, { status: 500 });
    }

    const videos: Video[] = [];

    // Generate 4 short videos (<5 minutes)
    for (let i = 0; i < 4; i++) {
        videos.push(generateVideo(i + 1, randomInt(30, 299))); // 30–299 sec
    }

    // Generate 4 medium videos (5–20 minutes)
    for (let i = 4; i < 8; i++) {
        videos.push(generateVideo(i + 1, randomInt(300, 1200))); // 5–20 min
    }

    // Generate 4 long videos (>20 minutes)
    for (let i = 8; i < 12; i++) {
        videos.push(generateVideo(i + 1, randomInt(1201, 5400))); // 20–90 min
    }

    // Return JSON response with caching headers for SSR optimization
    return NextResponse.json(videos, {
        headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
    });
}

