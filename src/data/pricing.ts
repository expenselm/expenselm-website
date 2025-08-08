import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Free',
        price: 'Free',
        features: [
            '100 receipt image extraction per month',
            'Create up to 100 expenses per month',
            'MCP server'
        ],
    },
    {
        name: 'Basic',
        price: 5,
        features: [
            '500 receipt image extraction per month',
            'Create up to 500 expenses per month',
            'MCP server',
            'Email support',
        ],
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        features: [
            'Custom to your business need',
            'Unlimited receipt image extraction',
            'Unlimited expense records'
        ],
    },
]