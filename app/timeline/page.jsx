import React from "react";
import Branch from "../../components/timeline/Branch";


export default function Timeline() {
	const screenings = Array.from({length: 1}, (_, i) => (i + 1));// this is going to be the array of screenings

    return (
		<div>
			{/* Now build the whole timeline; this is where the array of screenings is loaded*/
                screenings.map(index => {
					/* Get the specific screening from the db using the indexes provided */
					<Branch name="name" description="description" side={(index%2==0)?("right"):("left")} />
				})
            }
		</div>
	) 
}