import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
    const propulsoes = await prisma.propulsao.createMany({
        data: [
        {
            Id_propulsao: 1,
            Descricao: "COM PROPULSÃO"
        },
        {
            Id_propulsao: 2,
            Descricao: "SEM PROPULSÃO"
        },
        {
            Id_propulsao: 3,
            Descricao: "VELA"
        }
    ]
    })

    console.log({propulsoes});
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
