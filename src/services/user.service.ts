import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserService = async (userData: { name: string; email: string }) => {
    const user = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email
        }
    });
    return user;
};
