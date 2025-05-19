"use client"

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Signin() {
	const supabase = createClientComponentClient({
		cookieOptions: {
			secure: process.env.production === true,
			httpOnly: true,
			sameSite: 'strict'
		  }
	});
	const router = useRouter();

	const [formData, setFormData] = useState({username: "", password: ""});

	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

	const signIn = async (e) => {
		const email = "kevinboriboonsomsin@gmail.com"; // e.email
		const password = "fourty4thirty3" // e.password

		console.log("SIGN IN INIT");

		const user = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		console.log(user);
	}

	const resetPassword = (e) => {
		router.push("/reset-password");
	}
	
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			
			
			<div className="w-full max-w-md p-8 bg-[#008044] rounded shadow-lg">
				<form onSubmit={signIn} className="space-y-4">
					
					{/*<input 
						type="text" 
						name="lastName" 
						placeholder="Last Name" 
						value={formData.lastName} 
						onChange={handleChange} required />
					*/}
					<input
						type="text"
						name="username"
						value={formData.username}
						placeholder="Username: "
						className="w-full px-4 py-2 border border-gray-300 rounded"
						onChange={handleChange} required 
					/>

					<input
						type="password"
						name="password"
						value={formData.password}
						placeholder="Password: "
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
						onChange={handleChange} required 

					/>
					<div>
						<button type="submit" className="px-4 py-2 text-black rounded bg-c_green">
							Sign In	
						</button>
					</div>
					<div>
						<button 
							className="text-blue-800 bg-c_green" 
							onClick={resetPassword}
						>
							Forgot your password?
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}