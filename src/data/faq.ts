import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
    {
        question: `Is ${siteDetails.siteName}'s free tier always free?`,
        answer: 'Absolutely. The free tier is always free and will be available to all users.',
    },
    {
        question: `How to signup for ${siteDetails.siteName}?`,
        answer: 'Just visit https://web.expenselm.ai and signup with your email and password, or login with your Google account.'
    },
    {
        question: `How to setup ${siteDetails.siteName} MCP server for Claude and Perplexity Desktop?`,
        answer: 'Just visit the documentation page. Detail instruction is there.'
    },
    {
        question: `What if I need help using ${siteDetails.siteName}?`,
        answer: 'Feel free to contact us at support@expenselm.ai.'
    }
];