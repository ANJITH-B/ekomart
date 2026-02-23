'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { CartItem } from '@/types';

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const res = await fetch('/api/cart');
            const data = await res.json();
            setCartItems(data.cart || []);
            setTotal(data.total || 0);
        } catch (err) {
            console.error('Failed to fetch cart:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (productId: string, delta: number) => {
        const item = cartItems.find((p) => p.productId === productId);
        if (!item) return;

        const newQty = Math.max(1, item.quantity + delta);
        if (newQty === item.quantity) return;

        // Simulate POST to update quantity
        await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity: delta }),
        });
        fetchCart();
    };

    const removeItem = async (productId: string) => {
        await fetch(`/api/cart?productId=${productId}`, { method: 'DELETE' });
        fetchCart();
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#3BB77E] border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 font-semibold tracking-wide">Loading your cart...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-black text-[#253D4E] mb-8">Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
                    <div className="w-20 h-20 bg-[#F4F6FA] rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiShoppingBag size={32} className="text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-black text-[#253D4E] mb-2">Your cart is currently empty</h2>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Let's find some amazing groceries for you!</p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-[#3BB77E] hover:bg-[#2a9c65] text-white font-black px-10 py-4 rounded-full transition-all hover:scale-105 shadow-xl shadow-[#3BB77E]/20"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence mode="popLayout">
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.productId}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 flex items-center gap-4 md:gap-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="relative w-20 h-20 md:w-28 md:h-28 bg-[#F4F6FA] rounded-xl overflow-hidden flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-[#253D4E] text-base md:text-lg hover:text-[#3BB77E] transition-colors leading-tight truncate">
                                            {item.name}
                                        </h3>
                                        <p className="text-[#3BB77E] font-bold mt-1">${item.price.toFixed(2)}</p>

                                        <div className="flex items-center gap-4 mt-4 md:hidden">
                                            <p className="text-sm font-black text-[#253D4E]">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center border-2 border-gray-100 rounded-full overflow-hidden bg-white">
                                            <button
                                                onClick={() => updateQuantity(item.productId, -1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#3BB77E] hover:bg-[#F4F6FA] transition-colors"
                                            >
                                                <FiMinus size={12} />
                                            </button>
                                            <span className="w-8 text-center font-black text-[#253D4E] text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#3BB77E] hover:bg-[#F4F6FA] transition-colors"
                                            >
                                                <FiPlus size={12} />
                                            </button>
                                        </div>

                                        <div className="hidden md:block w-24 text-right">
                                            <p className="text-xs text-gray-400 uppercase font-black mb-1">Total</p>
                                            <p className="font-black text-[#253D4E]">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.productId)}
                                            className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                            title="Remove Item"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <Link href="/shop" className="inline-flex items-center gap-2 text-[#3BB77E] font-bold hover:gap-3 transition-all mt-4">
                            <FiArrowLeft /> Continue Shopping
                        </Link>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-start-3">
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 sticky top-28 shadow-sm">
                            <h3 className="text-xl font-black text-[#253D4E] mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-[#253D4E]">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Shipping</span>
                                    <span className="font-bold text-[#3BB77E]">FREE</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Estimated Tax</span>
                                    <span className="font-bold text-[#253D4E]">$0.00</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-lg font-black text-[#253D4E]">Total</span>
                                    <span className="text-2xl font-black text-[#3BB77E]">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-[#3BB77E] hover:bg-[#2a9c65] text-white font-black py-4 rounded-full transition-all hover:shadow-xl hover:shadow-[#3BB77E]/20 text-sm">
                                    Proceed to Checkout
                                </button>
                                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
                                    Secure checkout powered by Stripe
                                </p>
                            </div>

                            {/* Promo Code */}
                            <div className="mt-10 border-t border-gray-50 pt-8">
                                <p className="text-xs font-black text-[#253D4E] uppercase tracking-wider mb-3">Apply Coupon</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="flex-1 bg-[#F4F6FA] border-none rounded-full px-4 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#3BB77E]/20"
                                    />
                                    <button className="bg-[#253D4E] text-white text-[10px] font-black uppercase px-4 py-2 rounded-full hover:bg-black transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
