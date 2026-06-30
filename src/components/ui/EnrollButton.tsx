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
        setLoading(true)

        if (!isFree) {
            window.location.href = `/checkout/${courseId}`
            return
        }

        try {
            const res = await fetch("/api/enroll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId }),
            })

            const data = await res.json()

            if (res.ok) {
                setEnrolled(true)
                router.refresh()
            } else if (res.status === 401) {
                window.location.href = `/sign-in?callbackUrl=${window.location.pathname}`
                return
            } else {
                console.error("Enroll failed:", data.error)
            }
        } catch (err) {
            console.error("Enroll error:", err)
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