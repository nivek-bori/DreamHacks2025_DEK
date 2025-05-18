"use client";

import React from "react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import AIResponse from "@/lib/explanation/ai";

import { AIReponse } from "@/lib/explanation/ai";

const styles = {
    chatContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        fontFamily: "sans-serif",
    },
    message: {
        maxWidth: "60%",
        padding: "10px 15px",
        borderRadius: "12px",
        margin: "5px 0",
        wordWrap: "break-word",
    },
    user: {
        alignSelf: "flex-end",
        backgroundColor: "#dcf8c6",
        textAlign: "right",
    },
    ai: {
        alignSelf: "flex-start",
        backgroundColor: "#f1f0f0",
        textAlign: "left",
    },
};

export default function AIPage() {
	const [messages, setMessages] = useState([]);
	const [messageId, setMessageId] = useState(0);

    const [userMessage, setUserMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
		
		// Add user message to chat
		const message = { role: 0, messageId: messageId, message: userMessage};
		setMessages(prevMessages => [...prevMessages, message]);
        
		setUserMessage("");
		setMessageId(prevId => prevId + 1);
		setLoading(true);

		// Add ai message to chat
		const aiResponse = { role: 1, message: await AIReponse(userMessage) };
		setMessages(prevMessages => [...prevMessages, aiResponse]);
		
		setMessageId(prevId => prevId + 1);
		setLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Ask us anything!
                    <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} required />
                </label>
                <button type="button" disabled={loading} onClick={handleSubmit}>
                    {loading ? "Loading..." : "Ask"}
                </button>
            </form>

            <div>
				{/* The chatbot system */}
				{messages.map((message) => (
					<p key={message.message}>
						<strong>{(message.role === 0) ? "You: " : "Assistant: "}</strong> {message.message}
					</p>
				))}
            </div>
        </div>
    );
}
