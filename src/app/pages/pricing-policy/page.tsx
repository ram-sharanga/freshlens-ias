export const metadata = { title: "Pricing Policy — FreshLens IAS" }

export default function PricingPolicyPage() {
    return (
        <div className="bg-surface-0 rounded-2xl border border-surface-3 p-8 md:p-12">
            <h1 className="text-3xl font-bold text-ink-primary mb-2">Pricing Policy</h1>
            <p className="text-sm text-ink-muted mb-10">Effective date: January 1, 2026</p>

            {[
                {
                    title: "1. Transparent & Tiered Pricing",
                    body: "We offer different plans based on the intensity and duration of mentorship. Pricing details are communicated clearly at the time of onboarding, with no hidden charges."
                },
                {
                    title: "2. What's Included in the Fee",
                    body: "Each plan typically covers: personalised 1-on-1 mentorship, weekly target setting & review, academic & strategic handholding, access to curated study aids and compilations, and performance feedback & answer-writing guidance."
                },
                {
                    title: "3. No Hidden Costs",
                    body: "All program fees are inclusive of mentorship services and digital materials. We do not charge extra for test evaluations, strategy calls, or value-added sessions unless explicitly mentioned."
                },
                {
                    title: "4. Payment Methods",
                    body: "We accept payments via UPI, Bank Transfer, and payment links shared on request. Payment details are shared upon final confirmation of onboarding."
                },
                {
                    title: "5. Fee Validity",
                    body: "Your mentorship plan begins from the date of first session or access to material, not from the payment date — unless otherwise specified."
                },
                {
                    title: "6. Discounts & Offers",
                    body: "Any ongoing discounts or early-bird offers will be communicated publicly on our official channels. We do not entertain informal bargain requests."
                },
                {
                    title: "7. Refunds & Cancellations",
                    body: "Please refer to our Cancellation and Refund Policy for detailed terms. In general, no refunds are provided once the mentorship has started."
                },
            ].map((s) => (
                <div key={s.title} className="mb-8">
                    <h2 className="text-base font-bold text-ink-primary mb-2">{s.title}</h2>
                    <p className="text-sm text-ink-secondary leading-relaxed">{s.body}</p>
                </div>
            ))}

            <div className="mt-10 pt-8 border-t border-surface-2">
                <p className="text-sm text-ink-muted">Need help? Write to us at <a href="mailto:admin@freshlens.in" className="text-brand-blue hover:underline">admin@freshlens.in</a></p>
            </div>
        </div>
    )
}