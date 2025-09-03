import React from 'react';
import Link from 'next/link';
import { getHelpPages } from '@/lib/contentful';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center - ExpenseLM',
  description: 'Find answers to common questions and learn more about ExpenseLM',
};

export default async function HelpPage() {
  const helpPages = await getHelpPages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions and learn more about ExpenseLM
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {helpPages.map((page) => (
            <Link
              key={page.slug}
              href={`/help/${page.slug}`}
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 hover:border-primary/20 hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {page.title}
              </h2>
              {page.metaDescription && (
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {page.metaDescription}
                </p>
              )}
              <div className="text-primary text-sm font-medium flex items-center">
                Read more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {helpPages.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-gray-500 text-lg">
                No help pages available at the moment.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Check back soon for helpful articles and guides.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
