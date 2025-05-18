import React from "react";

export default function Branch(title, description, other_fields, side) {

    //to do this maybe we make the other_fields parameter encompass this also?
	const month = [] // this is the users birth month
    const year = [] // this is the users birth year

    const screeningList = Array.from({length: 1}, (_, i) => i); // Get from db later
	
	return (
		<div>
			<h1>{title} on {month}, {year}</h1>
            <p>{description}</p>
            <Link to="/explaination-ai">Explain this to me</Link>
		</div>
	);
}