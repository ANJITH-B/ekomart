'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function FeaturedCategories() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-7">
            <h2 className=" text-3xl font-black text-[#253D4E]">Featured Categories</h2>
            <div className="flex items-center gap-2">
                <button className="best-deals-prev w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-heading hover:bg-primary hover:text-[#3BB77E] transition-all">
                    <FiChevronLeft size={20} />
                </button>
                <button className="best-deals-next w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-heading hover:bg-primary hover:text-[#3BB77E] transition-all">
                    <FiChevronRight size={20} />
                </button>
            </div>
            </div>

            <div className='bg-gray-100 py-8 rounded-2xl border border-gray-200'>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: '.best-deals-prev',
                    nextEl: '.best-deals-next',
                }}
                spaceBetween={16}
                slidesPerView={2}
                breakpoints={{
                    480: { slidesPerView: 3 },
                    640: { slidesPerView: 4 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 7 },
                    1280: { slidesPerView: 8 },
                }}
                className="category-swiper"
            >
                {categories.map((cat, idx) => (
                    <SwiperSlide key={cat.id}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                        >
                            <Link
                                href={`/shop?cat=${cat.slug}`}
                                className="flex flex-col items-center gap-3 group cursor-pointer"
                            >
                                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-[#3BB77E] transition-all duration-300 shadow-md group-hover:shadow-xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-[#3BB77E]/0 group-hover:bg-[#3BB77E]/10 transition-all duration-300 flex items-center justify-center">
                                        <span className="text-3xl">{cat.icon}</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-[#253D4E] group-hover:text-[#3BB77E] transition-colors leading-tight text-center">
                                        {cat.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{cat.productCount} items</p>
                                </div>
                            </Link>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        </section>
    );
}
