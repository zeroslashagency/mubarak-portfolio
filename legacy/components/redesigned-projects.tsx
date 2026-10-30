"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  SectionContainer,
  SectionHeader,
} from "@/components/ui/section-container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/hooks/use-is-client";
import { ErrorBoundary } from "@/components/error-boundary";
import {
  ExternalLink,
  Github,
  Code,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Star,
  Layers,
  Cpu,
  Globe,
  Database,
  BookOpen,
  Share2,
  Shield,
  MessageSquare,
  Zap,
  Loader2,
} from "lucide-react";
import AnimatedBox from "@/components/animated-box";

// Project categories
const projectCategories = [
  { id: "all", name: "All Projects" },
  {
    id: "ai",
    name: "AI & ML",
    icon: <Cpu className="h-4 w-4" />,
  },
  {
    id: "audio",
    name: "Audio",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: "web",
    name: "Web Dev",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    id: "data",
    name: "Data Science",
    icon: <Database className="h-4 w-4" />,
  },
  {
    id: "network",
    name: "Network",
    icon: <Share2 className="h-4 w-4" />,
  },
  {
    id: "security",
    name: "Security",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: "communication",
    name: "Communication",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    id: "research",
    name: "Research",
    icon: <BookOpen className="h-4 w-4" />,
  },
];

