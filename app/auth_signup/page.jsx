"use client"

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createUser } from "@/lib/database/server_db";

export default function SignUp() {
	const supabase = createClientComponentClient({
		cookieOptions: {
			secure: process.env.production === true,
			httpOnly: true,
			sameSite: 'strict'
		  }
	});

	const [status, setStatus] = useState(null);

	const signUp = async (e) => {
		if (process.env.production === true) {console.log("SIGN UP INIT");}

		const email = "kevinboriboonsomsin@gmail.com";
		const pass = "fourty4thirty3";
		const name = "nivek";
		const is_male = true;
		const b_month = 1;
		const b_year = 1;

		// TODO: Verify data - pass > len 5, email is valid, etc
		// Assign different status codes depending on which fields need to be fixed

		// Try authentication
		let authData;
		try {
			const { data: retAuthData, error: authError } = await supabase.auth.signUp({
				email: email, // formData.email
				password: pass, // formData.password
				options: {
					emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
				}
			});
			authData = retAuthData;
	
			if (authError || !authData?.user) {
				if (process.env.production === true) {console.log("SIGN UP AUTH ERROR A");}
				setStatus(1);
				return;
			}
		} catch (e) {
			if (process.env.production === true) {
				console.log("SIGN UP AUTH ERROR");
				console.log(e.message);
			}
			setStatus(1);
			return;
		}
	
		// Try db
		try {
			const user = await createUser({
				id: authData.user.id,
				name: name,
				email: email,
				is_male: is_male,
				b_month: b_month,
				b_year: b_year,
			});
			
			if (user) {
				setStatus(0);
			} else {
				if (process.env.production === true) {console.log("SIGN UP DB ERROR");}
				setStatus(1);
			}
		} catch (e) {
			if (process.env.production === true) {
				console.log("SIGN UP DB ERROR");
				console.log(e.message);
			}
			setStatus(1);
			return;
		}
	}

	return (
		<div>
			{(status === 0) && (
				<div>Sign up was successful!</div>
			)}

			{(status > 0) && (
				<div>There was an error with signing up</div>
			)}

			<button onClick={signUp}>
				Sign up
			</button>
		</div>
	);

}