"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsClient } from "@/hooks/use-is-client";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HeroBackground } from "@/components/hero-background";

export default function RedesignedHero() {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isClient = useIsClient();

  // Safe scroll progress - only run on client
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "mailto:mr1398463@gmail.com";
    }
  };

  // Typing effect for the role
  const roles = [
    "Software Engineer",
    "AI Specialist",
    "Community Organizer",
    "Problem Solver",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    const typeSpeed = isDeleting ? 50 : 100;
    const currentRole = roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, isClient, roles]);

  // Full text for highlighting
  const fullText =
    "Software Engineer, AI Specialist, and Community Organizer specializing in machine learning, generative AI.";

  // Function to highlight keywords
  const highlightText = (text: string) => {
    const keywords = [
      "Software Engineer",
      "AI Specialist",
      "Community Organizer",
      "machine learning",
      "generative AI",
    ];
    let highlightedText = text;

    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<span class="text-primary font-semibold">$1</span>',
      );
    });

    return highlightedText;
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <HeroBackground />

      <motion.div
        ref={containerRef}
        style={isClient ? { opacity, scale, y } : {}}
        className="container mx-auto px-4 py-16 md:py-32 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left column - Text content */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 px-3 py-1.5 text-sm bg-primary/10 border-primary/20 text-primary backdrop-blur-sm">
                Available for hire
              </Badge>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
              <span className="block text-foreground mb-2">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d6665d] via-purple-500 to-blue-500 animate-gradient-x bg-[length:200%_auto]">
                MUBARAK A
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="h-20 sm:h-24 md:h-28 mb-6">
              <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-muted-foreground">
                I am a{" "}
                <span className="font-semibold text-foreground relative inline-block">
                  {displayedText}
                  <span className="absolute -right-1 top-0 h-full w-[2px] bg-primary animate-pulse" />
                </span>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8 md:mb-10">
              {["Machine Learning", "Generative AI", "Computer Vision", "NLP"].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Badge
                    variant="outline"
                    className="px-3 py-1.5 text-sm backdrop-blur-sm border-primary/20 hover:bg-primary/5 transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group relative overflow-hidden shadow-lg hover:shadow-[#d6665d]/25 transition-all duration-300 bg-[#d6665d] hover:bg-[#d6665d]/90 text-white px-8 py-6 text-lg rounded-full"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleContactClick}
                className="group relative overflow-hidden border-primary/20 hover:border-primary/50 transition-colors duration-300 px-8 py-6 text-lg rounded-full backdrop-blur-sm bg-background/50"
              >
                <span className="relative z-10">Contact Me</span>
              </Button>

              <Button
                size="lg"
                variant="ghost"
                asChild
                className="group relative overflow-hidden hover:bg-primary/5 transition-colors duration-300 px-6 py-6 text-lg rounded-full"
              >
                <a href="/AI_x1.pdf" download="AI_x1.pdf" className="flex items-center gap-2">
                  <Download className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                  <span className="hidden sm:inline">Resume</span>
                </a>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex gap-6 justify-center md:justify-start items-center">
              <span className="text-sm text-muted-foreground font-medium">Follow me:</span>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/mubarakx01", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mubarak-a-xyz/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:mr1398463@gmail.com", label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.label !== "Email" ? "_blank" : undefined}
                    rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right column - Image */}
        <div className="order-1 md:order-2 flex justify-center mb-12 md:mb-0 relative">
          <ScrollReveal direction="left">
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
              animate={
                isClient && isHovered
                  ? {
                    x: mousePosition.x * -20,
                    y: mousePosition.y * -20,
                    rotateY: mousePosition.x * 10,
                    rotateX: mousePosition.y * -10,
                  }
                  : {}
              }
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* Decorative circles behind */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d6665d] to-purple-600 opacity-20 blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* Floating tech icons - Positioned behind and outside */}
              {[
                { icon: "🤖", delay: 0, x: -45, y: -35 },
                { icon: "⚡", delay: 1, x: 45, y: -45 },
                { icon: "🧠", delay: 2, x: 40, y: 40 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-background/80 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg border border-white/10 z-0"
                  style={{
                    top: `${50 + item.y}%`,
                    left: `${50 + item.x}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: "easeInOut",
                  }}
                >
                  {item.icon}
                </motion.div>
              ))}

              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl z-10">
                <Image
                  src="/profile.jpeg"
                  alt="MUBARAK A"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={scrollToProjects}
      >
        <ChevronDown className="h-8 w-8 text-muted-foreground/50 hover:text-primary transition-colors" />
      </motion.div>
    </div>
  );
}
