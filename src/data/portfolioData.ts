export interface Education {
    school: string;
    degree: string;
    duration: string;
    gpa?: string;
    coursework?: string[];
}

export const education: Education[] = [
    {
        school: "Cornell University",
        degree: "BS, Computer Science & Mathematics",
        duration: "Expected May 2027",
        gpa: "4.04",
        coursework: [
            "Data Structures and Object-Oriented Programming (Java)",
            "Functional Programming and Advanced Data Structure (OCaml)",
            "Analysis of Algorithms",
            "Machine Learning",
            "Database Systems",
            "Discrete Math",
            "Linear Algebra",
            "Backend Development",
            "Blockchain Technology",
            "Computer Architecture",
            "Probability, Vectors, and Matrices in Computing"
        ]
    }
];

export interface Experience {
    company: string;
    title: string;
    duration: string;
    points: string[];
    location?: string;
}

export const experience: Experience[] = [
    {
        company: "Coinbase",
        title: "Software Engineer Intern",
        duration: "May 2026 – Aug 2026",
        location: "San Francisco, CA",
        points: [
            "Built a generalized GitHub API proxy in Go as shared developer infrastructure, unifying high-concurrency GitHub access behind a single internal API for autonomous CI systems and company-wide tooling",
            "Engineered a Redis cache keyed on ETags and conditional requests to absorb high-concurrency agent traffic, keeping agents under GitHub's primary rate limits where naive per-agent access would exhaust them",
            "Added Datadog metrics, dashboards, and error-rate alerting to track proxy health and per-agent traffic"
        ]
    },
    {
        company: "Ripple",
        title: "Software Engineer Intern",
        duration: "Jul 2025 – Aug 2025",
        location: "New York City, NY",
        points: [
            "Delivered end-to-end solution for BountyX funding platform built on XRP Ledger through XRPL Builder Residency, enabling secure on-chain payouts for open source contributions and 100+ bounty transactions",
            "Architected REST microservices with FastAPI, PostgreSQL, and xrpl-py for bounty creation, claim validation, and automated settlement; integrated GitHub API to verify merged PRs and prevent fraudulent claims",
            "Deployed on AWS EC2 with Docker, implementing CI/CD pipelines, comprehensive unit tests, and structured logging to ensure payout traceability and audit compliance for enterprise-grade financial operations"
        ]
    },
    {
        company: "Texas Instruments",
        title: "Machine Learning Engineer Intern",
        duration: "May 2025 – Jul 2025",
        location: "Dallas, TX",
        points: [
            "Designed and deployed modular ML pipeline processing 1M+ data points with event-driven architecture, AWS Lambda ingestion, FastAPI inference service, and Next.js monitoring dashboard; achieved 99% uptime through containerized deployment with Docker on AWS EC2 and CI/CD automation",
            "Built scalable model versioning system with PostgreSQL enabling A/B testing across 10+ iterations, reducing deployment rollback time by 75% and improving experiment reproducibility for production ML systems",
            "Trained PointNet deep learning model using PyTorch achieving 93% accuracy with <300ms inference latency; implemented synthetic data augmentation increasing training data by 5X to improve model robustness"
        ]
    },
    {
        company: "Artemis Analytics",
        title: "Software Engineer Intern",
        duration: "Oct 2024 – Jan 2025",
        location: "Remote",
        points: [
            "Built Ethereum transaction dashboard with NetworkX and PyVis processing 1M+ daily transactions for real-time wallet-network exploration, fund-flow visualization, and volume-based filtering to support fraud investigation workflows",
            "Integrated anomaly detection with Isolation Forest and Louvain community detection to identify suspicious wallets and cluster related addresses, improving fraud analysis precision and reducing manual investigation time"
        ]
    }
];

export interface Project {
    title: string;
    summary: string;
    description: string;
    tech: string[];
    date?: string;
    github?: string;
    demo?: string;
    highlights?: string[];
}

