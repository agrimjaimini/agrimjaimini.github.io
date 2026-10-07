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
        tech: ["PyTorch", "Hugging Face Transformers", "DPO", "Google Colab"],
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
        tech: ["Python", "Flask", "React", "sentence-transformers"],
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
        tech: ["Python", "BeautifulSoup", "Wikipedia API"],
        date: "Feb 2024",
        github: "https://github.com/agrimjaimini/wikiracer"
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
        { label: "Listening", title: "The Deep 3" },
    ],
};
