"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SectionContainer,
  SectionHeader,
} from "@/components/ui/section-container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "@/components/error-boundary";
import {
  Calendar,
  MapPin,
  Building,
  ChevronRight,
  ChevronDown,
  Award,
  Briefcase,
  GraduationCap,
  Users,
  Target,
} from "lucide-react";

// Experience data
const experiences = [
  {
    id: "rfc",
    title: "Web Designer Internship",
    company: "Kshitiksha Foundation",
    location: "remote",
    period: "04/2024",
    type: "work",
    reference_letter: "/web-designer-internship-reference.pdf",
    description:
      "Contributed to web design initiatives, creating visually appealing and functional digital solutions to enhance the foundation’s online presence and user engagement.",
    responsibilities: [
      "Designed responsive website layouts tailored for Gen Z audiences, improving accessibility and interaction",
      "Developed interactive features like scrolling animations and 3D effects using modern design tools",
      "Optimized website performance and SEO, reducing load times and increasing visibility",
      "Collaborated remotely with a team to align designs with the foundation’s mission and outreach goals",
    ],

    skills: [
      "Figma",
      "Webflow",
      "HTML/CSS",
      "JavaScript",
      "Graphic Design (Photoshop, Illustrator)",
      "SEO",
    ],

    metrics: [
      { value: "5+", label: "Features Implemented" },
      { value: "10%", label: "Performance Improvement" },
      { value: "3", label: "Team Size" },
    ],

    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "success-academy",
    title: "Data Science Internship",
    company: "Shiash Info Solutions Private Limited",
    location: "Tamil Nadu,Chennai",
    period: "11/2023",
    type: "work",
    description:
      "Supported data science projects by applying analytical tools and machine learning techniques to derive insights and improve business processes during an internship.",
    responsibilities: [
      "Processed and analyzed datasets using Python and SQL to generate actionable insights",
      "Developed machine learning models to support predictive analytics and decision-making",
      "Created data visualizations and reports to communicate findings to team and stakeholders",
      "Collaborated with a small team to enhance data-driven solutions for client needs",
    ],

    skills: [
      "Python",
      "SQL",
      "Machine Learning",
      "Data Analysis",
      "Visualization Tools (e.g., Canva, Figma)",
    ],

    metrics: [
      { value: "4+", label: "Models Developed" },
      { value: "10", label: "Team Size" },
      { value: "25+", label: "Reports Generated" },
    ],

    color: "from-green-600 to-emerald-600",
  },
  {
    id: "engineering-degree",
    title: "Electronics And Communications Engineering",
    company: "Anna University College of Engineering, Arani",
    location: "India, Arani, Tamil Nadu",
    period: "2020 - 2023",
    type: "education",
    description:
      "Engaged in rigorous coursework and hands-on projects in Electronics and Communications Engineering, focusing on circuit design, signal processing, and telecommunications. Developed practical skills through laboratory work and collaborative projects.",
    responsibilities: [
      "Designed and implemented electronic circuits for applications such as signal amplification and filtering",
      "Conducted experiments and simulations to analyze communication systems and optimize performance",
      "Health monitoring system using IoT and real-time analytics",
      "Created a personal expense tracker web application with features like budget alerts and daily monitoring",
    ],

    skills: [
      "Python",
      "AWS",
      "SQL",
      "linux",
      "Programming (Python, C++)",
      "Embedded Systems",
      "Data Analysis",
    ],

    metrics: [
      { value: "2", label: "Major Projects" },
      { value: "5", label: "Technical Skills Mastered" },
      { value: "3", label: "Collaborative Projects" },
    ],

    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "engineering-diploma",
    title: "Electronics And Communication Engineering Diploma",
    company: "Dr M G R Polytechnic College, Arani",
    location: "India, Arani, Tamil Nadu",
    period: "2017 - 2019",
    type: "education",
    description:
      "Pursued a diploma in Electronics and Communication Engineering, focusing on foundational skills in circuit design, electronic systems, and communication technologies through practical training and coursework.",
    responsibilities: [
      "Designed and tested basic electronic circuits for signal processing and amplification",
      "Performed lab experiments to understand communication principles and system troubleshooting",
      "Collaborated with classmates on hands-on projects to build functional electronic devices",
      "Assisted in documenting technical procedures and project outcomes for academic evaluation",
    ],

    skills: [
      "Python",
      "Circuit Design",
      "Electronics Troubleshooting",
      "Programming (C)",
      "Basic Signal Processing",
      "Team Collaboration",
    ],

    metrics: [
      { value: "3", label: "Practical Projects" },
      { value: "4", label: "Core Skills Acquired" },
      { value: "2", label: "Group Assignments" },
    ],

    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "high-school",
    title: "12th Computer Science",
    company: "St Joseph's Boys' Higher Secondary School",
    location: "Tamil Nadu,Chennai",
    period: "2017 - 2019",
    description:
      "Completed 12th-grade education with a focus on Computer Science, gaining foundational knowledge in programming, algorithms, and basic computer applications through theoretical study and practical assignments.",
    achievements: [
      "Developed simple programs and projects using C++ to solve computational problems",
      "Learned and applied fundamental concepts of algorithms and data structures",
      "Participated in school-level tech competitions or exhibitions showcasing coding skills",
    ],

    skills: [
      "Programming (C++)",
      "Basic Algorithms",
      "Problem Solving",
      "Computer Applications",
      "Teamwork",
    ],

    color: "bg-gradient-to-r from-blue-600 to-cyan-600",
    metrics: [
      { value: "3", label: "Publications" },
      { value: "5", label: "Conferences" },
      { value: "2", label: "Research Grants" },
    ],
  },
];

