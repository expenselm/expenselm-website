'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { HiChevronDown } from 'react-icons/hi2';
import { IDropdownItem } from '@/types';

interface DropdownMenuProps {
    items: IDropdownItem[];
    label: string;
    isMobile?: boolean;
    onItemClick?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
    items, 
    label, 
    isMobile = false,
    onItemClick 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleItemClick = () => {
        setIsOpen(false);
        if (onItemClick) {
            onItemClick();
        }
    };

    if (isMobile) {
        return (
            <div className="space-y-2">
                <div className="text-foreground font-medium">{label}</div>
                <div className="ml-4 space-y-2">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href={item.url}
                            className="text-foreground hover:text-primary block"
                            onClick={handleItemClick}
                        >
                            <div className="font-medium">{item.text}</div>
                            {item.description && (
                                <div className="text-sm text-gray-600">{item.description}</div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-foreground-accent transition-colors flex items-center gap-1"
            >
                {label}
                <HiChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href={item.url}
                            className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={handleItemClick}
                        >
                            <div className="font-medium text-foreground">{item.text}</div>
                            {item.description && (
                                <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
