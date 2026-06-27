import Link from "next/link"
import { Course } from "@/types"
import { formatPrice, formatDate } from "@/lib/utils"

interface CourseCardProps {
    course: Course
}

const categoryColors: Record<string, string> = {
    mentorship: "bg-brand-blue/10 text-brand-blue",
    mains: "bg-purple-100 text-purple-700",
    prelims: "bg-green-100 text-green-700",
    "current-affairs": "bg-orange-100 text-orange-700",
    banking: "bg-cyan-100 text-cyan-700",
    "test-series": "bg-red-100 text-red-700",
    bundle: "bg-yellow-100 text-yellow-700",
}

const categoryLabels: Record<string, string> = {
    mentorship: "Mentorship",
    mains: "Mains",
    prelims: "Prelims",
    "current-affairs": "Current Affairs",
    banking: "Banking",
    "test-series": "Test Series",
    bundle: "Bundle",
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <Link href={`/courses/${course.slug}`} className="group block">
            <div className="h-full rounded-2xl border border-surface-3 bg-surface-0 p-5 shadow-card transition-all duration-200 hover:shadow-hover hover:-translate-y-1">

                {/* Top row — category + badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[course.category]}`}>
                        {categoryLabels[course.category]}
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

                {/* Title */}
                <h3 className="text-base font-semibold text-ink-primary leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                    {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-ink-secondary leading-relaxed line-clamp-2 mb-4">
                    {course.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-ink-muted mb-4">
                    <span>{course.lessons} lessons</span>
                    <span>·</span>
                    <span>Valid till {formatDate(course.validTill)}</span>
                </div>

                {/* Price row */}
                <div className="flex items-center justify-between pt-4 border-t border-surface-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-ink-primary">
                            {formatPrice(course.price)}
                        </span>
                        {course.originalPrice > course.price && (
                            <span className="text-sm text-ink-muted line-through">
                                {formatPrice(course.originalPrice)}
                            </span>
                        )}
                    </div>
                    <span className="text-xs font-semibold text-brand-blue group-hover:underline">
                        View Course →
                    </span>
                </div>

            </div>
        </Link>
    )
}