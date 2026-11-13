-- =============================================================================
-- Seed Data for Rishaan Kumar Portfolio Website
-- File: supabase/seed.sql
-- =============================================================================

-- Clean up existing data cleanly before re-seeding
TRUNCATE TABLE
    project_images,
    project_technologies,
    projects,
    skills,
    skill_categories,
    education,
    timeline_entries,
    research_interests,
    publications,
    contact_messages,
    site_settings,
    media_assets,
    profiles
CASCADE;

-- =============================================================================
-- 1. PROFILE
-- =============================================================================
INSERT INTO profiles (
    id,
    full_name,
    professional_title,
    hero_headline,
    hero_subheadline,
    hero_description,
    professional_summary,
    location,
    email,
    phone,
    github_url,
    linkedin_url,
    portrait_url,
    resume_url
) VALUES (
    gen_random_uuid(),
    'Rishaan Kumar',
    'AI/ML & Data Science Enthusiast | B.Tech Information Technology',
    'Rishaan Kumar',
    'Engineering Intelligence. Exploring Possibilities.',
    'I build intelligent systems, experiment with emerging technologies, and turn complex ideas into practical digital experiences.',
    'B.Tech Information Technology undergraduate (2024-2028) at Netaji Subhash Engineering College with a focused background in Artificial Intelligence, Machine Learning, Deep Learning, and Data Science. Experienced in architecting end-to-end intelligent systems spanning computer vision, multimodal signal processing, time-series forecasting, and scalable full-stack web applications. Demonstrated technical leadership as Co-Founder of Byte Brigade, Project Admin at Social Winter of Code (SWOC S6), and contributor across high-stakes hackathons including NASA Space Apps Challenge, Smart Bengal Hackathon, and Hacktoberfest. Dedicated to advancing robust, explainable, and ethically grounded AI architectures.',
    'Kolkata, West Bengal, India',
    'ashim3006@gmail.com',
    '+91 7586020239',
    'https://github.com/rishaan007',
    'https://linkedin.com/in/rishaan-kumar',
    '/media/portrait.jpg',
    '/media/rishaan-kumar-resume.pdf'
);

-- =============================================================================
-- 2. PROJECTS (ALL 4)
-- =============================================================================

-- Project 1: ATLAS — AI-Based Exoplanet Detection
INSERT INTO projects (
    id,
    title,
    slug,
    subtitle,
    category,
    short_description,
    context,
    problem_statement,
    objectives,
    solution,
    technical_architecture,
    implementation_details,
    my_contribution,
    challenges,
    key_learnings,
    featured_image,
    github_url,
    live_url,
    completion_date,
    is_featured,
    status,
    display_order
) VALUES (
    gen_random_uuid(),
    'ATLAS — AI-Based Exoplanet Detection',
    'atlas-exoplanet-detection',
    'Deep Learning Pipeline for Transit Photometry Signal Analysis',
    'AI & Astrophysics',
    'An end-to-end deep learning framework analyzing photometric light-curve time series data from NASA Kepler and TESS missions to detect transiting exoplanets with high precision.',
    'Developed as a cutting-edge astrophysical machine learning system, ATLAS leverages telescopic transit photometry to identify periodic dips in stellar brightness caused by orbiting planetary candidates across massive astrophysical observation catalogs.',
    'Identifying genuine exoplanet transits amidst stellar flares, instrumental noise, binary stars, and cosmic ray artefacts requires extensive manual vetting and suffers from high false-positive rates with classical box-least-squares algorithms.',
    'Build an automated, noise-resilient deep learning classifier that processes photometric time-series observations, improves detection of small rocky worlds, and delivers explainable planetary candidate validation.',
    'Engineered a hybrid 1D-CNN and Transformer Encoder architecture that processes folded phase light curves alongside global and local views, identifying subtle transit dips with robust signal-to-noise ratio discrimination.',
    'Phase folding and detrending with AstroPy and Lightkurve -> Multi-scale feature extraction through 1D Convolutional layers -> Self-attention mechanism capturing periodic transit profiles -> Dense classification head -> SHAP explainability layer for stellar flux feature attribution.',
    'Processed Kepler Q1-Q17 and TESS light-curve archives, implemented custom data augmentation (jitter, Gaussian noise injection, transit masking) to handle class imbalance, and deployed a FastAPI inference microservice with interactive transit visualization.',
    'Designed the deep learning network architecture, authored the photometric preprocessing and transit detrending pipeline, conducted SHAP-based model interpretability experiments, and evaluated ROC-AUC performance metrics.',
    'Overcoming extreme class imbalance where confirmed exoplanet transits represent less than 1% of candidate light curves, and mitigating false positives caused by eclipsing binary star systems.',
    'Mastered deep learning applications on irregular astronomical time series, phase-folding mathematics, attention-weighted time-frequency representations, and explainable AI attribution techniques.',
    '/images/projects/atlas-preview.png',
    'https://github.com/rishaan007/atlas-exoplanet-detection',
    'https://atlas-exoplanet.vercel.app',
    '2025-10-15',
    TRUE,
    'published',
    1
);

