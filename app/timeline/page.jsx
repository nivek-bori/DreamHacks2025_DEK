"use client"

import React, { useState, useEffect } from "react";
import Branch from "../../components/timeline/Branch";
import { getServerUser } from "@/lib/database/server_db";

export default function Timeline() {
	const [branches, setBranches] = useState([0, 1, 9]);

	useEffect(() => {
		const db_stuff = getServerUser().events;

		if (db_stuff) {
			setBranches(db_stuff);
		}

		console.log("Timeline branches", branches);
	})

    return (
		<div>
			Does this render?
			{/* Now build the whole timeline; this is where the array of screenings is loaded*/
                branches.map(index => {
					/* Get the specific screening from the db using the indexes provided */
					<Branch name="name" description="description" side={(index%2==0)?("right"):("left")} />
				})
            }
		</div>
	) 
}