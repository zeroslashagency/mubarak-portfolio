"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedBoxProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  hoverScale?: number;
  rotateAmount?: number;
  glowColor?: string;
  glowIntensity?: number;
}

export default function AnimatedBox({
  children,
  className = "",
  borderColor = "rgba(224, 123, 95, 0.12)",
  hoverScale = 1.02,
  rotateAmount = 20,
  glowColor = "rgba(244, 162, 97, 0.4)",
  glowIntensity = 10,
}: AnimatedBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;

    const rect = boxRef.current.getBoundingClientRect();

    // Calculate mouse position relative to the box (0-1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  // For transformations, use CSS transform string instead of separate rotateX/Y properties
  const getTransform = () => {
    if (!isHovered) return "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    const rotX = rotateAmount * (0.5 - mousePosition.y) * 2;
    const rotY = rotateAmount * (mousePosition.x - 0.5) * 2;

    return `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  // Calculate shadow offset based on mouse position for 3D effect
  const shadowX = isHovered ? (mousePosition.x - 0.5) * 10 : 0;
  const shadowY = isHovered ? (mousePosition.y - 0.5) * 10 : 0;

  // Calculate the glow position based on mouse position
  const glowX = mousePosition.x * 100;
  const glowY = mousePosition.y * 100;

  const glowStyle = isHovered
    ? {
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}, transparent ${glowIntensity * 3}%)`,
        opacity: 0.7,
      }
    : {
        opacity: 0,
      };

  return (
    <motion.div
      ref={boxRef}
      className={`relative rounded-xl border bg-background/50 backdrop-blur-sm overflow-hidden ${className}`}
      style={{
        borderColor,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transform: getTransform(),
        boxShadow: isHovered
          ? `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.1)`
          : "0px 0px 0px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: hoverScale }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E07A5F]/5 to-[#F4A261]/5 rounded-xl" />

      {/* Interactive glow effect */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={glowStyle}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
