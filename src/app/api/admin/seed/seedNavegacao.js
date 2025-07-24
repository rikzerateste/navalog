import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
    const navegacoes = await prisma.navegacao.createMany({
        data: [
        {
            Codigo_da_area_de_navegacao: "APM",
            Descricao: "APOIO MARITIMO"
        },
        {
            Codigo_da_area_de_navegacao: "APP",
            Descricao: "APOIO PONTUÁRIO"
        },
        {
            Codigo_da_area_de_navegacao: "CAB",
            Descricao: "CABOTAGEM"
        },
        {
            Codigo_da_area_de_navegacao: "INT",
            Descricao: "INTERIOR"
        },
        {
            Codigo_da_area_de_navegacao:"LON",
            Descricao: "LONGO CURSO"
        },
        {
            Codigo_da_area_de_navegacao: "MAR",
            Descricao: "MAR ABERTO"
        }
    ]
    })

    console.log({navegacoes});
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
