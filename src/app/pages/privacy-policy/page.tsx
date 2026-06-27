export const metadata = { title: "Privacy Policy — FreshLens IAS" }

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-surface-0 rounded-2xl border border-surface-3 p-8 md:p-12">
            <h1 className="text-3xl font-bold text-ink-primary mb-2">Privacy Policy</h1>
            <p className="text-sm text-ink-muted mb-10">Effective date: January 1, 2026</p>

            {[
                {
                    title: "1. Information We Collect",
                    body: "We collect information you provide directly — name, email address, phone number, and academic background — when you register or enroll in a program."
                },
                {
                    title: "2. How We Use It",
                    body: "Your information is used solely for program delivery, communication, and academic progress tracking. We do not use it for advertising or sell it to third parties."
                },
                {
                    title: "3. Data Storage",
                    body: "Your data is stored securely and accessed only by authorised FreshLens IAS team members involved in your program."
                },
                {
                    title: "4. Cookies",
                    body: "Our platform may use cookies to improve your experience. You can disable cookies in your browser settings, though some features may not function correctly."
                },
                {
                    title: "5. Third-Party Services",
                    body: "We may use third-party tools (such as payment processors) that have their own privacy policies. We are not responsible for their practices."
                },
                {
                    title: "6. Your Rights",
                    body: "You may request access to, correction of, or deletion of your personal data at any time by writing to admin@freshlens.in."
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