import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { IDocumentationPage } from '@/types';

// Validate environment variables
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
    throw new Error(
        'Missing Contentful environment variables. Please check CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in your .env.local file.'
    );
}

// Contentful configuration
const client = createClient({
    space: spaceId,
    accessToken: accessToken,
});

// Type definitions for Contentful Rich Text nodes
interface RichTextMark {
    type: string;
}

interface RichTextNode {
    nodeType: string;
    data: Record<string, unknown>;
    content?: RichTextNode[];
    value?: string;
    marks?: RichTextMark[];
}

interface EmbeddedAssetNode extends RichTextNode {
    data: {
        target?: {
            fields?: {
                title?: string;
                description?: string;
                file?: {
                    url: string;
                    details?: {
                        image?: {
                            width?: number;
                            height?: number;
                        };
                    };
                };
                url?: string;
                width?: number;
                height?: number;
            };
        };
    };
}



// Helper function to render text with marks (bold, italic, links, etc.)
function renderTextWithMarks(textNode: RichTextNode): string {
    if (!textNode.value) return '';
    
    let text = textNode.value;
    const marks = textNode.marks || [];
    
    // Debug: Log marks for this text node
    // if (marks.length > 0) {
    //     console.log('Text node marks:', marks, 'for text:', text);
    // }
    
    // Apply marks in order - we need to apply them from innermost to outermost
    // So we reverse the order to apply them correctly
    const reversedMarks = [...marks].reverse();
    
    reversedMarks.forEach(mark => {
        const markType = typeof mark === 'string' ? mark : mark.type;
        switch (markType) {
            case 'bold':
                text = `<strong>${text}</strong>`;
                break;
            case 'italic':
                text = `<em>${text}</em>`;
                break;
            case 'underline':
                text = `<u>${text}</u>`;
                break;
            case 'code':
                text = `<code class="text-gray-800 bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">${text}</code>`;
                break;
            default:
                // Handle any other marks that might exist
                break;
        }
    });
    
    return text;
}

// Helper function to render hyperlinks
function renderHyperlink(node: RichTextNode): string {
    const uri = (node.data as { uri: string }).uri;
    let linkText = '';
    
    if (node.content) {
        node.content.forEach((textNode: RichTextNode) => {
            if (textNode.nodeType === 'text' && textNode.value) {
                linkText += renderTextWithMarks(textNode);
            }
        });
    }
    
    return `<a href="${uri}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${linkText}</a>`;
}

// Helper function to process list item content recursively
function processListItemContent(listItem: RichTextNode): string {
    let itemContent = '';
    
    if (listItem.content) {
        listItem.content.forEach((textNode: RichTextNode) => {
            // Handle nested paragraphs in list items
            if (textNode.nodeType === 'paragraph' && textNode.content) {
                let paragraphText = '';
                textNode.content.forEach((paragraphTextNode: RichTextNode) => {
                    if (paragraphTextNode.nodeType === 'text' && paragraphTextNode.value) {
                        paragraphText += renderTextWithMarks(paragraphTextNode);
                    } else if (paragraphTextNode.nodeType === 'hyperlink') {
                        paragraphText += renderHyperlink(paragraphTextNode);
                    }
                });
                if (paragraphText.trim()) {
                    itemContent += paragraphText.trim();
                }
            } 
            // Handle nested lists
            else if (textNode.nodeType === 'unordered-list' || textNode.nodeType === 'ul' || textNode.nodeType === BLOCKS.UL_LIST) {
                itemContent += processUnorderedList(textNode);
            }
            else if (textNode.nodeType === 'ordered-list' || textNode.nodeType === 'ol' || textNode.nodeType === BLOCKS.OL_LIST) {
                itemContent += processOrderedList(textNode);
            }
            // Handle other content
            else if (textNode.nodeType === 'text' && textNode.value) {
                itemContent += renderTextWithMarks(textNode);
            } else if (textNode.nodeType === 'hyperlink') {
                itemContent += renderHyperlink(textNode);
            }
        });
    }
    
    return itemContent;
}

