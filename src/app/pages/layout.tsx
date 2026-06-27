export default function PagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-surface-1">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
                {children}
            </div>
        </main>
    )
}