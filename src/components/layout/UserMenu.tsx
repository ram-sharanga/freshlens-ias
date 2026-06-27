"use client"

import { useState, useRef, useEffect } from "react"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface UserMenuProps {
    name: string
    email: string
}

export default function UserMenu({ name, email }: UserMenuProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-xl border border-surface-3 px-3 py-2 hover:border-brand-blue transition-colors"
            >
                <div className="h-7 w-7 rounded-full bg-brand-blue flex items-center justify-center text-xs font-bold text-white">
                    {name?.charAt(0) ?? "U"}
                </div>
                <span className="text-sm font-medium text-ink-primary">{name?.split(" ")[0]}</span>
            </button>

            {open && (
                <div className="absolute right-0 top-12 w-44 bg-surface-0 border border-surface-3 rounded-2xl shadow-hover overflow-hidden z-50">
                    <div className="py-1">
                        <Link
                            href="/dashboard"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-secondary hover:bg-surface-1 hover:text-ink-primary transition-colors"
                        >
                            Profile
                        </Link>
                        <div className="border-t border-surface-2" />
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="w-full text-left px-4 py-2.5 text-sm text-brand-red hover:bg-red-50 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}