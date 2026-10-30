"use client";

import { useState } from "react";
import {
  Github,
  ExternalLink,
  Code,
  Star,
  Search,
  X,
  Calendar,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

// Project data
const projects = [
  {
    id: 1,
    title:
      "AI-Driven CNC Machine Health Monitoring: IoT Analytics with Mobile & Dashboard Integration",
    category: "CNC Machine Monitoring & AI",
    description:
      "Developed an end-to-end intelligent monitoring system to predict CNC machine failures, optimize maintenance schedules, and enhance manufacturing efficiency using IoT, AI, and real-time analytics",
    technologies: [
      "React.js/Next.js",
      "PyTorch",
      "WebSockets",
      "FastAPI",
      "SheetJS",
    ],

    difficulty: 5,
    completed: "2025",
    teamSize: 3,
    featured: true,
    demoUrl: "#",
    githubUrl: "#",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],

    details:
      "A comprehensive voice cloning system that allows for real-time audio processing with minimal latency. The system uses state-of-the-art deep learning models to generate natural-sounding speech that matches the target voice.",
  },
  {
    id: 2,
    title: "Movie Recommendation System",
    category: "Data Science",
    description:
      "A content-based movie recommendation system that suggests similar movies based on input titles using metadata and cosine similarity.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit", "TMDb API"],
    difficulty: 4,
    completed: "2023",
    teamSize: 1,
    featured: false,
    demoUrl: "https://github.com/mubarakx01/Movie-Recommendation-System",
    githubUrl: "https://github.com/mubarakx01/Movie-Recommendation-System",
    images: [
      "/lib/file/movie-recommendation-system.png",
      "/lib/file/movie-ratings-visualization.png",
    ],
  },
  {
    id: 3,
    title: "Airbnb Price Prediction System",
    category: "Data Science",
    description:
      "A machine learning model to predict nightly prices of Airbnb listings in Chennai, Tamil Nadu, using listing metadata, location-based features, and text processing techniques.",
    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "Streamlit",
      "GeoPy",
    ],

    difficulty: 4,
    completed: "2023",
    teamSize: 1,
    featured: false,
    demoUrl: "#",
    githubUrl: "https://github.com/yourusername/airbnb-price-prediction",
    images: [],
    details:
      "A comprehensive price prediction system that helps hosts optimize pricing and guests find value-for-money accommodations. Features include data preprocessing, feature engineering from listing attributes, location-based analysis, and an interactive web interface for real-time predictions.",
  },
  {
    id: 5,
    title: "Wikipedia Connection Finder",
    category: "Network Analysis",
    description:
      "Tool for finding the shortest path between any two Wikipedia articles through hyperlinks.",
    technologies: ["Python", "NetworkX", "Flask"],
    difficulty: 3,
    completed: "2022-08-10",
    teamSize: 1,
    featured: false,
    demoUrl: "#",
    githubUrl: "#",
    images: ["/placeholder.svg?height=400&width=600"],
    details:
      "An application that analyzes the network structure of Wikipedia to find the shortest path between any two articles. The tool uses graph theory algorithms to navigate through the complex web of hyperlinks.",
  },
  {
    id: 6,
    title: "NYC Education Analytics",
    category: "Data Science",
    description:
      "Data analysis and visualization platform for NYC public school performance metrics.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Tableau"],
    difficulty: 4,
    completed: "2022-05-22",
    teamSize: 4,
    featured: false,
    demoUrl: "#",
    githubUrl: "#",
    images: ["/placeholder.svg?height=400&width=600"],
    details:
      "A comprehensive data analysis platform that processes and visualizes performance metrics from NYC public schools. The system includes predictive models for identifying at-risk students and schools that need additional resources.",
  },
  {
    id: 0,
    title: "AI-Powered GYM Workout",
    category: "AI & Fitness",
    description:
      "A comprehensive AI-driven fitness application that provides personalized workout plans, real-time pose estimation, wearable integration, and social features for an engaging workout experience.",
    technologies: [
      "TensorFlow",
      "MediaPipe",
      "React Native",
      "Node.js",
      "Python",
      "AWS",
      "Firebase",
    ],
    difficulty: 5,
    completed: "2024",
    teamSize: 1,
    featured: true,
    demoUrl: "#",
    githubUrl: "https://github.com/yourusername/ai-gym-workout",
    images: [
      "/lib/file/ai-gym-features.png",
      "/lib/file/ai-gym-dashboard.png"
    ],
    details:
      "An advanced fitness platform that leverages artificial intelligence to deliver personalized workout experiences. Features include goal-based customization, real-time pose estimation for form correction, wearable device integration, AR-powered training, and social features to keep users motivated. The app includes a vast exercise library with 500+ exercises, personalized workout plans, and comprehensive progress tracking.",
  },
];

