"use server"

import { data } from "@/database.json";

export async function processEventIds(id) {
    /* 
		For each event id, search for the event id in the json and create a list of [event name, event short description, time cycle]
		Then create a new list of [event name, event short description, time] (for each event, just repeat it every time cycle)

		*This can be improved, just discuss your design changes with the team
	*/
    const condition = data.find((item) => item.id === id);

    return (
        <div>
            {condition ? (
                <>
                    <h2>{condition.condition}</h2>
                    <p>Type: {condition.type}</p>
                    <p>Gender: {condition.gender}</p>
                    <p>
                        Age Range: {condition.age_min} - {condition.age_max ?? "No upper limit"}
                    </p>
                </>
            ) : (
                <p>No condition found for ID {id}</p>
            )}
        </div>
    );
}