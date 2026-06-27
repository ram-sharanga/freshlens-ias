"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"

interface CheckoutClientProps {
    courseId: string
    courseName: string
    amount: number
    userEmail: string
    userName: string
}

declare global {
    interface Window {
        Razorpay: any
    }
}

export default function CheckoutClient({
    courseId,
    courseName,
    amount,
    userEmail,
    userName,
}: CheckoutClientProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handlePayment() {
        setLoading(true)
        setError("")

        try {
            // Step 1 — create order
            const orderRes = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId }),
            })

            const orderData = await orderRes.json()
            if (!orderRes.ok) {
                setError(orderData.error)
                setLoading(false)
                return
            }

            // Step 2 — open Razorpay modal
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "FreshLens IAS",
                description: courseName,
                order_id: orderData.orderId,
                prefill: {
                    name: userName,
                    email: userEmail,
                },
                theme: {
                    color: "#1A3FAA",
                },
                handler: async function (response: any) {
                    // Step 3 — verify payment
                    const verifyRes = await fetch("/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            courseId,
                        }),
                    })

                    const verifyData = await verifyRes.json()

                    if (verifyData.success) {
                        router.push("/dashboard?enrolled=true")
                    } else {
                        setError("Payment verification failed. Contact support.")
                    }
                },
                modal: {
                    ondismiss: () => {
                        setLoading(false)
                    },
                },
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (err) {
            setError("Something went wrong. Please try again.")
            setLoading(false)
        }
    }

    return (
        <>
            {/* Load Razorpay SDK */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            {error && (
                <p className="text-sm text-brand-red bg-brand-red/10 px-4 py-3 rounded-xl mb-4">
                    {error}
                </p>
            )}

            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full rounded-xl bg-brand-blue py-3.5 text-base font-semibold text-white hover:bg-brand-indigo transition-colors disabled:opacity-60"
            >
                {loading ? "Processing..." : `Pay ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)}`}
            </button>
        </>
    )
}