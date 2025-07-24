import React, { Suspense, lazy } from "react";
import "./index.css";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ScrollProgress from "./components/ScrollProgress";
import FloatingNav from "./components/FloatingNav";
import ParticleBackground from "./components/ParticleBackground";
import MetaTags from "./components/MetaTags";
import ParallaxSection from "./components/ParallaxSection";
import Navbar from "./components/Navbar";
import { Element } from "react-scroll";

// Lazy load sections for better performance
const Hero = lazy(() => import("./sections/Hero"));
const Projects = lazy(() => import("./sections/Projects"));
const Skills = lazy(() => import("./sections/Skills"));
const Experience = lazy(() => import("./sections/Experience"));
const Contact = lazy(() => import("./sections/Contact"));
const Education = lazy(() => import("./sections/Education"));

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
    <div className="text-neutral-900 dark:text-white min-h-screen">
      {/* Meta Tags */}
      <MetaTags />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Floating Navigation */}
      <FloatingNav sections={sections} />
      
      {/* Animated gradient background */}
      <div className="animated-bw-gradient" />
      
      {/* Floating parallax background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <ParallaxSection speed={0.2} className="absolute top-20 left-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
        <ParallaxSection speed={0.3} direction="down" className="absolute top-96 right-20 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        <ParallaxSection speed={0.15} className="absolute bottom-96 left-1/3 w-64 h-64 bg-primary-400/5 rounded-full blur-3xl" />
      </div>
      
      <Navbar sections={sections} />
      
      <main className="relative z-10 overflow-x-hidden">
        <Element name="hero" style={{ scrollMarginTop: 80 }}>
          <Suspense fallback={<LoadingSkeleton />}>
            <Hero
              name="Agrim Jaimini"
              tagline="Computer Science @ Cornell University"
              interests={[
                "Software Engineering",
                "Data Science",
                "Quantitative Finance",
                "Blockchain",
                "Machine Learning",
                "NLP",
              ]}
              profileImage={`${process.env.PUBLIC_URL}/profile.jpg`}
              socialLinks={{
                github: "https://github.com/agrimjaimini",
                linkedin: "https://linkedin.com/in/agrimjaimini",
                email: "aj638@cornell.edu",
              }}
            />
          </Suspense>
        </Element>
        
        <Element name="projects" style={{ scrollMarginTop: 80 }}>
          <ParallaxSection speed={0.1}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Projects />
            </Suspense>
          </ParallaxSection>
        </Element>
        
        <Element name="skills" style={{ scrollMarginTop: 80 }}>
          <ParallaxSection speed={0.15} direction="down">
            <Suspense fallback={<LoadingSkeleton />}>
              <Skills />
            </Suspense>
          </ParallaxSection>
        </Element>
        
        <Element name="education" style={{ scrollMarginTop: 80 }}>
          <ParallaxSection speed={0.1}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Education />
            </Suspense>
          </ParallaxSection>
        </Element>
        
        <Element name="experience" style={{ scrollMarginTop: 80 }}>
          <ParallaxSection speed={0.12} direction="down">
            <Suspense fallback={<LoadingSkeleton />}>
              <Experience />
            </Suspense>
          </ParallaxSection>
        </Element>
        
        <Element name="contact" style={{ scrollMarginTop: 80 }}>
          <Suspense fallback={<LoadingSkeleton />}>
            <Contact />
          </Suspense>
        </Element>
      </main>
      
      {/* Enhanced Footer */}
      <footer className="relative z-10 text-center py-8 px-4 text-neutral-600 dark:text-neutral-400 text-sm border-t border-neutral-200 dark:border-white/5 glass">
        <div className="max-w-4xl mx-auto">
          <p className="font-medium">&copy; 2025 Agrim Jaimini. All rights reserved.</p>
          <p className="text-neutral-500 dark:text-neutral-500 mt-2">Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
