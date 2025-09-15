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
        text: "Help",
        url: "#",
        dropdown: [
            {
                text: "View All Help",
                url: "/help",
                description: "Browse all help articles"
            },
            {
                text: "Expense Analytics with AI",
                url: "/help/expense-analytics-with-ai",
                description: "Expense Analytics with ExpenseLM Agent or MCP"
            },
            {
                text: "Privacy",
                url: "/help/privacy",
                description: "Privacy Policy"
            },
            {
                text: "Terms & Conditions",
                url: "/help/terms-and-conditions",
                description: "Terms and Conditions"
            },
            {
                text: "FAQ",
                url: "/help/faq",
                description: "Frequently Asked Questions"
            },
            {
                text: "Account Deletion",
                url: "/help/account-deletion",
                description: "ExpenseLM Account Deletion"
            }
        ]
    },
    {
        text: "Blog",
        url: "#testimonials"
    }
];