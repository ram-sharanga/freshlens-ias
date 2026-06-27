import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courseId,
        } = await req.json()

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body)
            .digest("hex")

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
        }

        // Update payment record
        await prisma.payment.updateMany({
            where: {
                razorpayOrderId: razorpay_order_id,
                userId: session.user.id,
            },
            data: {
                razorpayPaymentId: razorpay_payment_id,
                status: "SUCCESS",
            },
        })

        // Create enrollment
        await prisma.enrollment.upsert({
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

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Verification failed" }, { status: 500 })
    }
}