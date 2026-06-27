import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { config } from "dotenv"

config()

const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

async function main() {
    const coursesData = [
        {
            slug: "ace-mains-2026",
            title: "Ace Mains 2026",
            description: "A comprehensive mains mentorship program with test series, model answers, discussions, feedback, short notes, current affairs classes, mindmaps, daily targets, live answer writing and 1:1 mentorship.",
            price: 11999,
            originalPrice: 14999,
            category: "mains",
            lessons: 19,
            validTill: new Date("2026-09-01"),
            isFree: false,
            badge: "20% OFF",
            thumbnail: "/thumbnails/ace-mains.jpg",
            about: "Ace Mains CSE 2026 is a comprehensive mains mentorship program.",
        },
        {
            slug: "integrated-mentorship-cse-2027",
            title: "Integrated (Pre+Mains) Mentorship Plan for CSE 2027",
            description: "A comprehensive CSE 2027 mentorship plan covering foundation, Mains, Prelims, and current affairs through structured phases.",
            price: 24999,
            originalPrice: 24999,
            category: "mentorship",
            lessons: 6,
            validTill: new Date("2027-09-30"),
            isFree: false,
            thumbnail: "/thumbnails/imp-cse.jpg",
            about: "Integrated mentorship plan for CSE 2027.",
        },
        {
            slug: "daily-ca-clippings-2026",
            title: "Daily CA Clippings Course",
            description: "Get handpicked most important articles out of newspapers everyday and solve practice quizzes and more.",
            price: 0,
            originalPrice: 0,
            category: "current-affairs",
            lessons: 81,
            validTill: new Date("2027-12-31"),
            isFree: true,
            thumbnail: "/thumbnails/daily-ca.jpg",
            about: "Daily current affairs clippings course.",
        },
        {
            slug: "rbi-grade-b-2026",
            title: "RBI Grade B 2026 (Phase I + II) — Complete Course",
            description: "A time-efficient RBI Grade B course by Bhartesh Mishra focused on precision and exam relevance.",
            price: 4999,
            originalPrice: 5999,
            category: "banking",
            lessons: 83,
            validTill: new Date("2026-07-31"),
            isFree: false,
            badge: "17% OFF",
            thumbnail: "/thumbnails/rbi-grade-b.jpg",
            about: "Complete RBI Grade B preparation course.",
        },
        {
            slug: "laser-focus-magazines-mains-2026",
            title: "Laser-Focus Magazines for CSE Mains 2026",
            description: "The most precise and relevant magazines for UPSC CSE Mains 2026 released by FreshLensIAS.",
            price: 1999,
            originalPrice: 2999,
            category: "mains",
            lessons: 12,
            validTill: new Date("2026-08-31"),
            isFree: false,
            badge: "33% OFF",
            thumbnail: "/thumbnails/laser-focus.jpg",
            about: "Laser-Focus magazines for CSE Mains 2026.",
        },
    ]

    for (const course of coursesData) {
        const result = await prisma.course.upsert({
            where: { slug: course.slug },
            update: course,
            create: course,
        })
        console.log(`✅ Seeded: ${result.title}`)
    }

    console.log("✅ Done")
}

main()
    .catch((e) => {
        console.error("❌ Error:", e.message)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())