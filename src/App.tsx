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
      <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-xl rounded-b-2xl transition-all duration-300 supports-[backdrop-filter]:bg-white/30 supports-[backdrop-filter]:bg-opacity-60">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-xl tracking-tight text-white drop-shadow-sm">Agrim Jaimini</span>
          </div>
          <ul className="flex gap-2 md:gap-6 bg-black/40 md:bg-black/60 rounded-full px-2 md:px-4 py-1 md:py-2 shadow border border-white/10 md:border-neutral-800 relative overflow-x-auto">
            {sections.map((section) => (
              <li key={section.id} className="relative">
                <Link
                  to={section.id}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  spy={true}
                  activeClass="active-nav"
                  className="navbar-link hover:text-primary hover:underline underline-offset-8 decoration-2 transition-all duration-200 cursor-pointer px-3 py-1 rounded-full font-semibold whitespace-nowrap"
                >
                  {section.label}
                </Link>
              </li>
            ))}
            {/* Animated underline indicator */}
            <style>{`
              .active-nav {
                color: #18181b !important;
                background: #fff !important;
                text-decoration: none;
                font-weight: bold;
                border-radius: 9999px;
                box-shadow: 0 2px 8px 0 rgba(24, 24, 27, 0.10);
              }
              .active-nav:hover {
                color: #18181b !important;
              }
              .navbar-link {
                color: #fff;
                transition: color 0.2s;
              }
              .navbar-link:hover {
                color: #fff;
              }
            `}</style>
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
        <Element name="contact" style={{ scrollMarginTop: 80 }}>
          <Contact />
        </Element>
      </main>
      
      {/* Footer */}
      <footer className="text-center py-6 text-neutral-400 text-sm">
        <p>&copy; 2025 Agrim Jaimini. All rights reserved.</p>
      </footer>
    </div>
  );
}
