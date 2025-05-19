"use client";

import React from "react";
import { Link } from "next/link";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();

  const handleClick = (e) => {
    router.push("/auth_signup");
  }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen main-content">
                <img src="/logo.png" width={300} height={300} className="logo" alt="CareRe"  />
                <h1 className="text-3xl text-[#98479a] font-bold text-center mt-8">
                    Welcome to CareRemind! <br />
                    Your health, on time<br />
                </h1>
                <button onClick={handleClick} 
                  className="w-1/4 py-2 text-white text-[1.5rem] font-semibold rounded-[2rem] bg-[#008044] hover:bg-[#016335] transition-colors duration-300 mt-8">
                  Sign Up Now!
                </button>
            </div>
           
            {/*THIS IS AN EXAMPLE OF A BUTTON
      <div>
        <button className="px-4 py-2 font-bold text-green-700 bg-white rounded">
          {/*get function for the emailProfile
        </button>
      </div>*/}

            {/*<div> THIS IS AN EXAMPE OF IMAGE LINKING
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>*/}
        </>
    );
}
