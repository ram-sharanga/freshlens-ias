import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import CheckoutClient from "@/app/checkout/[courseId]/CheckoutClient"

export default async function CheckoutPage({
    params,
}: {
    params: Promise<{ courseId: string }>
}) {
    const { courseId } = await params
    const session = await auth()

    if (!session?.user?.id) {
        redirect("/sign-in")
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) notFound()

    if (course.isFree) {
        redirect(`/courses/${course.slug}`)
    }

    // Check if already enrolled
    const enrollment = await prisma.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId: session.user.id,
                courseId,
            },
        },
    })

    if (enrollment) {
        redirect("/dashboard")
    }

    return (
        <main className="min-h-screen bg-surface-1 flex items-center justify-center px-4">
            <div className="w-full max-w-lg">

                <div className="bg-surface-0 rounded-2xl border border-surface-3 shadow-hover p-8">

                    {/* Header */}
                    <h1 className="text-2xl font-bold text-ink-primary mb-1">Complete your purchase</h1>
                    <p className="text-sm text-ink-muted mb-8">You're one step away from starting your UPSC journey.</p>

                    {/* Course summary */}
                    <div className="rounded-xl bg-surface-1 border border-surface-3 p-5 mb-8">
                        <p className="text-xs font-semibold text-ink-muted uppercase tracking-widest mb-2">
                            You're enrolling in
                        </p>
                        <h2 className="text-base font-semibold text-ink-primary mb-3">
                            {course.title}
                        </h2>
                        <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-ink-primary">
                                    {formatPrice(course.price)}
                                </span>
                                {course.originalPrice > course.price && (
                                    <span className="text-sm text-ink-muted line-through">
                                        {formatPrice(course.originalPrice)}
                                    </span>
                                )}
                            </div>
                            {course.badge && (
                                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold">
                                    {course.badge}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* What's included */}
                    <div className="mb-8">
                        <p className="text-sm font-semibold text-ink-primary mb-3">What's included</p>
                        <ul className="space-y-2">
                            {[
                                `${course.lessons} lessons`,
                                "Online access",
                                "PDF resources",
                                "Mentor support",
                                "Performance feedback",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-ink-secondary">
                                    <span className="text-green-500 font-bold">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Razorpay button — client component */}
                    <CheckoutClient
                        courseId={course.id}
                        courseName={course.title}
                        amount={course.price}
                        userEmail={session.user.email!}
                        userName={session.user.name!}
                    />

                    <p className="text-xs text-ink-muted text-center mt-4">
                        Secured by Razorpay. All transactions are encrypted.
                    </p>

                </div>
            </div>
        </main>
    )
}