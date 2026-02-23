'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiStar, FiShoppingCart, FiHeart, FiArrowLeft, FiMinus, FiPlus, FiShare2 } from 'react-icons/fi';
import { Product } from '@/types';
import ProductCard from '@/components/ui/ProductCard';

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [related, setRelated] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

    useEffect(() => {
        const fetch_ = async () => {
            try {
                const res = await fetch(`/api/products/${slug}`);
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setProduct(data.product);
                setRelated(data.related ?? []);
            } catch {
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetch_();
    }, [slug]);

    const handleAddToCart = async () => {
        if (!product) return;
        setAddedToCart(true);
        await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id, name: product.name, price: product.price, image: product.image, quantity: qty }),
        });
        setTimeout(() => setAddedToCart(false), 2500);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 animate-pulse">
                <div className="bg-gray-100 rounded-3xl h-96" />
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => <div key={i} className="bg-gray-100 rounded-xl h-8" />)}
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <p className="text-6xl mb-4">😕</p>
                <h2 className="text-2xl font-black text-[#253D4E] mb-2">Product Not Found</h2>
                <Link href="/shop" className="text-[#3BB77E] font-bold hover:underline">← Back to Shop</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                <Link href="/" className="hover:text-[#3BB77E] transition-colors">Home</Link>
                <span>›</span>
                <Link href="/shop" className="hover:text-[#3BB77E] transition-colors">Shop</Link>
                <span>›</span>
                <span className="text-[#253D4E] font-semibold capitalize">{product.category}</span>
                <span>›</span>
                <span className="text-[#3BB77E] font-semibold line-clamp-1">{product.name}</span>
            </nav>

            <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 font-semibold mb-6 hover:text-[#3BB77E] transition-colors">
                <FiArrowLeft size={14} /> Back to Shop
            </Link>

            {/* Main Product Section */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#F4F6FA] rounded-3xl overflow-hidden relative aspect-square"
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.discount > 0 && (
                            <span className="bg-[#F59E0B] text-white text-xs font-black px-3 py-1 rounded-full">-{product.discount}%</span>
                        )}
                        {product.isNew && (
                            <span className="bg-[#3BB77E] text-white text-xs font-black px-3 py-1 rounded-full">NEW</span>
                        )}
                    </div>
                </motion.div>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-5"
                >
                    <div>
                        <p className="text-xs text-[#3BB77E] font-bold uppercase tracking-widest mb-2 capitalize">{product.category}</p>
                        <h1 className="text-3xl font-black text-[#253D4E] leading-tight mb-3">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        size={16}
                                        fill={i < Math.floor(product.rating) ? '#F59E0B' : '#E5E7EB'}
                                        className={i < Math.floor(product.rating) ? 'text-[#F59E0B]' : 'text-gray-200'}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-[#253D4E]">{product.rating}</span>
                            <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-black text-[#3BB77E]">${product.price.toFixed(2)}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-xl text-gray-300 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                        {product.discount > 0 && (
                            <span className="text-sm bg-[#F59E0B]/10 text-[#F59E0B] font-bold px-2.5 py-0.5 rounded-full">
                                Save {product.discount}%
                            </span>
                        )}
                    </div>

                    {/* Stock */}
                    <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-[#3BB77E]' : 'bg-red-400'}`} />
                        <span className={`text-sm font-bold ${product.inStock ? 'text-[#3BB77E]' : 'text-red-400'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    {product.description && (
                        <p className="text-sm text-gray-500 leading-relaxed border-l-4 border-[#3BB77E]/30 pl-4">
                            {product.description}
                        </p>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                            <span key={tag} className="bg-[#F4F6FA] text-gray-500 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                                {tag.replace('-', ' ')}
                            </span>
                        ))}
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
                            <button
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#3BB77E] hover:bg-[#F4F6FA] transition-colors"
                            >
                                <FiMinus size={14} />
                            </button>
                            <span className="w-12 text-center font-black text-[#253D4E] text-lg">{qty}</span>
                            <button
                                onClick={() => setQty(qty + 1)}
                                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#3BB77E] hover:bg-[#F4F6FA] transition-colors"
                            >
                                <FiPlus size={14} />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-black text-sm transition-all ${addedToCart
                                    ? 'bg-[#253D4E] text-white'
                                    : 'bg-[#3BB77E] hover:bg-[#2a9c65] text-white hover:scale-105 hover:shadow-xl hover:shadow-[#3BB77E]/30'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            <FiShoppingCart size={16} />
                            {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                        </button>

                        <button className="w-11 h-11 border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-300 transition-all">
                            <FiHeart size={18} />
                        </button>
                        <button className="w-11 h-11 border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#3BB77E] hover:border-[#3BB77E]/50 transition-all">
                            <FiShare2 size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Tabs: Description / Reviews */}
            <div className="mb-16">
                <div className="flex border-b border-gray-200 mb-8 gap-8">
                    {(['description', 'reviews'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-bold capitalize transition-all border-b-2 -mb-px ${activeTab === tab
                                    ? 'border-[#3BB77E] text-[#3BB77E]'
                                    : 'border-transparent text-gray-400 hover:text-[#253D4E]'
                                }`}
                        >
                            {tab === 'reviews' ? `Reviews (${product.reviews})` : tab}
                        </button>
                    ))}
                </div>
                {activeTab === 'description' ? (
                    <p className="text-gray-500 leading-relaxed max-w-3xl">
                        {product.description || `${product.name} is a premium quality ${product.category} product, carefully selected to ensure maximum freshness and nutritional value. Our commitment to quality means you always get the best produce delivered to your door.`}
                    </p>
                ) : (
                    <div className="space-y-4 max-w-3xl">
                        {[{ name: 'Sarah M.', rating: 5, text: 'Absolutely love this product! Fresh and high quality.', date: 'Jan 15, 2026' }, { name: 'James K.', rating: 4, text: 'Great value for money. Will definitely order again.', date: 'Feb 2, 2026' }].map((r, i) => (
                            <div key={i} className="bg-[#F4F6FA] rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-9 h-9 rounded-full bg-[#3BB77E] text-white flex items-center justify-center font-black text-sm">{r.name[0]}</div>
                                    <div>
                                        <p className="font-bold text-sm text-[#253D4E]">{r.name}</p>
                                        <p className="text-xs text-gray-400">{r.date}</p>
                                    </div>
                                    <div className="ml-auto flex">
                                        {[...Array(5)].map((_, j) => <FiStar key={j} size={13} fill={j < r.rating ? '#F59E0B' : '#E5E7EB'} className={j < r.rating ? 'text-[#F59E0B]' : 'text-gray-200'} />)}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">{r.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Related Products */}
            {related.length > 0 && (
                <div>
                    <h2 className="text-2xl font-black text-[#253D4E] mb-8">Related Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {related.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                </div>
            )}
        </div>
    );
}
