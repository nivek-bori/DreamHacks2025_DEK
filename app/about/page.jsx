"use client"

import React from "react";
import { useRouter } from "next/navigation"

export default function About() {
    const router = useRouter();
    
    const handleClick = (e) => {
        router.push("/tire");
    } 

    return (
        <>
            <div className="about text-center text-2xl font-bold text-[#98479a]">
                <h1 className="text-black">About Us:</h1>
                <p>CareRemind is a service which aims to remind its users about their upcoming appointments and screenings.</p>
                <hr className="my-6 border-[#008044] border-2 w-1/2 mx-auto" />
                <h2 className="text-black">Our Mission:</h2>
                <h3>Your health, on time.</h3>
                
                <img 
                    src="/weImage.png" 
                    width={750} 
                    height={750} 
                    alt="Team Members"
                    className="mx-auto" 
                />
            </div>
            <button onClick={handleClick} className="mx-auto mt-4 block">
                Do you dream of tires?
            </button>
        </>
    );
}