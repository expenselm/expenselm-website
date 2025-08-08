# Contentful Setup Guide

## 1. Create Content Type

In your Contentful space, create a new content type called `documentationPage` with the following fields:

### Required Fields:
- **title** (Short text) - The page title
- **slug** (Short text) - URL slug (e.g., "getting-started")
- **content** (Rich text) - The main content of the documentation page

### Optional Fields:
- **metaDescription** (Short text) - SEO description for the page

## 2. Field Configuration

### Title Field:
- Field ID: `title`
- Field Type: Short text
- Required: Yes
- Validations: Required

### Slug Field:
- Field ID: `slug`
- Field Type: Short text
- Required: Yes
- Validations: Required, Unique
- Help Text: "URL slug (e.g., getting-started, user-guide)"

### Content Field:
- Field ID: `content`
- Field Type: Rich text
- Required: Yes
- Validations: Required
- Help Text: "Main content of the documentation page"

### Meta Description Field:
- Field ID: `metaDescription`
- Field Type: Short text
- Required: No
- Help Text: "SEO description for the page"

## 3. Environment Variables

Create a `.env.local` file in your project root with:

```
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

### How to get these values:

1. **Space ID**: Go to Settings > General settings in your Contentful space
2. **Access Token**: Go to Settings > API keys > Create API key

## 4. Sample Content

Create some sample documentation pages in Contentful:

### Getting Started Page:
- Title: "Getting Started"
- Slug: "getting-started"
- Content: `<h2>Welcome to ExpenseLM</h2><p>This guide will help you get started with ExpenseLM...</p>`
- Meta Description: "Learn the basics of ExpenseLM and get started with expense management"

### User Guide Page:
- Title: "User Guide"
- Slug: "user-guide"
- Content: `<h2>Complete User Guide</h2><p>This comprehensive guide covers all features...</p>`
- Meta Description: "Complete guide to using ExpenseLM features and functionality"

## 5. Testing

After setting up Contentful and environment variables:

1. Run your development server: `npm run dev`
2. Navigate to `/docs` to see the documentation index
3. Click on any documentation page to view the content
4. Test the dropdown menu in the header navigation

## 6. Content Management

- All documentation content is managed through Contentful
- Changes to content will be reflected immediately (no build required)
- You can add new documentation pages by creating new entries in Contentful
- The slug field determines the URL path for each page
