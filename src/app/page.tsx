import React from "react";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import PostList from "@/components/PostList";
import LocalTime from "@/components/LocalTime";
import SectionSpy from "@/components/SectionSpy";
import IsingField from "@/components/IsingField";
import ThemeToggle from "@/components/ThemeToggle";
import Term from "@/components/Term";
import Disclosure from "@/components/Disclosure";
import { EMAIL } from "@/lib/contact";
import { education, experience, skills } from "@/data/portfolioData";
import { getAllPosts } from "@/lib/writing";
import styles from "./page.module.css";

const links = [
  { label: "GitHub", href: "https://github.com/agrimjaimini" },
  { label: "LinkedIn", href: "https://linkedin.com/in/agrimjaimini" },
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "Book a call", href: "https://cal.com/agrim-jaimini" },
];

const shortLabels: Record<string, string> = {
  "Programming Languages": "Languages",
  "Web Development": "Web",
  "Cloud & Infrastructure": "Cloud",
  "DevOps & Tools": "Tools",
};

const toolkit = Object.entries(
  skills.reduce<Record<string, string[]>>((groups, skill) => {
    const list = (groups[skill.category] ??= []);
    if (!list.includes(skill.name)) list.push(skill.name);
    return groups;
  }, {})
);

const years = (duration: string) => {
  const [start, end] = duration.replace(/[A-Z][a-z]{2} /g, "").split("–").map((s) => s.trim());
  return start === end ? start : `${start} – ${end}`;
};

/** Hover card for a company mentioned in the intro, built from its experience entry. */
function Company({ name, children }: { name: string; children?: React.ReactNode }) {
  const job = experience.find((j) => j.company === name);
  if (!job) return <>{children ?? name}</>;
  return (
    <Term
      title={job.company}
      meta={years(job.duration)}
      lines={[job.title, job.location].filter((l): l is string => Boolean(l))}
    >
      {children ?? name}
    </Term>
  );
}

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Section({ title, index, list, children }: { title: string; index: number; list?: boolean; children: React.ReactNode }) {
  return (
    <section className={`cell ${styles.section} ${list ? styles.listSection : ""} enter`} style={delay(index + 2)}>
      <h2 className={styles.heading}>{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  const posts = getAllPosts().slice(0, 5);
  const school = education[0];

  return (
    <main className="frame">
      <SectionSpy />

      <header className={`cell ${styles.header} enter`}>
        <div>
          <h1 className={styles.name}>Agrim Jaimini</h1>
          <p className={styles.role}>Engineer · Researcher · Builder</p>
        </div>
        <p className={`mono ${styles.place}`}>
          <span>Ithaca, NY</span>
          <span className={styles.time}>
            <span className={styles.live} aria-hidden />
            <LocalTime timeZone="America/New_York" />
          </span>
        </p>
      </header>

      <div className={`cell ruled ${styles.visual} enter`} style={delay(1)}>
        <IsingField />
      </div>

      <div className={`cell ${styles.intro} enter`} style={delay(2)}>
        <p>
          I build machine learning systems and the infrastructure behind them,
          and study Computer Science and Mathematics at{" "}
          <Term
            title="Cornell University"
            meta={school.duration.replace("Expected ", "")}
            lines={[school.degree.replace("BS, ", "B.S. "), `${school.gpa} GPA`]}
          >
            Cornell
          </Term>
          .
        </p>
        <p>
          Previously at <Company name="Coinbase" />, <Company name="Ripple" />,{" "}
          <Company name="Texas Instruments" />, and{" "}
          <Company name="Artemis Analytics">Artemis</Company>. Lately, building
          tools for LLM inference and AI agents.
        </p>
        <nav className={styles.links} aria-label="Elsewhere">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="link"
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <Section title="Experience" index={1} list>
        <Experience />
      </Section>

      <Section title="Projects" index={2} list>
        <Projects />
      </Section>

      {posts.length > 0 && (
        <Section title="Writing" index={3} list>
          <PostList posts={posts} />
        </Section>
      )}

      <Section title="Education" index={4} list>
        <Disclosure
          items={[
            {
              key: school.school,
              title: school.school,
              sub: school.degree.replace("BS, ", "B.S. "),
              meta: school.duration.replace("Expected ", "").slice(-4),
              points: school.coursework ?? [],
              columns: true,
              note: [school.gpa && `${school.gpa} GPA`, school.duration].filter(Boolean).join(" · "),
            },
          ]}
        />
      </Section>

      <Section title="Toolkit" index={5}>
        <dl className={styles.toolkit}>
          {toolkit.map(([category, names]) => (
            <div key={category} className={styles.toolRow}>
              <dt>{shortLabels[category] ?? category}</dt>
              <dd>{names.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Contact" index={6}>
        <p>
          The best way to reach me is{" "}
          <a href={`mailto:${EMAIL}`} className="link">{EMAIL}</a>. You can also
          find me on{" "}
          <a href="https://t.me/agrimjaimini" className="link" target="_blank" rel="noopener noreferrer">Telegram</a>{" "}
          or{" "}
          <a href="https://cal.com/agrim-jaimini" className="link" target="_blank" rel="noopener noreferrer">book a call</a>.
        </p>
      </Section>

      <footer className={`cell ${styles.footer}`}>
        <span>© {new Date().getFullYear()} Agrim Jaimini</span>
        <span className={styles.footerLinks}>
          <ThemeToggle className={styles.footerLink} />
          <a href="#" className={styles.footerLink}>Back to top ↑</a>
        </span>
      </footer>
    </main>
  );
}
