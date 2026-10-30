"use client";

import { motion } from "framer-motion";

interface WaveTextProps {
  text: string;
  className?: string;
}

export function WaveText({ text, className = "" }: WaveTextProps) {
  return (
    <div className={className} suppressHydrationWarning>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 1 }}
          animate={{
            opacity: [1, 1, 1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
          }}
          className="inline-block text-white"
          style={{
            textShadow:
              "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)",
          }}
          suppressHydrationWarning
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
