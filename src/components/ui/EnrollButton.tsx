"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface EnrollButtonProps {
    courseId: string
    isFree: boolean
    isEnrolled: boolean
}

export default function EnrollButton({ courseId, isFree, isEnrolled }: EnrollButtonProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [enrolled, setEnrolled] = useState(isEnrolled)

    async function handleEnroll() {
        if (!isFree) {
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
            // clean up the URL
            window.history.replaceState({}, "", window.location.pathname)
        } else {
            const data = await res.json()
            if (data.error === "Unauthorized") {
                router.push(`/sign-in?callbackUrl=${window.location.pathname}?enroll=true`)
            }
        }
        setLoading(false)
    }

    // Auto-enroll if redirected back with ?enroll=true
    useEffect(() => {
        if (searchParams.get("enroll") === "true" && !enrolled && isFree) {
            handleEnroll()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            {loading ? "Processing..." : isFree ? "Enroll for Free" : "Buy Now"}
        </button>
    )
}