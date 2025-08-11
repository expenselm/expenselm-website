import React from 'react';
import { notFound } from 'next/navigation';
import { getDocumentationPage } from '@/lib/contentful';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps) {
    const page = await getDocumentationPage(params.slug);
    
    if (!page) {
        return {
            title: 'Page Not Found',
        };
    }

    return {
        title: `${page.title} - ExpenseLM Documentation`,
        description: page.metaDescription || `Learn about ${page.title} in ExpenseLM documentation`,
    };
}

export default async function DocumentationPage({ params }: PageProps) {
    const page = await getDocumentationPage(params.slug);

    if (!page) {
        notFound();
    }

    return (
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Page Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {page.title}
                </h1>
                {page.metaDescription && (
                    <p className="text-lg text-gray-600 mb-4">
                        {page.metaDescription}
                    </p>
                )}
                {page.lastUpdated && (
                    <p className="text-sm text-gray-500">
                        Last updated: {new Date(page.lastUpdated).toLocaleDateString()}
                    </p>
                )}
            </header>

            {/* Page Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-primary prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                <div 
                    dangerouslySetInnerHTML={{ __html: page.content }}
                    className="text-gray-700"
                />
            </div>
        </article>
    );
}
