import React from "react";
import Link from "next/link";
import Experience, { experienceId } from "@/components/Experience";
import Projects from "@/components/Projects";
import PostList from "@/components/PostList";
import IsingField from "@/components/IsingField";
import Lattice from "@/components/Lattice";
import Morph from "@/components/Morph";
import ThemeToggle from "@/components/ThemeToggle";
import Term from "@/components/Term";
import Disclosure from "@/components/Disclosure";
import Year from "@/components/Year";
import PrintLink from "@/components/PrintLink";
import PrintStamp from "@/components/PrintStamp";
import CopyEmail from "@/components/CopyEmail";
import { EMAIL } from "@/lib/contact";
import { education, experience, now } from "@/data/portfolioData";
import { getAllPosts } from "@/lib/writing";
import styles from "./page.module.css";

// `print` is what the printed résumé shows after each link
const links = [
  { label: "GitHub", href: "https://github.com/agrimjaimini", print: "github.com/agrimjaimini" },
  { label: "LinkedIn", href: "https://linkedin.com/in/agrimjaimini", print: "linkedin.com/in/agrimjaimini" },
  { label: "Email", href: `mailto:${EMAIL}`, print: EMAIL },
];

// Structured data so search results can show who this is
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Agrim Jaimini",
  url: "https://agrimjaimini.com",
  description: "Builds machine learning systems and the infrastructure behind them. CS & Math at Cornell.",
  affiliation: { "@type": "CollegeOrUniversity", name: "Cornell University" },
  sameAs: links.filter((l) => l.href.startsWith("http")).map((l) => l.href),
};

const years = (duration: string) => {
  const [start, end] = duration.replace(/[A-Z][a-z]{2} /g, "").split("–").map((s) => s.trim());
  return start === end ? start : `${start}–${end.slice(-2)}`;
};

/** A company cited in the intro: a hover card from its experience entry, and a link to its row. */
function Company({ name, children }: { name: string; children?: React.ReactNode }) {
  const job = experience.find((j) => j.company === name);
  if (!job) return <>{children ?? name}</>;
  return (
    <Term
      title={job.company}
      href={`#${experienceId(job.company)}`}
      meta={years(job.duration)}
      lines={[job.title, job.location].filter((l): l is string => Boolean(l))}
    >
      {children ?? name}
    </Term>
  );
}

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Section({
  title,
  index,
  list,
  screenOnly,
  meta,
  children,
}: {
  title: string;
  index: number;
  /** A date set at the heading's right edge, like a list row's meta. */
  meta?: string;
  list?: boolean;
  /** Leave this section out of the printed résumé. On screen these are the
      personal sections after the résumé ones, set a step closer together. */
  screenOnly?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      data-section={title.toLowerCase()}
      className={`cell ${styles.section} ${list ? styles.listSection : ""} ${screenOnly ? `screen-only ${styles.personal}` : ""} enter`}
      style={delay(index + 2)}
    >
      <h2 className={styles.heading}>
        {title}
        {meta && <span className={`mono ${styles.headingMeta}`}>{meta}</span>}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  const posts = getAllPosts().slice(0, 5);
  const school = education[0];

  return (
    <main className="frame">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />

      <header className={`cell ${styles.header} enter`}>
        <h1 className={styles.name}>Agrim Jaimini</h1>
        <PrintStamp className={styles.stamp} />
      </header>

      <div id="intro" className={`cell ${styles.intro} enter`} style={delay(1)}>
        <p className={styles.lead}>
          I build machine learning systems and the infrastructure behind them,
          and study Computer Science and Mathematics at{" "}
          <Term
            title="Cornell University"
            href="#education-cornell"
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
              data-print={l.print}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {l.label}
            </a>
          ))}
          <PrintLink className="link" />
        </nav>
      </div>

      {/* The figure sits in the text column, after the introduction */}
      <div className={`cell screen-only ${styles.visual} enter`} style={delay(2)}>
        <Morph name="fig-1">
          <IsingField />
        </Morph>
      </div>

      <Section title="Experience" index={1} list>
        <Experience />
      </Section>

      <Section title="Projects" index={2} list>
        <Projects />
      </Section>

      <Section title="Education" index={3} list>
        <Disclosure
          items={[
            {
              key: school.school,
              id: "education-cornell",
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

      {posts.length > 0 && (
        <Section title="Writing" index={4} list screenOnly>
          <PostList posts={posts} />
        </Section>
      )}

      {/* Now: one sentence, dated like a list row */}
      <Section title="Now" index={5} screenOnly meta={now.updated}>
        <p className={styles.now}>
          {now.items.map((item, i) => (
            <React.Fragment key={item.label}>
              {i > 0 && (i === now.items.length - 1 ? ", and " : ", ")}
              {i > 0 ? item.label.toLowerCase() : item.label}{" "}
              {item.href ? (
                <a
                  href={item.href}
                  className={`link ${styles.work}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.by ? `${item.title}, ${item.by}` : undefined}
                >
                  {item.title}
                </a>
              ) : (
                <span className={`${styles.nowTitle} ${styles.work}`}>{item.title}</span>
              )}
            </React.Fragment>
          ))}
          . Articles I’ve liked go on my{" "}
          <Link href="/reading" className="link">reading list</Link>.
        </p>
      </Section>

      {/* The page closes on a sentence rather than a section */}
      <div className={`cell screen-only ${styles.contact} enter`} style={delay(8)}>
        <p>
          The best way to reach me is{" "}
          <CopyEmail email={EMAIL} />. You can also
          find me on{" "}
          <a href="https://t.me/agrimjaimini" className="link" target="_blank" rel="noopener noreferrer">Telegram</a>{" "}
          or{" "}
          <a href="https://cal.com/agrim-jaimini" className="link" target="_blank" rel="noopener noreferrer">book a call</a>.
        </p>
      </div>

      <footer className={`cell screen-only ${styles.footer}`}>
        <Lattice seed="footer" cols={68} rows={1} gap={10} radius={1.4} c={0.9} className="lattice-rule" />
        <span>© <Year /> Agrim Jaimini</span>
        <span className={styles.footerLinks}>
          <ThemeToggle className={styles.footerLink} />
          <a href="#" className={styles.footerLink}>
            Back to top <span className={styles.upArrow}>↑</span>
          </a>
        </span>
      </footer>
    </main>
  );
}
