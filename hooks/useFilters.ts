'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export type DurationRange = 'short' | 'medium' | 'long' | 'all';
export type SortOption = 'newest' | 'oldest' | 'shortest' | 'longest' | 'az' | 'za';

type Filters = {
    searchQuery: string;
    duration: DurationRange;
    sort: SortOption;
};

function parseDurationRange(raw?: string | null): DurationRange {
    if (!raw) return 'all';
    if (raw === 'short' || raw === 'medium' || raw === 'long') return raw;
    return 'all';
}

function parseSort(raw?: string | null): SortOption {
    if (!raw) return 'newest';

    const allowed: SortOption[] = ['newest', 'oldest', 'shortest', 'longest', 'az', 'za'];

    return allowed.includes(raw as SortOption) ? (raw as SortOption) : 'newest';
}

export const useFilters = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const searchQuery = searchParams.get('searchQuery') ?? '';
    const duration = parseDurationRange(searchParams.get('duration'));
    const sort = parseSort(searchParams.get('sort'));

    const filters: Filters = useMemo(
        () => ({ searchQuery, duration, sort }),
        [duration, searchQuery, sort],
    );

    const setFilters = useCallback(
        (next: Partial<Filters>) => {
            const params = new URLSearchParams(Array.from(searchParams.entries()));

            if (next.searchQuery !== undefined) {
                if (next.searchQuery === '') {
                    params.delete('searchQuery');
                } else {
                    params.set('searchQuery', next.searchQuery);
                }
            }

            if (next.duration !== undefined) {
                if (next.duration === 'all') {
                    params.delete('duration');
                } else {
                    params.set('duration', next.duration);
                }
            }

            if (next.sort !== undefined) {
                if (next.sort === 'newest') {
                    params.delete('sort');
                } else {
                    params.set('sort', next.sort);
                }
            }

            const search = params.toString();
            const url = `${window.location.pathname}${search ? `?${search}` : ''}`;

            router.replace(url);
        },
        [searchParams, router],
    );

    const resetFilters = useCallback(() => {
        router.replace(window.location.pathname);
    }, [router]);

    const filterFunction = useCallback(
        (video: { title: string; durationSec: number }) => {
            const matchesQuery =
                filters.searchQuery.trim() === '' ||
                video.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

            let matchesDur = true;

            if (filters.duration === 'short') matchesDur = video.durationSec < 300; // <5min

            if (filters.duration === 'medium')
                matchesDur = video.durationSec >= 300 && video.durationSec <= 1200; // 5–20

            if (filters.duration === 'long') matchesDur = video.durationSec > 1200; // >20

            return matchesQuery && matchesDur;
        },
        [filters.searchQuery, filters.duration],
    );

    const countFilterMatch = useCallback(
        (videos: Array<{ title: string; durationSec: number }>) =>
            videos.filter(filterFunction).length,
        [filterFunction],
    );

    const sortFunction = useCallback(
        (a: { title: string; durationSec: number; publishedAt: string }, b: typeof a) => {
            switch (filters.sort) {
                case 'oldest':
                    return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
                case 'shortest':
                    return a.durationSec - b.durationSec;
                case 'longest':
                    return b.durationSec - a.durationSec;
                case 'az':
                    return a.title.localeCompare(b.title);
                case 'za':
                    return b.title.localeCompare(a.title);
                case 'newest':
                default:
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            }
        },
        [filters.sort],
    );

    return useMemo(
        () => ({
            filters,
            setFilters,
            resetFilters,
            filterFunction,
            countFilterMatch,
            sortFunction,
        }),
        [filters, setFilters, resetFilters, filterFunction, countFilterMatch, sortFunction],
    );
};
