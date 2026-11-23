import React from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';

import ServerAddress from '@/components/Connect/ServerAddress';
import { ExamplePrompts, Troubleshooting, YourControl } from '@/components/Connect/ConnectSections';
import { WEB_APP_URL, connectGuides } from '@/data/connect';

export const metadata = {
    title: 'Connect ExpenseLM to your AI assistant',
    description: 'Add ExpenseLM to Claude, ChatGPT, Gemini, Grok, Muse, Hermes, OpenClaw, DeepSeek Harness or any MCP app, then ask about your spending.',
};

export default function ConnectIndexPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-12">
            <header>
                <h1 className="text-4xl font-bold text-gray-900">Connect ExpenseLM to your AI assistant</h1>
                <p className="mt-4 text-lg text-gray-600">
                    ExpenseLM keeps your receipts as clean, searchable expenses. Connect it to the assistant you already use, and ask about your spending in plain language.
                </p>
            </header>

            <section aria-labelledby="how-heading" className="space-y-4">
                <h2 id="how-heading" className="text-2xl font-bold text-gray-900">How it works</h2>
                <ol className="list-decimal space-y-2 pl-5 text-gray-700">
                    <li>
                        Create a free ExpenseLM account at{' '}
                        <a href={WEB_APP_URL} className="text-secondary underline" target="_blank" rel="noopener noreferrer">web.expenselm.ai</a>
                        , or in the iOS or Android app.
                    </li>
                    <li>In your assistant, add a custom connector (sometimes called a custom app or MCP server) with this address:</li>
                </ol>
                <ServerAddress />
                <ol start={3} className="list-decimal space-y-2 pl-5 text-gray-700">
                    <li>Sign in with your ExpenseLM account when the assistant asks. That&apos;s it.</li>
                </ol>
            </section>

            <section aria-labelledby="guides-heading">
                <h2 id="guides-heading" className="text-2xl font-bold text-gray-900">Step-by-step guides</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                    {connectGuides.map((guide) => (
                        <li key={guide.slug}>
                            <Link
                                href={`/connect/${guide.slug}`}
                                className="group flex h-full items-start justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <span>
                                    <span className="block text-lg font-semibold text-gray-900">{guide.name}</span>
                                    <span className="mt-1 block text-sm text-gray-600">{guide.summary}</span>
                                </span>
                                <HiArrowRight className="mt-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <ExamplePrompts />
            <Troubleshooting />
            <YourControl />
        </div>
    );
}
