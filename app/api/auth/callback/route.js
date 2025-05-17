import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/*
	Route for auth api when user auth is verified
*/
export async function GET(request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });

        const { error } = await supabase.auth.exchangeCodeForSession(code);

		// Invalid code -> signin
        if (error) {
            return NextResponse.redirect(new URL("signin", requestUrl.origin));
        }
    } else {
		// No code provided -> signin
		return NextResponse.redirect(new URL("signin", requestUrl.origin));
	}

	// Valid code -> access
    const redirectTo = requestUrl.searchParams.get("redirect") || "/timeline";
    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
}
