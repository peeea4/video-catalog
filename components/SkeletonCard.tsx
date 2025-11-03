export const SkeletonCard = () => {
    return (
        <div className="rounded-lg overflow-hidden shadow-sm animate-pulse">
            <div className="w-full bg-gray-200 aspect-video" />
            <div className="p-3 bg-white">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
        </div>
    );
};

