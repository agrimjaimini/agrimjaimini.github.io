import ThemeToggle from "@/components/ThemeToggle";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="frame">
      <div className="cell writing">{children}</div>
      <footer className="cell writing-footer">
        <span>© {new Date().getFullYear()} Agrim Jaimini</span>
        <ThemeToggle />
      </footer>
    </main>
  );
}
