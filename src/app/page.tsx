import React from "react";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import PostList from "@/components/PostList";
import LocalTime from "@/components/LocalTime";
import SectionSpy from "@/components/SectionSpy";
import IsingField from "@/components/IsingField";
import Morph from "@/components/Morph";
import ThemeToggle from "@/components/ThemeToggle";
import Term from "@/components/Term";
import Disclosure from "@/components/Disclosure";
import { EMAIL } from "@/lib/contact";
import { education, experience, now, toolkit } from "@/data/portfolioData";
import listStyles from "@/components/List.module.css";
import { getAllPosts } from "@/lib/writing";
import styles from "./page.module.css";

const links = [
  { label: "GitHub", href: "https://github.com/agrimjaimini" },
  { label: "LinkedIn", href: "https://linkedin.com/in/agrimjaimini" },
  { label: "Email", href: `mailto:${EMAIL}` },
];

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
        <h1 className={styles.name}>Agrim Jaimini</h1>
        <p className={`mono ${styles.place}`}>
          Ithaca, NY
          <span className={styles.time}>
            <span className={styles.live} aria-hidden />
            <LocalTime timeZone="America/New_York" />
          </span>
        </p>
      </header>

      <div className={`cell ruled ${styles.visual} enter`} style={delay(1)}>
        <Morph name="fig-1">
          <IsingField />
        </Morph>
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

      <Section title="Now" index={4} list>
        <ul className={`${listStyles.list} ${listStyles.static}`}>
          {now.items.map((item) => (
            <li key={item.label} className={listStyles.item}>
              <div className={listStyles.row}>
                <span className={styles.nowRow}>
                  <span className={styles.nowLabel}>{item.label}</span>
                  <span className={listStyles.title}>{item.title}</span>
                  {item.by && <span className={listStyles.sub}>{item.by}</span>}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className={`mono ${styles.updated}`}>Updated {now.updated}</p>
      </Section>

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

      <Section title="Toolkit" index={5} list>
        <Disclosure
          items={toolkit.map(({ category, items }) => ({
            key: category,
            title: category,
            sub: items.slice(0, 4).join(", "),
            meta: items.length > 4 ? `+${items.length - 4}` : undefined,
            points: items,
            columns: true,
            preview: true,
          }))}
        />
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
