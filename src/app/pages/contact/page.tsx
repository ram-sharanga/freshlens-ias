export const metadata = { title: "Contact Us — FreshLens IAS" }

export default function ContactPage() {
    return (
        <div className="bg-surface-0 rounded-2xl border border-surface-3 p-8 md:p-12">
            <h1 className="text-3xl font-bold text-ink-primary mb-2">Contact Us</h1>
            <p className="text-sm text-ink-muted mb-10">We typically respond within 24 hours.</p>

            <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-1 border border-surface-3">
                    <span className="text-2xl">📧</span>
                    <div>
                        <p className="text-sm font-semibold text-ink-primary mb-1">Email</p>
                        <a href="mailto:admin@freshlens.in" className="text-brand-blue hover:underline text-sm">
                            admin@freshlens.in
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-1 border border-surface-3">
                    <span className="text-2xl">💬</span>
                    <div>
                        <p className="text-sm font-semibold text-ink-primary mb-1">Telegram Community</p>
                        <a
                            href="https://t.me/cathatmatters"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-blue hover:underline text-sm"
                        >
                            t.me/cathatmatters
                        </a>
                        <p className="text-xs text-ink-muted mt-1">3000+ aspirants</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-1 border border-surface-3">
                    <span className="text-2xl">📱</span>
                    <div>
                        <p className="text-sm font-semibold text-ink-primary mb-1">WhatsApp</p>
                        <a
                            href="https://wa.me/917827378251"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-blue hover:underline text-sm"
                        >
                            +91 78273 78251
                        </a>
                    </div>
                </div>
            </div >
        </div >
    )
}