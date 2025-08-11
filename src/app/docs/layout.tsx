import React from 'react';
import Link from 'next/link';
import { HiHome } from 'react-icons/hi2';
import Container from '@/components/Container';

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="pt-32 md:pt-40 bg-gray-50 min-h-screen">
            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b border-gray-200">
                <Container>
                    <div className="flex items-center space-x-4 py-4">
                        <Link 
                            href="/" 
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <HiHome className="h-5 w-5" />
                            <span>Home</span>
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link 
                            href="/docs" 
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Documentation
                        </Link>
                    </div>
                </Container>
            </div>

            {/* Main Content */}
            <div className="py-8">
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    );
}
