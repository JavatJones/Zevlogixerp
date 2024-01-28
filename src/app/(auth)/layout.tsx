export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container min-h-screen flex items-center justify-center">
            {children}
        </div>
    );
}