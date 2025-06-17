import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main () {
    const categories = ['Accion', 'Animacion', 'Aventuras', 'biografico', 'Ciencia ficcion', 'Comedia', 'Documental', 'Drama', 'Fantasia', 'Terror']

    for (const name of categories) {
        await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name }
        });
    }

    console.log('Categorias listas ✅')
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());