export default function RedesignedExperience() {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(
    null,
  );
  const [experienceType, setExperienceType] = useState<
    "all" | "work" | "education"
  >("all");

  const toggleExpand = (id: string) => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  // Filter experiences based on type
  const filteredExperiences =
    experienceType === "all"
      ? experiences
      : experiences.filter((exp) => exp.type === experienceType);

  return (
    <SectionContainer
      id="experience"
      className="bg-gradient-to-b from-background/95 to-background"
    >
      <SectionHeader
        title="Professional Journey"
        subtitle="My professional experiences and career highlights in AI development, education, and community building."
      />

      <ScrollReveal>
        <Tabs
          defaultValue="all"
          onValueChange={(value) =>
            setExperienceType(value as "all" | "work" | "education")
          }
          className="w-full"
        >
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="flex justify-center gap-2 mb-8 bg-transparent w-fit mx-auto">
              <TabsTrigger
                value="all"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <span>All Experience</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="work"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "work"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Work Experience</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="education"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "education"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="space-y-6">
            {filteredExperiences.map((experience, index) => (
              <ErrorBoundary key={experience.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={cn(
                      "overflow-hidden border-none shadow-lg",
                      `bg-gradient-to-br ${experience.color}/10`,
                    )}
                  >
                    <CardContent className="p-0">
                      <div
                        className={cn(
                          "p-4 sm:p-6 cursor-pointer transition-all duration-300",
                          expandedExperience === experience.id ? "pb-3" : "",
                        )}
                        onClick={() => toggleExpand(experience.id)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <Badge
                              className={cn(
                                "mb-2 px-3 py-1",
                                experience.type === "work"
                                  ? "bg-blue-500/20 text-blue-500 border-blue-500/30"
                                  : "bg-amber-500/20 text-amber-500 border-amber-500/30",
                              )}
                            >
                              {experience.type === "work" ? (
                                <Briefcase className="h-3 w-3 mr-1" />
                              ) : (
                                <GraduationCap className="h-3 w-3 mr-1" />
                              )}
                              {experience.type === "work"
                                ? "Work Experience"
                                : "Education"}
                            </Badge>
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                              {experience.title}
                              <motion.div
                                animate={{
                                  rotate:
                                    expandedExperience === experience.id
                                      ? 180
                                      : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {expandedExperience === experience.id ? (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                )}
                              </motion.div>
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4" />

                                <span>{experience.company}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />

                                <span>{experience.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />

                                <span>{experience.period}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground">
                          {experience.description}
                        </p>
                      </div>

                      <AnimatePresence>
                        {expandedExperience === experience.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-6 pb-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t">
                                <div>
                                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    Key Responsibilities
                                  </h4>
                                  <ul className="space-y-2">
                                    {experience.responsibilities?.map(
                                      (responsibility, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2"
                                        >
                                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                            <span className="text-xs text-primary">
                                              ✓
                                            </span>
                                          </div>
                                          <span className="text-sm sm:text-base">
                                            {responsibility}
                                          </span>
                                        </li>
                                      ),
                                    )}
                                  </ul>

                                  <div className="mt-6">
                                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                      <Users className="h-5 w-5 text-primary" />
                                      Skills Applied
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {experience.skills.map((skill, i) => (
                                        <Badge key={i} variant="secondary">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    Key Metrics & Achievements
                                  </h4>

                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                    {experience.metrics.map((metric, i) => (
                                      <div
                                        key={i}
                                        className="bg-primary/10 rounded-lg p-3 text-center"
                                      >
                                        <div className="text-xl sm:text-2xl font-bold">
                                          {metric.value}
                                        </div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">
                                          {metric.label}
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {experience.type === "work" &&
                                    experience.reference_letter && (
                                      <div className="mt-4">
                                        <Button
                                          variant="outline"
                                          className="w-full"
                                          asChild
                                        >
                                          <a
                                            href={experience.reference_letter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View Reference Letter
                                          </a>
                                        </Button>
                                      </div>
                                    )}

                                  {experience.type === "education" && (
                                    <div className="mt-4">
                                      <Button
                                        variant="outline"
                                        className="w-full"
                                      >
                                        View Transcript
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </ErrorBoundary>
            ))}
          </div>
        </Tabs>
      </ScrollReveal>
    </SectionContainer>
  );
}
