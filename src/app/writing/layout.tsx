import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import WritingScrollProgress from "@/components/WritingScrollProgress";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WritingScrollProgress />
      <Navigation />
      <main className="writing-page">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </>
  );
}
