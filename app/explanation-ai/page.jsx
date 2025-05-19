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
        padding: "0.5rem",
        fontFamily: "sans-serif",
        padding: "1rem"
    },
    chatBubble: {
        maxWidth: '60%',
        padding: '0.75rem 1rem',
        borderRadius: '15px',
        wordWrap: 'break-word'
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#d1e7dd',
        color: '#0f5132',
        borderBottomRightRadius: 0
    },
    assistantMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e2e3e5',
        color: '#41464b',
        borderBottomLeftRadius: 0
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
    textBox: {
        alignSelf: "flex-center",
        textAlign: ""
    }
};

export default function AIPage() {
	const [messages, setMessages] = useState([]);
	const [messageId, setMessageId] = useState(0);

    const [userMessage, setUserMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

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
                <div style={{fontSize:"2rem", margin:"5px"}}>
                    Ask us anything!
                </div>
                <div>
                    <input style={{width: "300px", padding: "5px"}} type="text" value={userMessage} placeholder="i.e. What is the meaning of life?" onChange={(e) => setUserMessage(e.target.value)} required />
                </div>
                <button type="button" disabled={loading} onClick={handleSubmit} style={{
                    margin:"5px",
                    backgroundColor: "white",
                    color:"black",
                    fontWeight:"bold",
                    boxShadow:"0 4px 6px rgba(0,0,0,0.1)",
                    cursor:"pointer",
                    transition:"all 0.2s ease-in-out",

                    }}>
                    {loading ? "Loading..." : "Ask"}
                </button>
            </form>

            <div style={styles.chatContainer}>
				{/* The chatbot system */}
				{messages.map((message, index) => (
					<div key={index} style={styles.chatBubble, (message.role === 0) ? styles.userMessage : styles.aiResponse}>
                            <strong>{(message.role === 0) ? "You: " : "Assistant: "}</strong> {message.message}
                    </div>
				))}
            </div>
        </div>
    );
}
