export type Category =
  "Keynote" | "Workshop" | "Talk" | "Hackathon" | "Competition" | "Gaming";
export type Session = {
  id: string;
  day: number;
  start: string;
  end: string;
  title: string;
  short: string;
  category: Category;
  level: string;
  venue: string;
  speaker: string;
  track: string;
  description: string;
  requirements: string[];
};
export const eventStart = "2026-10-16T09:00:00+05:30";
export const sessions: Session[] = [
  {
    id: "opening",
    day: 1,
    start: "09:00",
    end: "10:30",
    title: "Opening keynote: The future of developer ecosystems",
    short: "Opening keynote",
    category: "Keynote",
    level: "All levels",
    venue: "Main Auditorium",
    speaker: "Dr. Ananya Patnaik",
    track: "all",
    description:
      "Begin the festival with a conversation about AI, developer communities, and the ideas shaping what we build next.",
    requirements: [],
  },
  {
    id: "gemini",
    day: 1,
    start: "11:00",
    end: "13:00",
    title: "Multimodal AI agents with Gemini",
    short: "Multimodal AI agents with Gemini",
    category: "Workshop",
    level: "Intermediate",
    venue: "Computer Lab 3",
    speaker: "Rohan Samal",
    track: "ai",
    description:
      "Build a context-aware AI agent using Gemini, function calling, and Python. Explore how text and other inputs come together in a practical workflow.",
    requirements: [
      "Python installed",
      "Google AI Studio account",
      "Basic Python knowledge",
    ],
  },
  {
    id: "serverless",
    day: 1,
    start: "14:00",
    end: "16:00",
    title: "Serverless web apps with Next.js & Cloud Run",
    short: "Serverless web apps",
    category: "Workshop",
    level: "All levels",
    venue: "Seminar Hall B",
    speaker: "Subhashree Mohanty",
    track: "web",
    description:
      "Learn to build and deploy serverless web applications using modern cloud tools.",
    requirements: [
      "Node.js installed",
      "Git installed",
      "HTML, CSS and JavaScript basics",
    ],
  },
  {
    id: "security",
    day: 1,
    start: "16:30",
    end: "18:00",
    title: "Web3 & cloud security",
    short: "Web3 & cloud security",
    category: "Talk",
    level: "Intermediate",
    venue: "Main Auditorium",
    speaker: "Vikramaditya Dash",
    track: "devops",
    description:
      "Explore cloud credentials, OAuth, and decentralized trust systems with a practical security perspective.",
    requirements: ["Basic networking knowledge"],
  },
  {
    id: "hack-kickoff",
    day: 2,
    start: "09:30",
    end: "10:30",
    title: "AI/ML hack sprint: Kickoff & problem reveal",
    short: "Hack sprint kickoff",
    category: "Hackathon",
    level: "All levels",
    venue: "Innovation Hub & Hack Zone",
    speaker: "Tekno Krraft Jury Panel",
    track: "ai",
    description:
      "Discover the challenges for the 24-hour hack sprint across healthcare, finance, smart cities, and sustainability.",
    requirements: ["Laptop and charger", "A working development environment"],
  },
  {
    id: "systems",
    day: 2,
    start: "11:00",
    end: "13:00",
    title: "System design: Scalable distributed systems",
    short: "System design bootcamp",
    category: "Workshop",
    level: "Advanced",
    venue: "Conference Room 204",
    speaker: "Amitabh Swain",
    track: "devops",
    description:
      "Explore scalable architectures using Redis, Kafka, and cloud load balancing. Work through the decisions behind distributed systems.",
    requirements: [
      "Basic networking knowledge",
      "Familiarity with backend development",
    ],
  },
  {
    id: "flutter",
    day: 2,
    start: "14:00",
    end: "16:00",
    title: "Cross-platform Flutter bootcamp",
    short: "Flutter & Firebase bootcamp",
    category: "Workshop",
    level: "Beginner",
    venue: "Computer Lab 1",
    speaker: "Priyanka Mishra",
    track: "mobile",
    description:
      "Build a real-time chat application with Flutter and Firebase, from interface to data.",
    requirements: [
      "Flutter SDK installed",
      "Code editor installed",
      "Object-oriented programming basics",
    ],
  },
  {
    id: "gaming",
    day: 2,
    start: "19:00",
    end: "21:00",
    title: "Tekno gaming night & LAN showdown",
    short: "Tekno gaming night",
    category: "Gaming",
    level: "All levels",
    venue: "Student Activity Center",
    speaker: "GDG Gaming Guild",
    track: "all",
    description:
      "Take a break from building and meet fellow participants through gaming and informal conversations.",
    requirements: [],
  },
  {
    id: "coding",
    day: 3,
    start: "09:30",
    end: "12:30",
    title: "Competitive coding championship finals",
    short: "KrraftCode championship finals",
    category: "Competition",
    level: "Advanced",
    venue: "Central Computing Center",
    speaker: "Algorithm Jury",
    track: "web",
    description:
      "The shortlisted coders tackle algorithmic challenges under time and memory constraints.",
    requirements: ["Laptop and charger", "Your preferred coding environment"],
  },
  {
    id: "pitching",
    day: 3,
    start: "10:00",
    end: "13:00",
    title: "Hack sprint project pitching & live demos",
    short: "Hack sprint pitching & demos",
    category: "Hackathon",
    level: "All levels",
    venue: "Main Auditorium Stage",
    speaker: "Venture & Tech Jury",
    track: "ai",
    description:
      "Finalist teams present their working prototypes and the decisions behind their ideas.",
    requirements: ["Working project demo", "Project presentation"],
  },
  {
    id: "closing",
    day: 3,
    start: "14:30",
    end: "17:00",
    title: "Awards & closing ceremony",
    short: "Awards & closing ceremony",
    category: "Keynote",
    level: "All levels",
    venue: "Open Air Theatre",
    speaker: "Faculty & GDG Team",
    track: "all",
    description:
      "Come together to celebrate the work, ideas, and connections made across the festival.",
    requirements: [],
  },
];
export const tracks = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    level: "Intermediate",
    description:
      "Model building, generative AI, real-world applications and responsible AI.",
    prerequisite: "Basic Python knowledge and REST APIs.",
    modules: [
      "Gemini API & prompt engineering",
      "LangChain & vector databases",
      "Vertex AI Studio",
      "Fine-tuning small language models",
    ],
  },
  {
    id: "web",
    title: "Web & Cloud",
    level: "Beginner",
    description:
      "Modern web development, cloud infrastructure, serverless apps and scalable systems.",
    prerequisite: "HTML, CSS, JavaScript and Git basics.",
    modules: [
      "Next.js & server actions",
      "Cloud Run & Cloud SQL",
      "GraphQL & REST APIs",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    level: "Beginner",
    description:
      "Build modern mobile apps with Flutter, explore native capabilities and deployment.",
    prerequisite: "Object-oriented programming basics.",
    modules: [
      "Flutter state management",
      "Firebase authentication & Firestore",
      "Native platform channels",
    ],
  },
  {
    id: "devops",
    title: "Open Source & DevOps",
    level: "Advanced",
    description:
      "Contribute to open source, learn DevOps tools, CI/CD and build for global impact.",
    prerequisite: "Linux commands and basic networking.",
    modules: [
      "Docker & container orchestration",
      "Terraform & infrastructure as code",
      "GitOps & ArgoCD",
    ],
  },
];
export const speakers = [
  {
    name: "Dr. Ananya Patnaik",
    initials: "AP",
    field: "Cloud architecture",
    colour: "blue",
  },
  {
    name: "Rohan Samal",
    initials: "RS",
    field: "Generative AI",
    colour: "red",
  },
  {
    name: "Priyanka Mishra",
    initials: "PM",
    field: "Flutter & mobile",
    colour: "green",
  },
  {
    name: "Amitabh Swain",
    initials: "AS",
    field: "System design",
    colour: "yellow",
  },
];
export const faqs = [
  [
    "Who can participate?",
    "Students, research scholars, and developers are welcome. Choose a session that matches your experience and check its prerequisites before attending.",
  ],
  [
    "How do I register?",
    "Use Register to select the sessions you are interested in and review your details. This challenge prototype saves a registration draft on your device; it does not book an official event pass.",
  ],
  [
    "Can I join the hack sprint solo?",
    "Yes. Solo participation and teams of 2 to 4 members are welcome. A team matchmaking session is planned. The organisers will confirm its time and venue.",
  ],
  [
    "What should I bring?",
    "Please bring a laptop, charger and your student ID. Check your selected workshops for software requirements and use the preparation checklist to get ready.",
  ],
  [
    "Will certificates be provided?",
    "Participation certificates are part of the event. Check the final attendance and eligibility requirements with the event organisers.",
  ],
];
export function overlaps(a: Session, b: Session) {
  return a.day === b.day && a.start < b.end && b.start < a.end;
}
