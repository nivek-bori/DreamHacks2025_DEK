import React from "react";

export default function Branch(event) {
	
	return (
		<div>
			<h1>{event.title} on {event.month}, {event.year}</h1>
            <p>{event.description}</p>
            <Link to="/explaination-ai">Explain this to me</Link>
		</div>
	);
}