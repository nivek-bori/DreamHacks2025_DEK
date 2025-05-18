"use server";

import prisma from "./prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

class Database {
    static instance;
    database;

    constructor() {
        this.database = prisma;
    }

    static db() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export async function createUser(auth_id, name, email, is_male, b_month, b_year) {
     const database = Database.db();
	 console.log("Server db debugging 1", database);
	 const data = await database.user.create({
		 where: {
			 id: auth_id,
			 email: email,
			 name: name,
			 is_male: is_male,
			 b_month: b_month,
			 b_year: b_year,
		 }
	 });

	 if (!data) {
		 console.log("DB create user failed", data);
		 return { status: 1, data: data };
	 }

	 return { status: 0, data: data };
    try {
    } catch (e) {
        console.log("DB server debugging", e.code, e.message);
        return { status: 1, data: e };
    }
}

export async function updateUser(user_id, events) {
     const database = Database.db();
    try {
        const getUserStatus = await getUser(user_id);

        if (getUserStatus !== 0) {
            console.log("DB update user failed", getUserStatus);
            return getUserStatus;
        }

        const data = await database.user.update({
            where: { id: user_id },
            data: { events: events },
        });

        return { status: 0, data: data };
    } catch (e) {
        console.log("DB update user error", e);
        return { status: 1, data: e };
    }
}

export async function getUser(user_id) {
     const database = Database.db();
    try {
        const data = await database.user.findUnique({
            where: { id: user_id },
        });

        if (!data) {
            return { status: 1, data: "User not found" };
        }

        return { status: 0, data: data };
    } catch (e) {
        return { status: 1, data: e };
    }
}

export async function getServerUser() {
     const database = Database.db();
    const user_cookies = cookies();
    const supabase = createServerComponentClient({ user_cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
        return null;
    }

    return await getUser(session.user.id);
}

export async function isAuthenticated() {
    const user_cookies = cookies();
    const supabase = createServerComponentClient({ user_cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return !!session;
}
