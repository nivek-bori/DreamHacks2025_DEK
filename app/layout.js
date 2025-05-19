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
        <html lang="en" className={`${inter.variable} bg-c_white`}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="absolute w-full h-full bg-[#eeecda]">
                <header className="relative z-50 flex justify-between items-center top-0 left-0 right-0 w-full h-[3rem] p-[0.25rem] pl-[0.5rem] pr-[0.5rem] bg-[#f9f9f9]">
                    {/* <img src="/DreamHacks_Project_Logo.png" alt="Logo" /> */}
                    <div>
                        <Link href="/" className="font-[700] text-[#98479a] ">Home</Link>
                        <Link href="/timeline" className="font-[700] text-[#98479a]">Timeline</Link>
                        <Link href="/explanation-ai" className="font-[700] text-[#98479a]">AI</Link>
                    </div>
                    <div className="flex gap-[0.1rem]">
                        <Link href="/about" className="font-[700] text-[#98479a]">About Us</Link>
                        <Link href="/dev_signin" className="font-[700] text-[#98479a]">Signin</Link>
                        <Link href="/dev_signup" className="font-[700] text-[#98479a]">Signup</Link>
                    </div>
                </header>

                <AuthProvider initialSession={session}>{children}</AuthProvider>
            </body>
        </html>
    );
}
