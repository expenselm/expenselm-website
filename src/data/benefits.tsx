import { TbApps, TbMessageChatbot, TbReceipt, TbReportMoney, TbRobot, TbStarsFilled, TbChartHistogram, TbServerBolt } from "react-icons/tb";
import { LuLanguages } from "react-icons/lu";
import { FcCurrencyExchange } from "react-icons/fc";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Built with GenAI",
        description: "ExpenseLM was built using GenAI throughout the application.",
        bullets: [
            {
                title: "Expense Data Extraction and Search",
                description: "Use multimodal and multilanguage LLM to turn receipt/invoice images into structured data. Store in Vector Database for semantic search.",
                icon: <TbReportMoney size={26} />
            },
            {
                title: "ExpenseLM Agent",
                description: "An AI Agent that understands your expenses.",
                icon: <TbRobot size={26} />
            },
            {
                title: "ExpenseLM MCP Server",
                description: "Integrates with your favorite LLM tool (e.g. Claude Desktop, Perplexity Desktop).",
                icon: <TbStarsFilled size={26} />
            }
        ]
    },
    {
        title: "Easy Expense Recording with Item Level Details",
        description: "Take photo or upload image of invoice/receipt. Our AI-powered tools will turn it into structured data.",
        bullets: [
            {
                title: "Multiple Ways",
                description: "Take photo or upload image of invoice/receipt. Also supports manual input. Available on web and mobile (iOS, Android, phone, iPad and tablet).",
                icon: <TbReceipt size={26} />
            },
            {
                title: "Multiple Languages and Currencies",
                description: "Support all major languages (e.g. English, Chinese, Japanese and more) and currencies (USD,EUR,JPY,GBP,CNY,AUD,CAD,CHF,HKD,NZD,SGD,TWD).",
                icon: <LuLanguages size={26} />
            },
            {
                title: "Capture Detail Expense Information",
                description: "Include shop name, address, category and type (subscription or standard, inferred from AI). Down to item level details. Support search for all information semantically with Vector Database.",
                icon: <FcCurrencyExchange size={26} />
            }
        ]
    },
    {
        title: "Expense Insights and Get Useful Advice",
        description: "Provide analytical tools as well as AI powered advice.",
        bullets: [
            {
                title: "Statistics Reports",
                description: "By date range, by category, by subscription (e.g. Netflix, YouTube, ChatGPT, etc.).",
                icon: <TbChartHistogram size={26} />
            },
            {
                title: "ExpenseLM Agent",
                description: "Chat with your expense, perform currency conversion, and more.",
                icon: <TbRobot size={26} />
            },
            {
                title: "ExpenseLM MCP Server",
                description: "Use your favorite AI Assistant to help understand your expense, and get advice (e.g. Where is my money spent at? Any redundant subscription? Can I buy things cheaper at somewhere else?) in the way you want.",
                icon: <TbServerBolt size={26} />
            }
        ]
    },
    {
        title: "MCP Server",
        description: "ExpenseLM MCP Server provides integration with your favorite LLM tool.",
        bullets: [
            {
                title: "Claude Desktop",
                description: "Seamless integration with Claude Desktop for AI powered expense analytics, forecast and advice.",
                icon: <TbMessageChatbot size={26} />
            },
            {
                title: "Perplexity Desktop",
                description: "Connect with Perplexity for insightful answers and discovery of your expense habits and patterns.",
                icon: <TbMessageChatbot size={26} />
            },
            {
                title: "Others",
                description: "Compatible with all MCP clients.",
                icon: <TbApps size={26} />
            }
        ]
    },
]