import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
    const atividades = await prisma.atividade.createMany({
        data: [
        {
            Tipo_de_atividade: "CAR",
            Descricao: "CARGA"
        },
        {
            Tipo_de_atividade:"ESP",
            Descricao: "ESPORTE E RECREIO"
        },
        {
            Tipo_de_atividade: "MAR",
            Descricao: "MAR ABERTO"
        },
        {
            Tipo_de_atividade: "OUT",
            Descricao: "OUTRA ATIVIDADE"
        },
        {
            Tipo_de_atividade: "PAS",
            Descricao: "PASSAGEIRO"
        },
        {
            Tipo_de_atividade: "PC2",
            Descricao: "PASSAGEIRO / CARGA"
        },
        {
            Tipo_de_atividade: "PEQ",
            Descricao: "PEQUENO COMÉRCIO"
        },
        {
            Tipo_de_atividade: "PSC",
            Descricao: "PESCA"
        },
        {
            Tipo_de_atividade: "REB",
            Descricao: "EMPURRADOR"
        },
        {
            Tipo_de_atividade: "VEL",
            Descricao: "VELA"
        }
    ]
    })

    console.log({atividades});
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
