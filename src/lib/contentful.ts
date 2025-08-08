import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
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

// Helper function to convert Rich Text to HTML
function convertRichTextToHtml(richText: unknown): string {
    if (!richText) return '';
    
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return documentToHtmlString(richText as any);
    } catch (error) {
        console.error('Error converting Rich Text to HTML:', error);
        return '';
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
