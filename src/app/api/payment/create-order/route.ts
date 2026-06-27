import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { razorpay } from "@/lib/razorpay"

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { courseId } = await req.json()

        const course = await prisma.course.findUnique({ where: { id: courseId } })
        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 })
        }

        if (course.isFree) {
            return NextResponse.json({ error: "Course is free" }, { status: 400 })
        }

        const existing = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId,
                },
            },
        })
        if (existing) {
            return NextResponse.json({ error: "Already enrolled" }, { status: 400 })
        }

        const order = await razorpay.orders.create({
            amount: course.price * 100,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
            notes: {
                courseId,
                userId: session.user.id,
            },
        })

        await prisma.payment.create({
            data: {
                userId: session.user.id,
                courseId,
                amount: course.price,
                razorpayOrderId: order.id,
                status: "PENDING",
            },
        })

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            courseName: course.title,
        })
    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }
}