// Helper function to process unordered lists recursively
function processUnorderedList(listNode: RichTextNode): string {
    let listItems = '';
    
    if (listNode.content) {
        listNode.content.forEach((listItem: RichTextNode) => {
            if ((listItem.nodeType === 'list-item' || listItem.nodeType === 'li' || listItem.nodeType === BLOCKS.LIST_ITEM || listItem.nodeType === 'item') && listItem.content) {
                const itemContent = processListItemContent(listItem);
                if (itemContent.trim()) {
                    listItems += `<li class="mb-1">${itemContent.trim()}</li>`;
                }
            }
        });
    }
    
    if (listItems) {
        return `<ul class="list-disc list-inside mb-4 space-y-1 ml-4">${listItems}</ul>`;
    }
    
    return '';
}

// Helper function to process ordered lists recursively
function processOrderedList(listNode: RichTextNode): string {
    let listItems = '';
    
    if (listNode.content) {
        listNode.content.forEach((listItem: RichTextNode) => {
            if ((listItem.nodeType === 'list-item' || listItem.nodeType === 'li' || listItem.nodeType === BLOCKS.LIST_ITEM || listItem.nodeType === 'item') && listItem.content) {
                const itemContent = processListItemContent(listItem);
                if (itemContent.trim()) {
                    listItems += `<li class="mb-1">${itemContent.trim()}</li>`;
                }
            }
        });
    }
    
    if (listItems) {
        return `<ol class="list-decimal list-inside mb-4 space-y-1 ml-4">${listItems}</ol>`;
    }
    
    return '';
}

// Custom renderer options for handling images and links
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderOptions: any = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: EmbeddedAssetNode) => {
            try {
                const fields = node.data?.target?.fields;
                if (!fields) {
                    return '';
                }
                
                // Handle different Contentful asset structures
                let imageUrl = '';
                let width = 'auto';
                let height = 'auto';
                let description = '';
                
                if (fields.file && fields.file.url) {
                    // New structure: url is under file.url
                    imageUrl = fields.file.url;
                    width = fields.file.details?.image?.width?.toString() || 'auto';
                    height = fields.file.details?.image?.height?.toString() || 'auto';
                    description = fields.description || fields.title || '';
                } else if (fields.url) {
                    // Old structure: url is directly under fields
                    imageUrl = fields.url;
                    width = fields.width?.toString() || 'auto';
                    height = fields.height?.toString() || 'auto';
                    description = fields.description || '';
                } else {
                    return '';
                }
                
                // Ensure proper HTTPS URL
                const finalImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
                
                return `<img src="${finalImageUrl}" alt="${description}" width="${width}" height="${height}" class="max-w-full h-auto rounded-lg shadow-sm my-6" loading="lazy" />`;
            } catch {
                return '';
            }
        },
        [INLINES.HYPERLINK]: (node: RichTextNode, children: string) => {
            const uri = (node.data as { uri: string }).uri;
            return `<a href="${uri}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${children}</a>`;
        },
        [BLOCKS.PARAGRAPH]: (_node: RichTextNode, children: string) => {
            return `<p class="mb-4 leading-relaxed">${children}</p>`;
        },
        [BLOCKS.HEADING_2]: (_node: RichTextNode, children: string) => {
            return `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${children}</h2>`;
        },
        [BLOCKS.HEADING_3]: (_node: RichTextNode, children: string) => {
            return `<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">${children}</h3>`;
        },
        [BLOCKS.UL_LIST]: (_node: RichTextNode, children: string) => {
            return `<ul class="list-disc list-inside mb-4 space-y-1">${children}</ul>`;
        },
        [BLOCKS.OL_LIST]: (_node: RichTextNode, children: string) => {
            return `<ol class="list-decimal list-inside mb-4 space-y-1">${children}</ol>`;
        },
        [BLOCKS.QUOTE]: (_node: RichTextNode, children: string) => {
            return `<blockquote class="border-l-4 border-primary bg-gray-50 pl-6 py-4 mb-4 italic text-gray-700">${children}</blockquote>`;
        },
        [BLOCKS.HR]: () => {
            return `<hr class="border-gray-300 my-8" />`;
        },

    },
};

