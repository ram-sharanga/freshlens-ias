const services = [
    {
        icon: "🎯",
        title: "Laser-Focus Mentorship",
        description: "Personalised roadmap with weekly goals, doubt-clearing sessions, and performance reviews tailored to each aspirant's level.",
        color: "bg-brand-blue/10",
    },
    {
        icon: "📋",
        title: "Prelims Pathfinders",
        description: "Concept revision charts, high-yield MCQ sets, and last-mile strategies for the final push.",
        color: "bg-purple-100",
    },
    {
        icon: "✍️",
        title: "Mains Edge",
        description: "PYQ-decoding, answer writing analysis, and handholding from outline to conclusion.",
        color: "bg-cyan-100",
    },
    {
        icon: "📚",
        title: "PSIR Mentorship",
        description: "Strategic mentorship for PSIR Optional — structured, precise, exam-oriented.",
        color: "bg-orange-100",
    },
]

export default function Services() {
    return (
        <section className="bg-surface-0 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <p className="text-sm font-semibold text-brand-blue uppercase tracking-widest mb-2">
                        What We Offer
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-ink-primary">
                        Every edge you need
                    </h2>
                    <p className="mt-4 text-ink-secondary max-w-xl mx-auto">
                        We give serious aspirants exactly what the exam demands, without the noise.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="rounded-2xl border border-surface-3 bg-surface-1 p-6 hover:shadow-hover hover:-translate-y-1 transition-all duration-200"
                        >
                            <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${service.color} text-2xl mb-4`}>
                                {service.icon}
                            </div>
                            <h3 className="text-base font-semibold text-ink-primary mb-2">
                                {service.title}
                            </h3>
                            <p className="text-sm text-ink-secondary leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}