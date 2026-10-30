"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SectionContainer,
  SectionHeader,
} from "@/components/ui/section-container";
import {
  ScrollReveal,
  StaggeredContainer,
  StaggerItem,
} from "@/components/ui/scroll-reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useProgressiveLoading } from "@/components/progressive-loading-provider";
import {
  Code,
  Cpu,
  Database,
  Cloud,
  BookOpen,
  PenToolIcon as Tool,
  Microscope,
  Laptop,
  BarChart3,
  Globe,
  MessageSquare,
  Shield,
  Zap,
  Briefcase,
  Loader2,
} from "lucide-react";

// Dynamically import the 3D globe component with no SSR
const SkillsGlobe = dynamic(() => import("@/components/3d-skills-globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      <span className="ml-2">Loading 3D Globe...</span>
    </div>
  ),
});

// Skill categories with icons
const skillCategories = [
  {
    id: "ml-ai",
    name: "Machine Learning & AI",
    icon: <Laptop className="h-5 w-5" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "programming",
    name: "Programming",
    icon: <Code className="h-5 w-5" />,
    color: "from-emerald-500 to-green-500",
  },
  {
    id: "frameworks",
    name: "AI Frameworks",
    icon: <Cpu className="h-5 w-5" />,
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "data",
    name: "Data Science",
    icon: <Database className="h-5 w-5" />,
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: <Cloud className="h-5 w-5" />,
    color: "from-sky-500 to-blue-500",
  },
  {
    id: "chatbots",
    name: "Chatbots & AI",
    icon: <MessageSquare className="h-5 w-5" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "tools",
    name: "Tools",
    icon: <Tool className="h-5 w-5" />,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "transferable",
    name: "Transferable Skills",
    icon: <Briefcase className="h-5 w-5" />,
    color: "from-indigo-500 to-blue-500",
  },
];

// Skill data
const skillsData = {
  "ml-ai": [
    { name: "Prompt Engineering", level: 90 },
    { name: "Generative AI", level: 80 },
    { name: "Python Programming", level: 95 },
    { name: "Machine Learning (ML)", level: 70 },
    { name: "Deep Learning", level: 70 },
    { name: "Data Preprocessing", level: 70 },
    { name: "API Integration", level: 70 },
    { name: "NLP", level: 60 },
  ],

  programming: [
    { name: "Python", level: 90 },
    { name: "SQL", level: 85 },
    { name: "HTML/CSS", level: 75 },
    { name: "JavaScript", level: 70 },
    { name: "Linux Shell Scripting", level: 60 },
  ],

  frameworks: [
    { name: "Hugging Face", level: 90 },
    { name: "PyTorch", level: 90 },
    { name: "TensorFlow", level: 85 },
    { name: "Scikit-learn", level: 85 },
    { name: "Flask", level: 80 },
    { name: "Pandas", level: 75 },
    { name: "NumPy", level: 70 },
    { name: "React", level: 70 },
  ],

  data: [
    { name: "Pandas", level: 85 },
    { name: "Data Visualization", level: 80 },
    { name: "Social Media Analysis", level: 80 },
    { name: "Predictive Modeling", level: 75 },
    { name: "Business Intelligence", level: 70 },
    { name: "Data Mining", level: 70 },
    { name: "Text Analysis", level: 65 },
  ],

  cloud: [
    { name: "Kubernetes", level: 85 },
    { name: "AWS", level: 80 },
    { name: "DevOps", level: 80 },
    { name: "AWS Lambda", level: 75 },
    { name: "Docker", level: 70 },
    { name: "Git", level: 95 },
    { name: "CI/CD", level: 60 },
  ],

  chatbots: [
    { name: "Prompt Engineering", level: 90 },
    { name: "NLP Integration", level: 85 },
    { name: "Emotion-Aware Chatbots", level: 85 },
    { name: "Conversational AI", level: 80 },
    { name: "Topic Tracking", level: 80 },
    { name: "Sentiment Tracking", level: 75 },
    { name: "Customer Service Automation", level: 75 },
    { name: "Rule-Based Systems", level: 65 },
  ],

  tools: [
    { name: "Git/GitHub", level: 90 },
    { name: "Jupyter Notebooks", level: 85 },
    { name: "VS Code", level: 80 },
    { name: "Linux/Unix", level: 75 },
    { name: "Figma", level: 70 },
    { name: "Docker", level: 70 },
    { name: "Arduino", level: 65 },
    { name: "Postman", level: 65 },
    { name: "AWS CLI", level: 65 },
    { name: "Anaconda", level: 70 },
    { name: "PyCharm", level: 60 },
    { name: "Matplotlib", level: 60 },
    { name: "Notion", level: 90 },
    { name: "Canva", level: 95 },
  ],

  transferable: [
    { name: "Innovation & Problem-Solving", level: 90 },
    { name: "Collaboration", level: 85 },
    { name: "Data-Driven Decision Making", level: 80 },
    { name: "Communication", level: 75 },
    { name: "Leadership", level: 70 },
    { name: "Time Management", level: 70 },
    { name: "Project Management", level: 65 },
  ],
};