// Helper function to convert Rich Text to HTML with image support
function convertRichTextToHtml(richText: unknown): string {
    if (!richText) return '';
    
    try {
        // Check if it's already a string (plain text)
        if (typeof richText === 'string') {
            return richText;
        }
        
        // Check if it's a Rich Text document
        if (richText && typeof richText === 'object' && 'content' in richText) {
            // Try to extract text content manually first
            const richTextObj = richText as { content: RichTextNode[] };
            if (richTextObj.content && Array.isArray(richTextObj.content)) {
                let htmlContent = '';
                
                // Debug: Log all node types to understand the structure
                // console.log('Processing rich text with node types:', richTextObj.content.map(n => n.nodeType));
                // console.log('Processing rich text content:', JSON.stringify(richTextObj.content, null, 2));
                
                richTextObj.content.forEach((node: RichTextNode) => {
                    // Debug: Log all node types to understand the structure
                    console.log('Processing node type:', node.nodeType, node);
                    
                    // Handle paragraphs
                    if (node.nodeType === 'paragraph' && node.content) {
                        // Check if this paragraph contains only code content
                        const hasOnlyCodeContent = node.content.every((textNode: RichTextNode) => 
                            textNode.nodeType === 'text' && 
                            textNode.marks && 
                            textNode.marks.some((mark: RichTextMark) => mark.type === 'code')
                        );
                        
                        // Check if the content contains newlines (indicating a code block)
                        const hasNewlines = node.content.some((textNode: RichTextNode) => 
                            textNode.nodeType === 'text' && 
                            textNode.value && 
                            textNode.value.includes('\n')
                        );
                        
                        if (hasOnlyCodeContent && hasNewlines) {
                            // This is a code block - render it as such
                            console.log('Found code block in paragraph:', node);
                            let codeText = '';
                            node.content.forEach((textNode: RichTextNode) => {
                                if (textNode.nodeType === 'text' && textNode.value) {
                                    codeText += textNode.value;
                                }
                            });
                            console.log('Code block content:', codeText);
                            if (codeText.trim()) {
                                // Preserve newlines and formatting in code blocks
                                // Escape HTML entities to prevent XSS and preserve formatting
                                const escapedCode = codeText
                                    .replace(/&/g, '&amp;')
                                    .replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/"/g, '&quot;')
                                    .replace(/'/g, '&#39;');
                                htmlContent += `<pre class="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto"><code class="text-sm font-mono text-gray-800 whitespace-pre">${escapedCode}</code></pre>`;
                            }
                        } else {
                            // Regular paragraph
                            let paragraphText = '';
                            node.content.forEach((textNode: RichTextNode) => {
                                if (textNode.nodeType === 'text' && textNode.value) {
                                    paragraphText += renderTextWithMarks(textNode);
                                } else if (textNode.nodeType === 'hyperlink') {
                                    paragraphText += renderHyperlink(textNode);
                                }
                            });
                            if (paragraphText.trim()) {
                                htmlContent += `<p class="mb-4 leading-relaxed">${paragraphText.trim()}</p>`;
                            }
                        }
                    }
                    // Handle headings
                    else if (node.nodeType === 'heading-1' && node.content) {
                        let headingText = '';
                        node.content.forEach((textNode: RichTextNode) => {
                            if (textNode.nodeType === 'text' && textNode.value) {
                                headingText += renderTextWithMarks(textNode);
                            } else if (textNode.nodeType === 'hyperlink') {
                                headingText += renderHyperlink(textNode);
                            }
                        });
                        if (headingText.trim()) {
                            htmlContent += `<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">${headingText.trim()}</h1>`;
                        }
                    }
                    else if (node.nodeType === 'heading-2' && node.content) {
                        let headingText = '';
                        node.content.forEach((textNode: RichTextNode) => {
                            if (textNode.nodeType === 'text' && textNode.value) {
                                headingText += renderTextWithMarks(textNode);
                            } else if (textNode.nodeType === 'hyperlink') {
                                headingText += renderHyperlink(textNode);
                            }
                        });
                        if (headingText.trim()) {
                            htmlContent += `<h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3">${headingText.trim()}</h2>`;
                        }
                    }
                    else if (node.nodeType === 'heading-3' && node.content) {
                        let headingText = '';
                        node.content.forEach((textNode: RichTextNode) => {
                            if (textNode.nodeType === 'text' && textNode.value) {
                                headingText += renderTextWithMarks(textNode);
                            } else if (textNode.nodeType === 'hyperlink') {
                                headingText += renderHyperlink(textNode);
                            }
                        });
                        if (headingText.trim()) {
                            htmlContent += `<h3 class="text-xl font-semibold text-gray-900 mt-4 mb-2">${headingText.trim()}</h3>`;
                        }
                    }
                    // Handle unordered lists
                    else if ((node.nodeType === 'unordered-list' || node.nodeType === 'ul' || node.nodeType === BLOCKS.UL_LIST || node.nodeType === 'list') && node.content) {
                        const listHtml = processUnorderedList(node);
                        if (listHtml) {
                            // Remove the ml-4 class from the top-level list
                            htmlContent += listHtml.replace('ml-4', '');
                        }
                    }
                    // Handle ordered lists
                    else if ((node.nodeType === 'ordered-list' || node.nodeType === 'ol' || node.nodeType === BLOCKS.OL_LIST || node.nodeType === 'numbered-list') && node.content) {
                        const listHtml = processOrderedList(node);
                        if (listHtml) {
                            // Remove the ml-4 class from the top-level list
                            htmlContent += listHtml.replace('ml-4', '');
                        }
                    }
                    // Generic list detection - check if content looks like a list
                    else if (node.content && Array.isArray(node.content) && node.content.length > 0 && 
                             node.content.every(item => item.nodeType === 'list-item' || item.nodeType === 'li' || item.nodeType === 'item' || 
                                                   (item.content && Array.isArray(item.content) && item.content.some(c => c.nodeType === 'paragraph')))) {
                        // This looks like a list structure - treat as unordered list
                        const listHtml = processUnorderedList(node);
                        if (listHtml) {
                            // Remove the ml-4 class from the top-level list
                            htmlContent += listHtml.replace('ml-4', '');
                        }
                    }
                    // Handle quotes
                    else if ((node.nodeType === 'quote' || node.nodeType === 'blockquote' || node.nodeType === BLOCKS.QUOTE) && node.content) {
                        let quoteText = '';
                        node.content.forEach((textNode: RichTextNode) => {
                            if (textNode.nodeType === 'paragraph' && textNode.content) {
                                textNode.content.forEach((paragraphTextNode: RichTextNode) => {
                                    if (paragraphTextNode.nodeType === 'text' && paragraphTextNode.value) {
                                        quoteText += renderTextWithMarks(paragraphTextNode);
                                    } else if (paragraphTextNode.nodeType === 'hyperlink') {
                                        quoteText += renderHyperlink(paragraphTextNode);
                                    }
                                });
                            } else if (textNode.nodeType === 'text' && textNode.value) {
                                quoteText += renderTextWithMarks(textNode);
                            } else if (textNode.nodeType === 'hyperlink') {
                                quoteText += renderHyperlink(textNode);
                            }
                        });
                        if (quoteText.trim()) {
                            htmlContent += `<blockquote class="border-l-4 border-primary bg-gray-50 pl-6 py-4 mb-4 italic text-gray-700">${quoteText.trim()}</blockquote>`;
                        }
                    }
                    // Handle horizontal rules
                    else if (node.nodeType === 'hr' || node.nodeType === BLOCKS.HR) {
                        htmlContent += `<hr class="border-gray-300 my-8" />`;
                    }
                    // Handle tables
                    else if (node.nodeType === 'table' || node.nodeType === BLOCKS.TABLE) {
                        let tableContent = '';
                        if (node.content) {
                            tableContent += '<div class="overflow-x-auto my-6"><table class="min-w-full border border-gray-300 rounded-lg">';
                            node.content.forEach((tableRow: RichTextNode) => {
                                if (tableRow.nodeType === 'table-row' || tableRow.nodeType === BLOCKS.TABLE_ROW) {
                                    tableContent += '<tr class="border-b border-gray-300">';
                                    if (tableRow.content) {
                                        tableRow.content.forEach((cell: RichTextNode) => {
                                            if (cell.nodeType === 'table-header-cell' || cell.nodeType === BLOCKS.TABLE_HEADER_CELL) {
                                                let cellContent = '';
                                                if (cell.content) {
                                                    cell.content.forEach((textNode: RichTextNode) => {
                                                        if (textNode.nodeType === 'text' && textNode.value) {
                                                            cellContent += renderTextWithMarks(textNode);
                                                        } else if (textNode.nodeType === 'hyperlink') {
                                                            cellContent += renderHyperlink(textNode);
                                                        }
                                                    });
                                                }
                                                tableContent += `<th class="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">${cellContent}</th>`;
                                            } else if (cell.nodeType === 'table-cell' || cell.nodeType === BLOCKS.TABLE_CELL) {
                                                let cellContent = '';
                                                if (cell.content) {
                                                    cell.content.forEach((textNode: RichTextNode) => {
                                                        if (textNode.nodeType === 'text' && textNode.value) {
                                                            cellContent += renderTextWithMarks(textNode);
                                                        } else if (textNode.nodeType === 'hyperlink') {
                                                            cellContent += renderHyperlink(textNode);
                                                        }
                                                    });
                                                }
                                                tableContent += `<td class="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">${cellContent}</td>`;
                                            }
                                        });
                                    }
                                    tableContent += '</tr>';
                                }
                            });
                            tableContent += '</table></div>';
                        }
                        htmlContent += tableContent;
                    }
                    // Handle code blocks
                    else if (node.nodeType === 'code' || node.nodeType === 'code-block') {
                        console.log('Found code block node:', node.nodeType, node);
                        let codeText = '';
                        if (node.content) {
                            node.content.forEach((textNode: RichTextNode) => {
                                if (textNode.nodeType === 'text' && textNode.value) {
                                    codeText += textNode.value;
                                }
                            });
                        }
                        console.log('Code block content:', codeText);
                        if (codeText.trim()) {
                            // Preserve newlines and formatting in code blocks
                            // Escape HTML entities to prevent XSS and preserve formatting
                            const escapedCode = codeText
                                .replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/"/g, '&quot;')
                                .replace(/'/g, '&#39;');
                            htmlContent += `<pre class="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto"><code class="text-sm font-mono text-gray-800 whitespace-pre">${escapedCode}</code></pre>`;
                        }
                    }
                    // Handle images
                    else if (node.nodeType === 'embedded-asset-block') {
                        const embeddedNode = node as EmbeddedAssetNode;
                        const fields = embeddedNode.data?.target?.fields;
                        if (fields) {
                            let imageUrl = '';
                            let width = 'auto';
                            let height = 'auto';
                            let description = '';
                            
                            if (fields.file && fields.file.url) {
                                imageUrl = fields.file.url;
                                width = fields.file.details?.image?.width?.toString() || 'auto';
                                height = fields.file.details?.image?.height?.toString() || 'auto';
                                description = fields.description || fields.title || '';
                            } else if (fields.url) {
                                imageUrl = fields.url;
                                width = fields.width?.toString() || 'auto';
                                height = fields.height?.toString() || 'auto';
                                description = fields.description || '';
                            }
                            
                            if (imageUrl) {
                                const finalImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
                                htmlContent += `<img src="${finalImageUrl}" alt="${description}" width="${width}" height="${height}" class="max-w-full h-auto rounded-lg shadow-sm my-6" loading="lazy" />`;
                            }
                        }
                    }
                });
                
                if (htmlContent.trim()) {
                    return htmlContent.trim();
                }
                
                // Debug: Log the structure if no content was processed
                // console.log('No content processed, raw rich text structure:', JSON.stringify(richText, null, 2));
            }
            
            // Fallback to Rich Text renderer with our custom options
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const renderedHtml = documentToHtmlString(richText as any, renderOptions);
                // console.log('Rich Text renderer output:', renderedHtml.substring(0, 200));
                return renderedHtml;
            } catch (renderError) {
                console.error('Rich Text renderer failed:', renderError);
                // Try to extract plain text as fallback
                if (richText && typeof richText === 'object' && 'content' in richText) {
                    const richTextObj = richText as { content: RichTextNode[] };
                    let plainText = '';
                    richTextObj.content.forEach((node: RichTextNode) => {
                        if (node.content) {
                            node.content.forEach((textNode: RichTextNode) => {
                                if (textNode.nodeType === 'text' && textNode.value) {
                                    plainText += textNode.value;
                                }
                            });
                        }
                    });
                    return plainText || String(richText || '');
                }
                return String(richText || '');
            }
        }
        
        // If it's not a recognized format, return as string
        return String(richText);
    } catch (error) {
        console.error('Error converting Rich Text to HTML:', error);
        return String(richText || '');
    }
}

// Helper function to process HTML content and ensure code blocks preserve newlines
function processHtmlContent(htmlContent: string): string {
    // If the content is already HTML, we need to ensure code blocks preserve newlines
    return htmlContent.replace(
        /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/g,
        (match, codeContent) => {
            // Decode HTML entities and preserve newlines
            const decodedContent = codeContent
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'");
            
            // Re-encode for safety and add whitespace-pre class
            const escapedCode = decodedContent
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            
            return `<pre class="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto"><code class="text-sm font-mono text-gray-800 whitespace-pre">${escapedCode}</code></pre>`;
        }
    );
}

// Type for Contentful fields
interface ContentfulFields {
    title?: string;
    slug?: string;
    content?: unknown;
    metaDescription?: string;
}

// Fetch all documentation pages
export async function getDocumentationPages(): Promise<IDocumentationPage[]> {
    try {
        const response = await client.getEntries({
            content_type: 'documentationPage',
            include: 10, // Include up to 10 levels of linked entries and assets
        });

        return response.items.map((item) => {
            const fields = item.fields as ContentfulFields;
            return {
                title: fields.title || '',
                slug: fields.slug || '',
                content: convertRichTextToHtml(fields.content),
                metaDescription: fields.metaDescription,
                lastUpdated: item.sys.updatedAt,
            };
        });
    } catch (error) {
        console.error('Error fetching documentation pages:', error);
        return [];
    }
}

// Fetch a single documentation page by slug
export async function getDocumentationPage(slug: string): Promise<IDocumentationPage | null> {
    try {
        const response = await client.getEntries({
            content_type: 'documentationPage',
            'fields.slug': slug,
            include: 10, // Include up to 10 levels of linked entries and assets
        });

        if (response.items.length === 0) {
            return null;
        }

        const item = response.items[0];
        const fields = item.fields as ContentfulFields;
        
        // Debug: Log the raw content to see what we're getting
        console.log('Raw content from Contentful:', typeof fields.content);
        if (typeof fields.content === 'object' && fields.content) {
            console.log('Content structure:', JSON.stringify(fields.content, null, 2));
        }
        
        // If the content is already HTML (string), we need to check if it contains the formatting
        // If it's Rich Text object, we can process it
        console.log('Content type:', typeof fields.content);
        console.log('Content length:', fields.content ? (fields.content as string).length : 'null/undefined');
        
        // For now, always process as Rich Text object to test
        console.log('Processing as Rich Text object...');
        let processedContent = convertRichTextToHtml(fields.content);
        console.log('After Rich Text conversion, length:', processedContent.length);
        
        // If the content is a string (HTML), process it to ensure code blocks preserve newlines
        if (typeof processedContent === 'string') {
            processedContent = processHtmlContent(processedContent);
        }
        
        return {
            title: fields.title || '',
            slug: fields.slug || '',
            content: processedContent,
            metaDescription: fields.metaDescription,
            lastUpdated: item.sys.updatedAt,
        };
    } catch (error) {
        console.error('Error fetching documentation page:', error);
        return null;
    }
}

// Fetch all help pages
export async function getHelpPages(): Promise<IDocumentationPage[]> {
    try {
        const response = await client.getEntries({
            content_type: 'helpPage',
            include: 10, // Include up to 10 levels of linked entries and assets
        });

        return response.items.map((item) => {
            const fields = item.fields as ContentfulFields;
            return {
                title: fields.title || '',
                slug: fields.slug || '',
                content: convertRichTextToHtml(fields.content),
                metaDescription: fields.metaDescription,
                lastUpdated: item.sys.updatedAt,
            };
        });
    } catch (error) {
        console.error('Error fetching help pages:', error);
        return [];
    }
}

// Fetch a single help page by slug
export async function getHelpPage(slug: string): Promise<IDocumentationPage | null> {
    try {
        const response = await client.getEntries({
            content_type: 'helpPage',
            'fields.slug': slug,
            include: 10, // Include up to 10 levels of linked entries and assets
        });

        if (response.items.length === 0) {
            return null;
        }

        const item = response.items[0];
        const fields = item.fields as ContentfulFields;
        
        // Debug: Log the raw content to see what we're getting
        console.log('Raw content from Contentful:', typeof fields.content);
        if (typeof fields.content === 'object' && fields.content) {
            console.log('Content structure:', JSON.stringify(fields.content, null, 2));
        }
        
        // If the content is already HTML (string), we need to check if it contains the formatting
        // If it's Rich Text object, we can process it
        console.log('Content type:', typeof fields.content);
        console.log('Content length:', fields.content ? (fields.content as string).length : 'null/undefined');
        
        // For now, always process as Rich Text object to test
        console.log('Processing as Rich Text object...');
        let processedContent = convertRichTextToHtml(fields.content);
        console.log('After Rich Text conversion, length:', processedContent.length);
        
        // If the content is a string (HTML), process it to ensure code blocks preserve newlines
        if (typeof processedContent === 'string') {
            processedContent = processHtmlContent(processedContent);
        }
        
        return {
            title: fields.title || '',
            slug: fields.slug || '',
            content: processedContent,
            metaDescription: fields.metaDescription,
            lastUpdated: item.sys.updatedAt,
        };
    } catch (error) {
        console.error('Error fetching help page:', error);
        return null;
    }
}

// Fetch all blog posts
export async function getBlogPosts(): Promise<IDocumentationPage[]> {
    try {
        const response = await client.getEntries({
            content_type: 'blogPage',
            include: 10, // Include up to 10 levels of linked entries and assets
        });

        return response.items.map((item) => {
            const fields = item.fields as ContentfulFields;
            return {
                title: fields.title || '',
                slug: fields.slug || '',
                content: convertRichTextToHtml(fields.content),
                metaDescription: fields.metaDescription,
                lastUpdated: item.sys.updatedAt,
            };
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

// Fetch a single blog post by slug
export async function getBlogPost(slug: string): Promise<IDocumentationPage | null> {
    try {
        const response = await client.getEntries({
            content_type: 'blogPage',
            'fields.slug': slug,
            include: 10, // Include up to 10 levels of linked entries and assets
        });

        if (response.items.length === 0) {
            return null;
        }

        const item = response.items[0];
        const fields = item.fields as ContentfulFields;

        // Debug: Log the raw content to see what we're getting
        console.log('Raw content from Contentful:', typeof fields.content);
        if (typeof fields.content === 'object' && fields.content) {
            console.log('Content structure:', JSON.stringify(fields.content, null, 2));
        }

        // If the content is already HTML (string), we need to check if it contains the formatting
        // If it's Rich Text object, we can process it
        console.log('Content type:', typeof fields.content);
        console.log('Content length:', fields.content ? (fields.content as string).length : 'null/undefined');

        // For now, always process as Rich Text object to test
        console.log('Processing as Rich Text object...');
        let processedContent = convertRichTextToHtml(fields.content);
        console.log('After Rich Text conversion, length:', processedContent.length);

        // If the content is a string (HTML), process it to ensure code blocks preserve newlines
        if (typeof processedContent === 'string') {
            processedContent = processHtmlContent(processedContent);
        }

        return {
            title: fields.title || '',
            slug: fields.slug || '',
            content: processedContent,
            metaDescription: fields.metaDescription,
            lastUpdated: item.sys.updatedAt,
        };
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}
