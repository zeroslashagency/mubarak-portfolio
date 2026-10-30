"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export default function AnimatedButton({
  children,
  onClick,
  className = "",
  variant = "primary",
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-[#E07A5F] to-[#F4A261] text-white";
      case "secondary":
        return "bg-white/10 text-white backdrop-blur-sm";
      case "outline":
        return "border-2 border-white/20 text-white";
      default:
        return "bg-gradient-to-r from-[#E07A5F] to-[#F4A261] text-white";
    }
  };

  return (
    <div className="relative group">
      <motion.div
        className={`relative px-8 py-4 rounded-xl font-sans text-xl font-bold cursor-pointer ${getVariantStyles()} ${className}`}
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotateX: isHovered ? 15 : 0,
          rotateY: isHovered ? -15 : 0,
          translateZ: isHovered ? 20 : 0,
          boxShadow: isHovered
            ? "0 30px 60px rgba(0,0,0,0.3), 0 0 20px rgba(224,122,95,0.3)"
            : "0 10px 20px rgba(0,0,0,0.1)",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onClick={onClick}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#E07A5F]/20 to-[#F4A261]/20 rounded-xl blur-xl"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main button content */}
        <motion.div
          className="relative z-10"
          animate={{
            y: isHovered ? -4 : 0,
            translateZ: isHovered ? 30 : 0,
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {children}
        </motion.div>

        {/* Border effect */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-white/20"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
          animate={{
            x: isHovered ? ["-100%", "100%"] : "-100%",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
}
