export interface Experience {
  company: string;
  title: string;
  duration: string;
  points: string[];
  location?: string;
}

export const experience: Experience[] = [
  {
    company: "Texas Instruments",
    title: "Machine Learning Engineering Intern (Research Collaborator)",
    duration: "Jun 2025 -- Present",
    location: "Dallas, TX",
    points: [
      "Designed a scalable, event-driven ML infrastructure processing 1K+ sensor events/sec from TI’s IWRL6432 mmWave sensors; integrated time series feature engineering with deep learning to enable real-time inference (sub-1 second latency)",
      "Developed an end-to-end fall and occupancy detection pipeline (93% accuracy) with AWS Lambda triggers, SageMaker-hosted models, and a Next.js frontend dashboard; containerized services on EC2 for 99% uptime via MLOps and CI/CD pipelines",
      "Documented internal tooling for model versioning, containerized deployment on EC2, and API observability using Docker and FastAPI, improving system transparency"
    ]
  },
  {
    company: "Cornell University",
    title: "Undergraduate Teaching Assistant",
    duration: "May 2025 -- Present",
    location: "Ithaca, NY",
    points: [
      "Facilitated help sessions and evaluated assignments for CS 2800, on topics such as discrete math, probability, and statistics"
    ]
  },
  {
    company: "Artemis Analytics (artemis.xyz)",
    title: "Software Engineering Intern (Blockchain Data Analytics)",
    duration: "Oct 2024 -- Mar 2025",
    location: "New York City, NY (Remote)",
    points: [
      "Engineered an interactive graph analytics dashboard for Ethereum transactions to visualize on-chain interactions utilizing NetworkX, PyVis, and Etherscan API. Applied real-time node and edge filtering to reduce graph-building latency by 70%",
      "Developed low-latency anomaly detection pipelines using Louvain clustering and IsolationForest, enabling detection of suspicious behavior across the Ethereum network",
      "Investigated metrics across 100+ smart contracts with $13M+ total gas usage and 700K+ daily active users to identify features driving transaction volume on Ethereum and Solana, including MEV arbitrage bots, to support automated labeling"
    ]
  }
]; 