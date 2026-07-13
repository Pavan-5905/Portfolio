export type IconName =
  | "adobe"
  | "award"
  | "badge"
  | "brain"
  | "calendar"
  | "code"
  | "database"
  | "download"
  | "external"
  | "farm"
  | "github"
  | "globe"
  | "graduation"
  | "hackerrank"
  | "image"
  | "instagram"
  | "linkedin"
  | "mail"
  | "map"
  | "monitor"
  | "phone"
  | "shield"
  | "sparkles"
  | "terminal"
  | "twitter"
  | "users";

export const resume = {
  title: "Pavan Kumar Ketha Resume",
  href: "/Pavan-Kumar-Ketha-Resume.pdf",
  preview: "/previews/resume.png",
  updated: "July 13, 2026"
};

export const profileImages = [
  {
    src: "/Profiles/Pavan%20Kumar%20Ketha%201.png",
    alt: "Pavan Kumar Ketha profile photograph 1"
  },
  {
    src: "/Profiles/Pavan%20Kumar%20Ketha%202.jpg",
    alt: "Pavan Kumar Ketha profile photograph 2"
  },
  {
    src: "/Profiles/Pavan%20Kumar%20Ketha%203.jpg",
    alt: "Pavan Kumar Ketha profile photograph 3"
  }
];

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/leadership", label: "Leadership" },
  { href: "/github", label: "GitHub" },
  { href: "/certifications", label: "Certifications" },
  { href: "/workshops", label: "Workshops" },
  { href: "/community", label: "Community" },
  { href: "/community-service", label: "Community Service" },
  { href: "/contact", label: "Contact" }
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Pavan-5905", icon: "github" as IconName },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pavan-kumar-ketha",
    icon: "linkedin" as IconName
  },
  { label: "X", href: "https://twitter.com/pavan_917", icon: "twitter" as IconName },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thepavankumar.k/",
    icon: "instagram" as IconName
  },
  { label: "Email", href: "mailto:k.pavan.5905@gmail.com", icon: "mail" as IconName }
];

export const contact = {
  name: "Pavan Kumar Ketha",
  email: "k.pavan.5905@gmail.com",
  phone: "+91 9704710470",
  location: "Visakhapatnam, Andhra Pradesh, India"
};

export const heroIntro =
  "Motivated developer building efficient applications, AI-backed tools, and polished software experiences for practical real-world problems.";

export const stats = [
  { value: "72.3%", label: "B.Tech CSE percentage" },
  { value: "3", label: "Resume-backed projects" },
  { value: "2026", label: "CSI student chair term" }
];

export const focusAreas = [
  { title: "Artificial Intelligence", icon: "brain" as IconName },
  { title: "Full Stack Development", icon: "code" as IconName },
  { title: "System Design", icon: "terminal" as IconName },
  { title: "Computer Vision", icon: "monitor" as IconName },
  { title: "RAG Systems", icon: "database" as IconName },
  { title: "Model Context Protocol", icon: "sparkles" as IconName },
  { title: "Cloud Deployment", icon: "globe" as IconName },
  { title: "Embedded Systems", icon: "shield" as IconName }
];

export const skills = [
  {
    group: "Programming Languages",
    items: ["Python", "Java", "C", "MATLAB"]
  },
  {
    group: "AI Engineering",
    items: ["RAG", "MCP", "Computer Vision"]
  },
  {
    group: "Web & Frameworks",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "FastAPI", "Flask"]
  },
  {
    group: "Database & Cloud",
    items: ["SQL", "Azure SQL", "Azure Blob Storage", "MongoDB", "Cloud Deployment"]
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "VS Code", "Claude Code", "Codex", "Cursor"]
  },
  {
    group: "Foundations",
    items: ["Data Structures", "Embedded Systems", "Real-time Sensor Data", "Problem Solving"]
  }
];

