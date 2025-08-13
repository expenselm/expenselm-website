import React from 'react';

export default function TestFormattingPage() {
    const testContent = `
        <h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">Test Formatting</h1>
        <p class="mb-4 leading-relaxed">This is a <strong>bold text</strong> test.</p>
        <p class="mb-4 leading-relaxed">This is an <em>italic text</em> test.</p>
        <p class="mb-4 leading-relaxed">This is an <u>underlined text</u> test.</p>
        <p class="mb-4 leading-relaxed">This is an <code class="text-gray-800 bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">inline code</code> test.</p>
        <p class="mb-4 leading-relaxed">This is a <strong><em>bold and italic</em></strong> text test.</p>
        <p class="mb-4 leading-relaxed">This is a <strong><u>bold and underlined</u></strong> text test.</p>
        <p class="mb-4 leading-relaxed">This is a <em><u>italic and underlined</u></em> text test.</p>
        <p class="mb-4 leading-relaxed">This is a <strong><em><u>bold, italic, and underlined</u></em></strong> text test.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3">Code Block Test</h2>
        <pre class="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto"><code class="text-sm font-mono text-gray-800">function test() {
    console.log("This is a code block");
    return "Hello World";
}</code></pre>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3">Mixed Formatting Test</h2>
        <p class="mb-4 leading-relaxed">
            Here&apos;s a paragraph with <strong>bold text</strong>, <em>italic text</em>, 
            <u>underlined text</u>, and <code class="text-gray-800 bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">inline code</code> all mixed together.
        </p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3">What You Should See</h2>
        <ul class="list-disc list-inside mb-4 space-y-1">
            <li class="mb-1"><strong>Bold text</strong> should appear in a darker, bolder font</li>
            <li class="mb-1"><em>Italic text</em> should appear slanted</li>
            <li class="mb-1"><u>Underlined text</u> should have a line underneath</li>
            <li class="mb-1"><code class="text-gray-800 bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">Inline code</code> should have a gray background and monospace font</li>
            <li class="mb-1">Code blocks should have a gray background, border, and monospace font</li>
        </ul>
    `;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Formatting Test Page</h1>
            <p className="mb-4">This page demonstrates how the formatting should work with the CSS classes we&apos;ve set up.</p>
            
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Test Content:</h2>
                <div className="border border-gray-300 p-4 rounded">
                    <div 
                        dangerouslySetInnerHTML={{ __html: testContent }}
                        className="text-gray-700 [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mb-4 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:mb-4 [&>ol]:space-y-1 [&>li]:mb-1 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-gray-50 [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:mb-4 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>hr]:border-gray-300 [&>hr]:my-8 [&>a]:text-blue-600 [&>a]:hover:text-blue-800 [&>a]:underline [&>strong]:text-gray-900 [&>em]:italic [&>u]:underline [&>code]:text-gray-800 [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>pre]:bg-gray-100 [&>pre]:border [&>pre]:border-gray-200 [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:mb-4 [&>pre]:overflow-x-auto [&>pre>code]:text-sm [&>pre>code]:font-mono [&>pre>code]:text-gray-800 [&>img]:max-w-full [&>img]:h-auto [&>img]:rounded-lg [&>img]:shadow-sm [&>img]:my-6"
                    />
                </div>
            </div>
            
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Raw HTML:</h2>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
                    {testContent}
                </pre>
            </div>
        </div>
    );
}