export const projects: Project[] = [
    {
        title: "Trace-Accel",
        summary: "Transformer inference accelerator simulator",
        description: "Trace-driven Rust simulator modeling transformer inference (prefill/decode) on configurable hardware, estimating latency from compute and bandwidth costs to classify workloads as compute- or memory-bound.",
        highlights: [
            "Built a trace-driven Rust simulator modeling transformer inference (prefill/decode) on configurable hardware, estimating latency from compute and bandwidth costs to classify workloads as compute- or memory-bound",
            "Added parameter sweeps, plots, and CI regression tests to compare hardware configurations (compute throughput, memory bandwidth, interconnect) and quantify their impact on end-to-end inference latency"
        ],
        tech: ["Rust", "Python"],
        date: "2026"
    },
    {
        title: "Trellis",
        summary: "Multi-agent orchestration runtime",
        description: "Runtime that splits software specs into dependency-aware parallel tasks, runs workers in git worktrees, and gates merges on automated and human review, with Claude Code and Codex as pluggable backends.",
        highlights: [
            "Built a runtime that splits software specs into dependency-aware parallel tasks, runs workers in git worktrees, and gates merges on automated and human review, with Claude Code and Codex as pluggable backends",
            "Designed graph + vector memory so agents learn across tasks: past runs, decisions, and review outcomes are embedded and entity-linked in SQLite, then recalled via similarity search and multi-hop graph expansion into each agent's prompt; exposed agent tooling over an MCP server consumed directly by Claude Code"
        ],
        tech: ["Python", "TypeScript", "Next.js", "SQLite", "MCP"],
        date: "2026"
    },
    {
        title: "Lore",
        summary: "Shared memory marketplace for AI agents",
        description: "Shared research-memory layer where AI agents cache and resell deep-research results, paying per retrieval via x402 machine-to-machine micropayments.",
        highlights: [
            "Built a shared research-memory layer where AI agents cache and resell deep-research results, ranking memories by semantic similarity, freshness decay, and LLM-judge quality to serve a cached hit or trigger re-research, with Arize tracing and evals; agents pay per retrieval via x402 machine-to-machine micropayments"
        ],
        tech: ["TypeScript", "Next.js", "Vercel AI SDK", "pgvector", "Arize"],
        date: "2026"
    },
    {
        title: "DPO Alignment Stack",
        summary: "Preference-tuning Mistral 7B with SFT + DPO",
        description: "Built Direct Preference Optimization training stack on Anthropic HH preferences with SFT pretraining and DPO fine-tuning loops using custom PyTorch trainers. Added mixed-precision/bfloat16, gradient checkpointing, and tokenizer/model consistency guards for stable, memory-efficient Mistral 7B runs. Delivered Colab-ready configs with CLI overrides plus evaluation for preference accuracy, reward margin, perplexity, and qualitative generations in a YAML-driven A100 workflow.",
        highlights: [
            "Engineered preprocessing for prompt/chosen/rejected triples with preference dataloaders and DPO loss computation",
            "Custom SFT + DPO PyTorch trainers with bfloat16, gradient checkpointing, and tokenizer/model consistency checks",
            "Colab-friendly configs and evaluation suite covering preference accuracy, reward margin, perplexity, and sample generations"
        ],
        tech: ["PyTorch", "Direct Preference Optimization (DPO)", "Hugging Face Transformers", "bfloat16", "Gradient Checkpointing", "Google Colab", "YAML"],
        date: "Aug 2025"
    },
    {
        title: "BugSense",
        summary: "ML-powered bug triage on Kafka, PyTorch, and GKE",
        description: "Production ML triage engine that ranks bug tickets by severity using embeddings, duplicate detection, and component history. Event-driven ingest on Kafka with Redis caching; PyTorch + LightGBM on GKE behind explainable REST APIs and a Next.js dashboard.",
        highlights: [
            "Ranked tickets by severity using embeddings, duplicate signals, and component history with PyTorch + LightGBM on GKE",
            "Event-driven ingestion with Kafka plus Redis caching for sub-200ms reads and explainable REST endpoints",
            "Next.js dashboard surfacing severity, duplicates, and model explanations for engineering teams"
        ],
        tech: ["Next.js", "Node.js", "Kafka", "PostgreSQL", "Redis", "PyTorch", "Kubernetes", "GCP"],
        date: "July 2025",
        github: "https://github.com/agrimjaimini/bugsense"
    },
    {
        title: "Cortex",
        summary: "Semantic knowledge workspace with embedding search",
        description: "Semantic knowledge workspace with embedding search across 1k+ docs using sentence-transformers and k-means clustering. React + Express stack surfaces clustered topics and relevance; tuned via silhouette scores to reach 95% relevance.",
        highlights: [
            "Semantic search across 1k+ documents with sentence-transformers embeddings and k-means clustering (95% relevance)",
            "React + Express full stack with embedding-powered retrieval and topic grouping",
            "Iterated clustering via silhouette score tuning to accelerate knowledge discovery"
        ],
        tech: ["Python", "React", "Node.js", "MongoDB", "sentence-transformers"],
        date: "July 2025",
        github: "https://github.com/agrimjaimini/cortex"
    },
    {
        title: "OCaml-Git",
        summary: "A Git-style version control system written in OCaml",
        description: "OCaml-built Git-style VCS with staging, branching, and remote push/pull. Content-addressable storage with digest hashing for O(1) lookups; hardened via TDD with OUnit.",
        highlights: [
            "Built OCaml Git-like VCS with staging, branching, and remote push/pull support",
            "Implemented content-addressable storage with digest hashing for O(1) lookups of blobs, trees, and commits",
            "Practiced TDD with OUnit and Agile workflows for reliability"
        ],
        tech: ["OCaml", "OUnit", "Unix"],
        date: "May 2025",
        github: "https://github.com/agrimjaimini/ocamlgit"
    },
    {
        title: "NBA Magic 8 Ball",
        summary: "Semantic search over NBA players with fine-tuned transformers",
        description: "NLP semantic search for NBA players powered by fine-tuned sentence-transformers on scraped social data. Flask API serves cosine-similarity results; React UI delivers real-time answers.",
        highlights: [
            "Fine-tuned HuggingFace sentence transformers on scraped NBA social data for semantic player search",
            "Served cosine-similarity results through Flask API backed by aggregated comment embeddings",
            "React frontend delivering real-time query responses with intuitive UX"
        ],
        tech: ["Python", "Flask", "React", "Natural Language Processing (NLP)"],
        date: "Mar 2025",
        github: "https://github.com/agrimjaimini/nba-magic-8-ball"
    },
    {
        title: "WikiRacer",
        summary: "A* search for the shortest path between Wikipedia pages",
        description: "A* solver that finds the shortest hyperlink path between Wikipedia pages. Streams live pages via Wikipedia API and applies heuristics to prioritize relevant links for faster traversal.",
        highlights: [
            "Solved WikiRacer shortest-path between Wikipedia pages using A* search",
            "Parsed live content via Wikipedia API with heuristics to prioritize relevant links",
            "Optimized traversal speed and accuracy with informed path scoring"
        ],
        tech: ["Python", "BeautifulSoup", "Web Scraping", "Algorithms"],
        date: "Feb 2024",
        github: "https://github.com/agrimjaimini/wikiracer"
    }
];

