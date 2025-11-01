import { describe, it, expect } from 'vitest';
import { formatDuration } from './formatDuration';

describe('formatDuration', () => {
    it('formats seconds < 1 hour as M:SS', () => {
        expect(formatDuration(125)).toBe('2:05');
        expect(formatDuration(59)).toBe('0:59');
        expect(formatDuration(300)).toBe('5:00');
    });

    it('formats >= 1 hour as H:MM:SS', () => {
        expect(formatDuration(3600)).toBe('1:00:00');
        expect(formatDuration(3661)).toBe('1:01:01');
        expect(formatDuration(7325)).toBe('2:02:05');
    });

    it('throws on negative or invalid inputs', () => {
        expect(() => formatDuration(-5)).toThrow();
        expect(() => formatDuration(NaN)).toThrow();
    });

    it('formats 0', () => {
        expect(formatDuration(0)).toBe('0:00');
    });
});

