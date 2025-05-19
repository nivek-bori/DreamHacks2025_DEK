"use client";

import React from "react";
import { Link } from "next/link";

export default function App() {
    return (
        <>
            <div className="main-content">
                <h1 className="text-3xl font-bold underline">
                    Welcome to CareRemind, <br />
                    your health companion!
                </h1>
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
