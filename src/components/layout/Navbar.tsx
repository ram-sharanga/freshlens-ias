import Link from "next/link"
import { navItems } from "@/lib/constants"
import MobileMenu from "@/components/layout/MobileMenu"
import NavAuth from "@/components/layout/NavAuth"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-surface-3 bg-surface-0/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-ink-primary">
                        FreshLens<span className="text-brand-blue">IAS</span>
                    </span>
                </Link>

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
                    <NavAuth />
                </div>

                <MobileMenu />
            </div>
        </header>
    )
}