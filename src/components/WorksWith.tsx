import Link from 'next/link';
import React from 'react';

import { connectGuides } from '@/data/connect';

const WorksWith: React.FC = () => (
    <section id="works-with" className="pt-16 pb-4 px-5">
        <p className="text-center text-lg font-medium text-foreground">Works with the assistant you already use</p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {connectGuides.map((guide) => (
                <li key={guide.slug}>
                    <Link
                        href={`/connect/${guide.slug}`}
                        className="inline-block rounded-full border border-gray-300 bg-white px-5 py-2 text-foreground hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                        {guide.name}
                    </Link>
                </li>
            ))}
        </ul>
    </section>
);

export default WorksWith;
