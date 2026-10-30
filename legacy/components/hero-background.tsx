"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";

export function HeroBackground({ className }: { className?: string }) {
    const isClient = useIsClient();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { width, height } = containerRef.current.getBoundingClientRect();
        const x = (clientX / width) - 0.5;
        const y = (clientY / height) - 0.5;
        setMousePosition({ x, y });
    };

    if (!isClient) return null;

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 overflow-hidden -z-10", className)}
            onMouseMove={handleMouseMove}
        >
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

            {/* Vibrant Orbs */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px]"
                animate={{
                    x: mousePosition.x * -20,
                    y: mousePosition.y * -20,
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[100px]"
                animate={{
                    x: mousePosition.x * -30,
                    y: mousePosition.y * -30,
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            {/* The "Reddy" Element - Vibrant Pink/Red Orb */}
            <motion.div
                className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#d6665d]/15 blur-[80px]"
                animate={{
                    x: mousePosition.x * -40,
                    y: mousePosition.y * -40,
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <FloatingParticle key={i} index={i} mousePosition={mousePosition} />
                ))}
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        </div>
    );
}

function FloatingParticle({ index, mousePosition }: { index: number; mousePosition: { x: number; y: number } }) {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const size = Math.random() * 4 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    return (
        <motion.div
            className="absolute rounded-full bg-foreground/10"
            style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                width: size,
                height: size,
            }}
            animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
            }}
        />
    );
}
