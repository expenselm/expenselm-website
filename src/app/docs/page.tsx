import React from 'react';
import Link from 'next/link';
import { getDocumentationPages } from '@/lib/contentful';
import { HiDocumentText, HiClock } from 'react-icons/hi2';

export const metadata = {
    title: 'Documentation - ExpenseLM',
    description: 'Complete documentation for ExpenseLM - Learn how to use our expense management platform',
};

export default async function DocumentationIndexPage() {
    const pages = await getDocumentationPages();

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <header className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Documentation
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Welcome to the ExpenseLM documentation. Find everything you need to get started and make the most of our platform.
                </p>
            </header>

            {/* Documentation Pages Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page) => (
                    <Link
                        key={page.slug}
                        href={`/docs/${page.slug}`}
                        className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start space-x-3">
                            <HiDocumentText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {page.title}
                                </h3>
                                {page.metaDescription && (
                                    <p className="text-gray-600 text-sm mb-3">
                                        {page.metaDescription}
                                    </p>
                                )}
                                {page.lastUpdated && (
                                    <div className="flex items-center text-xs text-gray-500">
                                        <HiClock className="h-4 w-4 mr-1" />
                                        Updated {new Date(page.lastUpdated).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {pages.length === 0 && (
                <div className="text-center py-12">
                    <HiDocumentText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No documentation available
                    </h3>
                    <p className="text-gray-600">
                        Documentation pages will appear here once they are added to Contentful.
                    </p>
                </div>
            )}
        </div>
    );
}
