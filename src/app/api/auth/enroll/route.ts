import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { courseId } = await req.json()
        if (!courseId) {
            return NextResponse.json({ error: "courseId required" }, { status: 400 })
        }

        const course = await prisma.course.findUnique({ where: { id: courseId } })
        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 })
        }

        // Only allow free enrollment here — paid goes through Razorpay
        if (!course.isFree) {
            return NextResponse.json({ error: "This course requires payment" }, { status: 400 })
        }

        const enrollment = await prisma.enrollment.upsert({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId,
                },
            },
            update: {},
            create: {
                userId: session.user.id,
                courseId,
            },
        })

        return NextResponse.json({ message: "Enrolled", enrollment }, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}