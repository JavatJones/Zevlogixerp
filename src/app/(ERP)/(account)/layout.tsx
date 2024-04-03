//components
import NavBar from "@/components/NavBar/NavBar"
import { Button } from "@/components/ui/button";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <ToastContainer theme="colored" position="bottom-right" />
      <div className="container mt-16">
        {children}
      </div>
    </main>
  );
}