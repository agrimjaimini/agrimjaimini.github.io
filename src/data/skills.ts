export interface Skill {
  name: string;
  description: string;
  category: string;
  usedIn: string;
}

export const skills: Skill[] = [
  // Programming Languages
  { name: "Python", description: "General-purpose programming language.", category: "Programming Languages", usedIn: "ML pipelines at TI, blockchain analytics at Artemis, NLP projects, data processing" },
  { name: "JavaScript (TypeScript)", description: "Web and typed scripting languages.", category: "Programming Languages", usedIn: "React frontends, web applications, portfolio development, UI/UX" },
  { name: "Java", description: "Object-oriented programming language.", category: "Programming Languages", usedIn: "Academic coursework, software engineering projects, algorithms and data structures" },
  { name: "OCaml", description: "Functional programming language.", category: "Programming Languages", usedIn: "Git-like version control system, functional programming concepts" },
  { name: "C/C++", description: "Low-level systems programming languages.", category: "Programming Languages", usedIn: "Systems programming, performance-critical applications, memory management" },
  { name: "SQL", description: "Relational database query language.", category: "Programming Languages", usedIn: "Data analysis, database management, blockchain transaction queries" },
  { name: "HTML/CSS", description: "Web markup and styling languages.", category: "Programming Languages", usedIn: "Web development, responsive design, UI styling" },
  { name: "Bash", description: "Unix shell scripting language.", category: "Programming Languages", usedIn: "DevOps automation, system administration, deployment scripts" },
  
  // Web Development
  { name: "React", description: "JavaScript UI library.", category: "Web Development", usedIn: "Cortex app, portfolio, NBA Magic 8 Ball frontend, web applications" },
  { name: "Next.js", description: "React framework for production.", category: "Web Development", usedIn: "ML dashboard frontend at Texas Instruments" },
  { name: "Node.js", description: "JavaScript runtime environment.", category: "Web Development", usedIn: "Cortex backend, server-side development" },
  { name: "Flask", description: "Python web framework.", category: "Web Development", usedIn: "NBA Magic 8 Ball API backend, RESTful services" },
  { name: "FastAPI", description: "Modern Python web API framework.", category: "Web Development", usedIn: "ML infrastructure at Texas Instruments, high-performance APIs" },
  { name: "MongoDB", description: "NoSQL document database.", category: "Web Development", usedIn: "Cortex app data storage, scalable document management" },
  
  // Machine Learning & Data Science
  { name: "PyTorch", description: "Deep learning framework.", category: "Machine Learning & Data Science", usedIn: "Deep learning models, neural networks, computer vision" },
  { name: "Hugging Face Transformers", description: "NLP transformer models.", category: "Machine Learning & Data Science", usedIn: "NBA Magic 8 Ball semantic search engine, NLP applications" },
  { name: "scikit-learn", description: "Machine learning library.", category: "Machine Learning & Data Science", usedIn: "ML pipelines, data analysis, anomaly detection at Artemis" },
  { name: "Pandas", description: "Data analysis library.", category: "Machine Learning & Data Science", usedIn: "Blockchain analytics, data processing, time series analysis" },
  { name: "NumPy", description: "Numerical computing library.", category: "Machine Learning & Data Science", usedIn: "Scientific computing, data analysis, mathematical operations" },
  { name: "SentenceTransformers", description: "NLP embedding models.", category: "Machine Learning & Data Science", usedIn: "Cortex app semantic clustering, text embeddings" },
  { name: "OpenCV", description: "Computer vision library.", category: "Machine Learning & Data Science", usedIn: "Computer vision, image processing, mmWave sensor data" },
  { name: "NetworkX", description: "Graph analysis library.", category: "Machine Learning & Data Science", usedIn: "Ethereum transaction graph analytics at Artemis" },
  { name: "PyVis", description: "Network visualization library.", category: "Machine Learning & Data Science", usedIn: "Interactive blockchain transaction dashboards" },
  { name: "BeautifulSoup", description: "Web scraping library.", category: "Machine Learning & Data Science", usedIn: "WikiRacer project, data extraction from web sources" },
  { name: "SQLAlchemy", description: "Python SQL toolkit and ORM.", category: "Machine Learning & Data Science", usedIn: "Database management, data modeling, ORM operations" },
  
  // Cloud & Infrastructure
  { name: "AWS Lambda", description: "Serverless compute service.", category: "Cloud & Infrastructure", usedIn: "ML infrastructure at Texas Instruments, event-driven processing" },
  { name: "AWS SageMaker", description: "Machine learning platform.", category: "Cloud & Infrastructure", usedIn: "ML model hosting and deployment at TI" },
  { name: "AWS DynamoDB", description: "NoSQL database service.", category: "Cloud & Infrastructure", usedIn: "Data storage and retrieval in ML pipelines" },
  { name: "AWS EC2", description: "Elastic compute cloud.", category: "Cloud & Infrastructure", usedIn: "Containerized service deployment at Texas Instruments" },
  { name: "GCP Cloud Run", description: "Serverless container platform.", category: "Cloud & Infrastructure", usedIn: "Cloud deployment and containerized applications" },
  { name: "GCP Compute Engine", description: "Virtual machine service.", category: "Cloud & Infrastructure", usedIn: "Infrastructure management and VM deployment" },
  
  // DevOps & Tools
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
  
  // Blockchain & Web3
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
]; 