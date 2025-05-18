"use client"

import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";
import TextBoxInput from "../../components/forms/TextBoxInput";

export default function Signin() {
	const { signIn, resetPassword } = useAuth();
	const signInAttempt = signIn("kevinboriboonsomsin@gmail.com", "fourty4thrity3");

	const [formData, setFormData] = useState({username: "", password: ""});


	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	
	const validpassword = password && signInAttempt[1]
	const validname = name && signInAttempt[0]
	const issignedin = validpassword&&validpassword
	
	const handleSignIn = async (e) => {
		const email = e.email;
		const pass = e.password;

		const status = signIn(email, pass);
	}


	return (
		<div className="flex items-center justify-center">
			<form onSubmit={signIn}>
				{/* Please make a simple sign in page*/}
				
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
	)
}