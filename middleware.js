/*
    Middleware is ran between the client request and the server return
    It is currently asking if user is authenticated and performing some logic based on that value
*/

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // This allows log in, sign up, and maybe about us pages, etc to be accessed without authorization
    // const authRoutes = ["/timeline", "/profile"];
    const authRoutes = [];

    const isProtectedRoute = authRoutes.some((route) => req.nextUrl.pathname.startsWith(route));
	
    if (isProtectedRoute && !session) {
        const redirectUrl = new URL("/signin", req.url);
        redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

	// If user is authenticated, redirect away from log in or sign up
    if (session && (req.nextUrl.pathname === "/signin" || req.nextUrl.pathname === "/signup")) {
        return NextResponse.redirect(new URL("/timeline", req.url));
    }

    return res;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api/public).*)"],
};
