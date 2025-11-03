import { useDebounce } from './useDebounce';
import { renderHook, act } from '@testing-library/react';
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('debounces value updates', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
        initialProps: { value: 'a' },
    });

    expect(result.current).toBe('a');

    rerender({ value: 'b' });

    expect(result.current).toBe('a');

    act(() => {
        vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('b');
});

