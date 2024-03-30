//components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="container min-h-screen flex items-center justify-center">
                {children}
            </div>
            <ToastContainer theme="colored" position="bottom-right" />
        </>
    );
}