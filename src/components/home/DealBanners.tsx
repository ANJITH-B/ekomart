'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
}

function useCountdown(endDate: Date): TimeLeft {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculate = () => {
            const diff = endDate.getTime() - Date.now();
            if (diff <= 0) return;
            setTimeLeft({
                hours: Math.floor(diff / 3_600_000),
                minutes: Math.floor((diff % 3_600_000) / 60_000),
                seconds: Math.floor((diff % 60_000) / 1_000),
            });
        };
        calculate();
        const id = setInterval(calculate, 1000);
        return () => clearInterval(id);
    }, [endDate]);

    return timeLeft;
}

function TimeBox({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-white/90 rounded-xl w-14 h-14 flex items-center justify-center text-2xl font-black text-[#253D4E] shadow-sm">
                {String(value).padStart(2, '0')}
            </div>
            <span className="text-xs font-semibold mt-1 text-white/80 uppercase tracking-wider">{label}</span>
        </div>
    );
}

const banners = [
    {
        id: 1,
        subtitle: 'Limited Time Offer',
        title: 'Dalivaring business makes your profit',
        description: 'Organic produce delivered fresh from local farms to your doorstep. Save big on your first order!',
        discount: '25% Off',
        link: '/shop',
        bg: 'from-[#0F4C35] to-[#1a7a55]',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
        endOffset: 36,
    },
    {
        id: 2,
        subtitle: 'Weekend Special',
        title: 'Firebase business makes your profit',
        description: 'Exclusive weekend deals on fresh fruits and vegetables. Stock up and save more today!',
        discount: '30% Off',
        link: '/shop',
        bg: 'from-[#7C2D12] to-[#c2440e]',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop',
        endOffset: 12,
    },
];

export default function DealBanners() {
    const endDate1 = new Date(Date.now() + banners[0].endOffset * 3_600_000);
    const endDate2 = new Date(Date.now() + banners[1].endOffset * 3_600_000);
    const time1 = useCountdown(endDate1);
    const time2 = useCountdown(endDate2);
    const times = [time1, time2];

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map((banner, idx) => (
                    <motion.div
                        key={banner.id}
                        initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`bg-gradient-to-r ${banner.bg} rounded-2xl p-7 flex items-center gap-6 overflow-hidden relative group`}
                    >
                        {/* Content */}
                        <div className="flex-1 z-10">
                            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                                {banner.subtitle}
                            </span>
                            <h3 className="text-white text-xl font-black mb-2 leading-tight">{banner.title}</h3>
                            <p className="text-white/70 text-sm mb-4 leading-relaxed line-clamp-2">{banner.description}</p>

                            {/* Countdown */}
                            <div className="flex items-center gap-2 mb-5">
                                <TimeBox value={times[idx].hours} label="Hours" />
                                <span className="text-white text-2xl font-black self-start mt-3">:</span>
                                <TimeBox value={times[idx].minutes} label="Mins" />
                                <span className="text-white text-2xl font-black self-start mt-3">:</span>
                                <TimeBox value={times[idx].seconds} label="Secs" />
                            </div>

                            <Link
                                href={banner.link}
                                className="inline-flex items-center gap-2 bg-white text-[#253D4E] font-bold px-6 py-2.5 rounded-full text-sm hover:bg-[#3BB77E] hover:text-white transition-all duration-300"
                            >
                                Shop Now – {banner.discount} <FiArrowRight />
                            </Link>
                        </div>

                        {/* Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-36 h-36 object-cover rounded-2xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300 opacity-80"
                        />

                        {/* Decorative circles */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/5 rounded-full" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
