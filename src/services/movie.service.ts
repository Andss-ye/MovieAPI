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