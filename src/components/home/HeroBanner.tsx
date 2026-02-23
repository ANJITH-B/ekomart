'use client';

import { useRef } from 'react';
import Carousel from './carousel/carousel';
import { heroSlides } from '@/data/banner';



export default function HeroBanner() {
    const swiperRef = useRef(null);

    return (
        <section className=" py-6">
            <div className="flex gap-4 max-w-7xl mx-auto px-4">
                {/* Main Swiper */}
                <Carousel event={heroSlides} />


            </div>
        </section>
    );
}
