"use client"

import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";
import TextBoxInput from "../../components/forms/TextBoxInput";

export default function Signin() {
	const { signIn } = useAuth();
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
					className="border border-gray-300 rounded px-4 py-2 w-full" 
					onChange={handleChange} required 

				/>
				<div>
					<button 
						className="bg-c_green hover:bg-click_green text-black px-4 py-2 rounded" 
						onClick={issignedin ? <p>Login Successful</p>: <p>Please Try Again</p>}
						/*onClick={() => MAKE A FUNCTION WHICH WILL UPLOAD TO USER AUTH DATABASE}*/
					>
						Sign In
					</button>
					<button className="bg-c_green">
						Forgot your password?
					</button>
				</div>
				

			</form>
		</div>
	)
}