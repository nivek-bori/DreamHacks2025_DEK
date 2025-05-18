"use server";

import prisma from "./prisma";

export async function createUser(data) {
    return prisma.user.create({
        data: data,
    });
}
