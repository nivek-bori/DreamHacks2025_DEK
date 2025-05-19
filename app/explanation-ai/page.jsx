"use client";

import React from "react";
import clsx from "clsx";
import { useEffect, useState } from "react";

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
        backgroundColor: '#eeecda',
        color: '#0f5132',
        borderBottomRightRadius: 0
    },
    assistantMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#eeecda',
        color: '#41464b',
        borderBottomLeftRadius: 0
    },
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
            <div
                style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "20vh", // or adjust based on layout
                }}>
                <form onSubmit={handleSubmit}>
                    <div style={{
                        fontSize:"2rem",
                        margin:"5px",
                        fontFamily:"Helvetica",
                        fontWeight:"bold",
                        color:"#98479a",
                        }}>
                        ASK US ANYTHING
                    </div>
                    <div>
                        <input style={{
                            width: "300px", 
                            padding: "5px", 
                            margin:"5px",
                            backgroundColor:"#eeecda",
                            border:"none",
                            borderRadius:"12px",
                            }} 
                            type="text" value={userMessage} placeholder="i.e. Explain this screening." onChange={(e) => setUserMessage(e.target.value)} required />
                    </div>
                    <button type="button" disabled={loading} onClick={handleSubmit} style={{
                        margin:"5px",
                        padding:"0.4rem",
                        border:"none",
                        borderRadius:"12px",
                        backgroundColor: "#008044",
                        color:"white",
                        fontWeight:"bold",
                        boxShadow:"0 4px 6px rgba(0,0,0,0.1)",
                        cursor:"pointer",
                        transition:"all 0.2s ease-in-out",
                        width: "300px",
                        }}>
                        {loading ? "Loading..." : "Ask"}
                    </button>
                </form>
            </div>

            <div style={styles.chatContainer}>
				{/* The chatbot system */}
				{messages.map((message, index) => (
					 <div key={index} style={{...styles.chatBubble, ...(message.role === 0) ? styles.userMessage : styles.assistantMessage}}>
                             <strong>{(message.role === 0) ? "You: " : "Assistant: "}</strong> {message.message}
                     </div>
				))}
            </div>
        </div>
    );
}