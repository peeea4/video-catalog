import { dehydrate, QueryClient } from '@tanstack/react-query';

import VideoListClient from './VideoListClient';
import { prefetchVideosOnServer } from '@/hooks/useVideos';

export default async function Page() {
    const qc = new QueryClient();

    try {
        await prefetchVideosOnServer(qc);
    } catch (e) {
        // ignore server prefetch errors — client will show error state
    }

    const dehydrated = dehydrate(qc);

    return (
        <main className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Каталог видео</h1>
            <VideoListClient initialData={dehydrated} />
        </main>
    );
}
