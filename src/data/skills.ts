export interface Skill {
  name: string;
  description: string;
  category: string;
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", description: "General-purpose programming language.", category: "Languages" },
  { name: "Java", description: "Object-oriented programming language.", category: "Languages" },
  { name: "OCaml", description: "Functional programming language.", category: "Languages" },
  { name: "JavaScript (TypeScript)", description: "Web and typed scripting languages.", category: "Languages" },
  { name: "C/C++", description: "Low-level systems programming languages.", category: "Languages" },
  { name: "SQL", description: "Relational database query language.", category: "Languages" },
  { name: "HTML/CSS", description: "Web markup and styling languages.", category: "Languages" },
  { name: "Bash", description: "Unix shell scripting language.", category: "Languages" },
  // Frameworks
  { name: "Flask", description: "Python web framework.", category: "Frameworks" },
  { name: "FastAPI", description: "Modern Python web API framework.", category: "Frameworks" },
  { name: "React", description: "JavaScript UI library.", category: "Frameworks" },
  { name: "Lwt", description: "OCaml concurrency library.", category: "Frameworks" },
  { name: "JUnit", description: "Java unit testing framework.", category: "Frameworks" },
  { name: "OUnit", description: "OCaml unit testing framework.", category: "Frameworks" },
  // ML & Data
  { name: "PyTorch", description: "Deep learning framework.", category: "ML & Data" },
  { name: "Hugging Face Transformers", description: "NLP transformer models.", category: "ML & Data" },
  { name: "scikit-learn", description: "Machine learning library.", category: "ML & Data" },
  { name: "Pandas", description: "Data analysis library.", category: "ML & Data" },
  { name: "NumPy", description: "Numerical computing library.", category: "ML & Data" },
  { name: "NetworkX", description: "Graph analysis library.", category: "ML & Data" },
  { name: "PyVis", description: "Network visualization library.", category: "ML & Data" },
  { name: "OpenCV", description: "Computer vision library.", category: "ML & Data" },
  { name: "SQLAlchemy", description: "Python SQL toolkit and ORM.", category: "ML & Data" },
  // Cloud Infrastructure
  { name: "AWS (Lambda, SageMaker, DynamoDB)", description: "Amazon Web Services cloud platform.", category: "Cloud Infrastructure" },
  { name: "GCP (Cloud Run, Compute Engine)", description: "Google Cloud Platform services.", category: "Cloud Infrastructure" },
  // DevOps & Tooling
  { name: "Docker", description: "Containerization platform.", category: "DevOps & Tooling" },
  { name: "Git/GitHub", description: "Version control and collaboration.", category: "DevOps & Tooling" },
  { name: "CI/CD", description: "Continuous integration and deployment.", category: "DevOps & Tooling" },
  { name: "Unix", description: "Unix-based operating systems and tools.", category: "DevOps & Tooling" },
  { name: "Jupyter Notebooks", description: "Interactive computing environment.", category: "DevOps & Tooling" },
  { name: "Postman", description: "API development and testing tool.", category: "DevOps & Tooling" },
]; 