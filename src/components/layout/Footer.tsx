'use client';

import Link from 'next/link';
import { FiPhone, FiMapPin, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';
import Image from 'next/image';
import logo from '../../../public/logo-02.svg';

const footerLinks = {
    'Our Stores': [
        { label: 'Delivery Information', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms & Conditions', href: '#' },
        { label: 'Support Center', href: '#' },
        { label: 'Careers', href: '#' },
    ],
    'Shop Categories': [
        { label: 'Fresh Vegetables', href: '/shop?cat=vegetable' },
        { label: 'Fresh Fruits', href: '/shop?cat=fruits' },
        { label: 'Dairy Products', href: '/shop?cat=dairy' },
        { label: 'Bakery & Bread', href: '/shop?cat=bakery' },
        { label: 'Beverages', href: '/shop?cat=beverages' },
    ],
    'My Account': [
        { label: 'Sign In', href: '#' },
        { label: 'View Cart', href: '/cart' },
        { label: 'Wishlist', href: '#' },
        { label: 'Track My Order', href: '#' },
        { label: 'Help', href: '#' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[#1F1F25] text-gray-300">
            <div className="py-14">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2">
                        <Image src={logo} alt="Logo" width={150} height={150} className='pb-4'/>
                        <p className="text-sm leading-relaxed mb-5 text-gray-400 ">
                            Ekomart is your one-stop destination for fresh, organic groceries. We deliver quality produce, dairy, bakery, and more right to your door.
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-3">
                                <FiMapPin className="text-[#3BB77E] mt-0.5 " />
                                <span>258 Daniel Street, 2589 Phones Line Berlin, Germany</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiPhone className="text-[#3BB77E] " />
                                <a href="tel:+258963158322" className="hover:text-[#3BB77E] transition-colors">+25896 3158 3228</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiMail className="text-[#3BB77E] " />
                                <a href="mailto:info@ekomart.com" className="hover:text-[#3BB77E] transition-colors">info@ekomart.com</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                            {[FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-[#1a2e3b] hover:bg-[#3BB77E] flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-white font-bold text-base mb-4">{title}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-[#3BB77E] transition-colors flex items-center gap-1"
                                        >
                                            <span className="text-[#3BB77E] text-xs">›</span> {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[#1a2e3b] py-5">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-gray-400">
                        &copy; 2025 <Link href="/" className="text-[#3BB77E] hover:underline font-semibold">Ekomart</Link>. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        {['visa', 'mastercard', 'paypal', 'amex', 'stripe'].map((pay) => (
                            <div key={pay} className="bg-white/10 rounded px-3 py-1 text-xs text-white font-bold uppercase tracking-wide">
                                {pay}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
