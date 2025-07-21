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

      "Data Structures and Object-Oriented Programming (Java)",
      "Functional Programming and Advanced Data Structure (OCaml)",      "Machine Learning",
      "Database Systems",
    "Discrete Math", "Linear Algebra", "Backend Development", "Blockchain Technology"
    ]
  }
]; 