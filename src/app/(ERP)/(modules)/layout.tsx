//components
import NavBar from "@/components/NavBar/NavBar"

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <div className="container mt-16">
        {children}
      </div>
    </main>
  );
}