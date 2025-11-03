'use client';

import { DurationRange } from '@/hooks/useFilters';
import { FC } from 'react';

type Props = {
    value: DurationRange;
    onChange: (value: DurationRange) => void;
};

export const DurationFilter: FC<Props> = ({ value, onChange }) => {
    return (
        <div role="radiogroup" aria-label="Duration filter" className="flex gap-2">
            <button
                type="button"
                onClick={() => onChange('all')}
                className={`px-3 py-1 rounded ${value === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
            >
                Все
            </button>
            <button
                type="button"
                onClick={() => onChange('short')}
                className={`px-3 py-1 rounded ${value === 'short' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
            >
                &lt;5 мин
            </button>
            <button
                type="button"
                onClick={() => onChange('medium')}
                className={`px-3 py-1 rounded ${value === 'medium' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
            >
                5–20 мин
            </button>
            <button
                type="button"
                onClick={() => onChange('long')}
                className={`px-3 py-1 rounded ${value === 'long' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
            >
                &gt;20 мин
            </button>
        </div>
    );
};
