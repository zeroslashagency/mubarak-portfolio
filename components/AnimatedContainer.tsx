"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  animateOnHover?: boolean;
  animateOnScroll?: boolean;
  animateOnLoad?: boolean;
  glowEffect?: boolean;
  rotateEffect?: boolean;
  enterAnimation?:
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "zoom"
    | "none";
  exitAnimation?:
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "zoom"
    | "none";
  delay?: number;
  duration?: number;
  rotateAmount?: number;
  hoverScale?: number;
  glowColor?: string;
  glowIntensity?: number;
}

export default function AnimatedContainer({
  children,
  className = "",
  wrapperClassName = "",
  animateOnHover = true,
  animateOnScroll = false,
  animateOnLoad = true,
  glowEffect = true,
  rotateEffect = true,
  enterAnimation = "slide-up",
  exitAnimation = "fade",
  delay = 0,
  duration = 0.5,
  rotateAmount = 2,
  hoverScale = 1.02,
  glowColor = "rgba(244, 162, 97, 0.4)",
  glowIntensity = 10,
}: AnimatedContainerProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current || !animateOnHover) return;

    const rect = boxRef.current.getBoundingClientRect();

    // Calculate mouse position relative to the box (0-1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  // For transformations, use CSS transform string instead of separate rotateX/Y properties
  const getTransform = () => {
    if (!isHovered || !rotateEffect) return "";

    const rotX = rotateAmount * (0.5 - mousePosition.y) * 2;
    const rotY = rotateAmount * (mousePosition.x - 0.5) * 2;

    return `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  // Calculate shadow offset based on mouse position for 3D effect
  const shadowX = isHovered && rotateEffect ? (mousePosition.x - 0.5) * 10 : 0;
  const shadowY = isHovered && rotateEffect ? (mousePosition.y - 0.5) * 10 : 0;

  // Calculate the glow position based on mouse position
  const glowX = mousePosition.x * 100;
  const glowY = mousePosition.y * 100;

  const glowStyle =
    isHovered && glowEffect
      ? {
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}, transparent ${glowIntensity * 3}%)`,
          opacity: 0.7,
        }
      : {
          opacity: 0,
        };

  // Define initial animation based on enterAnimation type
  const getInitialAnimation = () => {
    if (!animateOnLoad) return {};

    switch (enterAnimation) {
      case "fade":
        return { opacity: 0 };
      case "slide-up":
        return { opacity: 0, y: 30 };
      case "slide-down":
        return { opacity: 0, y: -30 };
      case "slide-left":
        return { opacity: 0, x: 30 };
      case "slide-right":
        return { opacity: 0, x: -30 };
      case "zoom":
        return { opacity: 0, scale: 0.8 };
      case "none":
      default:
        return {};
    }
  };

  // Define animate values to reset the initial animation
  const getAnimateValues = () => {
    const baseValues = {
      transform: getTransform(),
      boxShadow:
        isHovered && rotateEffect
          ? `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.1)`
          : "0px 0px 0px rgba(0, 0, 0, 0.1)",
    };

    switch (enterAnimation) {
      case "fade":
        return { ...baseValues, opacity: 1 };
      case "slide-up":
      case "slide-down":
        return { ...baseValues, opacity: 1, y: 0 };
      case "slide-left":
      case "slide-right":
        return { ...baseValues, opacity: 1, x: 0 };
      case "zoom":
        return { ...baseValues, opacity: 1, scale: 1 };
      case "none":
      default:
        return baseValues;
    }
  };

  // Get hover animation
  const getHoverAnimation = () => {
    if (!animateOnHover) return {};

    return {
      scale: hoverScale,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    };
  };

  return (
    <div className={`${wrapperClassName}`}>
      <motion.div
        ref={boxRef}
        className={`relative ${className}`}
        initial={getInitialAnimation()}
        animate={getAnimateValues()}
        whileHover={getHoverAnimation()}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: delay,
          duration: duration,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow effect layer */}
        {glowEffect && (
          <div
            className="absolute inset-0 rounded-xl transition-opacity duration-300"
            style={glowStyle}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
}
