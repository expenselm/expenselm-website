import React from 'react';
import Link from 'next/link';
import { getHelpPage, getHelpPages } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface HelpPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const helpPages = await getHelpPages();
  
  return helpPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: HelpPageProps): Promise<Metadata> {
  const helpPage = await getHelpPage(params.slug);
  
  if (!helpPage) {
    return {
      title: 'Page Not Found - ExpenseLM',
    };
  }

  return {
    title: `${helpPage.title} - ExpenseLM Help`,
    description: helpPage.metaDescription || `Learn more about ${helpPage.title}`,
  };
}

export default async function HelpPageSlug({ params }: HelpPageProps) {
  const helpPage = await getHelpPage(params.slug);

  if (!helpPage) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/help" className="hover:text-primary transition-colors">
                Help
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium">{helpPage.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {helpPage.title}
          </h1>
          {helpPage.metaDescription && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {helpPage.metaDescription}
            </p>
          )}
          {helpPage.lastUpdated && (
            <p className="text-sm text-gray-500 mt-3">
              Last updated: {new Date(helpPage.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Page Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-gray-800 prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200"
            dangerouslySetInnerHTML={{ __html: helpPage.content }}
          />
        </div>

        {/* Back to Help */}
        <div className="mt-8 text-center">
          <Link
            href="/help"
            className="inline-flex items-center text-primary hover:text-primary-accent transition-colors font-medium"
          >
            ← Back to Help Center
          </Link>
        </div>
      </div>
    </div>
  );
}