export const projects = [
  {
    title: "Disaster Insight Hub Assistant",
    description:
      "Flask-based Retrieval-Augmented Generation experience that classifies crisis-related text, fetches safety playbooks, and drafts natural responses through Ollama Cloud.",
    techStack: ["Python", "React", "Tailwind CSS", "FastAPI", "MongoDB", "Ollama", "LangChain"],
    features: [
      "Multi-output Random Forest crisis detection",
      "TF-IDF retrieval over a curated Excel knowledge base",
      "Safety playbook retrieval and natural response drafting",
      "Full-stack assistant experience for disaster management"
    ],
    keyLearnings:
      "Enhanced full-stack development, AI integration, and cloud deployment skills.",
    futureScope:
      "Predictive AI, IoT, GIS mapping, and smarter real-time disaster management.",
    architecture: "Architecture placeholder for RAG flow, classifier, retrieval layer, and response engine.",
    repository: "https://github.com/Pavan-5905/Disaster-Insight-Hub-Assistant",
    icon: "brain" as IconName
  },
  {
    title: "Pothole Detection Assistant",
    description:
      "AI-powered pothole detection system that identifies potholes from road images or video streams using computer vision and deep learning techniques.",
    techStack: ["Python", "YOLO", "OpenCV", "NumPy"],
    features: [
      "Road image and video stream detection",
      "Real-time pothole identification",
      "Intuitive monitoring interface",
      "Maintenance prioritization support for road safety"
    ],
    keyLearnings:
      "Strengthened computer vision, deep learning, and real-time object detection skills.",
    futureScope:
      "GPS mapping, severity analysis, and smart road maintenance integration.",
    architecture: "Architecture placeholder for camera input, YOLO inference, analysis, and reporting flow.",
    repository: "https://github.com/Pavan-5905/Pothole-Detection-Assistant",
    icon: "monitor" as IconName
  },
  {
    title: "Smart Weather Monitoring System",
    description:
      "Offline smart weather monitoring system using Arduino ESP8266 and environmental sensors to provide real-time temperature, humidity, and rainfall data for rural farmers without internet connectivity.",
    techStack: ["Arduino ESP8266", "Embedded C", "DHT11 Sensor", "Rain Sensor", "LDR", "LCD Display (I2C)"],
    features: [
      "Offline rural weather monitoring",
      "Temperature, humidity, and rainfall sensing",
      "Arduino ESP8266 sensor processing",
      "LCD-based local data display"
    ],
    keyLearnings:
      "Learned embedded systems and real-time sensor data processing using Arduino ESP8266.",
    futureScope:
      "AI/ML model integration for predictive weather forecasting.",
    architecture: "Architecture placeholder for sensors, ESP8266 processing, display, and forecasting extension.",
    repository: "https://github.com/Pavan-5905/Smart-Weather-Monitoring-System",
    icon: "terminal" as IconName
  }
];

export const leadership = [
  {
    role: "CHAIR",
    title: "Computer Society of India (CSI)",
    context: "Student Branch",
    period: "2025 - 2026",
    description: "Student Chair of the CSI Student Branch - DIET.",
    icon: "users" as IconName
  },
  {
    role: "DVC",
    title: "Diet Volunteering Club",
    context: "Institute Level Volunteer",
    period: "Campus programs",
    description: "DVC member for volunteering services in campus level programs.",
    icon: "badge" as IconName
  },
  {
    role: "Volunteer",
    title: "CII Partnership Summit 2025",
    context: "Visakhapatnam",
    period: "April 2025",
    description: "Volunteered at CII - Partnership Summit held at Visakhapatnam.",
    icon: "award" as IconName
  }
];

