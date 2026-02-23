import { container, wordVariants } from "@/utils/animation";
import { cn } from "@/utils/utils";
import { AnimatePresence, motion } from "framer-motion";
 

type Props = {
  title: string;
  index: number;
  className?: string;
  maxWords?: number;
  shadow?: string;
};

export default function AnimatedTitle({
  title,
  index,
  className,
  maxWords = 18,
  shadow,
}: Props) {
  const words = title.split(" ");

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={index}
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
        className={cn(` flex flex-wrap gap-2  overflow-visible `, className)}
      >
        {words.slice(0, maxWords).map((word, i) => (
          <motion.span
            className={shadow && `${shadow}`}
            key={i}
            variants={wordVariants}
            transition={{
              delay: Math.random() * 0.3,
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            {word}
          </motion.span>
        ))}
        {words.length <= maxWords ? "" : "..."}
      </motion.div>
    </AnimatePresence>
  );
}
