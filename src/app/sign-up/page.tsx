"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUpPage() {
    const router = useRouter()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError("")

        const form = e.currentTarget
        const name = (form.elements.namedItem("name") as HTMLInputElement).value
        const email = (form.elements.namedItem("email") as HTMLInputElement).value
        const password = (form.elements.namedItem("password") as HTMLInputElement).value

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error)
            setLoading(false)
            return
        }

        router.push("/sign-in?registered=true")
    }

    return (
        <main className="flex-1 flex items-center justify-center px-4 py-24">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="text-2xl font-bold text-ink-primary">
                        FreshLens<span className="text-brand-blue">IAS</span>
                    </Link>
                    <p className="text-ink-muted mt-2 text-sm">Create your account</p>
                </div>

                <div className="bg-surface-0 rounded-2xl border border-surface-3 p-8 shadow-card">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-ink-primary mb-1.5">
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                required
                                placeholder="Arjun Mehta"
                                className="w-full rounded-xl border border-surface-3 bg-surface-1 px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ink-primary mb-1.5">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-surface-3 bg-surface-1 px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ink-primary mb-1.5">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                minLength={8}
                                placeholder="Min. 8 characters"
                                className="w-full rounded-xl border border-surface-3 bg-surface-1 px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-brand-red bg-brand-red/10 px-4 py-3 rounded-xl">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-brand-blue py-3 text-sm font-semibold text-white hover:bg-brand-indigo transition-colors disabled:opacity-60"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>

                    </form>

                    <p className="text-center text-sm text-ink-muted mt-6">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-brand-blue font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </main>
    )
}