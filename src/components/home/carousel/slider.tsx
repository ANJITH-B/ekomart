"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/utils";

type Props = {
  images: (string | StaticImageData)[];
  index: number;
  className?: string;
};

const Slider = ({ images, index, className }: Props) => {
  return (
    <div
      className={cn(
        "w-full h-full relative  overflow-hidden z-40",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={index}
          className="absolute inset-0 overflow-hidden z-20"
          initial={{
            opacity: 0,
            backdropFilter: "blur(14px)",
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(14px)",
          }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <Image
            src={images[index]}
            alt={`Slide ${index}`}
            fill
            className="object-cover w-full "
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Slider;
