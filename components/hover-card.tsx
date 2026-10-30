"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  rotateIntensity?: number;
  glowColor?: string;
  glowIntensity?: number;
  borderColor?: string;
}

export default function HoverCard({
  children,
  className = "",
  rotateIntensity = 10,
  glowColor = "rgba(244, 162, 97, 0.4)",
  glowIntensity = 15,
  borderColor = "rgba(224, 122, 95, 0.2)",
}: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [{ rotateX, rotateY }, setRotate] = useState({
    rotateX: 0,
    rotateY: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement over the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Get mouse position relative to card
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate rotation values
    // Higher rotateIntensity = more dramatic rotation
    const tiltX = ((y - 0.5) * rotateIntensity).toFixed(2);
    const tiltY = (-(x - 0.5) * rotateIntensity).toFixed(2);

    setRotate({
      rotateX: parseFloat(tiltX),
      rotateY: parseFloat(tiltY),
    });

    setMousePosition({ x, y });
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ rotateX: 0, rotateY: 0 });
  };

  // Calculate glow position based on mouse
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
    <div
      ref={cardRef}
      className={`relative rounded-xl border bg-card overflow-hidden ${className}`}
      style={{
        border: `1px solid ${borderColor}`,
        transition: "transform 0.1s ease, box-shadow 0.1s ease",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: isHovered
          ? `0px 10px 25px rgba(0, 0, 0, 0.1)`
          : "0px 0px 0px rgba(0, 0, 0, 0)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect layer */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={glowStyle}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
