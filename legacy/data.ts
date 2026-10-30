projects: [
  {
    title: "Movie Recommendation System",
    description: "A content-based movie recommendation system that suggests similar movies based on input titles. Uses metadata like genres, directors, cast, and plot keywords to calculate movie similarity using cosine similarity on processed feature vectors.",
    tech: ["Python", "Pandas", "Scikit-learn", "Cosine Similarity", "Streamlit", "TMDb API"],
    github: "https://github.com/mubarakx01/Movie-Recommendation-System",
    demo: "https://github.com/mubarakx01/Movie-Recommendation-System",
    image: "/projects/movie-recommender.png",
    features: [
      "Preprocessed and merged movie metadata to create a comprehensive dataset",
      "Extracted meaningful features such as genre, keywords, cast, and director",
      "Vectorized textual data using CountVectorizer and calculated similarity scores",
      "Built a recommendation function to return top 10 similar movies",
      "Integrated TMDb API to fetch real movie posters and overviews",
      "Created an interactive frontend using Streamlit for live testing"
    ],
    category: "Data Science"
  },
  {
    title: "AI-Powered Resume Builder",
    description: "An intelligent resume builder that uses AI to help users create professional resumes. Features include smart content suggestions, ATS optimization, and real-time preview.",
    tech: ["React", "TypeScript", "OpenAI API", "Tailwind CSS"],
    github: "https://github.com/yourusername/resume-builder",
    demo: "https://resume-builder-demo.com",
    image: "/projects/resume-builder.png",
    features: [
      "AI-powered content suggestions",
      "ATS-friendly formatting",
      "Multiple template options",
      "Real-time preview",
      "Export to PDF"
    ],
    category: "AI & ML"
  },
  {
    title: "3D Portfolio Website",
    description: "A modern portfolio website featuring 3D elements and interactive animations built with Three.js and React.",
    tech: ["React", "Three.js", "GSAP", "Tailwind CSS"],
    github: "https://github.com/yourusername/3d-portfolio",
    demo: "https://3d-portfolio-demo.com",
    image: "/projects/3d-portfolio.png",
    features: [
      "Interactive 3D elements",
      "Smooth animations",
      "Responsive design",
      "Dark/Light mode",
      "Project showcase"
    ],
    category: "Web Development"
  }
] 