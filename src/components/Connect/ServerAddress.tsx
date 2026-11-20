import React from 'react';
import CopyButton from './CopyButton';
import { MCP_SERVER_URL } from '@/data/connect';

const ServerAddress: React.FC = () => (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <p className="text-sm font-medium text-gray-600">ExpenseLM server address</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
            <code className="min-w-0 break-all font-mono text-base sm:text-lg font-semibold text-gray-900">{MCP_SERVER_URL}</code>
            <CopyButton value={MCP_SERVER_URL} label="Copy address" />
        </div>
    </div>
);

export default ServerAddress;
