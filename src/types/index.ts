export interface Course {
  id: string
  slug: string
  title: string
  description: string
  price: number
  originalPrice: number
  category: CourseCategory
  lessons: number
  validTill: string
  isFree: boolean
  badge?: string        // "20% OFF", "NEW", etc.
  thumbnail: string
  syllabus: Section[]
  about: string
  faqs: FAQ[]
}

export interface Section {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  type: "video" | "pdf" | "attachment" | "quiz"
}

export interface FAQ {
  question: string
  answer: string
}

export type CourseCategory =
  | "mentorship"
  | "mains"
  | "prelims"
  | "current-affairs"
  | "banking"
  | "test-series"
  | "bundle"

export interface Testimonial {
  name: string
  rank?: string
  text: string
  avatar?: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}