"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AnimatedTitle from "./Tittle";
import Slider from "./slider";
import { FiArrowRight } from "react-icons/fi";
import { HeroSlide } from "@/data/banner";

const Carousel = ({ event }: { event: HeroSlide[] }) => {
  const [index, setIndex] = useState(0);
  const isNavigatingRef = useRef(false); // synchronous lock
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = useCallback(
    (direction: "next" | "prev") => {
      if (isNavigatingRef.current) return;

      isNavigatingRef.current = true;
      setIndex((prev) =>
        direction === "next"
          ? (prev + 1) % event.length
          : (prev - 1 + event.length) % event.length,
      );

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
      }, 800);
    },
    [event.length],
  );

  useEffect(() => {
    const interval = setInterval(() => goToSlide("next"), 6000);
    return () => clearInterval(interval);
  }, [goToSlide]);

  return (
    <div className="bg-black h-96  w-screen flex relative overflow-hidden padding ">
      <div className="max-w-7xl mx-auto px-4 w-full h-full flex flex-col gap-3 z-20">
        <div className="w-1/2 h-fit relative">
          <AnimatedTitle
            shadow="[text-shadow:_0px_0px_26px_rgba(0,0,0,0.6)]"
            title={event[index].title}
            index={index}
            className="absolute top-15 md:top-14 w-full   text-white font-extralight text-2xl md:text-4xl xl:text-5xl leading-6 md:leading-11 xl:leading-13 "
          />
        </div>
        <div className="flex flex-col gap-2 w-[50%] md:w-[30%]  md:gap-4 absolute bottom-0 md:top-60">
          <AnimatedTitle
            shadow="[text-shadow:_0px_0px_26px_rgba(0,0,0,0.6)]"
            title={event[index].description}
            index={index}
            maxWords={10}
            className="absolute -top-20 md:-top-10 w-full   text-white font-extralight leading-3"
          />

          <span
            className="mb-20 md:mt-10 w-fit flex items-center gap-2 bg-white text-[#253D4E] font-bold px-6 py-2.5 rounded-full text-sm hover:bg-[#3BB77E] hover:text-white transition-all duration-300"
          >
            Shop Now <FiArrowRight />
          </span>
        </div>
      </div>
      <div className="absolute w-full h-full z-10">
        <Slider images={event.map((e) => e.image)} index={index} />
      </div>
    </div>
  );
};

export default Carousel;
