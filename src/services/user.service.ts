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

export const getUsersWithWatchedMovies = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            viewed: {
                select: {
                    id: true,
                    viewedAt: true,
                    movie: {
                        select: {
                            id: true,
                            title: true,
                            releaseDate: true,
                            categories: {
                                select: {
                                    category: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return users;
};