import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

export const metadata = { title: "Dashboard — FreshLens IAS" }

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ enrolled?: string }>
}) {
    const { enrolled } = await searchParams
    const session = await auth()

    const enrollments = await prisma.enrollment.findMany({
        where: { userId: session!.user.id },
        include: { course: true },
        orderBy: { enrolledAt: "desc" },
    })

    return (
        <main className="min-h-screen bg-surface-1">
            {enrolled && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm font-medium text-center">
                    ✅ Enrollment successful! Welcome to your new course.
                </div>
            )}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

                {/* Header */}
                <div className="mb-10">
                    <p className="text-sm text-ink-muted mb-1">Welcome back</p>
                    <h1 className="text-3xl font-bold text-ink-primary">
                        {session!.user.name}
                    </h1>
                    <p className="text-ink-muted text-sm mt-1">{session!.user.email}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: "Enrolled Courses", value: enrollments.length },
                        { label: "Active Courses", value: enrollments.filter(e => new Date(e.course.validTill) > new Date()).length },
                        { label: "Member Since", value: new Date().getFullYear() },
                        { label: "Role", value: session!.user.role ?? "Student" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-surface-0 rounded-2xl border border-surface-3 p-5">
                            <p className="text-xs text-ink-muted mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-ink-primary capitalize">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Enrolled courses */}
                <div>
                    <h2 className="text-xl font-bold text-ink-primary mb-6">My Courses</h2>

                    {enrollments.length === 0 ? (
                        <div className="bg-surface-0 rounded-2xl border border-surface-3 p-12 text-center">
                            <p className="text-4xl mb-4">📚</p>
                            <p className="text-ink-primary font-semibold mb-2">No courses yet</p>
                            <p className="text-ink-muted text-sm mb-6">Browse our courses and start your UPSC journey</p>
                            <Link
                                href="/courses"
                                className="rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-indigo transition-colors"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrollments.map((enrollment) => {
                                const isActive = new Date(enrollment.course.validTill) > new Date()
                                return (
                                    <Link
                                        key={enrollment.id}
                                        href={`/courses/${enrollment.course.slug}`}
                                        className="group bg-surface-0 rounded-2xl border border-surface-3 p-6 hover:shadow-hover hover:-translate-y-1 transition-all duration-200"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue capitalize">
                                                {enrollment.course.category.replace("-", " ")}
                                            </span>
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isActive ? "bg-green-100 text-green-700" : "bg-surface-2 text-ink-muted"}`}>
                                                {isActive ? "Active" : "Expired"}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-semibold text-ink-primary group-hover:text-brand-blue transition-colors line-clamp-2 mb-2">
                                            {enrollment.course.title}
                                        </h3>

                                        <p className="text-xs text-ink-muted">
                                            Enrolled {formatDate(enrollment.enrolledAt.toISOString())}
                                        </p>
                                        <p className="text-xs text-ink-muted">
                                            Valid till {formatDate(enrollment.course.validTill.toISOString())}
                                        </p>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>

            </div>
        </main>
    )
}