-- Project 2: TRINETRA — Multimodal AI Intrusion Detection
INSERT INTO projects (
    id,
    title,
    slug,
    subtitle,
    category,
    short_description,
    context,
    problem_statement,
    objectives,
    solution,
    technical_architecture,
    implementation_details,
    my_contribution,
    challenges,
    key_learnings,
    featured_image,
    github_url,
    live_url,
    completion_date,
    is_featured,
    status,
    display_order
) VALUES (
    gen_random_uuid(),
    'TRINETRA — Multimodal AI Intrusion Detection',
    'trinetra-multimodal-intrusion-detection',
    'Edge-Integrated Multimodal Vision & Acoustic Surveillance Platform',
    'Edge AI & Computer Vision',
    'A comprehensive physical security and perimeter monitoring platform combining real-time computer vision (YOLOv8) with acoustic event classification (YAMNet) deployed on edge IoT hardware.',
    'Designed for high-security installations, autonomous facilities, and perimeter surveillance where single-modality sensors fail in adverse environmental conditions such as dense smoke, occlusions, or low light.',
    'Conventional surveillance setups suffer from blind spots, camera obstructions, high false alarm rates triggered by animals or weather, and prohibitive cloud latency during critical intrusion events.',
    'Deliver a low-latency, resilient multimodal intrusion detection system fusing synchronized visual and audio cues on resource-constrained edge hardware with real-time incident alert dispatch.',
    'Developed a dual-stream perception engine: YOLOv8 detects unauthorized human entry, boundary trespassing, and weapon poses via video feed, while YAMNet classifies acoustic signatures (glass breaking, footsteps, forced entry) on ESP32/Raspberry Pi embedded nodes.',
    'Edge Node (ESP32 / Raspberry Pi Zero W running FreeRTOS) -> On-device sensor ingestion -> Dual-stream AI pipeline (YOLOv8 for Vision + YAMNet for Audio) -> Multimodal Confidence Fusion Gate -> MQTT Alert Broker -> Next.js Surveillance Command Center.',
    'Quantized neural network models using TensorRT and ONNX for edge deployment, implemented FreeRTOS task scheduling for sensor telemetry, and established encrypted WebSocket streams for immediate incident telemetry.',
    'Architected the multimodal fusion heuristic, fine-tuned the YOLOv8 perimeter model on custom security datasets, implemented audio classification using YAMNet, and developed the edge-to-cloud notification pipeline.',
    'Synchronizing asynchronous video frames with high-frequency audio spectrograms under low latency constraints, and optimizing memory footprints for edge deployment without sacrificing precision.',
    'Deepened expertise in edge inference optimization, multimodal sensor fusion algorithms, FreeRTOS task concurrency, and real-time streaming architectures.',
    '/images/projects/trinetra-preview.png',
    'https://github.com/rishaan007/trinetra-surveillance',
    'https://trinetra-security.vercel.app',
    '2025-08-20',
    TRUE,
    'published',
    2
);

