"use client"

import { useState, useEffect, Suspense } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

function SignInForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard"
    const { status } = useSession()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (status === "authenticated") {
            router.refresh()
            setTimeout(() => router.replace(callbackUrl), 100)
        }
    }, [status, router, callbackUrl])

    async function handleSubmit() {
        if (!email || !password) {
            setError("Please fill in all fields.")
            return
        }

        setLoading(true)
        setError("")

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (res?.error) {
            setError("Invalid email or password.")
            setLoading(false)
        }
        // On success, useEffect handles redirect when status → "authenticated"
    }

    return (
        <main className="min-h-screen bg-surface-1 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="text-2xl font-bold text-ink-primary">
                        FreshLens<span className="text-brand-blue">IAS</span>
                    </Link>
                    <p className="text-ink-muted mt-2 text-sm">Sign in to continue</p>
                </div>

                {/* Card */}
                <div className="bg-surface-0 rounded-2xl border border-surface-3 p-8 shadow-card space-y-5">
                    {/* Email */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-sm font-medium text-ink-primary">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            className="w-full rounded-xl border border-surface-3 bg-surface-1 px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="block text-sm font-medium text-ink-primary">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            className="w-full rounded-xl border border-surface-3 bg-surface-1 px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-brand-red bg-brand-red/10 px-4 py-3 rounded-xl">
                            {error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full rounded-xl bg-brand-blue py-3 text-sm font-semibold text-white hover:bg-brand-indigo transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                    {/* Footer */}
                    <p className="text-center text-sm text-ink-muted">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="text-brand-blue font-medium hover:underline">
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
