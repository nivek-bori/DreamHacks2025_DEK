"use server";

import prisma from "./prisma";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function createUser(data) {
    return prisma.user.create({
        data: data,
    });
}

export async function getServerUser() {
    const supabase = createServerComponentClient({ cookies });

    return supabase.auth.getUser();
}

export async function getUser(user_id) {
    return prisma.user.findUnique({
        where: { id: user_id },
    });
}