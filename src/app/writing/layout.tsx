import Lattice from "@/components/Lattice";
import ThemeToggle from "@/components/ThemeToggle";
import Year from "@/components/Year";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="frame">
      <div className="cell writing">{children}</div>
      <footer className="cell writing-footer">
        <Lattice seed="footer" cols={68} rows={1} gap={10} radius={1.4} c={0.9} fade={0.6} className="lattice-rule" />
        <span>© <Year /> Agrim Jaimini</span>
        <ThemeToggle />
      </footer>
    </main>
  );
}
