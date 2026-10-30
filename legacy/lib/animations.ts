/**
 * Modern Animation Utilities for Portfolio
 * Reusable Framer Motion variants and configurations
 */

import { Variants } from "framer-motion";

// Easing functions
export const easing = {
    smooth: [0.6, 0.05, 0.01, 0.9],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.175, 0.885, 0.32, 1.275],
    snappy: [0.25, 0.46, 0.45, 0.94],
};

// Fade animations
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing.smooth,
        },
    },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: easing.smooth,
        },
    },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: easing.smooth,
        },
    },
};

// Scale animations
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: easing.bounce,
        },
    },
};

// Stagger container
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Card hover effect with 3D tilt
export const cardHover = {
    rest: {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        transition: {
            duration: 0.3,
            ease: easing.smooth,
        },
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3,
            ease: easing.smooth,
        },
    },
};

// Magnetic effect
export const magneticHover = {
    rest: { x: 0, y: 0 },
    hover: (custom: { x: number; y: number }) => ({
        x: custom.x * 0.3,
        y: custom.y * 0.3,
        transition: {
            duration: 0.3,
            ease: easing.elastic,
        },
    }),
};

// Gradient text animation
export const gradientText: Variants = {
    hidden: {
        backgroundPosition: "0% 50%",
    },
    visible: {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "linear",
        },
    },
};

// Float animation
export const floatAnimation = {
    y: [0, -20, 0],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: easing.smooth,
    },
};

// Pulse animation
export const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: easing.smooth,
    },
};

// Slide in from left
export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: easing.smooth,
        },
    },
};

// Slide in from right
export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: easing.smooth,
        },
    },
};

// Rotate in
export const rotateIn: Variants = {
    hidden: { opacity: 0, rotate: -180, scale: 0 },
    visible: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: easing.bounce,
        },
    },
};

// Glow effect (for use with custom CSS)
export const glowHover = {
    rest: {
        filter: "brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))",
    },
    hover: {
        filter: "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.5))",
        transition: {
            duration: 0.3,
        },
    },
};

// Page transition
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: easing.smooth,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4,
            ease: easing.smooth,
        },
    },
};

// Typewriter effect helper
export const typewriterVariants: Variants = {
    hidden: { width: 0 },
    visible: {
        width: "100%",
        transition: {
            duration: 2,
            ease: "linear",
        },
    },
};
