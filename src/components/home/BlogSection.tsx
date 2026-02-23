'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogs } from '@/data/blogs';
import { FiArrowRight, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { BiPlus } from 'react-icons/bi';

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};
const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <h2 className="text-3xl font-black text-[#253D4E]">Latest Blog Post Insights</h2>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-7"
            >
                {blogs.map((blog) => (
                    <motion.article key={blog.id} variants={item}>
                        <Link href={`/blog/${blog.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 border border-gray-100 hover:border-[#3BB77E]/30">
                            {/* Image */}
                            <div className="relative overflow-hidden" style={{ paddingBottom: '60%' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                    <span className="flex items-center gap-1"><FiCalendar size={11} /> {blog.date}</span>
                                    <span className="flex items-center gap-1"><FiClock size={11} /> {blog.readTime}</span>
                                </div>

                                <h3 className="font-black text-[#253D4E] text-base mb-2 line-clamp-2 leading-snug group-hover:text-[#3BB77E] transition-colors">
                                    {blog.title}
                                </h3>

                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                                    {blog.excerpt}
                                </p>

                                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                                    <span className="text-xs font-bold text-[#3BB77E] flex items-center gap-2">
                                        <BiPlus size={20}  className='bg-[#3BB77E]/10 rounded-full p-1'/>
                                        Read Details 
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    );
}
