import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/*
	This route returns the user's session data
	It's useful for client components that need to check if a user is authenticated
 */
export async function GET(request) {
    const supabase = createRouteHandlerClient({ cookies });

    // Get the session data
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Return the session data as JSON
    return NextResponse.json({
        authenticated: !!session,
        session,
    });
}
