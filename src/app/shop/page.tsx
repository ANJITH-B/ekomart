'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiX } from 'react-icons/fi';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';
import { categories } from '@/data/categories';

const PRICE_RANGES = [
    { label: 'Under $5', min: 0, max: 5 },
    { label: '$5 – $10', min: 5, max: 10 },
    { label: '$10 – $20', min: 10, max: 20 },
    { label: 'Over $20', min: 20, max: Infinity },
];

function ShopContent() {
    const searchParams = useSearchParams();
    const catParam = searchParams.get('cat') || 'all';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCat, setSelectedCat] = useState(catParam);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('default');
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        setSelectedCat(catParam);
    }, [catParam]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = selectedCat && selectedCat !== 'all'
                    ? `/api/products?category=${selectedCat}`
                    : '/api/products';
                const res = await fetch(url);
                const data = await res.json();
                let prods: Product[] = data.products;

                if (selectedPrice !== null) {
                    const range = PRICE_RANGES[selectedPrice];
                    prods = prods.filter((p) => p.price >= range.min && p.price < range.max);
                }

                if (sortBy === 'price-asc') prods = [...prods].sort((a, b) => a.price - b.price);
                if (sortBy === 'price-desc') prods = [...prods].sort((a, b) => b.price - a.price);
                if (sortBy === 'rating') prods = [...prods].sort((a, b) => b.rating - a.rating);

                setProducts(prods);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCat, selectedPrice, sortBy]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-400 mb-6">
                <span>Home</span> <span className="mx-2">›</span>
                <span className="text-[#253D4E] font-semibold">Shop</span>
                {selectedCat !== 'all' && (
                    <><span className="mx-2">›</span><span className="text-[#3BB77E] capitalize font-semibold">{selectedCat}</span></>
                )}
            </nav>

            <div className="flex gap-8">
                {/* Sidebar */}
                <aside className={`flex-shrink-0 w-60 hidden lg:block`}>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-28">
                        <h3 className="font-black text-[#253D4E] text-base mb-4">Categories</h3>
                        <ul className="space-y-1.5">
                            <li>
                                <button
                                    onClick={() => setSelectedCat('all')}
                                    className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${selectedCat === 'all' ? 'bg-[#3BB77E] text-white font-bold' : 'text-gray-600 hover:bg-[#F4F6FA] hover:text-[#3BB77E]'}`}
                                >
                                    All Products
                                </button>
                            </li>
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => setSelectedCat(cat.slug)}
                                        className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${selectedCat === cat.slug ? 'bg-[#3BB77E] text-white font-bold' : 'text-gray-600 hover:bg-[#F4F6FA] hover:text-[#3BB77E]'}`}
                                    >
                                        <span className="flex items-center gap-2">{cat.icon} {cat.name}</span>
                                        <span className="text-xs opacity-70">({cat.productCount})</span>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 pt-5 border-t border-gray-100">
                            <h3 className="font-black text-[#253D4E] text-base mb-4">Price Range</h3>
                            <ul className="space-y-1.5">
                                {PRICE_RANGES.map((range, idx) => (
                                    <li key={range.label}>
                                        <button
                                            onClick={() => setSelectedPrice(selectedPrice === idx ? null : idx)}
                                            className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${selectedPrice === idx ? 'bg-[#3BB77E] text-white font-bold' : 'text-gray-600 hover:bg-[#F4F6FA]'}`}
                                        >
                                            {range.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between mb-6 bg-white rounded-2xl border border-gray-100 px-5 py-3 gap-3 flex-wrap">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="lg:hidden flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#3BB77E] transition-colors"
                            >
                                <FiFilter /> Filters
                            </button>
                            <span className="text-sm text-gray-400">
                                Showing <span className="font-bold text-[#253D4E]">{products.length}</span> results
                                {selectedCat !== 'all' && <span className="text-[#3BB77E] font-semibold"> in "{selectedCat}"</span>}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none text-gray-600 focus:border-[#3BB77E]"
                            >
                                <option value="default">Sort: Default</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                            <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-[#3BB77E] text-white' : 'text-gray-400 hover:text-[#3BB77E]'}`}>
                                <FiGrid size={16} />
                            </button>
                            <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-[#3BB77E] text-white' : 'text-gray-400 hover:text-[#3BB77E]'}`}>
                                <FiList size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(selectedCat !== 'all' || selectedPrice !== null) && (
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                            <span className="text-xs text-gray-400 font-semibold">Active filters:</span>
                            {selectedCat !== 'all' && (
                                <button onClick={() => setSelectedCat('all')} className="flex items-center gap-1 bg-[#3BB77E]/10 text-[#3BB77E] text-xs font-bold px-3 py-1 rounded-full hover:bg-[#3BB77E] hover:text-white transition-colors">
                                    {selectedCat} <FiX size={10} />
                                </button>
                            )}
                            {selectedPrice !== null && (
                                <button onClick={() => setSelectedPrice(null)} className="flex items-center gap-1 bg-[#3BB77E]/10 text-[#3BB77E] text-xs font-bold px-3 py-1 rounded-full hover:bg-[#3BB77E] hover:text-white transition-colors">
                                    {PRICE_RANGES[selectedPrice].label} <FiX size={10} />
                                </button>
                            )}
                        </div>
                    )}

                    {loading ? (
                        <div className={`grid gap-5 ${view === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-gray-100 rounded-2xl animate-pulse h-72" />
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-5xl mb-4">🛒</p>
                            <p className="text-lg font-bold">No products found</p>
                            <button onClick={() => { setSelectedCat('all'); setSelectedPrice(null); }} className="mt-4 text-[#3BB77E] font-semibold hover:underline">Clear filters</button>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className={`grid gap-5 ${view === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}
                        >
                            {products.map((product) => (
                                <motion.div key={product.id} layout>
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <ShopContent />
        </Suspense>
    );
}
