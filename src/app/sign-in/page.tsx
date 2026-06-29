"use client"

import { useState, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

function SignInForm() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard"
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError("")

        const form = e.currentTarget
        const email = (form.elements.namedItem("email") as HTMLInputElement).value
        const password = (form.elements.namedItem("password") as HTMLInputElement).value

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (res?.error) {
            setError("Invalid email or password")
            setLoading(false)
            return
        }

        window.location.href = callbackUrl
    }

    return (
        <main className="min-h-screen bg-surface-1 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="text-2xl font-bold text-ink-primary">
                        FreshLens<span className="text-brand-blue">IAS</span>
                    </Link>
                    <p className="text-ink-muted mt-2 text-sm">Sign in to your account</p>
                </div>

                <div className="bg-surface-0 rounded-2xl border border-surface-3 p-8 shadow-card">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-ink-primary mb-1.5">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                disabled={loading}
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-surface-3 bg-surface-1 px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ink-primary mb-1.5">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                disabled={loading}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-surface-3 bg-surface-1 px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-brand-red bg-brand-red/10 px-4 py-3 rounded-xl">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-brand-blue py-3 text-sm font-semibold text-white hover:bg-brand-indigo transition-colors disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-ink-muted mt-6">
                        Don't have an account?{" "}
                        <Link
                            href={`/sign-up?callbackUrl=${callbackUrl}`}
                            className="text-brand-blue font-medium hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default function SignInPage() {
    return (
        <Suspense>
            <SignInForm />
        </Suspense>
    )
}