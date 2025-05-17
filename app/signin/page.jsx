"use client"

import React, { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Signin() {
	const { signIn } = useAuth();

	useEffect(() => {
		const signInAttempt = signIn("kevinboriboonsomsin@gmail.com", "fourty4thirty3");
		console.log(signInAttempt);
	});

	return (
		<div>
			Temp signin so that we can always access things we want
		</div>		
	)
}