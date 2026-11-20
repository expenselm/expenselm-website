/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            // The MCP guides moved from Contentful to /connect (action plan 1.18); the local server is retired.
            { source: '/docs/remote-mcp-server-guide', destination: '/connect', permanent: true },
            { source: '/docs/mcp-server-guide', destination: '/connect', permanent: true },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
            },
            {
                protocol: 'https',
                hostname: 'downloads.ctfassets.net',
            },
        ],
    },
};

export default nextConfig;
