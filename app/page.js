import React from "react";

// This is a server component - no "use client" needed
export default async function Home() {
    return (
        <div className="flex w-full h-full justify-center items-center flex-col gap-4">
            <h1>This is our home page for now!</h1>
        </div>
    );
}
