export const metadata = { title: "Terms & Conditions — FreshLens IAS" }

export default function TermsPage() {
    return (
        <div className="bg-surface-0 rounded-2xl border border-surface-3 p-8 md:p-12">
            <h1 className="text-3xl font-bold text-ink-primary mb-2">Terms & Conditions</h1>
            <p className="text-sm text-ink-muted mb-10">Effective date: January 1, 2026</p>

            {[
                {
                    title: "1. Eligibility",
                    body: "Our mentorship programs are open to serious aspirants preparing for the UPSC Civil Services Examination. By registering, you confirm that the information you provide is accurate and you meet the required eligibility."
                },
                {
                    title: "2. Nature of Services",
                    body: "FreshLens IAS provides personalised mentorship, curated resources, and strategic guidance. We do not offer classroom coaching or guarantee selection in the UPSC exam. Success depends on individual effort, consistency, and adherence to the guidance provided."
                },
                {
                    title: "3. Fee and Payment Terms",
                    body: "All fees, once paid, are non-refundable and non-transferable, unless explicitly stated otherwise. Fees must be paid in advance to confirm enrollment. Access to sessions, resources, or personal guidance will be granted only after full payment."
                },
                {
                    title: "4. Intellectual Property",
                    body: "All content, including notes, compilations, strategies, frameworks, and video/audio sessions, are the intellectual property of FreshLens IAS. You may use the material only for personal preparation. Reproduction, sharing, or distribution without written permission is strictly prohibited."
                },
                {
                    title: "5. Code of Conduct",
                    body: "Aspirants are expected to be respectful in all communications, follow timelines and assignment schedules, and not engage in plagiarism or unethical practices. Failure to comply may result in removal from the program without any refund."
                },
                {
                    title: "6. Scheduling and Delivery",
                    body: "Mentorship sessions will be scheduled in coordination with the mentor. Changes must be informed at least 24 hours in advance. We reserve the right to reschedule sessions due to unavoidable circumstances, with prior notice."
                },
                {
                    title: "7. Privacy and Data Use",
                    body: "We value your privacy. Any data collected (email, phone number, progress reports) is used only for academic and communication purposes. We do not share your data with third parties."
                },
                {
                    title: "8. Limitation of Liability",
                    body: "FreshLens IAS and its mentors shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services."
                },
                {
                    title: "9. Amendments",
                    body: "These Terms & Conditions are subject to change without prior notice. Any updates will be posted on this page. Continued use of the platform after such changes constitutes acceptance."
                },
                {
                    title: "10. Contact",
                    body: "For any queries related to these terms, reach out to us at admin@freshlens.in"
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