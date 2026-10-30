"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedContactButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative perspective-1000"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        rotateX: isHovered ? 25 : 0,
        rotateY: isHovered ? -25 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative px-8 py-4 bg-gradient-to-r from-[#E07A5F] to-[#F4A261] rounded-xl text-white font-sans text-xl font-bold cursor-pointer"
        animate={{
          scale: isHovered ? 1.1 : 1,
          boxShadow: isHovered
            ? "0 30px 60px rgba(0,0,0,0.3), 0 0 20px rgba(224,122,95,0.3)"
            : "0 10px 20px rgba(0,0,0,0.1)",
          translateZ: isHovered ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-white/30 rounded-xl"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        />

        <motion.div
          className="relative z-10"
          animate={{
            y: isHovered ? -4 : 0,
            translateZ: isHovered ? 30 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          Contact Me
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-white/20"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            duration: 0.2,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
