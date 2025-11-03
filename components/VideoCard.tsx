'use client';

import { formatDuration } from '@/lib/formatDuration';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export type VideoCardProps = {
    video: {
        id: string;
        title: string;
        author: string;
        durationSec: number;
        publishedAt: string;
        thumbnail: string;
    };
};

export const VideoCard: FC<VideoCardProps> = ({
    video: { id, author, durationSec, publishedAt, thumbnail, title },
}) => {
    const localePublishedAt = new Date(publishedAt).toLocaleDateString();

    return (
        <Link
            href={`/videos/${id}`}
            className="group block rounded-lg overflow-hidden shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={`Open details for ${title}`}
        >
            <div className="w-full bg-gray-100 aspect-video relative">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                />
                <div className="absolute right-2 bottom-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(durationSec)}
                </div>
            </div>

            <div className="p-3 bg-white">
                <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">
                    {title}
                </h3>
                <div className="mt-1 text-xs text-gray-600 flex items-center justify-between">
                    <span>{author}</span>
                    <time dateTime={publishedAt}>{localePublishedAt}</time>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;