// Project data
const projects = [
  {
    id: 0,
    title: "AI-Powered GYM Workout",
    category: "ai",
    description:
      "A comprehensive AI-driven fitness application that provides personalized workout plans, real-time pose estimation, wearable integration, and social features for an engaging workout experience.",
    longDescription:
      "An advanced fitness platform that leverages artificial intelligence to deliver personalized workout experiences. The system features goal-based customization, real-time pose estimation for form correction, wearable device integration, and social features to keep users motivated. The app includes a vast exercise library, AR-powered training, and adaptive workout plans based on user progress and feedback.",
    technologies: [
      "TensorFlow",
      "MediaPipe",
      "React Native",
      "Node.js",
      "Python",
      "AWS",
      "Firebase",
      "AR Kit",
      "Wearable APIs",
    ],
    imageUrl: "/lib/file/ai-gym-dashboard.png",
    gallery: [
      "/lib/file/ai-gym-dashboard.png",
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/yourusername/ai-gym-workout",
    color: "from-purple-600 to-pink-600",
    featured: true,
    completed: "2024",
    teamSize: 1,
    difficulty: 5,
    achievements: [
      "Implemented real-time pose estimation with 90% accuracy using TensorFlow",
      "Developed personalized AI workout planning system",
      "Integrated multiple wearable device APIs for comprehensive health tracking",
      "Created AR-powered virtual trainer experience",
      "Built social features including challenges and leaderboards",
    ],
  },
  {
    id: 1,
    title:
      "AI-Driven CNC Machine Health Monitoring: IoT Analytics with Mobile & Dashboard Integration",
    category: "ai",
    description:
      "Developed an end-to-end intelligent monitoring system to predict CNC machine failures, optimize maintenance schedules, and enhance manufacturing efficiency using IoT, AI, and real-time analytics",
    longDescription:
      "An advanced IoT-based monitoring system for CNC machines that leverages real-time data analytics and machine learning to predict potential failures and optimize maintenance schedules. The system features a responsive dashboard for real-time monitoring, predictive maintenance alerts, and comprehensive performance analytics.",
    technologies: [
      "React.js/Next.js",
      "PyTorch",
      "WebSockets",
      "FastAPI",
      "IoT Sensors",
      "TensorFlow",
      "Docker",
    ],
    imageUrl: "/lib/file/Machine-data-x3.png",
    gallery: [
      "/lib/file/Machine-data-x3.png",
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/mubarakx01",
    color: "from-blue-600 to-violet-600",
    featured: true,
    completed: "2024",
    teamSize: 1,
    difficulty: 5,
    achievements: [
      "Implemented real-time CNC machine health monitoring with IoT sensors",
      "Developed predictive maintenance algorithms with 90% accuracy",
      "Created interactive dashboard for machine performance analytics",
      "Integrated mobile alerts for critical machine status updates",
      "Reduced machine downtime by 35% through predictive maintenance",
    ],
  },
  {
    id: 2,
    title: "Movie Recommendation System",
    category: "data-science",
    description:
      "A content-based movie recommendation system that suggests similar movies based on input titles using metadata and cosine similarity.",
    longDescription:
      "Built a sophisticated movie recommendation system that leverages content-based filtering techniques. The system processes movie metadata including genres, directors, cast, and plot keywords to create comprehensive feature vectors. Using cosine similarity, it calculates movie similarities and provides personalized recommendations. The project includes data preprocessing, feature extraction, and an interactive Streamlit frontend for real-time testing.",
    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Cosine Similarity",
      "Streamlit",
      "TMDb API",
    ],
    imageUrl: "/lib/file/MOvie-x1.jpg",
    gallery: [
      "/lib/file/MOvie-x1.jpg",
    ],
    demoUrl: "https://github.com/mubarakx01/Movie-Recommendation-System",
    githubUrl: "https://github.com/mubarakx01/Movie-Recommendation-System",
    color: "from-blue-600 to-cyan-600",
    featured: false,
    completed: "2023",
    teamSize: 1,
    difficulty: 4,
    achievements: [
      "Implemented content-based filtering using cosine similarity",
      "Processed and merged movie metadata for comprehensive feature vectors",
      "Built an interactive Streamlit frontend for real-time testing",
      "Integrated TMDb API for real movie data and posters",
      "Achieved 85% accuracy in movie recommendations",
    ],
  },
  {
    id: 3,
    title: "Airbnb Price Prediction System",
    category: "data-science",
    description:
      "A machine learning model to predict nightly prices of Airbnb listings in Chennai, Tamil Nadu, using listing metadata, location-based features, and text processing techniques.",
    longDescription:
      "Built a comprehensive price prediction system for Airbnb listings that helps hosts optimize pricing and guests find value-for-money accommodations. The system leverages advanced machine learning techniques, location-based features, and natural language processing to provide accurate price predictions based on multiple factors including property attributes, amenities, and proximity to landmarks.",
    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "Streamlit",
      "GeoPy",
      "NLP",
      "BeautifulSoup",
    ],
  imageUrl: "/lib/file/Airbnb.png",
  gallery: [
    "/lib/file/Airbnb.png",
  ],
    demoUrl: "#",
    githubUrl: "https://github.com/yourusername/airbnb-price-prediction",
    color: "from-rose-600 to-pink-600",
    featured: false,
    completed: "2023",
    teamSize: 1,
    difficulty: 4,
    achievements: [
      "Developed ML models achieving 85% prediction accuracy using XGBoost and LightGBM",
      "Engineered location-based features using GeoPy for landmark proximity analysis",
      "Implemented NLP for sentiment analysis on listing descriptions",
      "Created an interactive Streamlit interface for real-time price predictions",
      "Deployed the system on Heroku with API integration",
    ],
  },
  {
    id: 5,
    title: "Wikipedia Connection Finder",
    category: "network",
    description:
      "Tool for finding the shortest path between any two Wikipedia articles through hyperlinks.",
    longDescription:
      "An application that analyzes the network structure of Wikipedia to find the shortest path between any two articles. The tool uses graph theory algorithms to navigate through the complex web of hyperlinks.",
    technologies: ["Python", "NetworkX", "Flask", "MongoDB", "D3.js"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/mubarakx01",
    color: "from-blue-600 to-cyan-600",
    featured: false,
    completed: "2022",
    teamSize: 1,
    difficulty: 3,
    achievements: [
      "Implemented graph algorithms to find shortest paths between Wikipedia articles",
      "Created a web interface with Flask and D3.js",
      "Optimized performance for large-scale graph traversal",
      "Built a caching system with MongoDB for faster results",
    ],
    imageUrl: "/lib/file/Wikipedia.png",
    gallery: [
      "/lib/file/Wikipedia.png",
    ],
  },
  {
    id: 6,
    title: "NYC Education Analytics",
    category: "data",
    description:
      "Data analysis and visualization platform for NYC public school performance metrics.",
    longDescription:
      "A comprehensive data analysis platform that processes and visualizes performance metrics from NYC public schools. The system includes predictive models for identifying at-risk students and schools that need additional resources.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Tableau", "R"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/mubarakx01",
    color: "from-indigo-600 to-blue-600",
    featured: false,
    completed: "2022",
    teamSize: 4,
    difficulty: 4,
    achievements: [
      "Analyzed NYC public school data to identify performance patterns",
      "Built predictive models for student success with Scikit-learn",
      "Created interactive visualizations with Tableau",
      "Presented findings to education stakeholders",
    ],
    imageUrl: "/lib/file/NYC.jpeg",
    gallery: [
      "/lib/file/NYC.jpeg",
    ],
  },
];

export default function RedesignedProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const isClient = useIsClient();

  // Get featured projects
  const featuredProjects = projects.filter((project) => project.featured);

  // Filter projects based on category
  const filteredProjects =
    selectedCategory === "all"
      ? projects.filter((project) => !project.featured)
      : projects.filter(
          (project) =>
            project.category === selectedCategory && !project.featured,
        );

  const handleNext = () => {
    if (!isClient) return;
    setDirection(1);
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const handlePrev = () => {
    if (!isClient) return;
    setDirection(-1);
    setCurrentFeaturedIndex(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length,
    );
  };

  const handleDemoClick = (url: string) => {
    if (!isClient) return;
    toast({
      title: "Demo Link",
      description: "Opening demo in a new tab...",
      duration: 3000,
    });
    window.open(url, "_blank");
  };

  // Simulate loading delay
  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isClient]);

  // If not client-side yet, show a loading state
  if (!isClient || isLoading) {
    return (
      <SectionContainer id="projects" className="relative">
        <SectionHeader
          title="Project Portfolio"
          subtitle="Explore my portfolio of AI, machine learning, and software development projects."
        />

        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />

          <span>Loading projects...</span>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="projects" className="relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />

      <SectionHeader
        title="Project Portfolio"
        subtitle="Explore my portfolio of AI, machine learning, and software development projects. Each project demonstrates different skills and technologies."
      />

      {featuredProjects.length > 0 && (
        <div className="mb-16">
          <ScrollReveal>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 justify-center">
              <Layers className="h-5 w-5 text-primary" />
              <span>Featured Projects</span>
            </h3>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative rounded-xl overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={featuredProjects[currentFeaturedIndex].id}
                  custom={direction}
                  initial={{
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    },
                  }}
                  exit={{
                    x: direction > 0 ? -1000 : 1000,
                    opacity: 0,
                    transition: {
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    },
                  }}
                  className="relative w-full aspect-[16/9]"
                >
                  <div className="absolute inset-0 flex flex-col md:flex-row">
                    <div className="relative w-full h-48 md:h-auto md:w-1/2">
                      <div className="relative w-full h-full">
                        <Image
                          src={
                            featuredProjects[currentFeaturedIndex].imageUrl ||
                            "/placeholder.svg"
                          }
                          alt={featuredProjects[currentFeaturedIndex].title}
                          fill
                          priority
                          className="object-cover rounded-md"
                        />
                      </div>
                    </div>

                    <div
                      className={cn(
                        "w-full md:w-1/2 p-6 flex flex-col justify-center opacity-90 bg-gradient-to-r",
                        featuredProjects[currentFeaturedIndex].color,
                      )}
                    >
                      <Badge
                        variant="outline"
                        className="w-fit mb-4 bg-black/50 backdrop-blur-sm text-white border-white/20"
                      >
                        Featured Project
                      </Badge>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                        {featuredProjects[currentFeaturedIndex].title}
                      </h3>
                      <p className="text-white/90 mb-4 md:mb-6 text-sm md:text-base line-clamp-3 md:line-clamp-none">
                        {featuredProjects[currentFeaturedIndex].description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        {featuredProjects[currentFeaturedIndex].technologies
                          .slice(0, 3)
                          .map((tech, index) => (
                            <Badge
                              key={index}
                              className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm"
                            >
                              {tech}
                            </Badge>
                          ))}
                        {featuredProjects[currentFeaturedIndex].technologies
                          .length > 3 && (
                          <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                            +
                            {featuredProjects[currentFeaturedIndex].technologies
                              .length - 3}{" "}
                            more
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          className="bg-white text-black hover:bg-white/90 group text-sm"
                          onClick={() =>
                            handleDemoClick(
                              featuredProjects[currentFeaturedIndex].demoUrl,
                            )
                          }
                        >
                          Live Demo
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>

                        <Button
                          variant="outline"
                          className="border-white text-white hover:bg-white/20 gap-2 text-sm"
                          asChild
                        >
                          <a
                            href={
                              featuredProjects[currentFeaturedIndex].githubUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                            View Code
                          </a>
                        </Button>

                        <Button
                          variant="outline"
                          className="border-white text-white hover:bg-white/20 gap-2 text-sm"
                          onClick={() => {
                            setSelectedProject(
                              featuredProjects[currentFeaturedIndex],
                            );
                            setIsDialogOpen(true);
                          }}
                        >
                          <Code className="h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls */}
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Progress dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      currentFeaturedIndex === index
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/80",
                    )}
                    onClick={() => {
                      setDirection(index > currentFeaturedIndex ? 1 : -1);
                      setCurrentFeaturedIndex(index);
                    }}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      )}

      <ScrollReveal>
        <Tabs
          defaultValue="all"
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="flex justify-start gap-2 mb-8 bg-transparent w-max mx-auto">
              {projectCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={cn(
                    "px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all data-[state=active]:shadow-lg whitespace-nowrap",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80",
                  )}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    {category.icon && category.icon}
                    <span>{category.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ErrorBoundary key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard
                      project={project}
                      onSelect={() => {
                        setSelectedProject(project);
                        setIsDialogOpen(true);
                      }}
                    />
                  </motion.div>
                </ErrorBoundary>
              ))}
            </AnimatePresence>
          </div>
        </Tabs>
      </ScrollReveal>

      {/* Project details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 w-[95vw]">
          {selectedProject && (
            <div className="flex flex-col h-full">
              <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2">
                      {selectedProject.category === "ai"
                        ? "AI & Machine Learning"
                        : selectedProject.category === "web"
                          ? "Web Development"
                          : selectedProject.category === "data"
                            ? "Data Science"
                            : selectedProject.category === "audio"
                              ? "Audio & Voice Tech"
                              : "Research"}
                    </Badge>
                    <DialogTitle className="text-xl sm:text-2xl">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="mt-2 text-sm">
                      {selectedProject.description}
                    </DialogDescription>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < selectedProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
                <div className="px-4 sm:px-6 border-b">
                  <TabsList className="justify-start rounded-none bg-transparent h-10">
                    <AnimatedBox
                      glowColor={selectedProject.color
                        .split(" ")[1]
                        .replace("to-", "")}
                      glowIntensity={0.5}
                      rotateAmount={1}
                      className="overflow-hidden rounded-md"
                    >
                      <TabsTrigger
                        value="overview"
                        className="relative text-sm px-4 py-2 data-[state=active]:bg-primary/10"
                      >
                        Overview
                      </TabsTrigger>
                    </AnimatedBox>

                    <AnimatedBox
                      glowColor={selectedProject.color
                        .split(" ")[1]
                        .replace("to-", "")}
                      glowIntensity={0.5}
                      rotateAmount={1}
                      className="overflow-hidden rounded-md"
                    >
                      <TabsTrigger
                        value="details"
                        className="relative text-sm px-4 py-2 data-[state=active]:bg-primary/10"
                      >
                        Details
                      </TabsTrigger>
                    </AnimatedBox>

                    <AnimatedBox
                      glowColor={selectedProject.color
                        .split(" ")[1]
                        .replace("to-", "")}
                      glowIntensity={0.5}
                      rotateAmount={1}
                      className="overflow-hidden rounded-md"
                    >
                      <TabsTrigger
                        value="gallery"
                        className="relative text-sm px-4 py-2 data-[state=active]:bg-primary/10"
                      >
                        Gallery
                      </TabsTrigger>
                    </AnimatedBox>
                  </TabsList>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <TabsContent value="overview" className="mt-0 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold mb-3">
                          Project Details
                        </h4>
                        <p className="mb-6 text-sm sm:text-base">
                          {selectedProject.longDescription}
                        </p>

                        <h4 className="text-lg font-semibold mb-3">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2 mb-6">
                          {selectedProject.achievements.map(
                            (achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                  <span className="text-xs text-primary">
                                    ✓
                                  </span>
                                </div>
                                <span className="text-sm sm:text-base">
                                  {achievement}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>

                        <h4 className="text-lg font-semibold mb-3">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedProject.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                          <AnimatedBox
                            glowColor={selectedProject.color
                              .split(" ")[1]
                              .replace("to-", "")}
                            glowIntensity={0.8}
                            rotateAmount={2}
                            className="overflow-hidden rounded-md"
                          >
                            <Button
                              variant="default"
                              className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-white hover:opacity-90"
                              onClick={() =>
                                handleDemoClick(selectedProject.demoUrl)
                              }
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                <ExternalLink className="h-4 w-4" />
                                Live Demo
                              </span>
                            </Button>
                          </AnimatedBox>

                          <AnimatedBox
                            glowColor={selectedProject.color
                              .split(" ")[1]
                              .replace("to-", "")}
                            glowIntensity={0.8}
                            rotateAmount={2}
                            className="overflow-hidden rounded-md"
                          >
                            <Button
                              variant="outline"
                              className="relative overflow-hidden hover:bg-primary/10"
                              asChild
                            >
                              <a
                                href={selectedProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <Github className="h-4 w-4" />
                                GitHub
                              </a>
                            </Button>
                          </AnimatedBox>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-3">
                          Project Info
                        </h4>
                        <div className="space-y-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">
                              Completed
                            </span>
                            <span>{selectedProject.completed}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">
                              Team Size
                            </span>
                            <span>{selectedProject.teamSize} people</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">
                              Difficulty
                            </span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < selectedProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-0">
                    <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={selectedProject.imageUrl || "/placeholder.svg"}
                          alt={selectedProject.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          Project Description
                        </h4>
                        <p className="text-sm sm:text-base">
                          {selectedProject.longDescription}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          Implementation Details
                        </h4>
                        <p className="text-sm sm:text-base">
                          This project was implemented using{" "}
                          {selectedProject.technologies.join(", ")}. The
                          development process involved careful planning,
                          iterative development, and rigorous testing to ensure
                          high-quality results.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          Challenges & Solutions
                        </h4>
                        <p className="text-sm sm:text-base">
                          During development, we encountered several challenges
                          including performance optimization, scalability
                          concerns, and integration complexities. These were
                          addressed through innovative approaches and best
                          practices in software engineering.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(selectedProject.gallery || []).map((imageUrl, index) => (
                        <div key={index} className="overflow-hidden rounded-lg">
                          <div className="relative aspect-video">
                            <Image
                              src={imageUrl}
                              alt={`${selectedProject.title} screenshot ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionContainer>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  onSelect: () => void;
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isClient = useIsClient();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <AnimatedBox
      glowColor={project.color.split(" ")[1].replace("to-", "")}
      glowIntensity={isButtonHovered ? 0.8 : 0}
      rotateAmount={isButtonHovered ? 2 : 0}
      hoverScale={1}
      className="w-full"
    >
      <Card
        className="overflow-hidden h-full flex flex-col border-none shadow-md hover:shadow-lg transition-all duration-300 group bg-background/80 backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-r",
              project.color,
            )}
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              ref={buttonRef}
              variant="outline"
              className="relative border-white text-white hover:bg-white/20 transition-all duration-300 overflow-hidden"
              onClick={onSelect}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <span className="relative z-10">View Details</span>
              {isButtonHovered && (
                <div
                  className="absolute inset-0 opacity-70 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${project.color.split(" ")[1].replace("to-", "")}, transparent 70%)`,
                  }}
                />
              )}
            </Button>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="text-xs">
              {project.category === "ai"
                ? "AI & ML"
                : project.category === "web"
                  ? "Web Dev"
                  : project.category === "data"
                    ? "Data Science"
                    : project.category === "audio"
                      ? "Audio"
                      : "Research"}
            </Badge>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < project.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                />
              ))}
            </div>
          </div>

          <h3 className="font-bold mb-2 line-clamp-1">{project.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4 mt-auto">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.technologies.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{project.completed}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>Team: {project.teamSize}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedBox>
  );
}
