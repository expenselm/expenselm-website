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
                description: "Learn the basics of ExpenseLM"
            },
            {
                text: "User Guide",
                url: "/docs/user-guide",
                description: "Complete guide to using ExpenseLM"
            },
            {
                text: "API Reference",
                url: "/docs/api-reference",
                description: "Technical API documentation"
            },
            {
                text: "Tutorials",
                url: "/docs/tutorials",
                description: "Step-by-step tutorials"
            }
        ]
    },
    {
        text: "Blog",
        url: "#testimonials"
    }
];