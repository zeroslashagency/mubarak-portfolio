"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SectionContainer, SectionHeader } from "@/components/ui/section-container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookOpen, Code, Briefcase, Rocket, Star } from "lucide-react";

const storyChapters = [
    {
        title: "The Spark",
        period: "2017 - 2019",
        location: "St Joseph's Boys' Higher Secondary School",
        description: "It all started with a curiosity for how things work. During my high school years, I discovered the world of Computer Science. Writing my first lines of C++ code wasn't just an assignment; it was the moment I realized I could build things from nothing. I dove into algorithms and problem-solving, laying the groundwork for everything that was to come.",
        icon: <BookOpen className="w-6 h-6" />,
        color: "from-blue-500 to-cyan-500",
        align: "left",
    },
    {
        title: "Building Foundations",
        period: "2017 - 2019",
        location: "Dr M G R Polytechnic College",
        description: "I wanted to understand the hardware that powered the software. Pursuing a diploma in Electronics and Communication Engineering gave me a deep understanding of circuits and systems. I learned that great software needs to respect the hardware it runs on. It was a time of hands-on experimentation and building real electronic devices.",
        icon: <Code className="w-6 h-6" />,
        color: "from-purple-500 to-pink-500",
        align: "right",
    },
    {
        title: "Deepening the Craft",
        period: "2020 - 2023",
        location: "Anna University College of Engineering",
        description: "My thirst for knowledge led me to a degree in Electronics and Communications Engineering. Here, I bridged the gap between hardware and advanced computing. I worked on complex projects like health monitoring systems using IoT and personal expense trackers. It was here that I truly started to see technology as a tool for solving real-world human problems.",
        icon: <Rocket className="w-6 h-6" />,
        color: "from-orange-500 to-red-500",
        align: "left",
    },
    {
        title: "Stepping into the Arena",
        period: "2023 - 2024",
        location: "Internships & Early Career",
        description: "Theory met practice. My internships at Shiash Info Solutions and Kshitiksha Foundation were transformative. I went from analyzing data with Python to designing immersive web experiences for Gen Z. I learned that technical skills are just one part of the equation; communication, collaboration, and user empathy are what truly make a product successful.",
        icon: <Briefcase className="w-6 h-6" />,
        color: "from-green-500 to-emerald-500",
        align: "right",
    },
    {
        title: "The AI Frontier",
        period: "Present",
        location: "AI Engineer & Community Builder",
        description: "Today, I stand at the intersection of AI and community. As an AI Engineer, I'm not just building software; I'm crafting intelligent systems that augment human capability. I'm passionate about sharing this journey, building communities, and helping others navigate the exciting, ever-changing landscape of Artificial Intelligence.",
        icon: <Star className="w-6 h-6" />,
        color: "from-indigo-500 to-violet-500",
        align: "center",
    },
];

const ChapterCard = ({ chapter, index }: { chapter: typeof storyChapters[0]; index: number }) => {
    const isEven = index % 2 === 0;
    const isCenter = chapter.align === "center";

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={cn(
                "relative flex items-center mb-24 md:mb-32 last:mb-0",
                isCenter ? "justify-center" : isEven ? "justify-start md:justify-end" : "justify-start"
            )}
        >
            {/* Timeline Node (Desktop) */}
            <div className="absolute left-4 md:left-1/2 w-8 h-8 -ml-4 md:-ml-4 rounded-full bg-background border-4 border-primary z-10 hidden md:flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">
                <div className="w-2 h-2 bg-primary rounded-full" />
            </div>

            {/* Content Card */}
            <div
                className={cn(
                    "w-full md:w-[calc(50%-3rem)] pl-12 md:pl-0 relative",
                    isCenter ? "md:w-2/3 text-center" : isEven ? "md:text-left md:mr-12" : "md:text-right md:ml-12"
                )}
            >
                {/* Mobile Timeline Node */}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-background border-4 border-primary z-10 flex md:hidden items-center justify-center shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                </div>

                <div className={cn(
                    "p-6 rounded-2xl bg-gradient-to-br border border-white/10 shadow-xl backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 group",
                    `from-background to-${chapter.color.split(' ')[1].replace('to-', '')}/5`,
                    "hover:border-primary/30"
                )}>
                    <div className={cn(
                        "flex items-center gap-3 mb-4",
                        isCenter ? "justify-center" : isEven ? "md:flex-row" : "md:flex-row-reverse"
                    )}>
                        <div className={cn(
                            "p-3 rounded-xl bg-gradient-to-br text-white shadow-lg",
                            chapter.color
                        )}>
                            {chapter.icon}
                        </div>
                        <div className={cn("flex flex-col", isCenter ? "items-center" : isEven ? "md:items-start" : "md:items-end")}>
                            <Badge variant="outline" className="mb-1 w-fit">{chapter.period}</Badge>
                            <span className="text-xs text-muted-foreground">{chapter.location}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        {chapter.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                        {chapter.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default function StorySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <SectionContainer id="story" className="relative overflow-hidden">
            <SectionHeader
                title="My Journey"
                subtitle="A visual story of how I became an AI Engineer."
            />

            <div ref={containerRef} className="relative mt-16 max-w-5xl mx-auto">
                {/* Central Line (Desktop) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent -ml-0.5 hidden md:block rounded-full" />

                {/* Animated Line (Desktop) */}
                <motion.div
                    className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-blue-500 -ml-0.5 hidden md:block rounded-full origin-top shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]"
                    style={{ scaleY }}
                />

                {/* Line (Mobile) */}
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent -ml-0.5 md:hidden rounded-full" />

                {/* Animated Line (Mobile) */}
                <motion.div
                    className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-blue-500 -ml-0.5 md:hidden rounded-full origin-top shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]"
                    style={{ scaleY }}
                />

                <div className="relative z-10 pb-20">
                    {storyChapters.map((chapter, index) => (
                        <ChapterCard key={index} chapter={chapter} index={index} />
                    ))}
                </div>

                {/* End Node */}
                <div className="absolute bottom-0 left-4 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),1)] z-20 animate-pulse" />
            </div>
        </SectionContainer>
    );
}
