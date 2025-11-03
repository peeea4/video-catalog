import { DurationFilter } from '@/components/DurationFilter';
import { SearchInput } from '@/components/SearchInput';
import { SkeletonCard } from '@/components/SkeletonCard';
import VideoCard, { VideoCardProps } from '@/components/VideoCard';

const mockData: VideoCardProps = {
    video: {
        author: '',
        durationSec: 100,
        id: '12',
        publishedAt: '',
        thumbnail: '',
        title: 'titke',
    },
};

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <DurationFilter value="all" />
            <SearchInput />
            <SkeletonCard />
            <VideoCard {...mockData} />
        </div>
    );
}
