import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import { navLinks } from "./data";


export const Navigater = () => {
    return (
        <div className="hidden md:block">
            <div className="max-w-7xl mx-auto px-4 flex items-center gap-8">


                {/* Nav Links */}
                <nav className="flex items-center gap-6">
                    {navLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.href}
                            className="text-white text-sm font-semibold py-3 border-b-2 border-transparent hover:border-white hover:text-white/90 transition-all"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-2 text-white/90 text-sm py-3">

                    <span className="flex items-center gap-1.5">
                        <FiMapPin size={13} />
                        <span className="font-semibold">258 Daniel Street, Berlin, Germany</span>

                    </span>

                </div>
            </div>
        </div>
    );
};