export default function RedesignedSkills() {
  const [activeCategory, setActiveCategory] = useState("ml-ai");
  const [visualizationType, setVisualizationType] = useState<"chart" | "globe">(
    "chart",
  );
  const { setLoaded } = useProgressiveLoading();
  const [hasSetLoaded, setHasSetLoaded] = useState(false);

  useEffect(() => {
    // Only set loaded once when the component mounts
    if (!hasSetLoaded) {
      setLoaded("skills");
      setHasSetLoaded(true);
    }
  }, [setLoaded, hasSetLoaded]);

  return (
    <SectionContainer
      id="skills"
      className="bg-gradient-to-b from-background to-background/95"
    >
      <SectionHeader
        title="Technical Skills"
        subtitle="A comprehensive overview of my technical expertise across various domains, from machine learning and AI to software development and research."
      />

      <ScrollReveal>
        <Tabs
          defaultValue="ml-ai"
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
            {skillCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white`
                    : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span>{category.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex justify-center mt-[65px] mb-[10px]">
            <div className="bg-muted rounded-full p-1 flex">
              <button
                onClick={() => setVisualizationType("chart")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  visualizationType === "chart"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted/80",
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Chart View</span>
              </button>
              <button
                onClick={() => setVisualizationType("globe")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  visualizationType === "globe"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted/80",
                )}
              >
                <Globe className="h-4 w-4" />
                <span>Globe View</span>
              </button>
            </div>
          </div>

          {Object.entries(skillsData).map(([category, skills]) => (
            <TabsContent key={category} value={category}>
              <div className="flex flex-col items-center">
                {visualizationType === "chart" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                    {/* Progress bars */}
                    <div className="space-y-4">
                      {skills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {skill.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          <Progress value={skill.level} />
                        </div>
                      ))}
                    </div>
                    {/* Radar chart */}
                    <div className="flex items-center justify-center">
                      <SkillVisualization
                        category={
                          skillCategories.find((c) => c.id === category)!
                        }
                        skills={skills}
                      />
                    </div>
                  </div>
                ) : (
                  <SkillsGlobe skills={skills} />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </ScrollReveal>

      <div className="mt-12 text-center">
        <ScrollReveal>
          <p className="text-muted-foreground">
            These skills represent my technical expertise developed over years
            of professional experience and continuous learning.
            <br />
            I'm constantly expanding my knowledge and staying up-to-date with
            the latest advancements in AI and technology.
          </p>
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
}

interface SkillVisualizationProps {
  category: (typeof skillCategories)[0];
  skills: { name: string; level: number }[];
}

function SkillVisualization({ category, skills }: SkillVisualizationProps) {
  // Helper function to safely extract colors from gradient string
  const getColorFromGradient = (
    gradientString: string,
    position: "from" | "to",
  ) => {
    // Default colors in case parsing fails
    const defaultColors = {
      from: "#3b82f6", // blue-500
      to: "#6366f1", // indigo-500
    };

    try {
      // Find the part that starts with 'from-' or 'to-'
      const parts = gradientString.split(" ");
      const colorPart = parts.find((part) => part.startsWith(position + "-"));

      if (!colorPart) return defaultColors[position];

      // Extract the color name (e.g., 'blue-500' from 'from-blue-500')
      const colorName = colorPart.replace(position + "-", "");

      // Map color names to actual hex values
      const colorMap: Record<string, string> = {
        "blue-500": "#3b82f6",
        "indigo-500": "#6366f1",
        "purple-500": "#8b5cf6",
        "violet-500": "#8b5cf6",
        "emerald-500": "#10b981",
        "green-500": "#22c55e",
        "amber-500": "#f59e0b",
        "yellow-500": "#eab308",
        "sky-500": "#0ea5e9",
        "rose-500": "#f43f5e",
        "pink-500": "#ec4899",
        "orange-500": "#f97316",
        "cyan-500": "#06b6d4",
        "teal-500": "#14b8a6",
        "red-500": "#ef4444",
      };

      return colorMap[colorName] || defaultColors[position];
    } catch (error) {
      console.error("Error parsing gradient color:", error);
      return defaultColors[position];
    }
  };

  // Create a radar chart visualization
  const numSkills = skills.length;
  const angleStep = (Math.PI * 2) / numSkills;
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;

  // Calculate coordinates for each skill point
  const skillPoints = skills.map((skill, i) => {
    const angle = i * angleStep - Math.PI / 2; // Start from top
    const radius = (skill.level / 100) * maxRadius; // Scale to fit in container
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      name: skill.name,
      level: skill.level,
    };
  });

  // Create polygon points string
  const polygonPoints = skillPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <div className="relative w-[450px] h-[450px]">
      <svg width="450" height="450" viewBox="0 0 450 450">
        <g transform="translate(75, 75)">
          {/* Background circles */}
          {[25, 50, 75, 100].map((level) => (
            <circle
              key={level}
              cx={centerX}
              cy={centerY}
              r={(level / 100) * maxRadius}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {Array.from({ length: numSkills }).map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x2 = centerX + maxRadius * Math.cos(angle);
            const y2 = centerY + maxRadius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="1"
              />
            );
          })}

          {/* Skill polygon */}
          <motion.polygon
            points={polygonPoints}
            fill={`url(#gradient-${category.id})`}
            fillOpacity="0.3"
            stroke={`url(#gradient-${category.id})`}
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient
              id={`gradient-${category.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={getColorFromGradient(category.color, "from")}
              />

              <stop
                offset="100%"
                stopColor={getColorFromGradient(category.color, "to")}
              />
            </linearGradient>
          </defs>

          {/* Skill points */}
          {skillPoints.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke={`url(#gradient-${category.id})`}
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            />
          ))}

          {/* Skill labels */}
          {skillPoints.map((point, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = maxRadius + 30;
            const labelX = centerX + labelRadius * Math.cos(angle);
            const labelY = centerY + labelRadius * Math.sin(angle);

            // Adjust text anchor based on position
            const textAnchor =
              angle > -Math.PI / 4 && angle < Math.PI / 4
                ? "start"
                : angle > (Math.PI * 3) / 4 || angle < (-Math.PI * 3) / 4
                  ? "end"
                  : "middle";

            // Adjust vertical alignment
            const dy =
              angle > Math.PI / 4 && angle < (Math.PI * 3) / 4
                ? "0.8em"
                : angle > (-Math.PI * 3) / 4 && angle < -Math.PI / 4
                  ? "-0.5em"
                  : "0.3em";

            return (
              <motion.text
                key={i}
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                dy={dy}
                fontSize="12"
                fill="currentColor"
                fillOpacity="0.7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 + 0.3 }}
              >
                {point.name}
              </motion.text>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
