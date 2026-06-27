export const metadata = { title: "Cancellation & Refunds — FreshLens IAS" }

export default function CancellationPage() {
    return (
        <div className="bg-surface-0 rounded-2xl border border-surface-3 p-8 md:p-12">
            <h1 className="text-3xl font-bold text-ink-primary mb-2">Cancellation & Refund Policy</h1>
            <p className="text-sm text-ink-muted mb-10">Effective date: January 1, 2026</p>

            {[
                {
                    title: "1. General Policy",
                    body: "All fees paid to FreshLens IAS are non-refundable once access to the program or materials has been granted. We encourage aspirants to carefully review the program details before enrolling."
                },
                {
                    title: "2. Cancellation Before Access",
                    body: "If you cancel your enrollment before gaining access to any sessions or materials, a full refund may be considered at our discretion. Requests must be made within 24 hours of payment."
                },
                {
                    title: "3. No Refund After Access",
                    body: "Once access to sessions, notes, or any digital resources has been provided, no refund will be issued regardless of usage."
                },
                {
                    title: "4. Program Discontinuation by FreshLens IAS",
                    body: "In the rare event that FreshLens IAS discontinues a program after enrollment, a pro-rated refund will be issued for the unused portion of the program."
                },
                {
                    title: "5. How to Request",
                    body: "To request a cancellation, write to admin@freshlens.in with your enrollment details. We will respond within 3 business days."
                },
            ].map((s) => (
                <div key={s.title} className="mb-8">
                    <h2 className="text-base font-bold text-ink-primary mb-2">{s.title}</h2>
                    <p className="text-sm text-ink-secondary leading-relaxed">{s.body}</p>
                </div>
            ))}
        </div>
    )
}