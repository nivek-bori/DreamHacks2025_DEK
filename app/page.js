import React from "react";
import Link from "next/link";

// This is a server component - no "use client" needed
export default async function Home() {
    return (
        <div className="fixed top-0 left-0 right-0 bg-c_green p-4 flex justify-between items-center z-50 shadow-md">
            <Link href="/" class="text-black font-bold">Home</Link>
            <a href="/timeline">Timeline</a>
            <a href="ai">AI</a>
            <Link href="/about">About</Link>
        </div>
        /*
        <div class="fixed top-0 left-0 right-0 c_green p-4 flex justify-between items-center z-50 shadow-md">
            <a href="/" class="text-white font-bold text-xl">Logo</a>
            <div class="space-x-4">
                <a href="/" class="text-white hover:text-gray-200">Home</a>
                <a href="/about" class="text-white hover:text-gray-200">About</a>
                <a href="/contact" class="text-white hover:text-gray-200">Contact</a>
            </div>
        </div>
        */
        /*<div className="flex w-full h-full justify-center items-center flex-col gap-4">
            <h1>This is our home page for now!</h1>
        </div>*/
    );
}
