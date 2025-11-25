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
        gpa: "3.96",
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
            "Probability and Matrices in Computing"
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
    },
    {
        company: "Cornell University",
        title: "Undergraduate Teaching Assistant",
        duration: "May 2025 – Present",
        location: "Ithaca, NY",
        points: [
            "CS 2800 (Discrete Mathematics and Probability)"
        ]
    }
];

export interface Project {
    title: string;
    description: string;
    tech: string[];
    date?: string;
    github?: string;
    demo?: string;
}

export const projects: Project[] = [
    {
        title: "BugSense - ML-Powered Bug Triage",
        description: "Built production ML system to automatically rank bug tickets by severity using text embeddings, duplicate signals, and component history; trained PyTorch and LightGBM models deployed on Google Kubernetes Engine. Engineered event-driven backend with Kafka for real-time ticket ingestion, Redis for sub-200ms caching, and REST APIs; integrated Next.js dashboard with transparent model explanations for engineering teams.",
        tech: ["Next.js", "Node.js", "Kafka", "PostgreSQL", "Redis", "PyTorch", "Kubernetes", "GCP"],
        date: "July 2025",
        github: "https://github.com/agrimjaimini/bugsense"
    },
    {
        title: "Cortex - AI Knowledge Management",
        description: "Developed full-stack note-taking platform with semantic search processing 1,000+ documents using sentence-transformers embeddings and k-means clustering, achieving 95% search relevance through silhouette score optimization. Built React frontend and Express REST API backend enabling users to retrieve relevant notes across hundreds of documents without exact keyword matching, improving knowledge discovery efficiency.",
        tech: ["Python", "React", "Node.js", "MongoDB", "sentence-transformers"],
        date: "July 2025",
        github: "https://github.com/agrimjaimini/cortex"
    },
    {
        title: "OCaml-Git",
        description: "Architected a Git-like version control system in OCaml supporting staging, branching, and remote push/pull; utilized test-driven development and unit testing via OUnit. Implemented content-addressable storage and snapshotting via digest-based hashing to enable O(1) lookups of file contents (blobs), directory trees, and commits, while practicing Agile Scrum methodologies.",
        tech: ["OCaml", "OUnit", "Unix"],
        date: "May 2025",
        github: "https://github.com/agrimjaimini/ocamlgit"
    },
    {
        title: "NBA Magic 8 Ball",
        description: "Constructed and trained an NLP-powered semantic search engine matching NBA-related queries to players using web-scraped social media data and fine-tuned HuggingFace sentence transformer-based model embeddings. Built a full-stack application with a React.js frontend and Flask REST API backend to serve real-time query results using cosine similarity over aggregated player comment vectors.",
        tech: ["Python", "Flask", "React", "Natural Language Processing (NLP)"],
        date: "Mar 2025",
        github: "https://github.com/agrimjaimini/nba-magic-8-ball"
    },
    {
        title: "WikiRacer",
        description: "Engineered an efficient solver for the WikiRacer game, which finds the shortest hyperlink path between two Wikipedia pages using an A* algorithm. Parsed live Wikipedia content using Wikipedia API and implemented heuristics to prioritize semantically relevant links, significantly improving traversal speed and accuracy.",
        tech: ["Python", "BeautifulSoup", "Web Scraping", "Algorithms"],
        date: "Feb 2025",
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

    { name: "Ethereum", description: "Smart contract platform and blockchain ecosystem.", category: "Blockchain & Web3", usedIn: "Blockchain analytics and transaction analysis at Artemis" },
    { name: "Solana", description: "High-performance blockchain platform for DeFi and NFTs.", category: "Blockchain & Web3", usedIn: "Cross-chain analytics and user behavior analysis" },
    { name: "XRP Ledger (XRPL)", description: "Blockchain platform for payments and DeFi applications.", category: "Blockchain & Web3", usedIn: "Feature bounty platform development at Ripple" },
    { name: "Smart Contracts", description: "Self-executing contracts with blockchain-based logic.", category: "Blockchain & Web3", usedIn: "Escrow system implementation and contract analysis" },
    { name: "DeFi Protocols", description: "Decentralized finance applications and protocols.", category: "Blockchain & Web3", usedIn: "Bounty platform and DeFi analytics" },
    { name: "Web3.js", description: "JavaScript library for Ethereum blockchain interaction.", category: "Blockchain & Web3", usedIn: "Ethereum blockchain integration and dApp development" },
    { name: "XRPL SDK", description: "Software development kit for XRP Ledger integration.", category: "Blockchain & Web3", usedIn: "XRPL escrow functions and wallet integration" },
    { name: "Etherscan API", description: "Ethereum blockchain explorer and analytics API.", category: "Blockchain & Web3", usedIn: "Transaction data retrieval and analytics at Artemis" },
    { name: "Blockchain Analytics", description: "Analysis and visualization of on-chain data.", category: "Blockchain & Web3", usedIn: "Ethereum/Solana transaction analysis and anomaly detection" },
    { name: "MEV & Gas Optimization", description: "Blockchain arbitrage strategies and efficient smart contract execution.", category: "Blockchain & Web3", usedIn: "MEV bot analysis and gas usage optimization" },
    { name: "Wallet Integration", description: "Secure integration with cryptocurrency wallets.", category: "Blockchain & Web3", usedIn: "Secure wallet interactions in bounty platform" },
    { name: "Escrow Systems", description: "Trustless fund holding and release mechanisms.", category: "Blockchain & Web3", usedIn: "XRPL escrow functions for bounty platform" },
    { name: "Escrow Systems", description: "Trustless fund holding and release mechanisms.", category: "Blockchain & Web3", usedIn: "XRPL escrow functions for bounty platform" },
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
