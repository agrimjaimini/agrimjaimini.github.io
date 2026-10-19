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
        duration: "Expected May 2028",
        gpa: "4.04",
        coursework: [
            "Data Structures and Object-Oriented Programming (Java)",
            "Functional Programming and Advanced Data Structure (OCaml)",
            "Analysis of Algorithms",
            "Machine Learning",
            "Principles of Large-Scale Machine Learning",
            "Database Systems",
            "Discrete Math",
            "Number Theory",
            "Linear Algebra",
            "Backend Development",
            "Blockchain Technology",
            "Computer Architecture",
            "Systems Programming",
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
            "Owned the design, implementation, and feedback-driven iteration of a generalized GitHub API proxy in Go, giving AI agents and internal tooling one scalable, high-concurrency internal API to GitHub",
            "Coordinated with consuming teams so their existing systems could roll over to the proxy with minimal rework",
            "Engineered a Redis cache on ETags and conditional requests to keep high-concurrency agent traffic under GitHub’s rate limits, securing it with a keyed hash of each caller’s token in the cache key to block unauthorized cache hits",
            "Added Datadog metrics, dashboards, and error-rate alerting for observability into proxy health and per-agent traffic"
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
            "Worked closely with a team of ML interns to train a PointNet point-cloud classifier to 93% accuracy, iterating through 10+ model versions with training configs and model artifact paths tracked in PostgreSQL",
            "Built an event-driven AWS Lambda pipeline that ingested 1M+ live data points for real-time inference",
            "Deployed the classifier as a containerized Flask inference API on EC2, using CI/CD for versioned releases and latency monitoring to track response times in production"
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
        summary: "Simulator for transformer inference",
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
            "Built a runtime that splits software specs into dependency-aware parallel tasks, runs AI coding agents in Docker-sandboxed git worktrees, and gates every merge behind automated code review and human approval",
            "Designed graph + vector memory so agents learn across tasks: past runs, decisions, and review outcomes are embedded and entity-linked in SQLite, then recalled via similarity search and multi-hop graph expansion"
        ],
        tech: ["Python", "TypeScript", "Next.js", "SQLite", "Docker", "MCP"],
        date: "2026"
    },
    {
        title: "Lore",
        summary: "Shared memory market for AI agents",
        description: "Shared research-memory layer where AI agents cache and resell deep-research results, paying per retrieval via x402 machine-to-machine micropayments.",
        highlights: [
            "Built a shared research-memory platform where AI agents cache and resell deep-research results: pgvector semantic search ranks memories by similarity, freshness decay, and LLM-judge quality to serve a hit or trigger re-research",
            "Built autonomous agents that pay per query via x402 micropayments and a settlement pipeline paying creators an 80% revenue share; traced the agent loop in Arize with LLM-judge evals for retrieval quality"
        ],
        tech: ["TypeScript", "Next.js", "Postgres (pgvector)", "Vercel AI SDK", "Arize"],
        date: "2026"
    },
    {
        title: "DPO Alignment Stack",
        summary: "Preference-tuning Mistral 7B (DPO)",
        description: "Built Direct Preference Optimization training stack on Anthropic HH preferences with SFT pretraining and DPO fine-tuning loops using custom PyTorch trainers. Added mixed-precision/bfloat16, gradient checkpointing, and tokenizer/model consistency guards for stable, memory-efficient Mistral 7B runs. Delivered Colab-ready configs with CLI overrides plus evaluation for preference accuracy, reward margin, perplexity, and qualitative generations in a YAML-driven A100 workflow.",
        highlights: [
            "Engineered preprocessing for prompt/chosen/rejected triples with preference dataloaders and DPO loss computation",
            "Custom SFT + DPO PyTorch trainers with bfloat16, gradient checkpointing, and tokenizer/model consistency checks",
            "Colab-friendly configs and evaluation suite covering preference accuracy, reward margin, perplexity, and sample generations"
        ],
        tech: ["PyTorch", "Hugging Face Transformers", "DPO", "Google Colab"],
        date: "Aug 2025",
        github: "https://github.com/agrimjaimini/dpo"
    },
    {
        title: "BugSense",
        summary: "ML bug triage on Kafka and GKE",
        description: "Production ML triage engine that ranks bug tickets by severity using embeddings, duplicate detection, and component history. Event-driven ingest on Kafka with Redis caching; PyTorch + LightGBM on GKE behind explainable REST APIs and a Next.js dashboard.",
        highlights: [
            "Ranked tickets by severity using embeddings, duplicate signals, and component history with PyTorch + LightGBM on GKE",
            "Event-driven ingestion with Kafka plus Redis caching for sub-200ms reads and explainable REST endpoints",
            "Next.js dashboard surfacing severity, duplicates, and model explanations for engineering teams"
        ],
        tech: ["Next.js", "Node.js", "Kafka", "PostgreSQL", "Redis", "PyTorch", "Kubernetes", "GCP"],
        date: "Jul 2025",
        github: "https://github.com/agrimjaimini/bug-sense"
    },
    {
        title: "Cortex",
        summary: "Semantic knowledge workspace",
        description: "Semantic knowledge workspace with embedding search across 1k+ docs using sentence-transformers and k-means clustering. React + Express stack surfaces clustered topics and relevance; tuned via silhouette scores to reach 95% relevance.",
        highlights: [
            "Semantic search across 1k+ documents with sentence-transformers embeddings and k-means clustering (95% relevance)",
            "React + Express full stack with embedding-powered retrieval and topic grouping",
            "Iterated clustering via silhouette score tuning to accelerate knowledge discovery"
        ],
        tech: ["Python", "React", "Node.js", "MongoDB", "sentence-transformers"],
        date: "Jul 2025",
        github: "https://github.com/agrimjaimini/cortex"
    },
    {
        title: "OCaml-Git",
        summary: "Git-style version control in OCaml",
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
        summary: "Semantic search over NBA players",
        description: "NLP semantic search for NBA players powered by fine-tuned sentence-transformers on scraped social data. Flask API serves cosine-similarity results; React UI delivers real-time answers.",
        highlights: [
            "Fine-tuned HuggingFace sentence transformers on scraped NBA social data for semantic player search",
            "Served cosine-similarity results through Flask API backed by aggregated comment embeddings",
            "React frontend delivering real-time query responses with intuitive UX"
        ],
        tech: ["Python", "Flask", "React", "sentence-transformers"],
        date: "Mar 2025",
        github: "https://github.com/agrimjaimini/nba-magic-8ball"
    },
    {
        title: "WikiRacer",
        summary: "A* search across Wikipedia links",
        description: "A* solver that finds the shortest hyperlink path between Wikipedia pages. Streams live pages via Wikipedia API and applies heuristics to prioritize relevant links for faster traversal.",
        highlights: [
            "Solved WikiRacer shortest-path between Wikipedia pages using A* search",
            "Parsed live content via Wikipedia API with heuristics to prioritize relevant links",
            "Optimized traversal speed and accuracy with informed path scoring"
        ],
        tech: ["Python", "BeautifulSoup", "Wikipedia API"],
        date: "Feb 2024",
        github: "https://github.com/agrimjaimini/WikiRacer"
    }
];