// Filter types
type CategoryFilter = string | null;
type DifficultyFilter = number | null;
type TeamSizeFilter = number | null;

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>(null);
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>(null);
  const [teamSizeFilter, setTeamSizeFilter] = useState<TeamSizeFilter>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const featuredProject = projects.find((project) => project.featured);

  // Filter projects based on search and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      !categoryFilter || project.category === categoryFilter;
    const matchesDifficulty =
      !difficultyFilter || project.difficulty === difficultyFilter;
    const matchesTeamSize =
      !teamSizeFilter || project.teamSize === teamSizeFilter;

    return (
      matchesSearch && matchesCategory && matchesDifficulty && matchesTeamSize
    );
  });

  // Get unique categories for filter
  const categories = Array.from(
    new Set(projects.map((project) => project.category)),
  );

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter(null);
    setDifficultyFilter(null);
    setTeamSizeFilter(null);
  };

  // Handle demo click
  const handleDemoClick = (url: string) => {
    toast({
      title: "Demo Link",
      description: "Opening demo in a new tab...",
      duration: 3000,
    });
    window.open(url, "_blank");
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <div className="mb-2 text-sm tracking-[0.2em] text-gray-400 uppercase">
            Featured
          </div>
          <div className="relative">
            <h2 className="font-sans text-6xl font-black tracking-tight text-gray-400/80">
              PROJECTS
            </h2>
          </div>
          <div className="relative">
            <h3 className="font-sans text-5xl font-black tracking-tight text-gray-400/80">
              I'VE DONE
            </h3>
          </div>
          <p className="text-gray-400 max-w-[600px] mx-auto text-xl mt-8 leading-relaxed">
            Here are some of my recent projects. Each one represents a unique
            challenge and solution.
          </p>
        </div>

        {featuredProject && (
          <div className="mb-12">
            <motion.h3
              className="text-xl font-semibold mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Featured Project
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-900/30 to-purple-900/30">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative aspect-video overflow-hidden rounded-tl-xl md:rounded-l-xl">
                    <Image
                      src={featuredProject.images[0] || "/placeholder.svg"}
                      alt={featuredProject.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4">
                        <Badge className="mb-2">
                          {featuredProject.category}
                        </Badge>
                        <h3 className="text-xl font-bold">
                          {featuredProject.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-muted-foreground mb-6">
                      {featuredProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProject.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />

                        <span>Completed: {featuredProject.completed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />

                        <span>Team Size: {featuredProject.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />

                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < featuredProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-2 group"
                        onClick={() => handleDemoClick(featuredProject.demoUrl)}
                      >
                        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        Live Demo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          setSelectedProject(featuredProject);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Code className="h-4 w-4" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        asChild
                      >
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select
                value={categoryFilter || ""}
                onValueChange={(value) => setCategoryFilter(value || null)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={difficultyFilter?.toString() || ""}
                onValueChange={(value) =>
                  setDifficultyFilter(value ? Number.parseInt(value) : null)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      {level} {level === 1 ? "Star" : "Stars"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={resetFilters}
                className="shrink-0"
                aria-label="Reset filters"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No projects match your filters. Try adjusting your search
                criteria.
              </p>
              <Button variant="link" onClick={resetFilters} className="mt-2">
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProjects
                  .filter((p) => !p.featured)
                  .map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="project-card"
                    >
                      <div className="p-6">
                        <Badge className="mb-3">{project.category}</Badge>
                        <h3 className="text-lg font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < project.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Team: {project.teamSize}
                          </div>
                        </div>

                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setSelectedProject(project);
                            setIsDialogOpen(true);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
            {selectedProject && (
              <div className="flex flex-col h-full">
                <DialogHeader className="px-6 pt-6 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2">{selectedProject.category}</Badge>
                      <DialogTitle className="text-2xl">
                        {selectedProject.title}
                      </DialogTitle>
                      <DialogDescription className="mt-2">
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

                <Tabs
                  defaultValue="overview"
                  className="flex-1 overflow-hidden"
                >
                  <TabsList className="px-6 justify-start border-b rounded-none">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
                  </TabsList>

                  <ScrollArea className="flex-1 p-6">
                    <TabsContent value="overview" className="mt-0 h-full">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <h4 className="text-lg font-semibold mb-3">
                            Project Details
                          </h4>
                          <p className="mb-6">{selectedProject.details}</p>

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

                          <div className="flex gap-3 mt-6">
                            <Button
                              variant="default"
                              className="gap-2"
                              onClick={() =>
                                handleDemoClick(selectedProject.demoUrl)
                              }
                            >
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </Button>
                            <Button variant="outline" className="gap-2" asChild>
                              <a
                                href={selectedProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="h-4 w-4" />
                                GitHub
                              </a>
                            </Button>
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

                    <TabsContent value="gallery" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProject.images.map((image, index) => (
                          <div
                            key={index}
                            className="overflow-hidden rounded-lg"
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${selectedProject.title} screenshot ${index + 1}`}
                              width={600}
                              height={400}
                              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="demo" className="mt-0">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center p-6">
                          <h4 className="text-lg font-semibold mb-2">
                            Interactive Demo
                          </h4>
                          <p className="text-muted-foreground mb-4">
                            Experience the project firsthand with our
                            interactive demo.
                          </p>
                          <Button
                            onClick={() =>
                              handleDemoClick(selectedProject.demoUrl)
                            }
                            className="gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Launch Demo
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
