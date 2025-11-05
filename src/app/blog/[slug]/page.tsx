import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/contentful';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found - ExpenseLM',
    };
  }

  return {
    title: `${post.title} - ExpenseLM Blog`,
    description: post.metaDescription || `Read ${post.title} on the ExpenseLM blog.`,
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium">{post.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          {post.metaDescription && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {post.metaDescription}
            </p>
          )}
          {post.lastUpdated && (
            <p className="text-sm text-gray-500 mt-3">
              Published {new Date(post.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </header>

        {/* Page Content */}
        <article className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-gray-800 prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary-accent transition-colors font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
