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
    degree: "Bachelor of Arts in Computer Science, Minor in Statistics",
    duration: "Expected May 2027",
    gpa: "3.96",
    coursework: [
      "Machine Learning",
      "Database Systems",
      "Data Structures and Object-Oriented Programming (Java)",
      "Functional Programming and Advanced Data Structure (OCaml)",
    "Discrete Math", "Linear Algebra"
    ]
  }
]; 