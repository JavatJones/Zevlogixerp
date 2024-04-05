//components
import NavBar from "@/components/NavBar/NavBar"

export default function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <div className="container mt-24 ">
        {children}
      </div>
    </main>
  );
}