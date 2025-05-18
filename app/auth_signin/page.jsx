"use client"

import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Signin() {
	const supabase = createClientComponentClient({
		cookieOptions: {
			secure: process.env.production === true,
			httpOnly: true,
			sameSite: 'strict'
		  }
	});

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
	
	return (
		<div>
			<button onClick={signIn}>
				Sign in
			</button>
		</div>
	)
}