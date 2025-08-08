import { TbApps, TbMessageChatbot, TbReceipt } from "react-icons/tb";
import { LuLanguages } from "react-icons/lu";
import { FcCurrencyExchange } from "react-icons/fc";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Easy Expense Capturing",
        description: "Take photo or upload image of invoice/receipt. Our AI-powered tools will turn it into structured data.",
        bullets: [
            {
                title: "Multiple Ways",
                description: "Take photo or upload image of invoice/receipt. Also supports manual input.",
                icon: <TbReceipt size={26} />
            },
            {
                title: "Multiple Languages",
                description: "Support all major languages.",
                icon: <LuLanguages size={26} />
            },
            {
                title: "Multiple Currencies",
                description: "Support all major currencies.",
                icon: <FcCurrencyExchange size={26} />
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