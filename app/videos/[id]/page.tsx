import Link from 'next/link';

type Props = { params: Promise<{ id: string }> };

export default async function VideoDetailsPage({ params }: Props) {
    const { id } = await params;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Link href="/" className="text-indigo-600 hover:underline mb-4 inline-block">
                Back to list
            </Link>

            <div className="rounded-lg overflow-hidden shadow p-4 bg-white">
                <h1 className="text-xl font-semibold mb-2">Video ID: {id}</h1>
                <p className="text-gray-700">This is a placeholder details page.</p>
            </div>
        </div>
    );
}

