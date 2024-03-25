//components
import NavBar from "@/components/NavBar/NavBar"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <div className="container mt-16">
        <ToastContainer theme="colored" position="bottom-right"/>
        {children}
      </div>
    </main>
  );
}