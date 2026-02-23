'use client';

import { motion } from 'framer-motion';
import happy from '../../../public/support/happy.svg'
import home from '../../../public/support/home.svg'
import location from '../../../public/support/location.svg'
import payment from '../../../public/support/payment.svg'
import Image from 'next/image';

const features = [
    {
        icon: home,
        title: 'Free Delivery',
        description: 'Free delivery for all orders over $50',
        color: 'text-[#3BB77E]',
        bg: 'bg-[#EEF9F4]',
    },
    {
        icon: location,
        title: 'Easy Returns',
        description: '30 day return policy for any reason',
        color: 'text-[#F59E0B]',
        bg: 'bg-[#FEF3E2]',
    },
    {
        icon: payment,
        title: 'Secure Payment',
        description: '100% secure transactions guaranteed',
        color: 'text-[#6366F1]',
        bg: 'bg-[#EEF2FF]',
    },
    {
        icon: happy,
        title: '24/7 Support',
        description: 'Dedicated expert support anytime',
        color: 'text-[#EC4899]',
        bg: 'bg-[#FDF2F8]',
    },
];

export default function ServiceFeatures() {
    return (
        <section className="bg-white border-t border-b border-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((feat, idx) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="flex items-center gap-4"
                        >
                            <div className={` bg-[#629D23]/5 w-14 h-14 rounded-full flex items-center justify-center border border-[#629D23]`}>
                                <Image src={feat.icon} alt={feat.title} width={24} height={24} className={feat.color} />
                            </div>
                            <div>
                                <h4 className="font-black text-[#253D4E] text-sm">{feat.title}</h4>
                                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{feat.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
