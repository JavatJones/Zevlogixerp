import NavBar from "./(components)/NavBar/NavBar";

export default function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <div className="container max-w-2xl mt-24">
        {children}
      </div>
    </main>
  );
}