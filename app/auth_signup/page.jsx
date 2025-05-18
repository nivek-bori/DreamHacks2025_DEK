"use client"

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createUser } from "@/lib/database/server_db";

export default function SignUp() {
	const supabase = createClientComponentClient();

	const [signUpStatus, setSignUpStatus] = useState(null);

	const signUpUser = async (e) => {
		console.log("Function called");

		const email = "kevinboriboonsomsin@gmail.com";
		const pass = "fourty4thirty3";
		const name = "nivek";
		const is_male = true;
		const b_month = 1;
		const b_year = 1;

		try {
			// const { data: authData, error: authError } = await supabase.auth.signUp({
			// 	email: email, // formData.email
			// 	password: pass, // formData.password
			// 	options: {
			// 		emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
			// 	}
			// });
	
			// if (authError || !authData?.user) {
			// 	console.log("Sign up auth error");
			// 	setSignUpStatus(1);
			// 	return;
			// } else {
			// 	console.log("Sign up auth successful: ", authData.user.id);
			// }

			const authData = { user: { id: "f79b90e2-e341-4f54-bf46-5d637f5c20a3" }};
	
			console.log("Sign up user id", authData.user.id);
			const { data: dbData, status: dbStatus} = await createUser({
				auth_id: authData.user.id,
				name: name,
				email: email,
				is_male: is_male,
				b_month: b_month,
				b_year: b_year,
			});
	
			console.log("Sign up database output", dbData, dbStatus)
			if (dbStatus > 0) {
				console.log("Sign up database error");
			}
			setSignUpStatus(dbStatus);
		} catch (e) {
			console.log("Sign up error", e.code, e.message);
			setSignUpStatus(1);
		}
	}

	return (
		<div>
			{(signUpStatus === 0) && (
				<div>Sign up was successful!</div>
			)}

			{(signUpStatus > 0) && (
				<div>There was an error with signing up</div>
			)}

			<button onClick={signUpUser}>
				Sign up
			</button>
		</div>
	);

}