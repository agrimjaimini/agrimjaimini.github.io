import React from "react";
import "./index.css";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Education from "./sections/Education";
import { Link, Element } from "react-scroll";

const sections = [
  { id: "hero", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Tech Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  return (
    <div className="text-white min-h-screen">
      {/* Animated black and white gradient background */}
      <div className="animated-bw-gradient" />
      {/* SVG dots pattern overlay for texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[-5] opacity-20 animate-dots"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'48\' height=\'48\' viewBox=\'0 0 48 48\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\' fill=\'%23fff\' fill-opacity=\'0.12\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '48px 48px',
        }}
      />
      <header className="sticky top-0 z-50 w-full backdrop-blur bg-black/70 border-b border-neutral-800">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="font-bold text-lg tracking-tight">Agrim Jaimini</div>
          <ul className="flex gap-6">
            {sections.map((section) => (
              <li key={section.id}>
                <Link
                  to={section.id}
                  smooth={true}
                  duration={500}
                  offset={section.id === "contact" ? -25 : -80}
                  spy={true}
                  activeClass="bg-neutral-700/80 text-primary rounded-full px-3 py-1 font-bold transition-colors duration-200"
                  className="hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Element name="hero" style={{ scrollMarginTop: 80 }}>
          <Hero
            name="Agrim Jaimini"
            tagline="Computer Science @ Cornell University"
interests ={ [
  "Software Engineering",
  "Data Science",
  "Quantitative Finance",
  "Blockchain",
  "Machine Learning",
  "NLP",]}
  profileImage={`${process.env.PUBLIC_URL}/profile.jpg`}
            socialLinks={{
              github: "https://github.com/agrimjaimini",
              linkedin: "https://linkedin.com/in/agrimjaimini",
              email: "aj638@cornell.edu",
            }}
          />
        </Element>
        <Element name="projects" style={{ scrollMarginTop: 80 }}>
          <Projects />
        </Element>
        <Element name="skills" style={{ scrollMarginTop: 80 }}>
          <Skills />
        </Element>
        <Element name="education" style={{ scrollMarginTop: 80 }}>
          <Education />
        </Element>
        <Element name="experience" style={{ scrollMarginTop: 80 }}>
          <Experience />
        </Element>
        <Element name="contact" style={{ scrollMarginTop: 100 }}>
          <Contact />
        </Element>
      </main>
    </div>
  );
}
