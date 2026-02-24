import banner1 from '../../public/banner/03.webp'
import banner2 from '../../public/banner/09.webp'
import { StaticImageData } from 'next/image';

export interface HeroSlide {
    id: number;
    badge: string;
    title: string;
    description: string;
    image: StaticImageData;
    tag: string;
}
export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        badge: 'FRESH & ORGANIC',
        title: "Don't miss our amazing grocery deals",
        description: "We have prepared special discounts for you on grocery products. Don't miss these  ",
        image: banner1,
        tag: 'Save up to 40%',
    },
    {
        id: 2,
        badge: 'LIMITED TIME OFFER',
        title: 'Check out our incredible deals today',
        description: "We have prepared special discounts for you on grocery products. Don't miss these opportunities...",
        image: banner2,
        tag: 'Weekend Special',
    }
];