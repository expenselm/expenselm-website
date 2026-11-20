import React from 'react';
import CopyButton from './CopyButton';

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    const multiline = code.includes('\n');
    return (
        <div className={`mt-3 flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 ${multiline ? 'items-start' : 'items-center'}`}>
            <pre className={`min-w-0 flex-1 font-mono text-sm text-gray-800 ${multiline ? 'overflow-x-auto' : 'whitespace-pre-wrap break-all'}`}>
                <code>{code}</code>
            </pre>
            <CopyButton value={code} />
        </div>
    );
};

export default CodeBlock;
