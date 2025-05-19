"use server"

import fs from 'fs';
import path from 'path';

export async function getEventData() {
    try {
        const filePath = path.join(process.cwd(), "public", "database.json");
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

        return jsonData;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getEventsId(age, gender, conditions) {
    try {
        const db = await getEventData();

        let event_ids = [];

        for (const event of db) {
            if (event.age_max !== null && age > event.age_max) {
                console.log("exit a")
                continue;
            }

            if (event.gender !== null && event.gender !== gender) {
                console.log("exit b");
                continue;
            }

            if (conditions.length > 0 && event.conditions) {
                let conditionMatch = false;
                for (const condition of conditions) {
                    if (event.conditions.includes(condition)) {
                        conditionMatch = true;
                        break;
                    }
                }
                if (!conditionMatch) {
                    console.log("exit c");
                    continue;
                }
            }

            event_ids.push(event.id);
        }

        return event_ids;
    } catch (e) {
        console.error("Events getId error :", e);
        return [];
    }
}

export async function getEventsInfo(user_event_ids) {
	try {
		const db = await getEventData();

		let event_info = [];

		for (const event of db) {
			for (const user_event_id of user_event_ids) {
				if (user_event_id === event.id) {
					event_info.push(event);
				}
			}
		}

		return event;
	} catch (e) {
		console.log("Events getInfo error", e);
		return [];
	}
}

/* 
Database.json requirements:

event: {name: string, description: string, gender: boolean | null, minAge: number, maxAge: number, frequency: number, conditions: [string]};

gender === true -> isMale
gender === false -> !isMale
gender === null -> all genders

age and frequency are in months
*/