import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
    {
        question: `Which AI assistants work with ${siteDetails.siteName}?`,
        answer: 'Any assistant that can add a remote MCP server, including Claude, ChatGPT, Gemini, Grok, Muse, Hermes, OpenClaw and DeepSeek Harness. Step-by-step guides are at expenselm.ai/connect.',
    },
    {
        question: `Do I need an AI assistant to use ${siteDetails.siteName}?`,
        answer: 'No. You can capture receipts, browse and edit expenses, and see statistics in the web app and the iOS and Android apps. An assistant adds questions in plain language on top.',
    },
    {
        question: `Is ${siteDetails.siteName}'s free tier always free?`,
        answer: 'Yes. The free tier is always free and includes 300 receipt extractions a month and unlimited expenses.',
    },
    {
        question: `How do I sign up for ${siteDetails.siteName}?`,
        answer: 'Visit web.expenselm.ai or download the iOS or Android app, and sign up with Google, Apple or an email and password.',
    },
    {
        question: 'Is my data private?',
        answer: 'We never sell your data or use your receipts to train AI models. You choose which assistants can connect, and deleting your account deletes your expenses and receipts. See our privacy policy at expenselm.ai/help/privacy.',
    },
    {
        question: `What if I need help using ${siteDetails.siteName}?`,
        answer: 'Email us at enquiry@expenselm.ai.',
    },
];