export interface NowItem {
    /** The verb that leads the item, e.g. "Listening to" */
    label: string;
    title: string;
    by?: string;
    href?: string;
    /** Plain words after the title, outside the link and the italics. */
    after?: string;
}

/** The "Now" section. Edit freely, and bump `updated` when you do. */
export const now: { updated: string; items: NowItem[] } = {
    updated: "Oct 2026",
    items: [
        { label: "Reading", title: "Dune", by: "Frank Herbert", href: "https://en.wikipedia.org/wiki/Dune_(novel)" },
        { label: "Watching", title: "Slow Horses", href: "https://en.wikipedia.org/wiki/Slow_Horses_(TV_series)" },
        { label: "Listening to", title: "The Deep 3", href: "https://podcasts.apple.com/us/podcast/the-deep-3-podcast/id1657940794" },
        { label: "Watching", title: "Luka Dončić", href: "https://www.youtube.com/watch?v=fqSTGIgHabI", after: "make it look easy" },
    ],
};

/**
 * The screen version of Experience and Projects: a few sentences, each set on
 * its own line. `[Name]` (or `[Name|label]`) marks a name that opens its entry
 * above directly under its sentence; unmarked names are plain text. The
 * printed résumé still uses the full lists.
 */
export const experienceLines = [
    "This summer I was at [Coinbase], building a GitHub API proxy for AI agents.",
    "In 2025 I built on-chain bounty payouts at [Ripple] and trained a point-cloud classifier at [Texas Instruments].",
    "Before that, I traced fraud on Ethereum at [Artemis Analytics].",
];

export const educationLines = [
    "Class of 2028 at [Cornell University|Cornell], with coursework from machine learning to number theory.",
];

export const projectLines = [
    "Lately I’ve been building [Trellis], a runtime for parallel coding agents, and [Lore], a memory market that AI agents pay to read.",
    "[Trace-Accel] simulates transformer inference on configurable hardware.",
    "Earlier, I preference-tuned Mistral 7B with [DPO Alignment Stack|DPO] and wrote a Git clone in [OCaml-Git|OCaml].",
];
