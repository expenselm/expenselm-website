import React from 'react';
import Link from 'next/link';
import { HiHome } from 'react-icons/hi2';
import Container from '@/components/Container';

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pt-32 md:pt-40 bg-gray-50 min-h-screen">
            <div className="bg-white border-b border-gray-200">
                <Container>
                    <nav aria-label="Breadcrumb" className="flex items-center space-x-4 py-4">
                        <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <HiHome className="h-5 w-5" aria-hidden="true" />
                            <span>Home</span>
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link href="/connect" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Connect your assistant
                        </Link>
                    </nav>
                </Container>
            </div>
            <div className="py-8">
                <Container>{children}</Container>
            </div>
        </div>
    );
}
