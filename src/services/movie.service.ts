import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const createMovie = async (movieData: { 
    title: string; 
    releaseDate: Date; 
    categoryIds: number[] 
}) => {
    // Crear la pelicula en bruto
    const movie = await prisma.movie.create({
        data: {
            title: movieData.title,
            releaseDate: movieData.releaseDate
        }
    });

    // Crear relaciones con categorias en tabla intermedia
    const categoryLinks = movieData.categoryIds.map(categoryId => ({
        movieId: movie.id,
        categoryId
    }));

    await prisma.movieCategory.createMany({
        data: categoryLinks
    });

    // Retornar peli creada con la categoria
    return await prisma.movie.findUnique({
        where: { id: movie.id },
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        }
    });
};

export const getMovieByTitle = async (title: string) => {
    const movies = await prisma.movie.findMany({
        where: {
            title: {
                contains: title,
                mode: 'insensitive'
            }
        },
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        }
    });
    return movies;
}

export const getNewMovies = async () => {
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

    const movies = await prisma.movie.findMany({
        where: {
            releaseDate: {
                gte: threeWeeksAgo
            }
        },
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        },
        orderBy: {
            releaseDate: 'desc'
        }
    });
    return movies;
}

export const markMovieAsWatched = async (userId: number, movieId: number) => {
    // Encontrar pelicula
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movie) {
        throw new Error('Movie not found');
    }

    // Encontrar usuario
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error('User not found');
    }

    // Verificar si ya existe el registro
    const existingView = await prisma.viewedMovie.findFirst({
        where: {
            userId,
            movieId
        }
    });

    if (existingView) {
        throw new Error('Movie already marked as watched by this user');
    }

    // Crear el registro de movie vista
    const viewedMovie = await prisma.viewedMovie.create({
        data: {
            userId,
            movieId
        },
        include: {
            movie: {
                include: {
                    categories: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        }
    });

    return viewedMovie;
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