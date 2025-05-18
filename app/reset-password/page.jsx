"use client"

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/AuthProvider";

// Danny btw: when u have useState the component has to be client side thanks
export default function PasswordReset() {
	const [newPassword, setNewPassword] = useState("");
	const router = useRouter();
	const { resetPassword } = useAuth();

	const handleChange = (e) => {
		setNewPassword(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newPassword !== "" && newPassword !== null) {
			resetPassword(newPassword);
			router.push("/dev_signin")
		}
	}

	return (
		<div>
			<form action="">
				<div>
					<input type="text" value={newPassword} onChange={handleChange}/>
				</div>
				
				<div>
					<button onClick={handleSubmit}>Reset Password</button>
				</div>
			</form>

		</div>
	)
}