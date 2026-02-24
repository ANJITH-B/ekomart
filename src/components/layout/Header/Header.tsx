'use client';

import { useState } from 'react';
import { TopBar } from './TopBar';
import { Navigater } from './Navigater';
import { MobileMenu } from './MobileMenu';
import { MiddleBar } from './MiddleBar';



export default function Header() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);


    return (
        <header className={`sticky bg-[#629D23] top-0 z-50 transition-shadow duration-300  `}>
            <TopBar />
            <MiddleBar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
            <Navigater />
            <MobileMenu isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
        </header>
    );
}