export const certifications = [
  {
    title: "Python - NPTEL Elite + Silver",
    issuer: "NPTEL",
    date: "November 2025",
    href: "/Certifications/The%20Joy%20of%20Computing%20using%20Python.pdf",
    preview: "/previews/certifications/python-nptel.png",
    icon: "award" as IconName
  },
  {
    title: "Front-End Web Development",
    issuer: "edX | IBM",
    date: "July 2024",
    href: "/Certifications/IBM%20CAD101EN%20Certificate%20_%20edX.pdf",
    preview: "/previews/certifications/front-end-ibm.png",
    icon: "code" as IconName
  },
  {
    title: "Adobe Creative Cloud",
    issuer: "Udemy",
    date: "January 2024",
    href: "/Certifications/Certification%20of%20Adobe%20Creative%20Cloud.pdf",
    preview: "/previews/certifications/adobe-creative-cloud.png",
    icon: "adobe" as IconName
  },
  {
    title: "MS Office",
    issuer: "Udemy",
    date: "July 2021",
    href: "/Certifications/Certification%20of%20Ultimate%20MS%20Office%20Guide.pdf",
    preview: "/previews/certifications/ms-office.png",
    icon: "terminal" as IconName
  },
  {
    title: "Excel Crash Course (Financial)",
    issuer: "Corporate Finance Institute",
    date: "July 2021",
    href: "/Certifications/Certification%20of%20Excel%20Crash%20Course.pdf",
    preview: "/previews/certifications/excel-crash-course.png",
    icon: "database" as IconName
  }
];

export const workshops = [
  {
    title: "Git & GitHub Workshop",
    type: "Workshop",
    date: "July 2026",
    description: "Trainer-led workshop focused on Git fundamentals and remote repository workflows.",
    keyLearnings: ["Basics of Git", "Git Architecture", "Remote Repository Hosting Services", "Working with branches"],
    icon: "github" as IconName
  },
  {
    title: "Naval Dockyard Visit",
    type: "Industrial Visit",
    date: "June 2026",
    description: "Industrial visit covering hydrography, coastal mapping, and ship-based survey systems.",
    keyLearnings: ["What is Hydrography", "Importance of Hydrography", "Mapping of Coastal Areas", "Inside a Survey and War Ships"],
    icon: "map" as IconName
  },
  {
    title: "Quantum Computing",
    type: "Workshop",
    date: "February 2026",
    description: "Workshop introducing quantum computing concepts and active research directions.",
    keyLearnings: ["What is Quantum Computing?", "Basics of Quantum Computing", "Research in Quantum Computing"],
    icon: "sparkles" as IconName
  },
  {
    title: "Parallel Programming Workshop",
    type: "Workshop",
    date: "February 2024",
    description: "Workshop on parallel programming concepts and super computing fundamentals.",
    keyLearnings: ["Parallel Programming", "Super Computing"],
    icon: "terminal" as IconName
  }
];

export const hackerRank = {
  label: "HackerRank",
  href: "https://www.hackerrank.com/k_pavan_5905",
  profileHref: "https://www.hackerrank.com/profile/k_pavan_5905",
  username: "k_pavan_5905",
  badges: ["Problem Solving", "Python", "Java", "SQL"],
  certificates: ["Python", "Problem Solving", "Front-End Foundations"],
  skills: ["Algorithms", "Data Structures", "Python", "Java", "SQL"],
  achievements: [
    "Public coding profile for consistent practice",
    "Resume-listed competitive programming channel",
    "Community learning through challenges and certificates"
  ]
};

export const communityService = {
  title: "Organic Farming Awareness Camp",
  duration: "April & May 2025 | 8 weeks",
  description:
    "Conducted an 8-week organic farming awareness camp, teaching sustainable and chemical-free practices.",
  objectives: [
    "Promote sustainable and chemical-free farming practices",
    "Introduce natural soil enrichment methods",
    "Support awareness of resource-conscious agriculture"
  ],
  topics: ["Bio-Fertilizers", "Vermi Compost", "Natural Manures", "Crop Rotation", "Water Harvesting"],
  gallery: [
    "/Community%20Service%20Project/IMG-20250421-WA0004.jpg",
    "/Community%20Service%20Project/IMG-20250421-WA0007.jpg",
    "/Community%20Service%20Project/IMG-20250421-WA0012.jpg",
    "/Community%20Service%20Project/IMG-20250421-WA0018.jpg",
    "/Community%20Service%20Project/IMG-20250421-WA0019.jpg",
    "/Community%20Service%20Project/IMG-20250421-WA0020.jpg",
    "/Community%20Service%20Project/IMG_2025-05-26-12-22-16-499.jpg"
  ]
};
