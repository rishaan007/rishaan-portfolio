import {
  Profile,
  Project,
  ProjectTechnology,
  Education,
  TimelineEntry,
  ResearchInterest,
} from "./types/database";

export const SOCIAL_LINKS = {
  github: "https://github.com/rishaan007",
  linkedin: "https://www.linkedin.com/in/rishaankumar",
  instagram: "https://instagram.com/therishaankumar",
  twitter: "https://x.com/therishaankumar",
  email: "ashim3006@gmail.com",
  phone: "+91 7586020239",
};

export const fallbackProfile: Profile = {
  id: "00000000-0000-0000-0000-000000000001",
  full_name: "Rishaan Kumar",
  professional_title:
    "AI/ML & Data Science Enthusiast | B.Tech Information Technology",
  hero_headline: "Rishaan Kumar",
  hero_subheadline: "Engineering Intelligence.\nExploring Possibilities.",
  hero_description:
    "I build intelligent systems, experiment with emerging technologies, and turn complex ideas into practical digital experiences.",
  professional_summary:
    "Information Technology undergraduate with hands-on project experience across artificial intelligence, deep learning, edge computing and full-stack development. Interested in building practical intelligent systems using computer vision, time-series analysis and generative AI. Experienced in collaborative hackathon development and student technology community leadership.",
  location: "Kolkata, West Bengal, India",
  email: "ashim3006@gmail.com",
  phone: "+91 7586020239",
  github_url: "https://github.com/rishaan007",
  linkedin_url: "https://www.linkedin.com/in/rishaankumar",
  portrait_url: null,
  resume_url: "/Rishaan_Kumar_CV.pdf",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const fallbackProjects: (Project & {
  technologies: ProjectTechnology[];
})[] = [
  {
    id: "00000000-0000-0000-0000-000000000011",
    title: "ATLAS — AI-Based Exoplanet Detection",
    slug: "atlas",
    subtitle: "NASA International Space Apps Challenge 2025",
    category: "Artificial Intelligence / Deep Learning / Space Technology",
    short_description:
      "Contributed to an exoplanet detection pipeline using light-curve datasets from NASA Kepler, K2 and TESS missions. Applied a hybrid CNN–Transformer approach for time-series pattern analysis and SHAP-based explainability.",
    context:
      "Developed for the NASA International Space Apps Challenge 2025, tackling automated transit photometry analysis across planetary datasets.",
    problem_statement:
      "Detecting exoplanet transit signatures from stellar brightness flux series is notoriously difficult due to extreme noise, stellar activity, instrument systematics, and severe class imbalance.",
    objectives:
      "Build a robust detection model capable of capturing local dip features and long-range periodicity while explaining feature attributions using SHAP.",
    solution:
      "Implemented a hybrid 1D-CNN and Transformer Encoder architecture that extracts localized transit morphology and models temporal periodicity simultaneously.",
    technical_architecture:
      "Input flux -> Preprocessing (flattening, detrending, binning) -> 1D Convolutional feature extractor -> Multi-Head Self-Attention Transformer Encoders -> Classification Head -> SHAP Interpretability -> FastAPI Backend & React Dashboard.",
    implementation_details:
      "Developed using PyTorch, Lightkurve, SHAP, and deployed on FastAPI with a React.js client interface for interactive transit curve visualization.",
    my_contribution:
      "Contributed to the data pipeline, time-series preprocessing, hybrid neural architecture experimentation, and SHAP explainability visualizer.",
    challenges:
      "Managing severe class imbalance (non-transits vs transits) and addressing instrumental artifacts mimicking transit dips.",
    key_learnings:
      "Hands-on expertise with astronomical light-curve photometry, hybrid architectures for time-series, and model explainability techniques.",
    featured_image: null,
    github_url: "https://github.com/rishaan007",
    live_url: null,
    completion_date: "2025-10-06",
    is_featured: true,
    status: "published",
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    technologies: [
      { id: "1", project_id: "00000000-0000-0000-0000-000000000011", name: "Python", display_order: 1 },
      { id: "2", project_id: "00000000-0000-0000-0000-000000000011", name: "CNNs", display_order: 2 },
      { id: "3", project_id: "00000000-0000-0000-0000-000000000011", name: "Transformer Encoders", display_order: 3 },
      { id: "4", project_id: "00000000-0000-0000-0000-000000000011", name: "SHAP", display_order: 4 },
      { id: "5", project_id: "00000000-0000-0000-0000-000000000011", name: "React.js", display_order: 5 },
      { id: "6", project_id: "00000000-0000-0000-0000-000000000011", name: "FastAPI", display_order: 6 },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000012",
    title: "TRINETRA — Multimodal AI Intrusion Detection",
    slug: "trinetra",
    subtitle: "Three-Layer Edge Surveillance & Sensor Fusion",
    category: "Edge AI / Computer Vision / Embedded Systems",
    short_description:
      "Co-developed a three-layer intrusion detection prototype combining sensor fusion, visual recognition and audio classification to reduce false alerts. Integrated ESP32/FreeRTOS sensor monitoring with Raspberry Pi Zero W processing, YOLOv8 vision and YAMNet audio classification.",
    context:
      "Designed to address high false-positive rates in conventional security systems through localized multimodal verification without continuous internet dependency.",
    problem_statement:
      "Single-modal security sensors (PIR or cameras alone) are vulnerable to environmental triggers like moving vegetation, pets, or shadows, causing frequent false alarms.",
    objectives:
      "Construct a resilient three-tier verification pipeline operating locally on constrained edge hardware.",
    solution:
      "Layer 1: Low-power ESP32 sensor triggers wake-up. Layer 2: Onboard Raspberry Pi Zero W runs YOLOv8 for visual verification. Layer 3: Audio classifier using fine-tuned YAMNet verifies acoustic signatures.",
    technical_architecture:
      "ESP32 (FreeRTOS) Sensor Node -> UART/I2C Trigger -> Raspberry Pi Zero W -> YOLOv8 Vision Inference + YAMNet Audio Classifier -> Local Multimodal Fusion -> Alert Dispatch.",
    implementation_details:
      "Engineered FreeRTOS tasks for power-efficient sensor polling, serialized sensor telemetry, and executed optimized quantized models on Raspberry Pi hardware.",
    my_contribution:
      "Co-developed sensor integration, FreeRTOS communication routines, and edge audio classifier testing.",
    challenges:
      "Running inference on computationally constrained hardware while keeping latency within acceptable thresholds for real-time alerting.",
    key_learnings:
      "Embedded operating systems, edge model optimization, hardware sensor interfaces, and multimodal sensor fusion.",
    featured_image: null,
    github_url: "https://github.com/rishaan007",
    live_url: null,
    completion_date: "2025-08-15",
    is_featured: true,
    status: "published",
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    technologies: [
      { id: "7", project_id: "00000000-0000-0000-0000-000000000012", name: "ESP32", display_order: 1 },
      { id: "8", project_id: "00000000-0000-0000-0000-000000000012", name: "FreeRTOS", display_order: 2 },
      { id: "9", project_id: "00000000-0000-0000-0000-000000000012", name: "Raspberry Pi Zero W", display_order: 3 },
      { id: "10", project_id: "00000000-0000-0000-0000-000000000012", name: "YOLOv8", display_order: 4 },
      { id: "11", project_id: "00000000-0000-0000-0000-000000000012", name: "YAMNet", display_order: 5 },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000013",
    title: "SWASTHYA — AI-Assisted Medical Insurance Platform",
    slug: "swasthya",
    subtitle: "Document Intelligence & Patient Claim Guidance",
    category: "Generative AI / Document Intelligence",
    short_description:
      "Co-developed an AI-enabled platform for insurance guidance, medical document summarisation and automated claim-letter generation. Integrated OpenAI and Gemini APIs with OCR and PyPDF2-based document processing, alongside a conversational patient-support workflow.",
    context:
      "Built to simplify complex medical insurance policies, discharge summaries, and claims workflows for patients and families.",
    problem_statement:
      "Medical policy documents and discharge bills are laden with dense jargon, leading to claim rejections, delays, and patient distress.",
    objectives:
      "Deliver automated document extraction, structured summary generation, policy clause cross-referencing, and interactive patient support.",
    solution:
      "Integrated OCR and PyPDF2 document pipelines with LLM-guided claim drafting to summarize bills and verify policy eligibility.",
    technical_architecture:
      "Document Ingestion -> Text/Table OCR -> Context Injection -> Generative AI (Gemini / OpenAI) Summarization Engine -> Structured Claim Formulation -> Patient Support Interface.",
    implementation_details:
      "Implemented document parsing workflows, structured prompt pipelines, and multi-turn conversational agents with safeguard validation.",
    my_contribution:
      "Co-developed document parsing routines, LLM integration, and conversational support workflows.",
    challenges:
      "Handling unstructured, scanned hospital bills with varying image quality and noisy OCR text.",
    key_learnings:
      "Document intelligence, multi-model LLM integration, structured data extraction, and empathetic UX design.",
    featured_image: null,
    github_url: "https://github.com/rishaan007",
    live_url: null,
    completion_date: "2025-06-20",
    is_featured: true,
    status: "published",
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    technologies: [
      { id: "12", project_id: "00000000-0000-0000-0000-000000000013", name: "OpenAI API", display_order: 1 },
      { id: "13", project_id: "00000000-0000-0000-0000-000000000013", name: "Gemini API", display_order: 2 },
      { id: "14", project_id: "00000000-0000-0000-0000-000000000013", name: "OCR", display_order: 3 },
      { id: "15", project_id: "00000000-0000-0000-0000-000000000013", name: "PyPDF2", display_order: 4 },
      { id: "16", project_id: "00000000-0000-0000-0000-000000000013", name: "Python", display_order: 5 },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000014",
    title: "PRICEHUB — Multi-Platform Price Comparison",
    slug: "pricehub",
    subtitle: "Real-Time E-Commerce & Quick-Commerce Aggregator",
    category: "Full-Stack Web Application",
    short_description:
      "Developed a product comparison platform concept for consolidating listings and pricing workflows across e-commerce and quick-commerce providers. Built React product listing/detail interfaces and Node.js/Express backend services with MongoDB Atlas for application data.",
    context:
      "Conceived to aggregate rapid delivery and traditional e-commerce items into a single searchable interface for price transparency.",
    problem_statement:
      "Consumers frequently switch between several quick-commerce and e-commerce apps to check availability and compare fluctuating product prices.",
    objectives:
      "Provide unified search, categorized product comparisons, and persistent product listings across platforms.",
    solution:
      "A modular full-stack web application featuring React interfaces, Node.js/Express microservices, and MongoDB Atlas data storage.",
    technical_architecture:
      "React Frontend (Vite/Tailwind) -> REST API (Node.js/Express) -> MongoDB Atlas Schema (Products, Categories, Prices, Stores).",
    implementation_details:
      "Built reactive product catalog components, pricing filters, search debouncing, and robust Express REST endpoints.",
    my_contribution:
      "Engineered frontend product views, backend service endpoints, and MongoDB data schemas.",
    challenges:
      "Normalizing diverse product catalog structures and managing asynchronous pricing updates cleanly.",
    key_learnings:
      "Full-stack architecture, REST API design, NoSQL schema design with MongoDB, and state management in React.",
    featured_image: null,
    github_url: "https://github.com/rishaan007",
    live_url: null,
    completion_date: "2025-04-10",
    is_featured: true,
    status: "published",
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    technologies: [
      { id: "17", project_id: "00000000-0000-0000-0000-000000000014", name: "React.js", display_order: 1 },
      { id: "18", project_id: "00000000-0000-0000-0000-000000000014", name: "JavaScript", display_order: 2 },
      { id: "19", project_id: "00000000-0000-0000-0000-000000000014", name: "Node.js", display_order: 3 },
      { id: "20", project_id: "00000000-0000-0000-0000-000000000014", name: "Express.js", display_order: 4 },
      { id: "21", project_id: "00000000-0000-0000-0000-000000000014", name: "MongoDB Atlas", display_order: 5 },
    ],
  },
];

export const fallbackCategories = [
  {
    id: "cat-1",
    name: "Programming Languages",
    display_order: 1,
    skills: [
      { id: "s1", name: "Python", icon: null },
      { id: "s2", name: "Java", icon: null },
      { id: "s3", name: "JavaScript", icon: null },
      { id: "s4", name: "C", icon: null },
    ],
  },
  {
    id: "cat-2",
    name: "Artificial Intelligence & Machine Learning",
    display_order: 2,
    skills: [
      { id: "s5", name: "Convolutional Neural Networks (CNNs)", icon: null },
      { id: "s6", name: "Transformer Encoders", icon: null },
      { id: "s7", name: "YOLOv8", icon: null },
      { id: "s8", name: "YAMNet", icon: null },
      { id: "s9", name: "SHAP", icon: null },
      { id: "s10", name: "OCR", icon: null },
      { id: "s11", name: "Generative AI APIs", icon: null },
    ],
  },
  {
    id: "cat-3",
    name: "Web & Backend Development",
    display_order: 3,
    skills: [
      { id: "s12", name: "React.js", icon: null },
      { id: "s13", name: "Next.js", icon: null },
      { id: "s14", name: "Node.js", icon: null },
      { id: "s15", name: "Express.js", icon: null },
      { id: "s16", name: "Django", icon: null },
      { id: "s17", name: "FastAPI", icon: null },
    ],
  },
  {
    id: "cat-4",
    name: "Databases & Development Tools",
    display_order: 4,
    skills: [
      { id: "s18", name: "MongoDB", icon: null },
      { id: "s19", name: "PostgreSQL", icon: null },
      { id: "s20", name: "Git", icon: null },
      { id: "s21", name: "GitHub", icon: null },
      { id: "s22", name: "Vercel", icon: null },
      { id: "s23", name: "Render", icon: null },
    ],
  },
  {
    id: "cat-5",
    name: "Embedded Systems",
    display_order: 5,
    skills: [
      { id: "s24", name: "ESP32", icon: null },
      { id: "s25", name: "FreeRTOS", icon: null },
      { id: "s26", name: "Raspberry Pi Zero W", icon: null },
    ],
  },
];

export const fallbackEducation: Education[] = [
  {
    id: "edu-1",
    degree: "B.Tech in Information Technology",
    institution: "Netaji Subhash Engineering College (NSEC)",
    university: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
    expected_graduation: "2028",
    cgpa: "7.7/10",
    description:
      "Core focus on Data Structures, Algorithms, Artificial Intelligence, Database Management Systems, and Computer Networks.",
    is_current: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
];

export const fallbackTimeline: TimelineEntry[] = [
  {
    id: "time-1",
    title: "Byte Brigade",
    subtitle: "Co-Founder & Organizer",
    description:
      "Co-founded a non-profit student technology community, established six technical wings (App Dev, Web Dev, DSA, AI/ML, Blockchain, Designing), and organised 12+ events. Contributed to a platform for student profiles and hackathon team discovery.",
    category: "leadership",
    date: "2024 – Present",
    icon: null,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "time-2",
    title: "Social Winter of Code — Season 6",
    subtitle: "Project Administrator",
    description:
      "Selected as Project Administrator for open-source software initiatives, reviewing pull requests, mentoring contributors, and guiding architectural decisions.",
    category: "opensource",
    date: "2025",
    icon: null,
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "time-3",
    title: "NASA International Space Apps Challenge 2025",
    subtitle: "Participant — Project ATLAS",
    description:
      "Collaborated on automated exoplanet detection using light-curve transit photometry from NASA Kepler, K2, and TESS datasets with hybrid CNN-Transformer models.",
    category: "hackathon",
    date: "October 2025",
    icon: null,
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "time-4",
    title: "Hacktoberfest 2025",
    subtitle: "Open Source Contributor",
    description:
      "Contributed to developer tools, machine learning utilities, and community software repositories.",
    category: "opensource",
    date: "October 2025",
    icon: null,
    display_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "time-5",
    title: "Smart Bengal Hackathon",
    subtitle: "Hackathon Competitor",
    description:
      "Engineered technology solutions for regional societal and governance problem statements under time-constrained sprint conditions.",
    category: "hackathon",
    date: "2025",
    icon: null,
    display_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "time-6",
    title: "Binary 36-Hour Hackathon",
    subtitle: "Project NeuraClaim",
    description:
      "Built rapid prototype for automated insurance claim assessment and patient assistance within an intensive 36-hour hackathon environment.",
    category: "hackathon",
    date: "2025",
    icon: null,
    display_order: 6,
    created_at: new Date().toISOString(),
  },
];

export const fallbackResearchInterests: ResearchInterest[] = [
  {
    id: "res-1",
    title: "Computer Vision",
    description:
      "Object detection, segmentation, and feature extraction for real-world visual perception systems.",
    icon: null,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "res-2",
    title: "Time-Series Analysis",
    description:
      "Sequential pattern recognition, periodicity detection, and predictive forecasting across noisy sensor and astronomical datasets.",
    icon: null,
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "res-3",
    title: "Deep Learning",
    description:
      "Neural architecture exploration, representation learning, and multi-layer feature abstraction.",
    icon: null,
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "res-4",
    title: "Explainable Artificial Intelligence (XAI)",
    description:
      "SHAP, saliency maps, and interpretability methods for demystifying black-box neural networks in high-stakes domains.",
    icon: null,
    display_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "res-5",
    title: "Generative AI",
    description:
      "Large language models, multimodal reasoning, structured document processing, and generative interface engineering.",
    icon: null,
    display_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "res-6",
    title: "Multimodal Learning",
    description:
      "Cross-modal fusion between vision, audio, and sensor telemetry for resilient decision systems.",
    icon: null,
    display_order: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: "res-7",
    title: "Edge AI & Embedded Intelligence",
    description:
      "Quantized neural inference on resource-constrained microcontrollers (ESP32) and single-board computers.",
    icon: null,
    display_order: 7,
    created_at: new Date().toISOString(),
  },
  {
    id: "res-8",
    title: "Intelligent Systems",
    description:
      "End-to-end architectures integrating sensing, edge processing, cloud inference, and user-centric interfaces.",
    icon: null,
    display_order: 8,
    created_at: new Date().toISOString(),
  },
];
