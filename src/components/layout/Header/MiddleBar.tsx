import Link from "next/link";
import { FiChevronDown, FiHeart, FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import Image from "next/image";
import logo from "../../../../public/logo-02.svg";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    isMobileOpen: boolean;
    setIsMobileOpen: (isMobileOpen: boolean) => void;
    cartCount?: number

}

const middleBarItems = [
    {
        icon: <FiUser size={22} />,
        label: "Account",
        href: "/account",
    },
    {
        icon: <FiHeart size={22} />,
        label: "Wishlist",
        href: "/wishlist",
    },
    {
        icon: <FiShoppingCart size={22} />,
        label: "Cart",
        href: "/cart",
    },
]

export const MiddleBar = ({ isMobileOpen, setIsMobileOpen, cartCount = 2 }: Props) => {
    return (
        <div className=" border-b border-gray-300 py-3">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Image src={logo} alt="Logo" width={150} height={150} />
                </Link>
                <div className="flex-1 flex items-center bg-white rounded-lg overflow-hidden max-w-2xl">
                    <div className="relative hidden md:block shrink-0" >
                        <button
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border-r border-gray-200 hover:text-[#3BB77E] transition-colors whitespace-nowrap"
                        >
                            Categories
                            <FiChevronDown size={14} />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for items..."
                        className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none bg-transparent"
                    />
                    <button className="px-2 text-gray-400 hover:text-gray-600">
                        <FiX size={16} />
                    </button>
                    <button className="bg-[#629D23] hover:bg-[#1F1F25] text-white px-5 py-2 flex items-center gap-2 text-sm font-semibold transition-colors m-1.5 rounded-sm">
                        <FiSearch size={16} />
                        <span className="hidden sm:inline">Search</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    {middleBarItems.map((item, index) => (
                        <button key={index} className="hidden md:flex flex-row items-center gap-2 group bg-white rounded-lg px-5 py-2">

                            <div className="relative">
                                {item.icon}
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#3BB77E] text-white text-xs w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold" style={{ width: 18, height: 18, fontSize: 10 }}>
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs">{item.label}</span>
                        </button>
                    ))}

                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="md:hidden text-gray-600 hover:text-[#3BB77E] transition-colors"
                    >
                        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>
        </div>
    );
};