import Link from "next/link"

const footerLinks = {
    Courses: [
        { label: "Ace Mains 2026", href: "/courses/ace-mains-2026" },
        { label: "IMP CSE 2027", href: "/courses/integrated-mentorship-cse-2027" },
        { label: "RBI Grade B 2026", href: "/courses/rbi-grade-b-2026" },
        { label: "Daily CA Clippings", href: "/courses/daily-ca-clippings-2026" },
        { label: "Laser-Focus Magazines", href: "/courses/laser-focus-magazines-mains-2026" },
    ],
    Resources: [
        { label: "PYQs", href: "/pyqs" },
        { label: "Current Affairs", href: "/current-affairs" },
        { label: "Free Materials", href: "/free-materials" },
        { label: "Exams", href: "/exams" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "/pages/privacy-policy" },
        { label: "Terms & Conditions", href: "/pages/terms-and-conditions" },
        { label: "Cancellation & Refunds", href: "/pages/cancellation-policy" },
        { label: "Pricing Policy", href: "/pages/pricing-policy" },
        { label: "Contact Us", href: "/pages/contact" },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-ink-primary text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand col */}
                    <div>
                        <p className="text-xl font-bold mb-3">
                            FreshLens<span className="text-brand-cyan">IAS</span>
                        </p>
                        <p className="text-sm text-white/60 leading-relaxed mb-6">
                            Bringing the most authentic perspective on Civil Services Preparation.
                        </p>
                        {/* Telegram CTA */}
                        <a
                            href="https://t.me/cathatmatters"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-brand-cyan/20 border border-brand-cyan/30 px-4 py-2 text-sm font-medium text-brand-cyan hover:bg-brand-cyan hover:text-ink-primary transition-all duration-200"
                        >
                            Join Telegram Community →
                        </a>
                        <p className="text-xs text-white/40 mt-3">3000+ aspirants</p>
                    </div>

                    {/* Link cols */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">
                                {group}
                            </p>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/70 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/40">
                        © 2026 FreshLensIAS. All rights reserved.
                    </p>
                    <p className="text-xs text-white/40">
                        admin@freshlens.in
                    </p>
                </div>

            </div>
        </footer >
    )
}