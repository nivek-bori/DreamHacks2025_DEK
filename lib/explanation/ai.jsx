/* 
	Takes user prompt + other info and returns AI response
	This is where the ai api is called

	All info given:
		screening ai is explaining
		user prompot
*/
"use server";

import React from "react";

export async function AIReponse(userMessage) {
    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
            }),
        });

        if (!res.ok) {
            const error = await res.text();
            return new Error(`OpenAI error: ${error}`);
        }

        const data = await res.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error(error);
        return "Sorry, something went wrong.";
    }
}
