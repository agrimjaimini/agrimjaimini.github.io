import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Skills />
      <Education />
      <Contact />

      <footer style={{ textAlign: 'center', padding: '2rem', color: '#666', fontSize: '0.9rem' }}>
        <p>© {new Date().getFullYear()} Agrim Jaimini. Built with Next.js.</p>
      </footer>
    </main>
  );
}