-- Project 3: SWASTHYA — AI-Assisted Medical Insurance Platform
INSERT INTO projects (
    id,
    title,
    slug,
    subtitle,
    category,
    short_description,
    context,
    problem_statement,
    objectives,
    solution,
    technical_architecture,
    implementation_details,
    my_contribution,
    challenges,
    key_learnings,
    featured_image,
    github_url,
    live_url,
    completion_date,
    is_featured,
    status,
    display_order
) VALUES (
    gen_random_uuid(),
    'SWASTHYA — AI-Assisted Medical Insurance Platform',
    'swasthya-medical-insurance-platform',
    'Intelligent Health Claim Verification & Underwriting Risk Analysis',
    'Healthcare AI & Web',
    'An automated healthcare insurance management platform featuring OCR-driven document verification, fraud risk scoring, and predictive premium underwriting algorithms.',
    'Created to streamline bureaucratic health insurance claim processing and provide transparent, data-driven policy underwriting using predictive machine learning and OCR automation.',
    'Manual health insurance claim adjudication takes weeks, incurs high operational costs, and remains vulnerable to document tampering, billing fraud, and biased underwriting metrics.',
    'Build a unified digital health insurance platform automating claim document parsing, detecting fraudulent anomalies, and estimating actuarial premium risks with complete interpretability.',
    'Engineered an intelligent claims pipeline combining Tesseract OCR with Generative AI APIs for medical report analysis, an XGBoost model for premium risk assessment, and an interactive patient-insurer portal.',
    'React.js / Next.js Frontend -> Node.js / Express.js Backend API -> OCR & Vision Extraction Pipeline -> Generative AI Clinical Summarizer -> Actuarial Risk Engine (XGBoost / SHAP) -> PostgreSQL Database.',
    'Trained underwriting models on health and demographic datasets, integrated structured schema validation for digitized hospital bills, implemented role-based access for policyholders and adjusters, and built an automated audit trail.',
    'Developed the medical document parsing workflow with OCR, trained the actuarial risk models, integrated Generative AI clinical summarization endpoints, and built responsive patient portal dashboards.',
    'Parsing varied, noisy handwritten hospital bills and prescription formats, and ensuring strict compliance with healthcare data privacy and patient record protection.',
    'Gained hands-on proficiency in medical OCR parsing pipelines, actuarial risk modeling, healthcare compliance considerations, and explainable AI in clinical adjudication.',
    '/images/projects/swasthya-preview.png',
    'https://github.com/rishaan007/swasthya-insurance',
    'https://swasthya-health.vercel.app',
    '2025-06-10',
    TRUE,
    'published',
    3
);

-- Project 4: PRICEHUB — Multi-Platform Price Comparison
INSERT INTO projects (
    id,
    title,
    slug,
    subtitle,
    category,
    short_description,
    context,
    problem_statement,
    objectives,
    solution,
    technical_architecture,
    implementation_details,
    my_contribution,
    challenges,
    key_learnings,
    featured_image,
    github_url,
    live_url,
    completion_date,
    is_featured,
    status,
    display_order
) VALUES (
    gen_random_uuid(),
    'PRICEHUB — Multi-Platform Price Comparison',
    'pricehub-price-comparison',
    'Real-Time E-Commerce Scraping & Price Trend Intelligence Engine',
    'Web Scraping & Analytics',
    'A high-performance product aggregation and price comparison platform tracking real-time product prices across major e-commerce retailers with historical trend analytics.',
    'Conceived to address price fragmentation across modern e-commerce ecosystems, allowing consumers to discover optimal deals and historical pricing trends across Amazon, Flipkart, and other merchants.',
    'Online shoppers waste hours manually checking competing e-commerce platforms, often missing flash sales, dynamic price surge variations, or false discounts.',
    'Develop an automated multi-retailer scraping engine and interactive search interface providing normalized product matching, lowest price detection, and historical price volatility tracking.',
    'Engineered a concurrent crawling microservice architecture with headless browser orchestration, product schema normalization, fuzzy matching algorithms, and interactive Chart.js price trend visualization.',
    'React / Vite Frontend -> Node.js / Express API Gateway -> Playwright / Puppeteer Distributed Scraper Service -> Redis Cache & Rate Limiting -> PostgreSQL Data Store.',
    'Implemented fuzzy string matching (Levenshtein distance & token sort) to cross-match identically branded products with varying titles, built rate-limiting proxies to ensure high scraper uptime, and provided instant price drop notifications.',
    'Built the core price aggregation API, implemented concurrent scraping routines with Puppeteer, designed the fuzzy product deduplication algorithm, and developed the frontend price tracking dashboard.',
    'Handling aggressive bot mitigation mechanisms, non-deterministic dynamic DOM mutations across e-commerce layouts, and high-throughput concurrent scraping latency.',
    'Mastered resilient web crawling at scale, anti-bot mitigation bypass techniques, entity deduplication heuristics, and cache-first API design patterns.',
    '/images/projects/pricehub-preview.png',
    'https://github.com/rishaan007/pricehub-v3',
    'https://pricehub.vercel.app',
    '2025-04-12',
    TRUE,
    'published',
    4
);

