import Link from "next/link"
import { auth } from "@/auth"
import { navItems } from "@/lib/constants"
import MobileMenu from "./MobileMenu"
import UserMenu from "@/components/layout/UserMenu"
import { unstable_noStore as noStore } from "next/cache"

export default async function Navbar() {
  noStore()
  const session = await auth()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-surface-3 bg-surface-0/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-ink-primary">
                        FreshLens<span className="text-brand-blue">IAS</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-ink-secondary hover:text-brand-blue transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-3">
                    {session ? (
                        <UserMenu
                            name={session.user?.name ?? "User"}
                            email={session.user?.email ?? ""}
                        />
                    ) : (
                        <>
                            <Link href="/sign-in" className="text-sm font-medium text-ink-secondary hover:text-brand-blue transition-colors">
                                Sign In
                            </Link>
                            <Link href="/sign-up" className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-indigo transition-colors">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile — client component */}
                <MobileMenu />
            </div>
        </header>
    )
}