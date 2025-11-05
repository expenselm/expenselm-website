import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/contentful';

export const metadata: Metadata = {
  title: 'Blog - ExpenseLM',
  description: 'Insights, product updates, and stories from the ExpenseLM team.',
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ExpenseLM Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore product updates, best practices, and practical guidance for mastering ExpenseLM.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 hover:border-primary/20 hover:-translate-y-1"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {post.title}
              </h2>
              {post.metaDescription && (
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {post.metaDescription}
                </p>
              )}
              {post.lastUpdated && (
                <p className="text-xs text-gray-400 mb-4">
                  Published {new Date(post.lastUpdated).toLocaleDateString()}
                </p>
              )}
              <div className="text-primary text-sm font-medium flex items-center">
                Read post
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-gray-500 text-lg">
                No blog posts available yet.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Check back soon for insights and product updates.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
