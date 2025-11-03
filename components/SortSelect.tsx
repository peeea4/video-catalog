'use client';

import { FC } from 'react';
import { SortOption } from '@/hooks/useFilters';

type Props = {
    value: SortOption;
    onChange: (value: SortOption) => void;
};

const sortLabels: Record<SortOption, string> = {
    newest: 'Newest first',
    oldest: 'Oldest first',
    shortest: 'Shortest duration',
    longest: 'Longest duration',
    az: 'Title A–Z',
    za: 'Title Z–A',
};

export const SortSelect: FC<Props> = ({ value, onChange }) => {
    return (
        <label className="flex items-center gap-2">
            <span className="text-sm text-gray-700 whitespace-nowrap">Sort by:</span>
            <select
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={value}
                onChange={(e) => onChange(e.target.value as SortOption)}
            >
                {Object.entries(sortLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                        {label}
                    </option>
                ))}
            </select>
        </label>
    );
};
