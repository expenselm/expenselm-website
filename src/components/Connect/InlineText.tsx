import React from 'react';

// Renders the small markup used in src/data/connect.ts: `code` and **bold**.
const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*)/g;

const InlineText: React.FC<{ text: string }> = ({ text }) => (
    <>
        {text.split(TOKEN).map((part, index) => {
            if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
                return (
                    <code key={index} className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-800">
                        {part.slice(1, -1)}
                    </code>
                );
            }
            if (part.startsWith('**') && part.endsWith('**') && part.length > 3) {
                return <strong key={index} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
            }
            return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
    </>
);

export default InlineText;
