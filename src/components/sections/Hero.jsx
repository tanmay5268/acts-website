import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-20">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
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
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
              <span className="font-display text-4xl font-bold tracking-widest overflow-visible">
                ACTS
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
