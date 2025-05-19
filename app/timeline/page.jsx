"use client"

import React, { useState, useEffect } from "react";
import Branch from "../../components/timeline/Branch";
import { getServerUser } from "@/lib/database/server_db";
import { processEventIds } from "@/lib/timeline/eventProcessor";

export default function Timeline() {
	//const [events, setEvents] = useState([]);
	const [userEventIds, setUserEventIds] = useState([]); 

	useEffect(() => {
		const userEvents = getServerUser().userEventIds;

		if (userEvents) {
			setUserEventIds(userEvents);
		} else {
			console.log("There are no events")
		}
		
		//const userEvents = processEventIds(userEventIds);

		//console.log("Timeline branches", events);
	}, []);

    return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
			{userEventIds.map(id => (
				<div key={id}>
					processEventIds(id)
				</div>
			))}
		</div>
	) 
}

/*
{(!events) && (
				<div>
					There was an issue loading your timeline
				</div>
			)}

			{(events.map(event => {
				<div>
					{events};
				</div>

				//events.map(event => {
					 Get the specific screening from the db using the indexes provided 
				//	<Branch event={event} />
				//})
			}))}
*/