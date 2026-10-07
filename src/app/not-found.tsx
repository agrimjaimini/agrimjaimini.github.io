import Link from "next/link";
import IsingField from "@/components/IsingField";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className="frame">
      <div className={`cell ${styles.head}`}>
        <h1 className={styles.title}>404</h1>
        <p>
          This page doesn&apos;t exist. It&apos;s stuck in the disordered phase.
        </p>
      </div>
      <div className="cell ruled" style={{ padding: 0 }}>
        <IsingField linked={false} fixedC={0.18} />
      </div>
      <div className="cell">
        <Link href="/" className="link">Back home</Link>
      </div>
    </main>
  );
}
