"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import UserMenu from "./UserMenu"

export default function NavAuth() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <div className="h-9 w-24 rounded-xl bg-surface-2 animate-pulse" />
    }

    if (session) {
        return (
            <UserMenu
                name={session.user?.name ?? "User"}
                email={session.user?.email ?? ""}
            />
        )
    }

    return (
        <div className="flex items-center gap-3">
            <Link
                href="/sign-in"
                className="text-sm font-medium text-ink-secondary hover:text-brand-blue transition-colors"
            >
                Sign In
            </Link>
            <Link
                href="/sign-up"
                className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-indigo transition-colors"
            >
                Sign Up
            </Link>
        </div>
    )
}