export interface Skill {
    name: string;
    description: string;
    category: string;
    usedIn: string;
}

export const skills: Skill[] = [
    { name: "Python", description: "General-purpose programming language.", category: "Programming Languages", usedIn: "ML pipelines at TI, blockchain analytics at Artemis, NLP projects, data processing" },
    { name: "JavaScript (TypeScript)", description: "Web and typed scripting languages.", category: "Programming Languages", usedIn: "React frontends, web applications, portfolio development, UI/UX" },
    { name: "Java", description: "Object-oriented programming language.", category: "Programming Languages", usedIn: "Academic coursework, software engineering projects, algorithms and data structures" },
    { name: "OCaml", description: "Functional programming language.", category: "Programming Languages", usedIn: "Git-like version control system, functional programming concepts" },
    { name: "C/C++", description: "Low-level systems programming languages.", category: "Programming Languages", usedIn: "Systems programming, performance-critical applications, memory management" },
    { name: "SQL", description: "Relational database query language.", category: "Programming Languages", usedIn: "Data analysis, database management, blockchain transaction queries" },
    { name: "HTML/CSS", description: "Web markup and styling languages.", category: "Programming Languages", usedIn: "Web development, responsive design, UI styling" },
    { name: "Bash", description: "Unix shell scripting language.", category: "Programming Languages", usedIn: "DevOps automation, system administration, deployment scripts" },
    { name: "Go", description: "Statically typed systems language.", category: "Programming Languages", usedIn: "GitHub API proxy at Coinbase" },
    { name: "Rust", description: "Memory-safe systems language.", category: "Programming Languages", usedIn: "Trace-Accel inference simulator" },

    { name: "React", description: "JavaScript UI library.", category: "Web Development", usedIn: "Cortex app, portfolio, NBA Magic 8 Ball frontend, web applications" },
    { name: "Next.js", description: "React framework for production.", category: "Web Development", usedIn: "ML dashboard frontend at Texas Instruments" },
    { name: "Node.js", description: "JavaScript runtime environment.", category: "Web Development", usedIn: "Cortex backend, server-side development" },
    { name: "Flask", description: "Python web framework.", category: "Web Development", usedIn: "NBA Magic 8 Ball API backend, RESTful services" },
    { name: "FastAPI", description: "Modern Python web API framework.", category: "Web Development", usedIn: "ML infrastructure at Texas Instruments, high-performance APIs" },
    { name: "MongoDB", description: "NoSQL document database.", category: "Web Development", usedIn: "Cortex app data storage, scalable document management" },

    { name: "PyTorch", description: "Deep learning framework.", category: "AI/ML", usedIn: "Deep learning models, neural networks, computer vision" },
    { name: "Hugging Face Transformers", description: "NLP transformer models.", category: "AI/ML", usedIn: "NBA Magic 8 Ball semantic search engine, NLP applications" },
    { name: "scikit-learn", description: "Machine learning library.", category: "AI/ML", usedIn: "ML pipelines, data analysis, anomaly detection at Artemis" },
    { name: "Pandas", description: "Data analysis library.", category: "AI/ML", usedIn: "Blockchain analytics, data processing, time series analysis" },
    { name: "NumPy", description: "Numerical computing library.", category: "AI/ML", usedIn: "Scientific computing, data analysis, mathematical operations" },
    { name: "SentenceTransformers", description: "NLP embedding models.", category: "AI/ML", usedIn: "Cortex app semantic clustering, text embeddings" },
    { name: "OpenCV", description: "Computer vision library.", category: "AI/ML", usedIn: "Computer vision, image processing, mmWave sensor data" },
    { name: "NetworkX", description: "Graph analysis library.", category: "AI/ML", usedIn: "Ethereum transaction graph analytics at Artemis" },
    { name: "PyVis", description: "Network visualization library.", category: "AI/ML", usedIn: "Interactive blockchain transaction dashboards" },
    { name: "BeautifulSoup", description: "Web scraping library.", category: "AI/ML", usedIn: "WikiRacer project, data extraction from web sources" },
    { name: "SQLAlchemy", description: "Python SQL toolkit and ORM.", category: "AI/ML", usedIn: "Database management, data modeling, ORM operations" },

    { name: "AWS Lambda", description: "Serverless compute service.", category: "Cloud & Infrastructure", usedIn: "ML infrastructure at Texas Instruments, event-driven processing" },
    { name: "AWS SageMaker", description: "Machine learning platform.", category: "Cloud & Infrastructure", usedIn: "ML model hosting and deployment at TI" },
    { name: "AWS DynamoDB", description: "NoSQL database service.", category: "Cloud & Infrastructure", usedIn: "Data storage and retrieval in ML pipelines" },
    { name: "AWS EC2", description: "Elastic compute cloud.", category: "Cloud & Infrastructure", usedIn: "Containerized service deployment at Texas Instruments" },
    { name: "GCP Cloud Run", description: "Serverless container platform.", category: "Cloud & Infrastructure", usedIn: "Cloud deployment and containerized applications" },
    { name: "GCP Compute Engine", description: "Virtual machine service.", category: "Cloud & Infrastructure", usedIn: "Infrastructure management and VM deployment" },

    { name: "Docker", description: "Containerization platform.", category: "DevOps & Tools", usedIn: "ML model deployment, service containerization at TI" },
    { name: "Git/GitHub", description: "Version control and collaboration.", category: "DevOps & Tools", usedIn: "All projects, collaborative development, code management" },
    { name: "CI/CD", description: "Continuous integration and deployment.", category: "DevOps & Tools", usedIn: "Automated deployment pipelines at Texas Instruments" },
    { name: "MLOps", description: "Machine learning operations.", category: "DevOps & Tools", usedIn: "ML pipeline automation, model versioning at TI" },
    { name: "Unix/Linux", description: "Unix-based operating systems and tools.", category: "DevOps & Tools", usedIn: "System administration, development environment" },
    { name: "Jupyter Notebooks", description: "Interactive computing environment.", category: "DevOps & Tools", usedIn: "Data analysis, ML model development, prototyping" },
    { name: "Postman", description: "API development and testing tool.", category: "DevOps & Tools", usedIn: "API testing, documentation, endpoint validation" },
    { name: "Lwt", description: "OCaml concurrency library.", category: "DevOps & Tools", usedIn: "OCaml-Git version control system, concurrent operations" },
    { name: "JUnit", description: "Java unit testing framework.", category: "DevOps & Tools", usedIn: "Java project testing, test-driven development" },
    { name: "OUnit", description: "OCaml unit testing framework.", category: "DevOps & Tools", usedIn: "OCaml-Git test-driven development, quality assurance" },
    { name: "Redis", description: "In-memory data store.", category: "DevOps & Tools", usedIn: "ETag-keyed caching for the GitHub proxy at Coinbase" },
    { name: "Datadog", description: "Observability platform.", category: "DevOps & Tools", usedIn: "Proxy metrics, dashboards, and alerting at Coinbase" },

];

