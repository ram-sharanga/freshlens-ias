import Link from "next/link"

export default function NotFound() {
    return (
        <main className="min-h-screen bg-surface-1 flex items-center justify-center">
            <div className="text-center">
                <p className="text-7xl font-bold text-surface-3 mb-4">404</p>
                <h1 className="text-2xl font-bold text-ink-primary mb-2">Page not found</h1>
                <p className="text-ink-muted mb-8">This page doesn't exist or has been moved.</p>
                <Link
                    href="/"
                    className="rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-indigo transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    )
}