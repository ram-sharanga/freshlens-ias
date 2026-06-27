"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface EnrollButtonProps {
    courseId: string
    isFree: boolean
    isEnrolled: boolean
}

export default function EnrollButton({ courseId, isFree, isEnrolled }: EnrollButtonProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [enrolled, setEnrolled] = useState(isEnrolled)

    async function handleEnroll() {
        if (!isFree) {
            // Razorpay flow — coming next
            router.push(`/checkout/${courseId}`)
            return
        }

        setLoading(true)
        const res = await fetch("/api/enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId }),
        })

        if (res.ok) {
            setEnrolled(true)
            router.refresh()
        } else {
            const data = await res.json()
            if (data.error === "Unauthorized") {
                router.push("/sign-in")
            }
        }
        setLoading(false)
    }

    if (enrolled) {
        return (
            <button
                disabled
                className="w-full rounded-xl bg-green-500 py-3.5 text-base font-semibold text-white"
            >
                ✓ Enrolled
            </button>
        )
    }

    return (
        <button
            onClick={handleEnroll}
            disabled={loading}
            className="w-full rounded-xl bg-brand-blue py-3.5 text-base font-semibold text-white hover:bg-brand-indigo transition-colors disabled:opacity-60"
        >
            {loading ? "Processing..." : isFree ? "Enrol for Free" : "Buy Now"}
        </button>
    )
}