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
interface RichTextNode {
    nodeType: string;
    data: Record<string, unknown>;
    content?: RichTextNode[];
    value?: string;
    marks?: string[];
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
    
    // Apply marks in order
    marks.forEach(mark => {
        switch (mark) {
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
                text = `<code class="text-primary bg-gray-100 px-1 py-0.5 rounded">${text}</code>`;
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
    
    return `<a href="${uri}" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary-dark underline">${linkText}</a>`;
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
            return `<a href="${uri}" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary-dark underline">${children}</a>`;
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
                console.log('Processing rich text with node types:', richTextObj.content.map(n => n.nodeType));
                
                richTextObj.content.forEach((node: RichTextNode) => {
                    // Handle paragraphs
                    if (node.nodeType === 'paragraph' && node.content) {
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
                        let listItems = '';
                        node.content.forEach((listItem: RichTextNode) => {
                            if ((listItem.nodeType === 'list-item' || listItem.nodeType === 'li' || listItem.nodeType === BLOCKS.LIST_ITEM || listItem.nodeType === 'item') && listItem.content) {
                                let itemText = '';
                                listItem.content.forEach((textNode: RichTextNode) => {
                                    // Handle nested paragraphs in list items
                                    if (textNode.nodeType === 'paragraph' && textNode.content) {
                                        textNode.content.forEach((paragraphTextNode: RichTextNode) => {
                                            if (paragraphTextNode.nodeType === 'text' && paragraphTextNode.value) {
                                                itemText += renderTextWithMarks(paragraphTextNode);
                                            } else if (paragraphTextNode.nodeType === 'hyperlink') {
                                                itemText += renderHyperlink(paragraphTextNode);
                                            }
                                        });
                                    } else if (textNode.nodeType === 'text' && textNode.value) {
                                        itemText += renderTextWithMarks(textNode);
                                    } else if (textNode.nodeType === 'hyperlink') {
                                        itemText += renderHyperlink(textNode);
                                    }
                                });
                                if (itemText.trim()) {
                                    listItems += `<li class="mb-1">${itemText.trim()}</li>`;
                                }
                            }
                        });
                        if (listItems) {
                            htmlContent += `<ul class="list-disc list-inside mb-4 space-y-1">${listItems}</ul>`;
                        }
                    }
                    // Handle ordered lists
                    else if ((node.nodeType === 'ordered-list' || node.nodeType === 'ol' || node.nodeType === BLOCKS.OL_LIST || node.nodeType === 'numbered-list') && node.content) {
                        let listItems = '';
                        node.content.forEach((listItem: RichTextNode) => {
                            if ((listItem.nodeType === 'list-item' || listItem.nodeType === 'li' || listItem.nodeType === BLOCKS.LIST_ITEM || listItem.nodeType === 'item') && listItem.content) {
                                let itemText = '';
                                listItem.content.forEach((textNode: RichTextNode) => {
                                    // Handle nested paragraphs in list items
                                    if (textNode.nodeType === 'paragraph' && textNode.content) {
                                        textNode.content.forEach((paragraphTextNode: RichTextNode) => {
                                            if (paragraphTextNode.nodeType === 'text' && paragraphTextNode.value) {
                                                itemText += renderTextWithMarks(paragraphTextNode);
                                            } else if (paragraphTextNode.nodeType === 'hyperlink') {
                                                itemText += renderHyperlink(paragraphTextNode);
                                            }
                                        });
                                    } else if (textNode.nodeType === 'text' && textNode.value) {
                                        itemText += renderTextWithMarks(textNode);
                                    } else if (textNode.nodeType === 'hyperlink') {
                                        itemText += renderHyperlink(textNode);
                                    }
                                });
                                if (itemText.trim()) {
                                    listItems += `<li class="mb-1">${itemText.trim()}</li>`;
                                }
                            }
                        });
                        if (listItems) {
                            htmlContent += `<ol class="list-decimal list-inside mb-4 space-y-1">${listItems}</ol>`;
                        }
                    }
                    // Generic list detection - check if content looks like a list
                    else if (node.content && Array.isArray(node.content) && node.content.length > 0 && 
                             node.content.every(item => item.nodeType === 'list-item' || item.nodeType === 'li' || item.nodeType === 'item' || 
                                                   (item.content && Array.isArray(item.content) && item.content.some(c => c.nodeType === 'paragraph')))) {
                        // This looks like a list structure
                        let listItems = '';
                        node.content.forEach((listItem: RichTextNode) => {
                            if (listItem.content) {
                                let itemText = '';
                                listItem.content.forEach((textNode: RichTextNode) => {
                                    if (textNode.nodeType === 'paragraph' && textNode.content) {
                                        textNode.content.forEach((paragraphTextNode: RichTextNode) => {
                                            if (paragraphTextNode.nodeType === 'text' && paragraphTextNode.value) {
                                                itemText += renderTextWithMarks(paragraphTextNode);
                                            } else if (paragraphTextNode.nodeType === 'hyperlink') {
                                                itemText += renderHyperlink(paragraphTextNode);
                                            }
                                        });
                                    } else if (textNode.nodeType === 'text' && textNode.value) {
                                        itemText += renderTextWithMarks(textNode);
                                    } else if (textNode.nodeType === 'hyperlink') {
                                        itemText += renderHyperlink(textNode);
                                    }
                                });
                                if (itemText.trim()) {
                                    listItems += `<li class="mb-1">${itemText.trim()}</li>`;
                                }
                            }
                        });
                        if (listItems) {
                            htmlContent += `<ul class="list-disc list-inside mb-4 space-y-1">${listItems}</ul>`;
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
                console.log('No content processed, raw rich text structure:', JSON.stringify(richText, null, 2));
            }
            
            // Fallback to Rich Text renderer with our custom options
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const renderedHtml = documentToHtmlString(richText as any, renderOptions);
                console.log('Rich Text renderer output:', renderedHtml);
                return renderedHtml;
            } catch (renderError) {
                console.error('Rich Text renderer failed:', renderError);
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
        
        return {
            title: fields.title || '',
            slug: fields.slug || '',
            content: convertRichTextToHtml(fields.content),
            metaDescription: fields.metaDescription,
            lastUpdated: item.sys.updatedAt,
        };
    } catch (error) {
        console.error('Error fetching documentation page:', error);
        return null;
    }
}
