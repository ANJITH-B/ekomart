'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

import img1 from '../../../public/promo/05.png';
import img2 from '../../../public/promo/06.jpg';
import img3 from '../../../public/promo/07.png';
import Image from 'next/image';

const promos = [
    {
        id: 1,
        badge: 'Summer Sale',
        title: 'Drink Fresh Corn Juice Good Taste',
        description: 'Sweet and refreshing corn juice packed with natural vitamins',
        discount: '25% OFF',
        link: '/shop',
        bg: 'bg-gradient-to-br from-[#FFF8E6] to-[#FEF0C7]',
        accentColor: '#F59E0B',
        badgeBg: 'bg-[#F59E0B]',
        image: img1,
    },
    {
        id: 2,
        badge: 'Best Seller',
        title: 'Organic Lemon Flavored Banana Chips',
        description: 'Crispy banana chips with zesty lemon flavor, zero preservatives',
        discount: '30% OFF',
        link: '/shop',
        bg: 'bg-gradient-to-br from-[#EEF9F0] to-[#CCEEDD]',
        accentColor: '#3BB77E',
        badgeBg: 'bg-[#3BB77E]',
        image: img2,
    },
    {
        id: 3,
        badge: 'New Arrival',
        title: 'Nozes Pecanera Brasil Chocolate Snacks',
        description: 'Premium Brazilian pecan nuts coated in finest dark chocolate',
        discount: '20% OFF',
        link: '/shop',
        bg: 'bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF]',
        accentColor: '#8B5CF6',
        badgeBg: 'bg-[#8B5CF6]',
        image: img3,
    },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PromoBanners() {
    return (
        <section className="max-w-7xl mx-auto px-4 pb-10">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
                {promos.map((promo) => (
                    <motion.div key={promo.id} variants={item}>
                        <Link
                            href={promo.link}
                            className={`${promo.bg} h-55 rounded-2xl flex items-center justify-between gap-4  transition-all duration-300 group overflow-hidden relative border border-gray-200 `}
                        >
                            <div className="flex flex-col z-10 p-6 w-2/3">
                                <span className={`bg-[#629D23]/20 border border-[#629D23]/30  w-fit text-[#629D23] text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider`}>
                                    {promo.badge}
                                </span>
                                <h3 className="text-base font-black text-[#253D4E] mt-3 mb-1.5 leading-tight line-clamp-2">
                                    {promo.title}
                                </h3>
                                <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                                    {promo.description}
                                </p>
                                <span className="w-fit flex items-center gap-1 text-xs font-bold text-white bg-[#629D23] px-3 py-1.5 rounded-lg">
                                    Shop Now <FiArrowRight size={12} className="transition-transform" />
                                </span>
                            </div>
                            <Image
                                src={promo.image}
                                alt={promo.title}
                                className="absolute w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10"
                                style={{ backgroundColor: promo.accentColor }}
                            />
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
