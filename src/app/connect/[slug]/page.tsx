import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';

import CodeBlock from '@/components/Connect/CodeBlock';
import InlineText from '@/components/Connect/InlineText';
import { ExamplePrompts, Troubleshooting, YourControl } from '@/components/Connect/ConnectSections';
import { connectGuides, getConnectGuide } from '@/data/connect';

interface PageProps {
    params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
    return connectGuides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: PageProps) {
    const guide = getConnectGuide(params.slug);
    if (!guide) return { title: 'Page not found' };
    return {
        title: `Connect ExpenseLM to ${guide.name}`,
        description: `How to add ExpenseLM to ${guide.name} and ask about your expenses. ${guide.summary}`,
    };
}

function formatDate(isoDate: string): string {
    return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export default function ConnectGuidePage({ params }: PageProps) {
    const guide = getConnectGuide(params.slug);
    if (!guide) notFound();

    const others = connectGuides.filter((other) => other.slug !== guide.slug);

    return (
        <div className="mx-auto max-w-4xl space-y-12">
            <header>
                <h1 className="text-4xl font-bold text-gray-900">Connect ExpenseLM to {guide.name}</h1>
                <p className="mt-4 text-lg text-gray-600">{guide.summary}</p>
                <p className="mt-2 text-sm text-gray-500">Steps last checked on {formatDate(guide.lastChecked)}.</p>
            </header>

            <section aria-labelledby="need-heading">
                <h2 id="need-heading" className="text-2xl font-bold text-gray-900">What you need</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                    <li>
                        An ExpenseLM account (free at{' '}
                        <a href="https://web.expenselm.ai" className="text-secondary underline" target="_blank" rel="noopener noreferrer">web.expenselm.ai</a>).
                    </li>
                    {guide.requirements.map((requirement) => (
                        <li key={requirement}><InlineText text={requirement} /></li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="steps-heading">
                <h2 id="steps-heading" className="text-2xl font-bold text-gray-900">Steps</h2>
                <ol className="mt-4 space-y-5">
                    {guide.steps.map((step, index) => (
                        <li key={index} className="flex gap-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-black" aria-hidden="true">
                                {index + 1}
                            </span>
                            <div className="min-w-0 flex-1 pt-1 text-gray-800">
                                <InlineText text={step.text} />
                                {step.code && <CodeBlock code={step.code} />}
                            </div>
                        </li>
                    ))}
                </ol>
                {guide.notes && guide.notes.length > 0 && (
                    <ul className="mt-6 list-disc space-y-2 rounded-xl border border-gray-200 bg-white p-5 pl-9 text-gray-700">
                        {guide.notes.map((note) => (
                            <li key={note}><InlineText text={note} /></li>
                        ))}
                    </ul>
                )}
                {guide.help && (
                    <p className="mt-4">
                        <a href={guide.help.url} className="inline-flex items-center gap-1 text-secondary underline" target="_blank" rel="noopener noreferrer">
                            {guide.help.label}
                            <HiArrowTopRightOnSquare className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </p>
                )}
            </section>

            <ExamplePrompts />
            <Troubleshooting apiKey={guide.signIn === 'api-key'} />
            <YourControl />

            <nav aria-labelledby="others-heading">
                <h2 id="others-heading" className="text-xl font-bold text-gray-900">Other assistants</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                    {others.map((other) => (
                        <li key={other.slug}>
                            <Link href={`/connect/${other.slug}`} className="inline-block rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100">
                                {other.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
