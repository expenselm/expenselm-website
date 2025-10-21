import Image from 'next/image'
import React from 'react'

import { ctaDetails } from '@/data/cta'

const AppStoreButton = () => {
    return (
        <a
            href={ctaDetails.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-opacity hover:opacity-90 sm:w-auto"
        >
            <span className="sr-only">Download ExpenseLM on the App Store</span>
            <Image
                src="/images/apple-app-store-badge.svg"
                width={155}
                height={60}
                alt="Download ExpenseLM on the App Store"
                className="h-auto w-[155px]"
                priority={false}
            />
        </a>
    )
}

export default AppStoreButton
