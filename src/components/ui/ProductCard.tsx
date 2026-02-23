'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';
import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        setAddedToCart(true);
        await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
            }),
        });
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <motion.div
            className="bg-white rounded-2xl border border-gray-100 hover:border-[#629D23]/30   transition-all duration-300 group overflow-hidden product-card relative"
        >
            <Link href={`/shop/${product.slug}`}>
                {/* Image Container */}
                <div className="relative bg-[#F4F6FA] overflow-hidden" style={{ paddingBottom: '80%' }}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.discount > 0 && (
                            <span className="bg-[#F59E0B] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                                -{product.discount}%
                            </span>
                        )}
                        {product.isNew && (
                            <span className="bg-[#629D23] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                                NEW
                            </span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 product-actions">
                        <button
                            onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
                            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-500 hover:text-red-500'
                                }`}
                        >
                            <FiHeart size={14} fill={isWishlisted ? 'white' : 'none'} />
                        </button>
                        <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-[#629D23] transition-colors">
                            <FiEye size={14} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Category */}
                    <p className="text-xs text-[#629D23] font-semibold uppercase tracking-wider mb-1 capitalize">
                        {product.category}
                    </p>

                    {/* Name */}
                    <h3 className="text-sm font-bold text-[#253D4E] line-clamp-2 mb-2 group-hover:text-[#629D23] transition-colors leading-tight">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <FiStar
                                key={i}
                                size={12}
                                className={i < Math.floor(product.rating) ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-gray-200 fill-gray-200'}
                                fill={i < Math.floor(product.rating) ? '#F59E0B' : '#E5E7EB'}
                            />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-lg font-black text-[#629D23]">${product.price.toFixed(2)}</span>
                            {product.originalPrice > product.price && (
                                <span className="text-xs text-gray-400 line-through ml-1.5">${product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full transition-all ${addedToCart
                                    ? 'bg-[#253D4E] text-white'
                                    : 'bg-[#629D23] hover:bg-[#629D23]/80 border hover:border-[#629D23] text-white'
                                }`}
                        >
                            <FiShoppingCart size={13} />
                            {addedToCart ? 'Added!' : 'Add'}
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
