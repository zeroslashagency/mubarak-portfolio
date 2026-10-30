// Single source of truth for everything the site says. Components only render this.

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => (path.startsWith("/") ? `${base}${path}` : path);

export type Project = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  year: string;
  status: string;
  tags: string[];
  stack: string[];
  highlights: string[];
  image: { src: string; width: number; height: number };
  team: number;
  repo?: string;
  featured?: boolean;
};

export type Entry = {
  name: string;
  detail: string;
  place: string;
  period: string;
  href?: string;
};

export const profile = {
  name: "Mubarak A",
  firstName: "Mubarak",
  role: "Software Engineer",
  focus: ["Machine Learning", "Generative AI", "Computer Vision", "NLP"],
  location: "Chennai, India",
  email: "mr1398463@gmail.com",
  photo: "/profile.jpg",
  resume: "/AI_x1.pdf",
  openToWork: true,
  links: [
    { label: "Resume", href: "/AI_x1.pdf" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mubarak-a-xyz/" },
    { label: "GitHub", href: "https://github.com/mubarakx01" },
  ],
};

export const tools = [
  { name: "Python", icon: "/tools/python.svg" },
  { name: "PyTorch", icon: "/tools/pytorch.svg" },
  { name: "TensorFlow", icon: "/tools/tensorflow.svg" },
  { name: "scikit-learn", icon: "/tools/scikitlearn.svg" },
  { name: "Pandas", icon: "/tools/pandas.svg" },
  { name: "FastAPI", icon: "/tools/fastapi.svg" },
  { name: "Flask", icon: "/tools/flask.svg" },
  { name: "Streamlit", icon: "/tools/streamlit.svg" },
  { name: "React", icon: "/tools/react.svg" },
  { name: "Next.js", icon: "/tools/nextdotjs.svg" },
  { name: "Docker", icon: "/tools/docker.svg" },
  { name: "MongoDB", icon: "/tools/mongodb.svg" },
];

export const projects: Project[] = [
  {
    slug: "ai-gym-workout",
    title: "AI-Powered Gym Workout",
    summary:
      "A fitness app that plans workouts around your goals and corrects your form in real time with pose estimation.",
    overview:
      "The platform builds a workout plan from the user's goals and adapts it as they progress. During a session, the camera feed runs through a pose model that flags bad form on each rep. Wearable data feeds into the same profile, and challenges and leaderboards keep people coming back.",
    year: "2024",
    status: "Personal project",
    tags: ["Computer Vision", "Mobile"],
    stack: ["TensorFlow", "MediaPipe", "React Native", "Node.js", "Python", "Firebase", "AWS"],
    highlights: [
      "Real-time pose estimation for form correction with TensorFlow and MediaPipe",
      "Workout plans that adapt to the user's goals and progress",
      "Wearable device integration for heart rate and activity tracking",
      "An AR virtual trainer that demonstrates each exercise",
      "Social challenges and leaderboards",
    ],
    image: { src: "/lib/file/ai-gym-dashboard.png", width: 3393, height: 2068 },
    team: 1,
    featured: true,
  },
  {
    slug: "cnc-machine-health",
    title: "CNC Machine Health Monitoring",
    summary:
      "IoT sensors and a prediction model that warn operators before a CNC machine fails, with a live dashboard and mobile alerts.",
    overview:
      "Sensors on each machine stream vibration, temperature and load readings over WebSockets to a FastAPI service. A model trained on that history scores failure risk, and the dashboard shows machine state live. Critical readings push an alert to the operator's phone so maintenance happens before the breakdown.",
    year: "2024",
    status: "Personal project",
    tags: ["IoT", "Predictive ML"],
    stack: ["PyTorch", "TensorFlow", "FastAPI", "WebSockets", "Next.js", "Docker"],
    highlights: [
      "Live machine health readings streamed from IoT sensors",
      "Predictive maintenance model that scores failure risk",
      "Dashboard for machine performance history and trends",
      "Mobile alerts for critical machine status changes",
    ],
    image: { src: "/lib/file/Machine-data-x3.png", width: 1545, height: 2000 },
    team: 1,
    repo: "https://github.com/mubarakx01",
    featured: true,
  },
  {
    slug: "movie-recommendation",
    title: "Movie Recommendation System",
    summary:
      "Type a movie you liked and get similar ones, ranked by cosine similarity over genre, cast, crew and plot keywords.",
    overview:
      "Movie metadata from TMDb is cleaned and merged into one feature vector per title, built from genres, director, cast and plot keywords. Cosine similarity between those vectors ranks the closest titles. A Streamlit front end lets you search a movie and see the recommendations with posters.",
    year: "2023",
    status: "Open source",
    tags: ["Recommender", "Data Science"],
    stack: ["Python", "Pandas", "scikit-learn", "Streamlit", "TMDb API"],
    highlights: [
      "Content-based filtering with cosine similarity",
      "Metadata merged into one feature vector per movie",
      "Interactive Streamlit app for live testing",
      "Posters and details pulled from the TMDb API",
    ],
    image: { src: "/lib/file/MOvie-x1.jpg", width: 1200, height: 567 },
    team: 1,
    repo: "https://github.com/mubarakx01/Movie-Recommendation-System",
    featured: true,
  },
  {
    slug: "airbnb-price-prediction",
    title: "Airbnb Price Prediction",
    summary:
      "Predicts the nightly price of Chennai Airbnb listings from listing details, location and description text.",
    overview:
      "The model combines listing attributes and amenities with location features, such as distance to landmarks computed with GeoPy, and text features from the listing description. Gradient boosted models (XGBoost and LightGBM) produce the price estimate, served through a Streamlit app.",
    year: "2023",
    status: "Personal project",
    tags: ["Regression", "NLP"],
    stack: ["Python", "Pandas", "XGBoost", "LightGBM", "GeoPy", "Streamlit"],
    highlights: [
      "Gradient boosted price models with XGBoost and LightGBM",
      "Location features from landmark proximity with GeoPy",
      "Text features and sentiment from listing descriptions",
      "Streamlit interface for instant price estimates",
    ],
    image: { src: "/lib/file/Airbnb.png", width: 3957, height: 1623 },
    team: 1,
  },
  {
    slug: "wikipedia-connection-finder",
    title: "Wikipedia Connection Finder",
    summary: "Finds the shortest chain of links between any two Wikipedia articles.",
    overview:
      "Wikipedia's link structure is treated as a graph, and a shortest path search walks it from one article to another. A Flask app takes the two titles and draws the chain with D3.js, while MongoDB caches visited pages so repeat searches come back fast.",
    year: "2022",
    status: "Personal project",
    tags: ["Graphs", "Web"],
    stack: ["Python", "NetworkX", "Flask", "MongoDB", "D3.js"],
    highlights: [
      "Shortest path search across Wikipedia's link graph",
      "Flask and D3.js interface that draws the path",
      "MongoDB cache for faster repeat lookups",
    ],
    image: { src: "/lib/file/Wikipedia.png", width: 1618, height: 990 },
    team: 1,
    repo: "https://github.com/mubarakx01",
  },
  {
    slug: "nyc-education-analytics",
    title: "NYC Education Analytics",
    summary: "Analysis and dashboards of NYC public school performance, built by a team of four.",
    overview:
      "The team cleaned and joined NYC public school datasets, looked for patterns in performance, and trained models that flag schools likely to need extra support. Findings were shared as Tableau dashboards and presented to education stakeholders.",
    year: "2022",
    status: "Team project",
    tags: ["Analytics", "Visualization"],
    stack: ["Python", "Pandas", "scikit-learn", "Tableau", "R"],
    highlights: [
      "Performance patterns across NYC public schools",
      "Models that flag schools needing more resources",
      "Interactive Tableau dashboards",
      "Findings presented to education stakeholders",
    ],
    image: { src: "/lib/file/NYC.jpeg", width: 339, height: 149 },
    team: 4,
    repo: "https://github.com/mubarakx01",
  },
];

export const featured = projects.filter((p) => p.featured);
export const shipped = projects.filter((p) => !p.featured);
export const findProject = (slug: string) => projects.find((p) => p.slug === slug);

export const experience: Entry[] = [
  {
    name: "Kshitiksha Foundation",
    detail: "Web Designer Intern",
    place: "Remote",
    period: "Apr 2024",
    href: "/web-designer-internship-reference.pdf",
  },
  {
    name: "Shiash Info Solutions",
    detail: "Data Science Intern",
    place: "Chennai",
    period: "Nov 2023",
  },
];

export const education: Entry[] = [
  {
    name: "Anna University College of Engineering",
    detail: "B.E. Electronics and Communication",
    place: "Arani",
    period: "2020 to 2023",
  },
  {
    name: "Dr M G R Polytechnic College",
    detail: "Diploma, Electronics and Communication",
    place: "Arani",
    period: "2017 to 2019",
  },
  {
    name: "St Joseph's Boys' Higher Secondary School",
    detail: "Higher Secondary, Computer Science",
    place: "Chennai",
    period: "2017 to 2019",
  },
];

// The /me film. One chapter per scene; each scene is an animation in components/site/story-art.tsx, lines type in order.
export type Art = "kid" | "code" | "circuit" | "engineering" | "software" | "work" | "weave";
export type Chapter = { label: string; title: string; art: Art; lines: string[] };

export const story: Chapter[] = [
  {
    label: "Chapter 01",
    title: "Chennai, childhood",
    art: "kid",
    lines: ["I grew up in Chennai.", "Always the kid asking how things worked on the inside."],
  },
  {
    label: "Chapter 02",
    title: "The first program",
    art: "code",
    lines: ["At St Joseph's I picked computer science.", "My first lines of C++ showed me I could build something from nothing."],
  },
  {
    label: "Chapter 03",
    title: "Wires and solder",
    art: "circuit",
    lines: ["I wanted to know what runs under the code.", "So I did a diploma in electronics at Dr M G R Polytechnic, Arani."],
  },
  {
    label: "Chapter 04",
    title: "Engineering",
    art: "engineering",
    lines: ["A degree in electronics and communication.", "I wired sensors to code and built an IoT health monitor. The data got interesting."],
  },
  {
    label: "Chapter 05",
    title: "Everything, all at once",
    art: "software",
    lines: ["After college the branches multiplied.", "Python, models, APIs, React, Docker. I kept pulling on every thread."],
  },
  {
    label: "Chapter 06",
    title: "First real work",
    art: "work",
    lines: ["Data science intern at Shiash Info Solutions, Chennai.", "Then web design intern at Kshitiksha Foundation."],
  },
  {
    label: "Chapter 07",
    title: "Holding the threads",
    art: "weave",
    lines: ["Now I build models for vision, recommendations and prediction.", "And I tie them together into apps people can use."],
  },
];

export const certifications = {
  href: "https://www.linkedin.com/in/mubarak-a-xyz/details/certifications/",
  items: [
    { name: "Docker Foundations", issuer: "Docker, Inc" },
    { name: "Generative AI for Sales with Microsoft 365 Copilot", issuer: "Microsoft" },
    { name: "Node", issuer: "HackerRank" },
    { name: "CSS", issuer: "HackerRank" },
    { name: "Adobe Illustrator", issuer: "Adobe" },
    { name: "Negotiation", issuer: "American Negotiation Institute" },
    { name: "Social Media Marketing", issuer: "Hootsuite" },
    { name: "Digital Marketing", issuer: "Content Marketing Institute" },
  ],
};
