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
	
	const handleSignIn = (e) => {
		e.preventDefault();
		if (issignedin) {
			alert("Login Successful");
		} else {
			alert("Please Try Again");
		}
	};


	return (
		<div className="flex justify-center items-center">
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
					className="border border-gray-300 rounded px-4 py-2 w-full"
					onChange={handleChange} required 
				/>

				<input
					type="password"
					name="password"
					value={formData.password}
					placeholder="Password: "
					className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
					onChange={handleChange} required 

				/>
				<div>
					<button
						type="submit"
						className="bg-c_green text-black px-4 py-2 rounded"						onClick={handleSignIn}
						/*MAKE A FUNCTION WHICH WILL UPLOAD TO USER AUTH DATABASE}*/
					>
						Sign In	
					</button>
				</div>
				<div>
					<button 
						class="bg-c_green text-blue-800" 
						onClick={resetPassword}
					>
						Forgot your password?
					</button>
				</div>
			</form>
		</div>
	)
}