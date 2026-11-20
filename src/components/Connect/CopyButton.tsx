'use client';

import React, { useState } from 'react';
import { HiCheck, HiOutlineClipboard } from 'react-icons/hi2';

interface Props {
    value: string;
    label?: string;
    className?: string;
}

const CopyButton: React.FC<Props> = ({ value, label = 'Copy', className = '' }) => {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard can be blocked (e.g. an insecure origin); the text stays selectable.
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 ${className}`}
            aria-label={copied ? 'Copied' : `${label}: ${value}`}
        >
            {copied ? <HiCheck className="h-4 w-4 text-green-600" aria-hidden="true" /> : <HiOutlineClipboard className="h-4 w-4" aria-hidden="true" />}
            {copied ? 'Copied' : label}
        </button>
    );
};

export default CopyButton;
