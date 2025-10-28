"use client"

import { motion, Variants } from "framer-motion"

import BenefitBullet from "./BenefitBullet";
import SectionTitle from "../SectionTitle";
import { IBenefit } from "@/types";

interface Props {
    benefit: IBenefit;
}

const containerVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 100
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 0.9,
            delayChildren: 0.2,
            staggerChildren: 0.1,
        }
    }
};

export const childVariants = {
    offscreen: {
        opacity: 0,
        x: -50,
    },
    onscreen: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 1,
        }
    },
};

const BenefitSection: React.FC<Props> = ({ benefit }: Props) => {
    const { title, description, bullets } = benefit;

    return (
        <section className="benefit-section">
            <motion.div
                className="flex flex-wrap flex-col items-center justify-center gap-2 lg:flex-row lg:gap-20 lg:flex-nowrap mb-24"
                variants={containerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
            >
                <div className="mt-10 w-full lg:flex-1">
                    <motion.div
                        className="flex flex-col w-full mx-auto lg:mx-0 text-center lg:text-left lg:max-w-none"
                        variants={childVariants}
                    >
                        <SectionTitle>
                            <h3 className="w-full lg:max-w-none">
                                {title}
                            </h3>
                        </SectionTitle>

                        <p className="mt-1.5 mx-auto lg:mx-0 leading-normal text-foreground-accent w-full lg:max-w-none">
                            {description}
                        </p>
                    </motion.div>

                    <div className="mx-auto lg:mx-0 w-full lg:max-w-none">
                        {bullets.map((item, index) => (
                            <BenefitBullet key={index} title={item.title} icon={item.icon} description={item.description} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default BenefitSection
