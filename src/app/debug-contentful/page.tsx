import React from 'react';
import { getDocumentationPage } from '@/lib/contentful';

export default async function DebugContentfulPage() {
    const page = await getDocumentationPage('mcp-server-guide');

    if (!page) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Debug Contentful</h1>
                <p className="text-red-600">Page not found: mcp-server-guide</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Debug Contentful - {page.title}</h1>
            
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Page Info:</h2>
                <p><strong>Title:</strong> {page.title}</p>
                <p><strong>Slug:</strong> {page.slug}</p>
                <p><strong>Last Updated:</strong> {page.lastUpdated}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Raw Content:</h2>
                <p className="mb-2"><strong>Content Type:</strong> {typeof page.content}</p>
                <p className="mb-2"><strong>Is String:</strong> {typeof page.content === 'string' ? 'Yes' : 'No'}</p>
                <p className="mb-2"><strong>Length:</strong> {typeof page.content === 'string' ? page.content.length : 'N/A'}</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
                    {typeof page.content === 'string' ? page.content : JSON.stringify(page.content, null, 2)}
                </pre>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Rendered Content:</h2>
                <div className="border border-gray-300 p-4 rounded">
                    <div 
                        dangerouslySetInnerHTML={{ __html: page.content }}
                        className="text-gray-700 [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mb-4 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:mb-4 [&>ol]:space-y-1 [&>li]:mb-1 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-gray-50 [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:mb-4 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>hr]:border-gray-300 [&>hr]:my-8 [&>a]:text-blue-600 [&>a]:hover:text-blue-800 [&>a]:underline [&>strong]:text-gray-900 [&>em]:italic [&>u]:underline [&>code]:text-gray-800 [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>pre]:bg-gray-100 [&>pre]:border [&>pre]:border-gray-200 [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:mb-4 [&>pre]:overflow-x-auto [&>pre>code]:text-sm [&>pre>code]:font-mono [&>pre>code]:text-gray-800 [&>img]:max-w-full [&>img]:h-auto [&>img]:rounded-lg [&>img]:shadow-sm [&>img]:my-6 [&>table]:min-w-full [&>table]:border [&>table]:border-gray-300 [&>table]:rounded-lg [&>table]:overflow-hidden [&>table]:my-6 [&>table>thead]:bg-gray-50 [&>table>tbody>tr]:border-b [&>table>tbody>tr]:border-gray-300 [&>table>tbody>tr:last-child]:border-b-0 [&>table>th]:px-4 [&>table>th]:py-3 [&>table>th]:text-left [&>table>th]:text-sm [&>table>th]:font-semibold [&>table>th]:text-gray-900 [&>table>th]:border-r [&>table>th]:border-gray-300 [&>table>th:last-child]:border-r-0 [&>table>td]:px-4 [&>table>td]:py-3 [&>table>td]:text-sm [&>table>td]:text-gray-700 [&>table>td]:border-r [&>table>td]:border-gray-300 [&>table>td:last-child]:border-r-0"
                    />
                </div>
            </div>
        </div>
    );
}
