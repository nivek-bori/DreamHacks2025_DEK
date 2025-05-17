import "./globals.css";
import { Inter } from "next/font/google";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthProvider } from "@/components/auth/AuthProvider";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata = {
    title: "TODO WHAT IS OUR NAME???? AHHHHHHHHHHHHHHHH",
    description: "Active Preventative Care",
};

export default async function RootLayout({ children }) {
    // Get the initial session server-side
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <html lang="en" className={`${inter.variable} bg-one`}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="w-full h-screen font-sans font-w_one">
                <AuthProvider initialSession={session}>{children}</AuthProvider>
            </body>
        </html>
    );
}
