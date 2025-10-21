import Image from 'next/image'
import React from 'react'

import { ctaDetails } from '@/data/cta'

const PlayStoreButton = () => {
    return (
        <a
            href={ctaDetails.googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-opacity hover:opacity-90 sm:w-auto"
        >
            <span className="sr-only">Get ExpenseLM on Google Play</span>
            <Image
                src="/images/google-play-badge.svg"
                width={155}
                height={60}
                alt="Get ExpenseLM on Google Play"
                className="h-auto w-[155px]"
            />
        </a>
    )
}

export default PlayStoreButton
