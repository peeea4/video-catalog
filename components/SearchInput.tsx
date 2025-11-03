'use client';

import { FC, useEffect, useState } from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    debounceMs?: number;
};

export const SearchInput: FC<Props> = ({
    value,
    onChange,
    placeholder = 'Поиск по названию...',
    debounceMs = 300,
}) => {
    const [local, setLocal] = useState(value ?? '');

    useEffect(() => {
        setLocal(value ?? '');
    }, [value]);

    useEffect(() => {
        const id = setTimeout(() => {
            if (local !== value) onChange(local);
        }, debounceMs);

        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [local, debounceMs]);

    return (
        <label className="flex items-center gap-2 w-full">
            <span className="sr-only">Search videos</span>
            <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={placeholder}
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                aria-label="Search videos"
            />
        </label>
    );
};
