'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';
import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';

const tabs = [
    { id: 'all', label: 'All' },
    { id: 'bakery', label: 'Baking material' },
    { id: 'dairy', label: 'Milks & Dairies' },
    { id: 'vegetable', label: 'Vegetable' },
];

export default function WeeklySales() {
    const [activeTab, setActiveTab] = useState('all');

    const filtered =
        activeTab === 'all'
            ? products
            : products.filter((p) => p.category === activeTab || p.tags.includes(activeTab));

    const sliced = filtered.slice(0, 10);

    return (
        <section className="bg-[#F4F6FA] py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-black text-[#253D4E]">Don&apos;t miss this week&apos;s sales</h2>
                    </motion.div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab.id
                                        ? 'bg-[#629D23] text-white shadow-lg shadow-[#629D23]/30'
                                        : 'bg-white text-gray-500 hover:bg-[#e0f5ea] hover:text-[#629D23] border border-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={16}
                            slidesPerView={2}
                            breakpoints={{
                                480: { slidesPerView: 2 },
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                                1280: { slidesPerView: 5 },
                            }}
                        >
                            {sliced.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
