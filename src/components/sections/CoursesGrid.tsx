import { courses } from "@/lib/data"
import CourseCard from "@/components/ui/CourseCard"
import Link from "next/link"

export default function CoursesGrid() {
    const featured = courses.slice(0, 3)

    return (
        <section className="bg-surface-1 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-semibold text-brand-blue uppercase tracking-widest mb-2">
                            Our Courses
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-ink-primary">
                            Everything you need to crack UPSC
                        </h2>
                    </div>
                    <Link
                        href="/courses"
                        className="hidden sm:block text-sm font-semibold text-brand-blue hover:underline"
                    >
                        View all courses →
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>

                {/* Mobile view all */}
                <div className="mt-8 text-center sm:hidden">
                    <Link
                        href="/courses"
                        className="text-sm font-semibold text-brand-blue hover:underline"
                    >
                        View all courses →
                    </Link>
                </div>

            </div>
        </section>
    )
}