import { PrismaClient } from '@prisma/client';
import { EmblemEnums } from '../../src/entities/emblem.entitie';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.emblem.createMany({
      data: EmblemEnums,
    });
    console.log(`Badges inserted successfully.`);

    await prisma.user.create({
      data: {
        id: 1,
        email: 'alex.crispa02@gmail.com',
        username: 'Khai',
        password:
          '$2b$12$gT8WvkwTjgHIAx8KBtocuu8o.BX9bfMsrUVdsIJavMioiLVz.j9PG',
        fullname: 'Alexandre Crispim dos Santos',
      },
    });
    await prisma.userEmblem.createMany({
      data: [
        { user_id: 1, emblem_id: 1 },
        { user_id: 1, emblem_id: 23 },
        { user_id: 1, emblem_id: 6 },
        { user_id: 1, emblem_id: 12 },
        { user_id: 1, emblem_id: 30 },
        { user_id: 1, emblem_id: 18 },
      ],
    });

    console.log('Successfully executed seed');
  } catch (error) {
    console.error('Error when executing the seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
