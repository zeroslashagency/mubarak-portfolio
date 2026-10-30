"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ResponsiveHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Function to determine which section is currently in view
  const determineActiveSection = useCallback(() => {
    const sections = ["home", "skills", "experience", "certifications", "story", "projects", "contact"];

    // Check if we're at the top of the page (home section)
    if (window.scrollY < 100) {
      setActiveSection("");
      return;
    }

    // Find which section is currently in view
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // If the section is in the viewport (with some buffer for better UX)
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section);
          return;
        }
      }
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      determineActiveSection();
    };

    // Only add event listener client-side
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [determineActiveSection]);

  const navItems = [
    { name: "Home", href: "#", id: "" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Certifications", href: "#certifications", id: "certifications" },
    { name: "Story", href: "/story", id: "story" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  // If not mounted yet, render a simpler version to avoid hydration issues
  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-bold text-xl">SW</div>
            <div className="hidden md:block">
              <div className="font-bold">MUBARAK A</div>
              <div className="text-xs text-muted-foreground">
                AI Engineer & Community Builder
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-9 w-9"></div> {/* Placeholder for theme toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
      style={{ "--primary-rgb": "14, 165, 233" } as React.CSSProperties}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="font-bold text-xl bg-gradient-to-r from-happy-hearts to-golden-nugget text-transparent bg-clip-text">
              MA
            </div>
            <div className="hidden md:block">
              <div className="font-bold">MUBARAK A</div>
              <div className="text-xs text-muted-foreground">
                AI Engineer & Community Builder
              </div>
            </div>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                target={item.name === "Story" ? "_blank" : undefined}
                className={cn(
                  "relative transition-colors hover:text-primary",
                  "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary after:transition-all",
                  activeSection === item.id
                    ? "text-primary font-medium after:w-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]"
                    : "after:w-0 hover:after:w-full",
                )}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <ThemeSwitcher />
          </motion.div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t overflow-hidden bg-background/95 backdrop-blur-md"
          >
            <div className="flex flex-col space-y-3 p-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 transition-colors",
                      activeSection === item.id
                        ? "text-primary font-medium bg-primary/10 px-3 rounded-md"
                        : "hover:text-primary",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Theme settings
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
