import React from 'react';
import { CONNECTED_AGENTS_URL, WEB_APP_URL, apiKeyTroubleshooting, examplePrompts, troubleshooting } from '@/data/connect';

/** The parts shared by /connect and every guide: prompts to try, fixes, and control. */
export const ExamplePrompts: React.FC = () => (
    <section aria-labelledby="try-heading">
        <h2 id="try-heading" className="text-2xl font-bold text-gray-900">Things to ask</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {examplePrompts.map((prompt) => (
                <li key={prompt} className="rounded-lg border border-gray-200 bg-white p-4 text-gray-800">
                    &ldquo;{prompt}&rdquo;
                </li>
            ))}
        </ul>
        <p className="mt-4 text-gray-600">
            You can also hand it a receipt: &ldquo;Add this receipt to ExpenseLM.&rdquo; Amounts are converted into your home currency at the rate on the receipt&apos;s date.
        </p>
    </section>
);

export const Troubleshooting: React.FC<{ apiKey?: boolean }> = ({ apiKey = false }) => {
    // Sign-in problems don't apply to key-based guides; the key problems take their place.
    const items = apiKey ? [...apiKeyTroubleshooting, ...troubleshooting.slice(2)] : troubleshooting;
    return (
    <section aria-labelledby="fix-heading">
        <h2 id="fix-heading" className="text-2xl font-bold text-gray-900">If it doesn&apos;t work</h2>
        <dl className="mt-4 space-y-4">
            {items.map(({ problem, fix }) => (
                <div key={problem}>
                    <dt className="font-semibold text-gray-900">{problem}</dt>
                    <dd className="mt-1 text-gray-700">{fix}</dd>
                </div>
            ))}
        </dl>
        <p className="mt-4 text-gray-700">
            Still stuck? Email{' '}
            <a href="mailto:enquiry@expenselm.ai" className="text-secondary underline">enquiry@expenselm.ai</a>.
        </p>
    </section>
    );
};

export const YourControl: React.FC = () => (
    <section aria-labelledby="control-heading">
        <h2 id="control-heading" className="text-2xl font-bold text-gray-900">You stay in control</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
            <li>
                Every assistant you connect is listed in the web app under{' '}
                <a href={CONNECTED_AGENTS_URL} className="text-secondary underline" target="_blank" rel="noopener noreferrer">Settings → Connected agents</a>
                , where you can disconnect it at any time.
            </li>
            <li>Deleting expenses and changing many at once are marked as such, so your assistant asks you first.</li>
            <li>We never sell your data or use your receipts to train AI models.</li>
        </ul>
        <p className="mt-4 text-gray-700">
            No account yet? Sign up free at{' '}
            <a href={WEB_APP_URL} className="text-secondary underline" target="_blank" rel="noopener noreferrer">web.expenselm.ai</a>.
        </p>
    </section>
);
