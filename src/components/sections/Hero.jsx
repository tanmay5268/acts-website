import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import birdAnimation from "../../assets/birds.json";

const BIRD_COUNT = 14;

export default function Hero() {
  const [revealDone, setRevealDone] = useState(false);
  const birdRefs = useRef([]);

  // -------- FLOCK SETUP --------
  const birds = useRef(
    Array.from({ length: BIRD_COUNT }).map((_, i) => ({
      id: i,

      // slightly bigger birds
      size: 140 + Math.random() * 50,

      // spread from top → bottom
      y: (i / (BIRD_COUNT - 1)) * 100 + (Math.random() * 2 - 1),

      // random animation start
      startFrame: Math.floor(Math.random() * 120),

      // random drift phase
      phase: Math.random() * Math.PI * 2,

      // slight speed randomness
      duration: 3.8 + Math.random() * 0.6
    }))
  );

  // -------- START LOTTIE RANDOMLY --------
  useEffect(() => {
    birdRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.setSpeed(0.65); // slower wing flap
        ref.goToAndPlay(birds.current[i].startFrame, true);
      }
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* -------- BIRD FLOCK -------- */}
      {!revealDone && (
        <div className="fixed inset-0 z-[70] pointer-events-none">
          {birds.current.map((bird, i) => (
            <motion.div
              key={bird.id}
              className="absolute"
              style={{
                top: `${bird.y}%`,
                left: "-12%",
                width: bird.size,
                height: bird.size
              }}
              initial={{ x: 0 }}
              animate={{ x: "130vw" }}
              transition={{
                duration: bird.duration,
                ease: "linear"
              }}
            >
              {/* gentle vertical drift */}
              <motion.div
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 3 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Lottie
                  lottieRef={(el) => (birdRefs.current[i] = el)}
                  animationData={birdAnimation}
                  autoplay
                  loop
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* -------- BLACK REVEAL SCREEN -------- */}
      {!revealDone && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black"
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3.6, ease: "easeInOut" }}
          onAnimationComplete={() => setRevealDone(true)}
        />
      )}

      {/* -------- HERO CONTENT -------- */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="flex flex-col-reverse md:flex-row items-center gap-20">

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{
                opacity: revealDone ? 1 : 0,
                x: revealDone ? 0 : -40
              }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <h1
                className="
                  font-display font-extrabold tracking-tight
                  leading-none
                  text-[clamp(2.8rem,6vw,5rem)]
                  sm:text-[clamp(3.2rem,7vw,6rem)]
                  md:text-[clamp(3.8rem,7.5vw,7rem)]
                  lg:text-[clamp(4.5rem,6vw,16rem)]
                "
              >
                <span className="block py-4 -mb-12 text-white/90">
                  Association of
                </span>

                <span
                  className="
                    block py-8 -mb-12
                    bg-gradient-to-r from-[#8369f3] to-[#81d2e6]
                    bg-clip-text text-transparent
                    drop-shadow-[0_0_25px_rgba(129,210,230,0.35)]
                  "
                >
                  Computing Technology
                </span>

                <span className="block py-4 text-white/90">
                  and Science
                </span>
              </h1>
            </motion.div>

            {/* LOGO */}
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              animate={{ y: revealDone ? [0, -10, 0] : 0 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div
                className="
                  w-64 sm:w-72 md:w-80 lg:w-96 aspect-square
                  rounded-2xl
                  bg-black/40 backdrop-blur
                  border border-white/10
                  flex items-center justify-center
                  shadow-[0_0_90px_rgba(129,210,230,0.25)]
                "
              >
                <span className="font-display text-4xl font-bold tracking-widest backgroundColor-white">
                  ACTS
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}