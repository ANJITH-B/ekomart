import { AnimatePresence, motion } from "framer-motion"
import { navLinks } from "./data"
import Link from "next/link"
import { FiSearch } from "react-icons/fi"

interface Props {
    isMobileOpen: boolean;
    setIsMobileOpen: (value: boolean) => void;
}

export const MobileMenu = ({isMobileOpen, setIsMobileOpen} : Props) => {
    return(
        <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b shadow-lg overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-3">
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                <input
                                    type="text"
                                    placeholder="Search for items..."
                                    className="flex-1 px-3 py-2 text-sm outline-none"
                                />
                                <button className="bg-[#3BB77E] text-white px-3 py-2">
                                    <FiSearch size={16} />
                                </button>
                            </div>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="block py-2 px-2 text-gray-700 font-semibold border-b border-gray-50 hover:text-[#3BB77E] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
    )
}