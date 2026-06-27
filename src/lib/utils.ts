import { Course } from "@/types"

export function formatPrice(price: number): string {
  if (price === 0) return "FREE"
  return `₹${price.toLocaleString("en-IN")}`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

export function getCourseBySlug(courses: Course[], slug: string) {
  return courses.find(c => c.slug === slug) ?? null
}