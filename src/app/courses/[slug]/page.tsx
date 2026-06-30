import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import Link from "next/link"
import { formatPrice, formatDate } from "@/lib/utils"
import EnrollButton from "@/components/ui/EnrollButton"

export const dynamic = "force-dynamic"
export const revalidate = 0


export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const course = await prisma.course.findUnique({ where: { slug } })
    if (!course) return {}
    return {
        title: `${course.title} — FreshLens IAS`,
        description: course.description,
    }
}

export default async function CourseDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const [course, session] = await Promise.all([
        prisma.course.findUnique({ where: { slug } }),
        auth(),
    ])

    if (!course) notFound()

    // Check if already enrolled
    let isEnrolled = false
    if (session?.user?.id) {
        const enrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId: course.id,
                },
            },
        })
        isEnrolled = !!enrollment
    }

    return (
        <main className="min-h-screen bg-surface-1">

            {/* Breadcrumb */}
            <div className="bg-surface-0 border-b border-surface-3">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                    <p className="text-sm text-ink-muted">
                        <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
                        {" / "}
                        <Link href="/courses" className="hover:text-brand-blue transition-colors">Courses</Link>
                        {" / "}
                        <span className="text-ink-primary">{course.title}</span>
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Left — main content */}
                    <div className="flex-1 min-w-0">

                        <div className="bg-surface-0 rounded-2xl border border-surface-3 p-8 mb-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue capitalize">
                                    {course.category.replace("-", " ")}
                                </span>
                                {course.badge && (
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold">
                                        {course.badge}
                                    </span>
                                )}
                                {course.isFree && (
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                                        FREE
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl lg:text-3xl font-bold text-ink-primary mb-3">
                                {course.title}
                            </h1>
                            <p className="text-ink-secondary leading-relaxed">{course.description}</p>

                            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-surface-2">
                                <div>
                                    <p className="text-xs text-ink-muted mb-1">Lessons</p>
                                    <p className="text-sm font-semibold text-ink-primary">{course.lessons}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-ink-muted mb-1">Valid Till</p>
                                    <p className="text-sm font-semibold text-ink-primary">{formatDate(course.validTill.toISOString())}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-ink-muted mb-1">Access</p>
                                    <p className="text-sm font-semibold text-ink-primary">Online</p>
                                </div>
                                <div>
                                    <p className="text-xs text-ink-muted mb-1">Language</p>
                                    <p className="text-sm font-semibold text-ink-primary">English</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-0 rounded-2xl border border-surface-3 p-8">
                            <h2 className="text-xl font-bold text-ink-primary mb-4">About This Course</h2>
                            <p className="text-ink-secondary leading-relaxed">{course.about}</p>
                        </div>
                    </div>

                    {/* Right — sticky sidebar */}
                    <div className="lg:w-80 xl:w-96 flex-shrink-0">
                        <div className="sticky top-20">
                            <div className="bg-surface-0 rounded-2xl border border-surface-3 shadow-hover p-6">

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-3 mb-1">
                                        <span className="text-3xl font-bold text-ink-primary">
                                            {formatPrice(course.price)}
                                        </span>
                                        {course.originalPrice > course.price && (
                                            <span className="text-base text-ink-muted line-through">
                                                {formatPrice(course.originalPrice)}
                                            </span>
                                        )}
                                    </div>
                                    {course.badge && (
                                        <p className="text-sm font-semibold text-brand-gold">{course.badge} — Limited time</p>
                                    )}
                                    <p className="text-xs text-ink-muted mt-1">
                                        Valid till {formatDate(course.validTill.toISOString())}
                                    </p>
                                </div>

                                <EnrollButton
                                    courseId={course.id}
                                    isFree={course.isFree}
                                    isEnrolled={isEnrolled}
                                    courseSlug={course.slug}
                                />

                                <div className="mt-6 pt-6 border-t border-surface-2">
                                    <p className="text-sm font-semibold text-ink-primary mb-3">What's included</p>
                                    <ul className="space-y-2">
                                        {[
                                            `${course.lessons} lessons`,
                                            "Online access",
                                            `Valid till ${formatDate(course.validTill.toISOString())}`,
                                            "PDF resources",
                                            "Mentor support",
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-ink-secondary">
                                                <span className="text-green-500 font-bold">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}