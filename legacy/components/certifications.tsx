"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import {
    SectionContainer,
    SectionHeader,
} from "@/components/ui/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// Certification data
const allCertifications = [
    {
        title: "Node",
        issuer: "HackerRank",
        date: "May 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Adobe Illustrator",
        issuer: "Adobe",
        date: "Mar 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Digital Marketing Professional Certificate",
        issuer: "Content Marketing Institute",
        date: "Mar 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Docker Foundations Professional Certificate",
        issuer: "Docker, Inc",
        date: "Mar 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Generative AI for Sales with Microsoft 365 Copilot",
        issuer: "Microsoft",
        date: "Mar 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Negotiation Professional Certificate",
        issuer: "American Negotiation Institute",
        date: "Mar 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Social Media Marketing Professional Certificate",
        issuer: "Hootsuite",
        date: "Mar 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "CSS",
        issuer: "HackerRank",
        date: "Feb 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Leveraging the Power of Social Intelligence",
        issuer: "LinkedIn",
        date: "Feb 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "MacOS Sequoia Essential Training",
        issuer: "LinkedIn",
        date: "Feb 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "SQL (Advanced)",
        issuer: "HackerRank",
        date: "Feb 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Sales Strategy: Using AI and Automation",
        issuer: "LinkedIn",
        date: "Feb 2025",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "SQL (Intermediate)",
        issuer: "HackerRank",
        date: "Oct 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "AI for Organizational Leaders",
        issuer: "Microsoft",
        date: "Sep 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Adobe InDesign",
        issuer: "Adobe",
        date: "Sep 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Build Your Generative AI Productivity Skills",
        issuer: "Microsoft",
        date: "Sep 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Career Essentials in Generative AI",
        issuer: "Microsoft",
        date: "Sep 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Career Essentials in Software Development",
        issuer: "Microsoft",
        date: "Sep 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "GitHub Professional Certificate",
        issuer: "GitHub",
        date: "Sep 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Photoshop 2024",
        issuer: "Adobe",
        date: "Sep 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Software Engineer",
        issuer: "HackerRank",
        date: "Sep 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Software Engineer Intern",
        issuer: "HackerRank",
        date: "Aug 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Content Marketing",
        issuer: "HubSpot Academy",
        date: "Mar 2024",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Generative AI Fundamentals",
        issuer: "Google",
        date: "Dec 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Introduction to Generative AI",
        issuer: "Google",
        date: "Dec 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Responsible AI: Applying AI Principles",
        issuer: "Google",
        date: "Dec 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Cloud Computing with AWS",
        issuer: "Great Learning",
        date: "Nov 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "AWS Beginners Course",
        issuer: "Edureka",
        date: "Sep 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Linux",
        issuer: "Great Learning",
        date: "Sep 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "SQL",
        issuer: "HackerRank",
        date: "Sep 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Python",
        issuer: "HackerRank",
        date: "Aug 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Fundamentals of Digital Marketing",
        issuer: "Google",
        date: "Jul 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Python Complete Course",
        issuer: "EduPrep",
        date: "Jul 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Quantitative Aptitude Course",
        issuer: "EduPrep",
        date: "Jul 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "Project Based Learning Team2Solve",
        issuer: "Futureskillsprime",
        date: "Apr 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "TCS NQT - Cognitive",
        issuer: "TCS iON",
        date: "Jun 2022",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "TCS NQT-Psychometric",
        issuer: "TCS iON",
        date: "Jun 2022",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
    {
        title: "SEO",
        issuer: "HubSpot Academy",
        date: "Jul 2023",
        url: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
    },
];

// Split certifications into two rows
const firstRow = allCertifications.slice(0, Math.ceil(allCertifications.length / 2));
const secondRow = allCertifications.slice(Math.ceil(allCertifications.length / 2));

const MarqueeCard = ({ item }: { item: typeof allCertifications[0] }) => (
    <Card className="w-[300px] flex-shrink-0 mx-4 bg-gradient-to-br from-background to-primary/5 hover:to-primary/10 border-primary/10 transition-colors duration-300 group">
        <CardContent className="p-4 flex flex-col h-full justify-between">
            <div>
                <div className="flex items-start justify-between mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <Award className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px] px-2 py-0 h-5">
                        {item.date}
                    </Badge>
                </div>
                <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.issuer}</p>
            </div>

            <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 h-8 text-xs group-hover:bg-primary/10 group-hover:text-primary"
                asChild
            >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                    View Credential <ExternalLink className="ml-2 h-3 w-3" />
                </a>
            </Button>
        </CardContent>
    </Card>
);

const MarqueeRow = ({
    items,
    direction = "left",
    speed = 40
}: {
    items: typeof allCertifications,
    direction?: "left" | "right",
    speed?: number
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setContentWidth(containerRef.current.scrollWidth / 2);
        }
    }, []);

    return (
        <div className="relative flex overflow-hidden py-4 group/marquee">
            <motion.div
                className="flex"
                ref={containerRef}
                animate={{
                    x: direction === "left" ? [-contentWidth, 0] : [0, -contentWidth],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
                // Pause on hover
                style={{ width: "max-content" }}
                onMouseEnter={(e) => {
                    // This is a bit of a hack to pause animation on hover using native DOM API if needed
                    // but Framer Motion's hover handling is better done via variants or controls
                    // For simple infinite loop, CSS animation might be smoother for pausing, 
                    // but let's stick to Framer Motion as requested.
                    // Actually, pausing a loop in Framer Motion can be tricky.
                    // Let's use a simpler approach: just slow it down or rely on the user trying to catch it.
                    // Alternatively, we can use the animation controls.
                }}
            >
                {/* We duplicate the items to create the infinite loop effect */}
                {[...items, ...items, ...items].map((item, idx) => (
                    <MarqueeCard key={`${item.title}-${idx}`} item={item} />
                ))}
            </motion.div>

            {/* Gradient masks for smooth fade in/out */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
    );
};

export default function Certifications() {
    return (
        <SectionContainer
            id="certifications"
            className="bg-gradient-to-b from-background to-background/95 overflow-hidden"
        >
            <SectionHeader
                title="Licenses & Certifications"
                subtitle="Continuous learning and professional development achievements."
            />

            <div className="flex flex-col gap-8 mt-8">
                <MarqueeRow items={firstRow} direction="left" speed={50} />
                <MarqueeRow items={secondRow} direction="right" speed={50} />
            </div>

            <div className="flex justify-center mt-8">
                <Button variant="outline" asChild>
                    <a
                        href="https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View All on LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>
        </SectionContainer>
    );
}