-- =============================================================================
-- 3. PROJECT TECHNOLOGIES
-- =============================================================================

-- Technologies for ATLAS
INSERT INTO project_technologies (id, project_id, name, display_order)
SELECT gen_random_uuid(), id, 'Python', 1 FROM projects WHERE slug = 'atlas-exoplanet-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'PyTorch', 2 FROM projects WHERE slug = 'atlas-exoplanet-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'CNNs', 3 FROM projects WHERE slug = 'atlas-exoplanet-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'Transformer Encoders', 4 FROM projects WHERE slug = 'atlas-exoplanet-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'SHAP', 5 FROM projects WHERE slug = 'atlas-exoplanet-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'Lightkurve', 6 FROM projects WHERE slug = 'atlas-exoplanet-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'AstroPy', 7 FROM projects WHERE slug = 'atlas-exoplanet-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'FastAPI', 8 FROM projects WHERE slug = 'atlas-exoplanet-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'NumPy / Pandas', 9 FROM projects WHERE slug = 'atlas-exoplanet-detection';

-- Technologies for TRINETRA
INSERT INTO project_technologies (id, project_id, name, display_order)
SELECT gen_random_uuid(), id, 'Python', 1 FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'YOLOv8', 2 FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'YAMNet', 3 FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'OpenCV', 4 FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'PyTorch', 5 FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'ESP32', 6 FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'FreeRTOS', 7 FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'Raspberry Pi Zero W', 8 FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'Next.js', 9 FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, 'MQTT', 10 FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection';

-- Technologies for SWASTHYA
INSERT INTO project_technologies (id, project_id, name, display_order)
SELECT gen_random_uuid(), id, 'React.js', 1 FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, 'Next.js', 2 FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, 'Node.js', 3 FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, 'Express.js', 4 FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, 'Python', 5 FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, 'OCR', 6 FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, 'Generative AI APIs', 7 FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, 'SHAP', 8 FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, 'PostgreSQL', 9 FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, 'MongoDB', 10 FROM projects WHERE slug = 'swasthya-medical-insurance-platform';

-- Technologies for PRICEHUB
INSERT INTO project_technologies (id, project_id, name, display_order)
SELECT gen_random_uuid(), id, 'React.js', 1 FROM projects WHERE slug = 'pricehub-price-comparison'
UNION ALL
SELECT gen_random_uuid(), id, 'Node.js', 2 FROM projects WHERE slug = 'pricehub-price-comparison'
UNION ALL
SELECT gen_random_uuid(), id, 'Express.js', 3 FROM projects WHERE slug = 'pricehub-price-comparison'
UNION ALL
SELECT gen_random_uuid(), id, 'JavaScript', 4 FROM projects WHERE slug = 'pricehub-price-comparison'
UNION ALL
SELECT gen_random_uuid(), id, 'PostgreSQL', 5 FROM projects WHERE slug = 'pricehub-price-comparison'
UNION ALL
SELECT gen_random_uuid(), id, 'MongoDB', 6 FROM projects WHERE slug = 'pricehub-price-comparison'
UNION ALL
SELECT gen_random_uuid(), id, 'Git', 7 FROM projects WHERE slug = 'pricehub-price-comparison'
UNION ALL
SELECT gen_random_uuid(), id, 'Vercel', 8 FROM projects WHERE slug = 'pricehub-price-comparison';

