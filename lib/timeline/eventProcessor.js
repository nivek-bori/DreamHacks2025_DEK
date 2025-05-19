"use server"

import data from "@/public/database.json";

export async function processEventIds(ids) {
    /* 
		For each event id, search for the event id in the json and create a list of [event name, event short description, time cycle]
		Then create a new list of [event name, event short description, time] (for each event, just repeat it every time cycle)

		*This can be improved, just discuss your design changes with the team
	*/
    //const condition = data.find((item) => item.id === id);

    return ids.map((id) => {
        const condition = data.find((item) => item.id === id);
        if (!condition) return null;
        return condition;
    });
}