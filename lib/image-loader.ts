export default function fastlyLoader({
    src,
    width,
    quality,
}: {
    src: string;
    width: number;
    quality: number;
}) {
    const url = new URL(`https://picsum.photos${src}`);
    url.searchParams.set('auto', 'webp');
    url.searchParams.set('width', width.toString());
    url.searchParams.set('quality', (quality || 75).toString());

    return url.href;
}
