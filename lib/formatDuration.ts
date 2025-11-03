export function formatDuration(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) {
        throw new TypeError('formatDuration: seconds must be a positive finite number');
    }
    const sec = Math.floor(seconds);
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

    if (hours > 0) {
        return `${hours}:${pad2(minutes)}:${pad2(secs)}`;
    }
    return `${minutes}:${pad2(secs)}`;
}
