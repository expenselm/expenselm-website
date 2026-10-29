import { IPricing } from "@/types";

// Keep in sync with subscription_plan_config_map in expai-backend (common/models/subscription.py).
// Only image extraction is metered; expenses are unlimited on every plan.
export const tiers: IPricing[] = [
    {
        name: 'Free',
        price: 'Free',
        features: [
            '300 receipt image extractions per month',
            'Unlimited expenses',
            'MCP server: use ExpenseLM from your AI assistant',
        ],
    },
    {
        name: 'Basic',
        price: 5,
        features: [
            '2,000 receipt image extractions per month',
            'Unlimited expenses',
            'MCP server: use ExpenseLM from your AI assistant',
            'Email support',
        ],
    },
]
