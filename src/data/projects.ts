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
    title: "Cortex",
    description: "Developed a digital second brain application that clusters user-inputted notes based on semantic similarity. Leveraged a fine-tuned SentenceTransformer model for embeddings and implemented a dynamic clustering backend via K-Means in Python. Built an intuitive React interface to display clustered insights, and integrated MongoDB for scalable data storage. Designed with modularity for future support of videos and other diverse data types.",
    tech: ["React", "Node.js", "MongoDB", "Python", "SentenceTransformers"],
    date: "July 2025",
    github: "https://github.com/agrimjaimini/cortex" // replace with actual link if different
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
    github: "https://github.com/agrimjaimini/wikiracer" // update if needed
  }

]; 