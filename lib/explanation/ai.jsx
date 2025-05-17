/* 
	Takes user prompt + other info and returns AI response
	This is where the ai api is called

	All info given:
		screening ai is explaining
		user prompot
*/

import React from "react";
import axios from "axios";

export default getAIResponse = async (user_message, previous_messages) => {
    try {
        const res = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer YOUR_OPENAI_API_KEY`, // 🚨 Do NOT commit this
                },
            }
        );
        
        return { data: res.data.choices[0].message.content.trim(), error: 0};
    } catch (err) {
        console.error(err);
        return { data: null, error: 1};
    }
};