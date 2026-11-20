import { TbCamera, TbLanguage, TbListCheck, TbPlugConnected, TbCurrencyDollar, TbCategory, TbLock, TbKey, TbShieldCheck } from "react-icons/tb";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Capture receipts in seconds",
        description: "Take a photo in the app, upload one on the web, or hand a receipt straight to your assistant. ExpenseLM reads it for you.",
        bullets: [
            {
                title: "Item-level detail",
                description: "Shop, date, line items and totals, with a category picked from a fixed list, ready to search later.",
                icon: <TbListCheck size={26} />
            },
            {
                title: "Any language, 14 currencies",
                description: "Receipts in English, Chinese, Japanese and more, in USD, EUR, JPY, GBP, CNY, AUD, CAD, CHF, HKD, NZD, SGD, TWD, THB and KRW.",
                icon: <TbLanguage size={26} />
            },
            {
                title: "Flags what to check",
                description: "Anything ExpenseLM isn't sure about is marked \"Needs review\", so you only look at the receipts that need it.",
                icon: <TbCamera size={26} />
            }
        ]
    },
    {
        title: "Your assistant does the analysis",
        description: "Ask where your money went in plain language. ExpenseLM gives your assistant clean data and the tools to search, total and update it.",
        bullets: [
            {
                title: "Works with the assistant you use",
                description: "Claude, ChatGPT, Gemini, Muse, Hermes, OpenClaw, DeepSeek Harness and any app that supports MCP. Set-up takes a minute.",
                icon: <TbPlugConnected size={26} />
            },
            {
                title: "Totals that add up",
                description: "Every expense is also stored in your home currency at the rate on the receipt's date, so a trip abroad adds up correctly.",
                icon: <TbCurrencyDollar size={26} />
            },
            {
                title: "Consistent categories and tags",
                description: "\"How much did I spend on transport?\" has one answer, because every expense uses the same categories.",
                icon: <TbCategory size={26} />
            }
        ]
    },
    {
        title: "Private and in your control",
        description: "Your expenses belong to you. You decide which assistants can see them.",
        bullets: [
            {
                title: "Your own sign-in",
                description: "Assistants connect by signing in with your ExpenseLM account (Google, Apple or email). Disconnect any of them in Settings.",
                icon: <TbLock size={26} />
            },
            {
                title: "Read-only keys",
                description: "For scripts and agents that use a key, create a read-only one that can look but not change anything.",
                icon: <TbKey size={26} />
            },
            {
                title: "Never sold, never used for training",
                description: "We don't sell your data or use your receipts to train AI models. Deleting your account deletes your expenses and receipts.",
                icon: <TbShieldCheck size={26} />
            }
        ]
    },
]
