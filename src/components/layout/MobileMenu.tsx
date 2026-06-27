"use client"

import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { navItems } from "@/lib/constants"

export default function MobileMenu() {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession()

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setOpen(!open)}
                className="flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
            >
                <span className={`block h-0.5 w-6 bg-ink-primary transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-6 bg-ink-primary transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-6 bg-ink-primary transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>

            {open && (
                <div className="absolute left-0 top-16 w-full bg-surface-0 border-b border-surface-3 px-4 py-6 flex flex-col gap-4 shadow-lg">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-secondary hover:text-brand-blue transition-colors">
                            {item.label}
                        </Link>
                    ))}
                    <hr className="border-surface-3" />
                    {session ? (
                        <>
                            <Link href="/dashboard" onClick={() => setOpen(false)} className="text-sm font-medium text-ink-secondary">Dashboard</Link>
                            <button onClick={() => signOut()} className="text-left text-sm font-medium text-brand-red">Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" onClick={() => setOpen(false)} className="text-sm font-medium text-ink-secondary">Sign In</Link>
                            <Link href="/sign-up" onClick={() => setOpen(false)} className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white text-center">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}