'use client';

import { useQuery, QueryClient } from '@tanstack/react-query';

type Video = {
    id: string;
    title: string;
    author: string;
    durationSec: number;
    publishedAt: string;
    thumbnail: string;
};

const fetchVideos = async (): Promise<Video[]> => {
    const res = await fetch('/api/videos');

    if (!res.ok) {
        const text = await res.text();

        throw new Error(`Failed to fetch videos: ${res.status} ${text}`);
    }

    return res.json();
};

const QUERY_KEY_VIDEOS = ['videos'] as const;

export const useVideos = (initialData?: Video[]) => {
    const query = useQuery<Video[], Error>({
        queryKey: QUERY_KEY_VIDEOS,
        queryFn: fetchVideos,
        gcTime: 300_000, // 5 minutes
        staleTime: 30_000, // 30 seconds
        initialData: initialData ?? undefined,
    });

    return query;
};

async function prefetchVideosOnServer(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
        queryKey: QUERY_KEY_VIDEOS,
        queryFn: async (): Promise<Video[]> => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/videos`,
            );

            if (!res.ok) {
                throw new Error('Failed to fetch videos on server');
            }

            return res.json();
        },
    });
}