import { Mail, Linkedin, MessageCircle, Calendar } from 'lucide-react';

export const contactMethods = [
    {
        icon: Mail,
        title: "Email",
        value: "aj638@cornell.edu",
        href: "mailto:aj638@cornell.edu",
        description: "Send me a message directly",
        color: "hover:text-blue-500",
        bgColor: "hover:bg-blue-500/10",
        borderColor: "hover:border-blue-500/50"
    },
    {
        icon: Linkedin,
        title: "LinkedIn",
        value: "agrimjaimini",
        href: "https://linkedin.com/in/agrimjaimini",
        description: "Connect professionally",
        color: "hover:text-blue-400",
        bgColor: "hover:bg-blue-500/10",
        borderColor: "hover:border-blue-500/50"
    },
    {
        icon: MessageCircle,
        title: "Telegram",
        value: "agrimjaimini",
        href: "https://t.me/agrimjaimini",
        description: "Send me a message",
        color: "hover:text-blue-400",
        bgColor: "hover:bg-blue-500/10",
        borderColor: "hover:border-blue-500/50"
    },
    {
        icon: Calendar,
        title: "Book a Meeting",
        value: "15/30 Min Call",
        href: "https://cal.com/agrim-jaimini",
        description: "Schedule a call with me",
        color: "hover:text-green-500",
        bgColor: "hover:bg-green-500/10",
        borderColor: "hover:border-green-500/50"
    }
];

export interface NowItem {
    label: string;
    title: string;
    by?: string;
}

/** The "Now" section. Edit freely, and bump `updated` when you do. */
export const now: { updated: string; items: NowItem[] } = {
    updated: "Oct 2026",
    items: [
        { label: "Reading", title: "Dune", by: "Frank Herbert" },
        { label: "Watching", title: "Slow Horses" },
        { label: "Listening", title: "The Deep Three Podcast" },
    ],
};
