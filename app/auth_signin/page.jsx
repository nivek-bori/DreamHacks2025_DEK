"use client"

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signin() {
	const supabase = createClientComponentClient({
		cookieOptions: {
			secure: process.env.production === true,
			httpOnly: true,
			sameSite: 'strict'
		  }
	});
	const router = useRouter();
	
	const [formData, setFormData] = useState({email: "", password: ""});
	const [status, setStatus] = useState(null);

	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

	const signIn = async (e) => {
		e.preventDefault();
		
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: formData.email,
				password: formData.password,
			});
			
			if (error) {
				setStatus(1);
				console.error("Error signing in:", error.message);
			} else {
				setStatus(0);
				console.log("Signed in successfully");
				router.push("/timeline");
			}
		} catch (error) {
			setStatus(1);
			console.error("Unexpected error during sign in:", error);
		}
	}
	
	return (
		<div className="flex items-center justify-center w-full h-full min-h-screen bg-[#f9f9f9]">
			<div className="p-[2.8rem] rounded-[2rem] w-[35rem] bg-[#eeecda] shadow-lg">
				{status && status > 0 && (
					<div className="bg-[#f34f4f]/10 rounded-[0.4rem] py-[0.3rem]">
						<p className="text-center font-[700] text-[#f33f3f] opacity-100">There was an issue signing in, please try again</p>
					</div>
				)}
				
				<h1 className="text-[3rem] font-bold text-[#98479a] mt-2 mb-4 text-left">
					SIGN IN
				</h1>
				<form onSubmit={signIn} className="space-y-6">
					<div className="space-y-2">
						<label htmlFor="email" className="block ml-1 text-[1.1rem] font-semibold text-[#98479a]">email</label>
						<input
							id="email"
							type="email"
							name="email"
							value={formData.email}
							placeholder="Enter your email"
							className="bg-white w-full px-2 py-3 border border-gray-300 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-[#98479a] focus:border-transparent"
							onChange={handleChange}
							required 
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="password" className="block text-[#98479a] text-[1.1rem] ml-1 font-semibold">password</label>
						<input
							id="password"
							type="password"
							name="password"
							value={formData.password}
							placeholder="Enter your password"
							className="bg-white w-full px-4 py-3 border border-gray-300 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-[#98479a] focus:border-transparent" 
							onChange={handleChange}
							required 
						/>
					</div>

					<div className="pt-6 m-5">
						<button 
							type="submit" 
							className="w-full py-4 text-white text-[1.5rem] font-semibold rounded-[2rem] bg-[#008044] hover:bg-[#016335] transition-colors duration-300"
						>
							Sign In	
						</button>
					</div>

					<div className="text-center ">
						<p className="text-base text-gray-700">
							Don't have an account? <Link href="/auth_signup" className="text-[#98479a] font-medium hover:underline">Sign Up</Link>
						</p>
						<p className="text-base text-gray-700">
							Forgot your password? <Link href="/reset-password" className="text-[#98479a] font-medium hover:underline">Reset Password</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}