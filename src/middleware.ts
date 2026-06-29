import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        cookieName: process.env.NODE_ENV === "production"
            ? "__Secure-authjs.session-token"
            : "authjs.session-token",
    })

    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")

    if (isOnDashboard && !token) {
        const url = new URL("/sign-in", req.url)
        url.searchParams.set("callbackUrl", req.nextUrl.pathname)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*"],
}