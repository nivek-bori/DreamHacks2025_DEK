"use server"

export async function processEventIds(eventIds) {
	/* 
		For each event id, search for the event id in the json and create a list of [event name, event short description, time cycle]
		Then create a new list of [event name, event short description, time] (for each event, just repeat it every time cycle)

		*This can be improved, just discuss your design changes with the team
	*/
}