"use client"

import React, { useState, useEffect } from "react";
import Branch from "../../components/timeline/Branch";
import { getServerUser } from "@/lib/database/server_db";

export default function Timeline() {
	const [events, setEvents] = useState(null);

	useEffect(() => {
		const userEventIds = getServerUser().events;
		console.log("TL events", db_s)

		const userEvents = processEventIds(userEventIds);

		setEvents(userEvents);

		console.log("Timeline branches", branches);
	})

    return (
		<div>
			{(!events) && (
				<div>
					There was an issue loading your timeline
				</div>
			)}

			{(events) && (
				events.map(event => {
					/* Get the specific screening from the db using the indexes provided */
					<Branch event={event} />
				})
			)}
		</div>
	) 
}