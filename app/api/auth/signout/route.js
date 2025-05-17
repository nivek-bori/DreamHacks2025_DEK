import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/* 
	Signs the user out server side
*/
export async function POST(request) {
    const supabase = createRouteHandlerClient({ cookies });

    // Sign out the user
    await supabase.auth.signOut();

    // Redirect to the home page
    return NextResponse.redirect(new URL("/", request.url), {
        status: 302,
    });
}
