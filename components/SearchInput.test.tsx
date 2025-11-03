import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SearchInput } from './SearchInput';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

describe('SearchInput', () => {
    it('renders with initial value', () => {
        render(<SearchInput value="hello" onChange={vi.fn()} />);
        const input = screen.getByRole('textbox', { name: /search videos/i }) as HTMLInputElement;
        expect(input.value).toBe('hello');
    });

    it('calls onChange after debounce when typing', async () => {
        const onChange = vi.fn();
        render(<SearchInput value="" onChange={onChange} debounceMs={200} />);

        const input = screen.getByRole('textbox', { name: /search videos/i }) as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'test' } });
        expect(input.value).toBe('test');

        await act(async () => {
            vi.advanceTimersByTime(200);
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith('test');
    });

    it('updates local state when parent value changes', () => {
        const { rerender } = render(<SearchInput value="first" onChange={vi.fn()} />);
        const input = screen.getByRole('textbox', { name: /search videos/i }) as HTMLInputElement;
        expect(input.value).toBe('first');

        rerender(<SearchInput value="second" onChange={vi.fn()} />);
        expect(input.value).toBe('second');
    });
});

