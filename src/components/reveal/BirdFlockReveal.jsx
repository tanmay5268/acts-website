import { motion } from "framer-motion";
import Lottie from "lottie-react";
import birdData from "../../assets/birds.json";

const BIRD_COUNT = 20;

export default function BirdFlockReveal() {
  return (
    <motion.div
      className="fixed top-0 left-0 w-screen h-screen z-30 pointer-events-none"
      initial={{ x: "-20vw" }}
      animate={{ x: "120vw" }}
      transition={{
        duration: 2.6,
        ease: "easeInOut"
      }}
    >
      {Array.from({ length: BIRD_COUNT }).map((_, i) => {
        const yOffset = (i / BIRD_COUNT) * 80 + 10; // spread vertically
        const scale = 0.8 + Math.random() * 0.25;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: `${yOffset}vh`, left: `${i * 60}px` }}
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 3 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div style={{ transform: `scale(${scale})` }}>
                <div className="absolute w-22 h-22">
              <Lottie
                animationData={birdData}
                loop
                autoplay
              />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
