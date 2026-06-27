import { Course, Testimonial } from "@/types"

export const courses: Course[] = [
  {
    id: "1",
    slug: "ace-mains-2026",
    title: "Ace Mains 2026",
    description: "A comprehensive mains mentorship program with test series, model answers, discussions, feedback, short notes, current affairs classes, mindmaps, daily targets, live answer writing and 1:1 mentorship.",
    price: 11999,
    originalPrice: 14999,
    category: "mains",
    lessons: 19,
    validTill: "2026-09-01",
    isFree: false,
    badge: "20% OFF",
    thumbnail: "/thumbnails/ace-mains.jpg",
    about: "Ace Mains CSE 2026 is a comprehensive mains mentorship program.",
    syllabus: [],
    faqs: []
  },
  {
    id: "2",
    slug: "integrated-mentorship-cse-2027",
    title: "Integrated (Pre+Mains) Mentorship Plan for CSE 2027",
    description: "A comprehensive CSE 2027 mentorship plan covering foundation, Mains, Prelims, and current affairs through structured phases.",
    price: 24999,
    originalPrice: 24999,
    category: "mentorship",
    lessons: 6,
    validTill: "2027-09-30",
    isFree: false,
    thumbnail: "/thumbnails/imp-cse.jpg",
    about: "Integrated mentorship plan for CSE 2027.",
    syllabus: [],
    faqs: []
  },
  {
    id: "3",
    slug: "daily-ca-clippings-2026",
    title: "Daily CA Clippings Course",
    description: "Get handpicked most important articles out of newspapers everyday and solve practice quizzes and more.",
    price: 0,
    originalPrice: 0,
    category: "current-affairs",
    lessons: 81,
    validTill: "2027-12-31",
    isFree: true,
    thumbnail: "/thumbnails/daily-ca.jpg",
    about: "Daily current affairs clippings course.",
    syllabus: [],
    faqs: []
  },
  {
    id: "4",
    slug: "rbi-grade-b-2026",
    title: "RBI Grade B 2026 (Phase I + II) — Complete Course",
    description: "A time-efficient RBI Grade B course by Bhartesh Mishra focused on precision and exam relevance.",
    price: 4999,
    originalPrice: 5999,
    category: "banking",
    lessons: 83,
    validTill: "2026-07-31",
    isFree: false,
    badge: "17% OFF",
    thumbnail: "/thumbnails/rbi-grade-b.jpg",
    about: "Complete RBI Grade B preparation course.",
    syllabus: [],
    faqs: []
  },
  {
    id: "5",
    slug: "laser-focus-magazines-mains-2026",
    title: "Laser-Focus Magazines for CSE Mains 2026",
    description: "The most precise and relevant magazines for UPSC CSE Mains 2026 released by FreshLensIAS.",
    price: 1999,
    originalPrice: 2999,
    category: "mains",
    lessons: 12,
    validTill: "2026-08-31",
    isFree: false,
    badge: "33% OFF",
    thumbnail: "/thumbnails/laser-focus.jpg",
    about: "Laser-Focus magazines for CSE Mains 2026.",
    syllabus: [],
    faqs: []
  }
]

export const testimonials: Testimonial[] = [
  {
    name: "Arjun Mehta",
    rank: "AIR 47, CSE 2024",
    text: "The 1:1 mentorship completely changed how I approached answer writing. Went from failing Mains to AIR 47 in one attempt."
  },
  {
    name: "Priya Nair",
    rank: "AIR 112, CSE 2024",
    text: "FreshLens gave me a laser-sharp strategy. No fluff, just what the exam demands."
  },
  {
    name: "Karthik Suresh",
    rank: "RBI Grade B 2025",
    text: "The time-efficient approach was perfect for me as a working professional. Cleared Phase I and II in one shot."
  }
]