-- =============================================================================
-- 4. PROJECT IMAGES
-- Screenshots, architecture diagrams, and previews
-- =============================================================================

-- Images for ATLAS
INSERT INTO project_images (id, project_id, image_url, caption, image_type, display_order)
SELECT gen_random_uuid(), id, '/images/projects/atlas-architecture.png', '1D-CNN and Transformer Encoder Pipeline Architecture', 'architecture', 1
FROM projects WHERE slug = 'atlas-exoplanet-detection'
UNION ALL
SELECT gen_random_uuid(), id, '/images/projects/atlas-transit-curve.png', 'Phase-folded Transit Light-Curve Detrending and Detection', 'diagram', 2
FROM projects WHERE slug = 'atlas-exoplanet-detection'
UNION ALL
SELECT gen_random_uuid(), id, '/images/projects/atlas-shap-plot.png', 'SHAP Flux Feature Attribution Summary Plot', 'screenshot', 3
FROM projects WHERE slug = 'atlas-exoplanet-detection';

-- Images for TRINETRA
INSERT INTO project_images (id, project_id, image_url, caption, image_type, display_order)
SELECT gen_random_uuid(), id, '/images/projects/trinetra-architecture.png', 'Edge-to-Cloud Multimodal Fusion Architecture Diagram', 'architecture', 1
FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, '/images/projects/trinetra-dashboard.png', 'Real-time Surveillance Command Center and Threat Heatmap', 'screenshot', 2
FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection'
UNION ALL
SELECT gen_random_uuid(), id, '/images/projects/trinetra-hardware.png', 'ESP32 and Raspberry Pi Edge Node Sensor Array Deployment', 'other', 3
FROM projects WHERE slug = 'trinetra-multimodal-intrusion-detection';

-- Images for SWASTHYA
INSERT INTO project_images (id, project_id, image_url, caption, image_type, display_order)
SELECT gen_random_uuid(), id, '/images/projects/swasthya-architecture.png', 'OCR and Generative AI Claims Verification Flow', 'architecture', 1
FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, '/images/projects/swasthya-portal.png', 'Patient Claim Adjudication Dashboard and Audit Trail', 'screenshot', 2
FROM projects WHERE slug = 'swasthya-medical-insurance-platform'
UNION ALL
SELECT gen_random_uuid(), id, '/images/projects/swasthya-risk-analysis.png', 'Actuarial Risk Scoring and Feature Weight Breakdown', 'diagram', 3
FROM projects WHERE slug = 'swasthya-medical-insurance-platform';

-- Images for PRICEHUB
INSERT INTO project_images (id, project_id, image_url, caption, image_type, display_order)
SELECT gen_random_uuid(), id, '/images/projects/pricehub-architecture.png', 'Distributed Multi-Store Crawler Microservices Architecture', 'architecture', 1
FROM projects WHERE slug = 'pricehub-price-comparison'
UNION ALL
SELECT gen_random_uuid(), id, '/images/projects/pricehub-dashboard.png', 'Real-time Cross-Platform Comparison and Historical Price Trends', 'screenshot', 2
FROM projects WHERE slug = 'pricehub-price-comparison';

-- =============================================================================
-- 5. SKILL CATEGORIES
-- =============================================================================
INSERT INTO skill_categories (id, name, display_order) VALUES
(gen_random_uuid(), 'Programming Languages', 1),
(gen_random_uuid(), 'AI & Machine Learning', 2),
(gen_random_uuid(), 'Web & Backend Development', 3),
(gen_random_uuid(), 'Databases & Development Tools', 4),
(gen_random_uuid(), 'Embedded Systems', 5);

-- =============================================================================
-- 6. SKILLS
-- =============================================================================

