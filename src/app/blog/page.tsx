import Link from 'next/link';
import { FiCalendar, FiClock, FiUser, FiArrowRight } from 'react-icons/fi';
import { blogs } from '@/data/blogs';

export const metadata = {
    title: 'Blog | Ekomart',
    description: 'Read the latest grocery tips, healthy eating guides, and organic food news from Ekomart.',
};

export default function BlogPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="text-center mb-12">
                <p className="text-sm text-[#3BB77E] font-semibold uppercase tracking-widest mb-2">From our journal</p>
                <h1 className="text-4xl font-black text-[#253D4E] mb-3">Latest Blog Posts</h1>
                <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
                    Tips on healthy eating, organic living, and getting the most out of your grocery shopping experience.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {blogs.map((blog) => (
                    <Link
                        key={blog.id}
                        href={`/blog/${blog.slug}`}
                        className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#3BB77E]/30"
                    >
                        <div className="relative overflow-hidden" style={{ paddingBottom: '60%' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <span className="absolute top-3 left-3 bg-[#3BB77E] text-white text-xs font-bold px-3 py-1 rounded-full">
                                {blog.category}
                            </span>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                <span className="flex items-center gap-1"><FiCalendar size={11} /> {blog.date}</span>
                                <span className="flex items-center gap-1"><FiClock size={11} /> {blog.readTime}</span>
                            </div>
                            <h2 className="font-black text-[#253D4E] text-lg mb-2 line-clamp-2 leading-snug group-hover:text-[#3BB77E] transition-colors">
                                {blog.title}
                            </h2>
                            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">
                                {blog.excerpt}
                            </p>
                            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                                <div className="flex items-center gap-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={blog.authorImage} alt={blog.author} className="w-8 h-8 rounded-full object-cover" />
                                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                                        <FiUser size={10} /> {blog.author}
                                    </span>
                                </div>
                                <span className="text-xs font-bold text-[#3BB77E] flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Read Details <FiArrowRight size={12} />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
