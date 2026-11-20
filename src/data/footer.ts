import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    socials: ISocials;
} = {
    subheading: "Expense capture for your AI assistant.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "Pricing",
            url: "#pricing"
        },
        {
            text: "Connect your assistant",
            url: "/connect"
        },
        {
            text: "Privacy",
            url: "/help/privacy"
        },
        {
            text: "Terms & Conditions",
            url: "/help/terms-and-conditions"
        }
    ],
    email: 'enquiry@expenselm.ai',
    socials: {
        github: 'https://github.com/expenselm',
        x: 'https://x.com/ExpenseLm',
        // twitter: 'https://twitter.com/Twitter',
        // facebook: 'https://facebook.com',
        // youtube: 'https://youtube.com',
        linkedin: 'https://www.linkedin.com/in/hoclarence',
        // threads: 'https://www.threads.net',
        // instagram: 'https://www.instagram.com',
        discord: 'https://discord.com/channels/1430401719510237197/1430401720403492896',
    }
}