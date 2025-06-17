import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (userData: { name: string; email: string }) => {
    const user = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email
        }
    });
    return user;
};

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    return user;
};