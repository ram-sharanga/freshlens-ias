"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface EnrollButtonProps {
    courseId: string
    isFree: boolean
    isEnrolled: boolean
    courseSlug: string
}

export default function EnrollButton({ courseId, isFree, isEnrolled, courseSlug }: EnrollButtonProps) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [enrolled, setEnrolled] = useState(isEnrolled)

    async function handleEnroll() {
        // Not signed in — go to sign in with callback to this exact course
        if (!session) {
            window.location.href = `/sign-in?callbackUrl=/courses/${courseSlug}`
            return
        }

        // Signed in + paid course — go to checkout
        if (!isFree) {
            window.location.href = `/checkout/${courseId}`
            return
        }

        // Signed in + free course — enroll directly
        setLoading(true)
        const res = await fetch("/api/enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId }),
        })

        if (res.ok) {
            setEnrolled(true)
            router.refresh()
        }
        setLoading(false)
    }

    if (enrolled) {
        return (
            <button disabled className="w-full rounded-xl bg-green-500 py-3.5 text-base font-semibold text-white">
                ✓ Enrolled
            </button>
        )
    }

    return (
        <button
            onClick={handleEnroll}
            disabled={loading || status === "loading"}
            className="w-full rounded-xl bg-brand-blue py-3.5 text-base font-semibold text-white hover:bg-brand-indigo transition-colors disabled:opacity-60"
        >
            {loading ? "Processing..." : isFree ? "Enrol for Free" : "Buy Now"}
        </button>
    )
}