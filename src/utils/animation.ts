export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // delay between words
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1, // reverse order
    },
  },
};

export const wordVariants = {
  hidden: { opacity: 0.5, filter: "blur(10px)" },
  show: { opacity: 1, filter: "blur(0px)" },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    transition: { delay: Math.random() * 0.1, duration: 0.5 },
  },
};