-- 1. Programming Languages
INSERT INTO skills (id, category_id, name, icon, is_visible, display_order)
SELECT gen_random_uuid(), id, 'Python', 'Code', TRUE, 1 FROM skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT gen_random_uuid(), id, 'Java', 'Coffee', TRUE, 2 FROM skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT gen_random_uuid(), id, 'JavaScript', 'FileCode', TRUE, 3 FROM skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT gen_random_uuid(), id, 'C', 'Cpu', TRUE, 4 FROM skill_categories WHERE name = 'Programming Languages';

-- 2. AI & Machine Learning
INSERT INTO skills (id, category_id, name, icon, is_visible, display_order)
SELECT gen_random_uuid(), id, 'CNNs', 'Network', TRUE, 1 FROM skill_categories WHERE name = 'AI & Machine Learning'
UNION ALL
SELECT gen_random_uuid(), id, 'Transformer Encoders', 'Sparkles', TRUE, 2 FROM skill_categories WHERE name = 'AI & Machine Learning'
UNION ALL
SELECT gen_random_uuid(), id, 'YOLOv8', 'Scan', TRUE, 3 FROM skill_categories WHERE name = 'AI & Machine Learning'
UNION ALL
SELECT gen_random_uuid(), id, 'YAMNet', 'Volume2', TRUE, 4 FROM skill_categories WHERE name = 'AI & Machine Learning'
UNION ALL
SELECT gen_random_uuid(), id, 'SHAP', 'Activity', TRUE, 5 FROM skill_categories WHERE name = 'AI & Machine Learning'
UNION ALL
SELECT gen_random_uuid(), id, 'OCR', 'FileText', TRUE, 6 FROM skill_categories WHERE name = 'AI & Machine Learning'
UNION ALL
SELECT gen_random_uuid(), id, 'Generative AI APIs', 'Brain', TRUE, 7 FROM skill_categories WHERE name = 'AI & Machine Learning';

-- 3. Web & Backend Development
INSERT INTO skills (id, category_id, name, icon, is_visible, display_order)
SELECT gen_random_uuid(), id, 'React.js', 'Atom', TRUE, 1 FROM skill_categories WHERE name = 'Web & Backend Development'
UNION ALL
SELECT gen_random_uuid(), id, 'Next.js', 'Globe', TRUE, 2 FROM skill_categories WHERE name = 'Web & Backend Development'
UNION ALL
SELECT gen_random_uuid(), id, 'Node.js', 'Server', TRUE, 3 FROM skill_categories WHERE name = 'Web & Backend Development'
UNION ALL
SELECT gen_random_uuid(), id, 'Express.js', 'Route', TRUE, 4 FROM skill_categories WHERE name = 'Web & Backend Development'
UNION ALL
SELECT gen_random_uuid(), id, 'Django', 'Shield', TRUE, 5 FROM skill_categories WHERE name = 'Web & Backend Development'
UNION ALL
SELECT gen_random_uuid(), id, 'FastAPI', 'Zap', TRUE, 6 FROM skill_categories WHERE name = 'Web & Backend Development';

-- 4. Databases & Development Tools
INSERT INTO skills (id, category_id, name, icon, is_visible, display_order)
SELECT gen_random_uuid(), id, 'MongoDB', 'Database', TRUE, 1 FROM skill_categories WHERE name = 'Databases & Development Tools'
UNION ALL
SELECT gen_random_uuid(), id, 'PostgreSQL', 'Database', TRUE, 2 FROM skill_categories WHERE name = 'Databases & Development Tools'
UNION ALL
SELECT gen_random_uuid(), id, 'Git', 'GitBranch', TRUE, 3 FROM skill_categories WHERE name = 'Databases & Development Tools'
UNION ALL
SELECT gen_random_uuid(), id, 'GitHub', 'Github', TRUE, 4 FROM skill_categories WHERE name = 'Databases & Development Tools'
UNION ALL
SELECT gen_random_uuid(), id, 'Vercel', 'Triangle', TRUE, 5 FROM skill_categories WHERE name = 'Databases & Development Tools'
UNION ALL
SELECT gen_random_uuid(), id, 'Render', 'Cloud', TRUE, 6 FROM skill_categories WHERE name = 'Databases & Development Tools';

