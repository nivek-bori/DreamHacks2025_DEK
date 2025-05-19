import "@/app/globals.css";
import { Inter } from "next/font/google";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Link from "next/link";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata = {
    title: "CareRemind",
    description: "Your personal preventative care reminder system",
};

export default async function RootLayout({ children }) {
    // Get the initial session server-side
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <html lang="en" className={`${inter.variable} bg-[#ffffff]`}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="absolute w-full h-full bg-[#f0f0f0]">
                <header className="relative z-50 flex justify-between items-center top-0 left-0 right-0 w-full max-h-[4rem] px-[2.25rem] py-[1rem] bg-[#eeecda]">
                    <div className="flex items-center gap-[3rem] max-h-[4rem]">
                        <img src="/logo.png" width={50} height={50} className="logo" alt="CareRe" />
                        <Link href="/" className="font-[700] text-[#98479a] ">Home</Link>
                        <Link href="/timeline" className="font-[700] text-[#98479a]">Timeline</Link>
                        <Link href="/explanation-ai" className="font-[700] text-[#98479a]">AI</Link>
                    </div>
                    <div className="flex gap-[3rem]">
                        <Link href="/about" className="font-[700] text-[#98479a]">About Us</Link>
                        <Link href="/auth_signin" className="font-[700] text-[#98479a]">Sign In</Link>
                        <Link href="/auth_signup" className="font-[700] text-[#98479a]">Sign Up</Link>
                    </div>
                </header>

                <AuthProvider initialSession={session}>{children}</AuthProvider>
            </body>
        </html>
    );
}
