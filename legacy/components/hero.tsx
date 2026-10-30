"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedButton from "./animated-button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1625]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1625] to-[#2a2438]" />

        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-2"
            >
              <div className="mb-2 text-sm tracking-[0.2em] text-gray-400 uppercase">
                Welcome to
              </div>
              <div className="relative">
                <h1 className="font-sans text-6xl font-black tracking-tight text-gray-400/80">
                  PORTFOLIO
                </h1>
              </div>
              <div className="relative">
                <h2 className="font-sans text-5xl font-black tracking-tight text-gray-400/80">
                  OF MINE
                </h2>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 mt-8 mb-8"
            >
              Full Stack Developer specializing in modern web technologies
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <AnimatedButton variant="primary">View Projects</AnimatedButton>
              <AnimatedButton variant="secondary">Contact Me</AnimatedButton>
              <AnimatedButton variant="outline">Download Resume</AnimatedButton>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E07A5F] to-[#F4A261] rounded-full blur-3xl opacity-20" />

              <div className="relative rounded-full overflow-hidden border-4 border-white/10">
                <Image
                  src="/profile.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
