import { IMenuItem } from "@/types";

export const menuItems: IMenuItem[] = [
    {
        text: "Features",
        url: "#features"
    },
    {
        text: "Pricing",
        url: "#pricing"
    },
    {
        text: "Doc",
        url: "#",
        dropdown: [
            {
                text: "Getting Started",
                url: "/docs/getting-started",
                description: "Getting Started with ExpenseLM"
            },
            {
                text: "MCP Server Guide",
                url: "/docs/mcp-server-guide",
                description: "ExpenseLM MCP Server Guide"
            }
        ]
    },
    {
        text: "Blog",
        url: "#testimonials"
    }
];