import PricingColumn from "./PricingColumn";

import { tiers } from "@/data/pricing";

const Pricing: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:max-w-4xl mx-auto">
            {tiers.map((tier, index) => (
                <PricingColumn key={tier.name} tier={tier} highlight={index === 1} free={index === 0} />
            ))}
        </div>
    )
}

export default Pricing