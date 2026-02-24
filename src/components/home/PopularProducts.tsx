'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';


const tabs = [
    { id: 'frozen-foods', label: 'Frozen Foods' },
    { id: 'diet-foods', label: 'Diet Foods' },
    { id: 'healthy-foods', label: 'Healthy Foods' },
    { id: 'vitamin-items', label: 'Vitamin Items' },
];

export default function PopularProducts() {
    const [activeTab, setActiveTab] = useState('diet-foods');

    const filtered = products.filter((p) => p.tags.includes(activeTab)).slice(0, 8);

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-black text-[#253D4E]">Popular Products</h2>
                </motion.div>

                {/* Tabs */}
                <div className="flex items-center gap-2 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab.id
                                ? 'bg-[#629D23] text-white shadow-lg shadow-[#629D23]/30'
                                : 'bg-[#F4F6FA] text-gray-500 hover:bg-[#e0f5ea] hover:text-[#629D23]'
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                >
                    {filtered.length > 0 ? (
                        filtered.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-4 text-center py-16 text-gray-400">
                            <p className="text-lg font-semibold">No products found in this category</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>


        </section>
    );
}
