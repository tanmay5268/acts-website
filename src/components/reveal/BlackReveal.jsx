import { motion } from "framer-motion";

export default function BlackReveal({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-20"
      initial={{ x: 0 }}
      animate={{ x: "100vw" }}
      transition={{
        duration: 2.6,
        ease: "easeInOut"
      }}
      onAnimationComplete={onComplete}
    />
  );
}