-- 5. Embedded Systems
INSERT INTO skills (id, category_id, name, icon, is_visible, display_order)
SELECT gen_random_uuid(), id, 'ESP32', 'Microchip', TRUE, 1 FROM skill_categories WHERE name = 'Embedded Systems'
UNION ALL
SELECT gen_random_uuid(), id, 'FreeRTOS', 'Layers', TRUE, 2 FROM skill_categories WHERE name = 'Embedded Systems'
UNION ALL
SELECT gen_random_uuid(), id, 'Raspberry Pi Zero W', 'CircuitBoard', TRUE, 3 FROM skill_categories WHERE name = 'Embedded Systems';

-- =============================================================================
-- 7. EDUCATION
-- =============================================================================
INSERT INTO education (
    id,
    degree,
    institution,
    university,
    expected_graduation,
    cgpa,
    description,
    is_current,
    display_order
) VALUES (
    gen_random_uuid(),
    'Bachelor of Technology in Information Technology',
    'Netaji Subhash Engineering College (NSEC)',
    'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
    'Expected 2028',
    '7.7 / 10',
    'Undergraduate curriculum focused on Data Structures, Algorithms, Artificial Intelligence, Machine Learning, Operating Systems, Database Management Systems, and Software Engineering.',
    TRUE,
    1
);

-- =============================================================================
-- 8. TIMELINE ENTRIES
-- =============================================================================
INSERT INTO timeline_entries (
    id,
    title,
    subtitle,
    description,
    category,
    date,
    icon,
    display_order
) VALUES
(
    gen_random_uuid(),
    'Byte Brigade Co-Founder',
    'Student Developer & Technical Community',
    'Co-founded Byte Brigade, an engineering community committed to advancing open-source collaboration, high-standard code reviews, and peer-to-peer technical mentorship.',
    'leadership',
    '2025 - Present',
    'Users',
    1
),
(
    gen_random_uuid(),
    'Social Winter of Code S6 Project Admin',
    'Open Source Mentorship Program',
    'Served as Project Admin and technical mentor for Social Winter of Code Season 6, managing project roadmaps, reviewing pull requests, and onboarding student contributors.',
    'opensource',
    'Winter 2025 - 2026',
    'GitPullRequest',
    2
),
(
    gen_random_uuid(),
    'NASA Space Apps Challenge 2025',
    'Global Space Science Hackathon',
    'Competed in NASA International Space Apps Challenge, developing deep learning architectures for exoplanetary transit identification using NASA Kepler and TESS public photometric data.',
    'hackathon',
    'October 2025',
    'Rocket',
    3
),
(
    gen_random_uuid(),
    'Hacktoberfest 2025',
    'Global Open Source Celebration',
    'Successfully participated in and completed Hacktoberfest 2025, contributing meaningful code improvements, bug fixes, and feature additions to open-source software repositories.',
    'opensource',
    'October 2025',
    'Globe',
    4
),
(
    gen_random_uuid(),
    'Smart Bengal Hackathon',
    'Statewide Innovation Hackathon',
    'Led an engineering sprint to construct an AI-powered municipal utility and emergency alert platform, reaching the grand finale among top engineering institutes.',
    'hackathon',
    'September 2025',
    'Cpu',
    5
),
(
    gen_random_uuid(),
    'Binary 36-Hour Hackathon',
    '36-Hour Rapid Engineering Sprint',
    'Constructed and demonstrated a functional multimodal prototype within 36 consecutive hours, implementing sensor fusion heuristics and edge IoT telemetry under tight deadlines.',
    'hackathon',
    'July 2025',
    'Terminal',
    6
);

