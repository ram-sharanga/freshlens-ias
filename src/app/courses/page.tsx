import { courses } from "@/lib/data"
import CourseCard from "@/components/ui/CourseCard"
import { CourseCategory } from "@/types"

const categories: { label: string; value: CourseCategory | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Mentorship", value: "mentorship" },
    { label: "Mains", value: "mains" },
    { label: "Prelims", value: "prelims" },
    { label: "Current Affairs", value: "current-affairs" },
    { label: "Banking", value: "banking" },
    { label: "Test Series", value: "test-series" },
    { label: "Bundle", value: "bundle" },
]

export const metadata = {
    title: "Courses — FreshLens IAS",
    description: "Browse all UPSC preparation courses by FreshLens IAS.",
}

export default async function CoursesPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>
}) {
    const { category } = await searchParams
    const active = category ?? "all"

    const filtered = active === "all"
        ? courses
        : courses.filter((c) => c.category === active)

    return (
        <main className="min-h-screen bg-surface-1">

            {/* Page header */}
            <div className="bg-surface-0 border-b border-surface-3">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <p className="text-sm font-semibold text-brand-blue uppercase tracking-widest mb-2">
                        All Courses
                    </p>
                    <h1 className="text-3xl lg:text-4xl font-bold text-ink-primary">
                        Find your preparation path
                    </h1>
                    <p className="mt-3 text-ink-secondary max-w-xl">
                        From mentorship programs to focused test series — everything built for serious UPSC aspirants.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

                {/* Category filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <a
                            key={cat.value}
                            href={cat.value === "all" ? "/courses" : `/courses?category=${cat.value}`}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150
                ${active === cat.value
                                    ? "bg-brand-blue text-white border-brand-blue"
                                    : "bg-surface-0 text-ink-secondary border-surface-3 hover:border-brand-blue hover:text-brand-blue"
                                }`}
                        >
                            {cat.label}
                        </a>
                    ))}
                </div>

                {/* Results count */}
                <p className="text-sm text-ink-muted mb-6">
                    {filtered.length} {filtered.length === 1 ? "course" : "courses"} found
                </p>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-4xl mb-4">📭</p>
                        <p className="text-ink-secondary">No courses in this category yet.</p>
                    </div>
                )}

            </div>
        </main >
    )
}