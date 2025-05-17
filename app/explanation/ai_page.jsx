import React from "react";
import clsx from "clsx";
import { getAIResponse } from "../lib/explanation/ai.jsx"

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  message: {
    maxWidth: '60%',
    padding: '10px 15px',
    borderRadius: '12px',
    margin: '5px 0',
    wordWrap: 'break-word',
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    textAlign: 'right',
  },
  ai: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f0f0',
    textAlign: 'left',
  },
};

export default function AI_Page() {
    const [user_message, setUserMessage] = useState("");
    const [responses, setResponses] = useState<Array>([]);
    
    const handleChange = (formData) => {
        setMessage(formData.target.value);
    }

    const handleSubmit = async (formData) => {
        formData.preventDefault();

        setResponses([...responses, message]);

        const ai_response = await getAIResponse(message);

        setResponses(responses => {
            setResponses([...responses, ai_response]);
        })
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Ask us anything!
                        <input type="text" value={inputValue} onChange={handleChange} />
                    </label>
                    <button type="submit">Ask</button>
                </form>
            </div>
            <div style={styles.chatContainer}>
                {/* You want to format it to look good right?*/}
                {/* Ask AI about the import clsx for custom css given if conditions */}
                {responses.map((msg, index) => (
                    <div 
                    key={index}
                    className={clsx('message', index % 2 === 0 ? 'user' : 'ai')}
                    style={{
                        ...styles.message,
                        ...(index % 2 === 0 ? styles.user : styles.ai),
                    }}
                    >
                        {msg}
                    </div>
                ))}
            </div>
        </div>
    )

}