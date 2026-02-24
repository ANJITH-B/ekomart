'use client';

import { heroSlides } from '@/data/banner';
import Carousel from './carousel/carousel';



export default function HeroBanner() {


    return (
        <section className=" py-6">
            <div className="flex gap-4 max-w-7xl mx-auto px-4">
                {/* Main Swiper */}
                <Carousel event={heroSlides} />


            </div>
        </section>
    );
}
