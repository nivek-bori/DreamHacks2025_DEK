"use client"

import React, { useState, useEffect } from "react";
import Branch from "../../components/timeline/Branch";
import { getServerUser } from "@/lib/database/server_db";
import { processEventIds } from "@/lib/timeline/eventProcessor";


const styles = {
  timelineContainer: {
    position: "relative",
    margin: "2rem auto",
    width: "90%",
    maxWidth: "1000px",
    padding: "2rem 0",
  },
  timelineLine: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: "4px",
    backgroundColor: "#98479a",
    transform: "translateX(-50%)",
    zIndex: 0,
  },
  timelineEntry: {
    position: "relative",
    width: "45%",
    padding: "1rem",
    backgroundColor: "#eeecda",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    margin: "2rem 0",
    zIndex: 1,
  },
  timelineEntryEven: {
    left: 0,
    textAlign: "right",
  },
  timelineEntryOdd: {
    left: "55%",
    textAlign: "left",
  },
  connector: {
    position: "absolute",
    top: "1.5rem",
    width: "50px",
    height: "2px",
    backgroundColor: "#98479a",
    zIndex: 1,
  },
  connectorLeft: {
    right: "-50px",
  },
  connectorRight: {
    left: "-50px",
  },
  timelineDot: {
    position: "absolute",
    top: "1.2rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "16px",
    height: "16px",
    backgroundColor: "#fff",
    border: "4px solid #333",
    borderRadius: "50%",
    zIndex: 2,
  },
  card: {
    position: "relative",
    zIndex: 2,
  }
};

export default function Timeline() {
	const [events, setEvents] = useState([]);
	//const [userEventIds, setUserEventIds] = useState([]); 

	//useEffect(() => {
		// const userEvents = getServerUser().userEventIds;
	//	const userEvents = [1, 3, 9];

	//	if (userEvents) {
	//		setUserEventIds(userEvents);
	//	} else {
	//		console.log("There are no events")
	//	}
		
		//const userEvents = processEventIds(userEventIds);

		//console.log("Timeline branches", events);
	//}, []);

	useEffect(() => {
		const fetchEvents = async () => {
			const user = await getServerUser();
			console.log(user);
			const ids = [1, 3, 9];
			
			try {
				const eventHtmls = await processEventIds(ids); // Not valid if processEventIds is server-side
				const filteredEvents = eventHtmls.filter(Boolean).sort((a,b)=>a.age_min - b.age_min);
				console.log("Fetched events:", eventHtmls);
				setEvents(filteredEvents); // Needs to be JSON-compatible, not React components
			} catch (error) {
				console.error("Failed to load events:", error);
			}
		};

		fetchEvents();
	}, []);

    return (
		<div style={styles.timelineContainer}>
			<div style={styles.timelineLine}></div>
			{events.length === 0 ? (
			<p>Loading or no events found...</p>
			) : (
			events.map((event, index) => {
				const isEven = index % 2 === 0;
				const entryStyle = {
				...styles.timelineEntry,
				...(isEven ? styles.timelineEntryEven : styles.timelineEntryOdd),
				};
				const connectorStyle = {
				...styles.connector,
				...(isEven ? styles.connectorLeft : styles.connectorRight),
				};

				return (
				<div key={event.id} style={entryStyle} className="font-bold">
					<div style={connectorStyle}></div>
					<div style={styles.card}>
					<h2>{event.name}</h2>
					<p>Type: {event.type}</p>
					<p>Gender: {(event.gender === null)?("All"):((event.gender)?("Male"):("Female"))}</p>
					<p>Age Start: {event.age_min / 12}</p>
					<p>Description: {event.description}</p>
					</div>
				</div>
				);
			})
			)}
		</div>
	);
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