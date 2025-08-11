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
            <div className="max-w-none">
                <div 
                    dangerouslySetInnerHTML={{ __html: page.content }}
                    className="text-gray-700 [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mb-4 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:mb-4 [&>ol]:space-y-1 [&>li]:mb-1 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-gray-50 [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:mb-4 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>hr]:border-gray-300 [&>hr]:my-8 [&>a]:text-primary [&>a]:hover:text-primary-dark [&>a]:underline [&>strong]:text-gray-900 [&>code]:text-primary [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>img]:max-w-full [&>img]:h-auto [&>img]:rounded-lg [&>img]:shadow-sm [&>img]:my-6"
                />
            </div>
        </article>
    );
}
