import { testimonials } from "@/lib/data"

export default function Testimonials() {
    return (
        <section className="bg-surface-1 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-14">
                    <p className="text-sm font-semibold text-brand-blue uppercase tracking-widest mb-2">
                        Student Stories
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-ink-primary">
                        Results that speak
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="rounded-2xl bg-surface-0 border border-surface-3 p-6 shadow-card"
                        >
                            {/* Quote mark */}
                            <div className="text-4xl text-brand-blue/20 font-serif leading-none mb-4">"</div>

                            <p className="text-ink-secondary text-sm leading-relaxed mb-6">
                                {t.text}
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-surface-2">
                                {/* Avatar placeholder */}
                                <div className="h-9 w-9 rounded-full bg-brand-blue/10 flex items-center justify-center text-sm font-bold text-brand-blue flex-shrink-0">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-ink-primary">{t.name}</p>
                                    {t.rank && (
                                        <p className="text-xs text-brand-blue font-medium">{t.rank}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}