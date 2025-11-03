'use client';

import { FC, Suspense, useMemo } from 'react';
import { DehydratedState, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { useVideos } from '@/hooks/useVideos';
import { SearchInput } from '@/components/SearchInput';
import { DurationFilter } from '@/components/DurationFilter';
import { SkeletonCard } from '@/components/SkeletonCard';
import { HydrationBoundary } from '@tanstack/react-query';
import VideoCard from '@/components/VideoCard';

type Props = {
    initialData?: DehydratedState;
};

const VideoListInner = () => {
    const { filters, setFilters, filterFunction, resetFilters } = useFilters();
    const { data, isLoading, isError, error, refetch } = useVideos();

    const filtered = useMemo(() => data?.filter(filterFunction) || [], [data, filterFunction]);

    return (
        <div>
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                    <SearchInput
                        value={filters.searchQuery}
                        onChange={(searchQuery) => setFilters({ searchQuery })}
                    />
                </div>

                <div>
                    <DurationFilter
                        value={filters.duration}
                        onChange={(duration) => setFilters({ duration })}
                    />
                </div>
            </div>

            {isLoading && (
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            )}

            {isError && (
                <div className="p-6 bg-red-50 rounded">
                    <p className="text-red-700 mb-3">Ошибка при загрузке видео: {error?.message}</p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => refetch()}
                            className="px-3 py-2 bg-indigo-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Повторить
                        </button>

                        <button
                            onClick={resetFilters}
                            className="px-3 py-2 bg-white border rounded"
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                </div>
            )}

            {!isLoading && !isError && !filtered.length && (
                <div className="p-6 bg-yellow-50 rounded">
                    <p className="text-yellow-800 mb-3">Ничего не найдено</p>

                    <div>
                        <button
                            onClick={resetFilters}
                            className="px-3 py-2 bg-indigo-600 text-white rounded"
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                </div>
            )}

            {!isLoading && !isError && !!filtered.length && (
                <div
                    className="grid gap-6"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    }}
                >
                    {filtered.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const VideoListClient: FC<Props> = ({ initialData }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={initialData}>
                <Suspense>
                    <VideoListInner />
                </Suspense>
            </HydrationBoundary>
        </QueryClientProvider>
    );
};

export default VideoListClient;
