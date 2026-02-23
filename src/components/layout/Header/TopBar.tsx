import { FiMapPin, FiPhone } from "react-icons/fi";


export const TopBar = () => {
    return (
        <div className=" text-white text-sm py-2 hidden md:block border-b border-gray-300">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5">
                        <FiMapPin size={13} />
                        <span className="">FREE delivery & 40% Discount for next 3 orders! Place your 1st order in. Sorry, your session has expired.</span>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Need help ?</span>
                    <FiPhone size={14} />
                    <span className="font-semibold">+25896 3158 3228</span>
                </div>
            </div>
        </div>
    );
};