-- =============================================================================
-- 9. RESEARCH INTERESTS
-- =============================================================================
INSERT INTO research_interests (
    id,
    title,
    description,
    icon,
    display_order
) VALUES
(
    gen_random_uuid(),
    'Computer Vision',
    'Visual perception pipelines, convolutional feature representations, edge object tracking, and spatial semantic scene segmentation.',
    'Eye',
    1
),
(
    gen_random_uuid(),
    'Time-Series Analysis',
    'Transit photometry signal extraction, astronomical light-curve analysis, self-attention temporal encoding, and recurrent predictive modeling.',
    'Activity',
    2
),
(
    gen_random_uuid(),
    'Deep Learning',
    'Multi-scale hierarchical neural architectures, loss geometry optimization, and high-dimensional representation learning across complex domains.',
    'Layers',
    3
),
(
    gen_random_uuid(),
    'Explainable AI',
    'Feature attribution via SHAP (SHapley Additive exPlanations), saliency mapping, and building transparent, trustworthy machine learning models.',
    'Search',
    4
),
(
    gen_random_uuid(),
    'Generative AI',
    'Foundation model orchestration, multimodal prompting techniques, semantic clinical document synthesis, and automated agentic reasoning.',
    'Sparkles',
    5
),
(
    gen_random_uuid(),
    'Multimodal Learning',
    'Sensor fusion architectures joining asynchronous visual telemetry, acoustic spectrogram representations, and spatial environmental signals.',
    'Network',
    6
),
(
    gen_random_uuid(),
    'Edge AI',
    'Model quantization, low-latency microcontroller inference on ESP32 and Raspberry Pi hardware, and real-time FreeRTOS task scheduling.',
    'Cpu',
    7
),
(
    gen_random_uuid(),
    'Intelligent Systems',
    'Unified cyber-physical architectures fusing autonomous edge nodes, intelligent inference microservices, and distributed web dashboards.',
    'Compass',
    8
);

-- =============================================================================
-- 10. SITE SETTINGS
-- =============================================================================
INSERT INTO site_settings (
    id,
    site_title,
    meta_description,
    footer_text,
    hero_image_url,
    favicon_url,
    show_linkedin,
    show_contact_form,
    show_resume_button,
    navigation_labels
) VALUES (
    gen_random_uuid(),
    'Rishaan Kumar — AI/ML & Data Science Enthusiast',
    'Portfolio of Rishaan Kumar — B.Tech IT undergraduate specializing in Artificial Intelligence, Machine Learning, Deep Learning, and End-to-End Intelligent Systems.',
    'Curiosity. Research. Engineering.',
    '/images/hero-portrait.jpg',
    '/favicon.ico',
    FALSE,
    TRUE,
    TRUE,
    '{
        "about": "About",
        "projects": "Projects",
        "skills": "Skills",
        "education": "Education",
        "timeline": "Timeline",
        "research": "Research",
        "contact": "Contact"
    }'::JSONB
);

-- =============================================================================
-- 11. MEDIA ASSETS (Preview Registry)
-- =============================================================================
INSERT INTO media_assets (
    id,
    file_name,
    file_url,
    file_type,
    file_size,
    alt_text
) VALUES
(
    gen_random_uuid(),
    'atlas-preview.png',
    '/images/projects/atlas-preview.png',
    'image/png',
    1048576,
    'ATLAS Exoplanet Transit Detection System Interface'
),
(
    gen_random_uuid(),
    'trinetra-preview.png',
    '/images/projects/trinetra-preview.png',
    'image/png',
    1258291,
    'TRINETRA Multimodal AI Intrusion Detection Command Center'
),
(
    gen_random_uuid(),
    'swasthya-preview.png',
    '/images/projects/swasthya-preview.png',
    'image/png',
    985000,
    'SWASTHYA Medical Claims Processing and Underwriting Portal'
),
(
    gen_random_uuid(),
    'pricehub-preview.png',
    '/images/projects/pricehub-preview.png',
    'image/png',
    820000,
    'PRICEHUB E-Commerce Multi-Platform Price Comparison Dashboard'
),
(
    gen_random_uuid(),
    'hero-portrait.jpg',
    '/images/hero-portrait.jpg',
    'image/jpeg',
    524288,
    'Rishaan Kumar Portrait Photo'
);
