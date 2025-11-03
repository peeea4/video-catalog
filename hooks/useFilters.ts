'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export type DurationRange = 'short' | 'medium' | 'long' | 'all';

type Filters = {
    searchQuery: string;
    duration: DurationRange;
};

function parseDurationRange(raw?: string | null): DurationRange {
    if (!raw) return 'all';
    if (raw === 'short' || raw === 'medium' || raw === 'long') return raw;
    return 'all';
}

export const useFilters = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const searchQuery = searchParams.get('searchQuery') ?? '';
    const duration = parseDurationRange(searchParams.get('duration'));

    const filters: Filters = useMemo(() => ({ searchQuery, duration }), [duration, searchQuery]);

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

            const search = params.toString();
            const url = `${window.location.pathname}${search ? `?${search}` : ''}`;

            router.replace(url);
        },
        [searchParams, router],
    );

    const resetFilters = useCallback(() => {
        const url = window.location.pathname;
        router.replace(url);
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

    return useMemo(
        () => ({
            filters,
            setFilters,
            resetFilters,
            filterFunction,
            countFilterMatch,
        }),
        [filters, setFilters, resetFilters, filterFunction, countFilterMatch],
    );
};
