import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const funcoes = await prisma.funcao.createMany({
        data: [
            { Controle: 4, Funcao: 'MNC/COM', Descricao: '' },
            { Controle: 8, Funcao: 'MAF/MN', Descricao: 'MARINHEIRO FLUVIAL AUXILIAR DE CONVÉS' },
            { Controle: 9, Funcao: 'MRC/MN', Descricao: 'MARINHEIRO REGIONAL DE CONVÉS' },
            { Controle: 10, Funcao: 'MNC', Descricao: 'MN' },
            { Controle: 11, Funcao: 'CTF/CHEMAQ', Descricao: 'CONDUTOR DE MÁQUINAS' },
            { Controle: 12, Funcao: 'MAM/CHEMAQ', Descricao: 'MARINHEIRO AUXILIAR DE MÁQUINAS' },
            { Controle: 15, Funcao: 'CZA/CZA', Descricao: 'COZINHEIRO' },
            { Controle: 18, Funcao: 'MFL/COM', Descricao: 'MESTRE FLUVIAL' },
            { Controle: 19, Funcao: 'MFL/MFL', Descricao: 'MESTRE FLUVIAL' },
            { Controle: 20, Funcao: 'CFL/MN', Descricao: 'CAPITÃO FLUVIAL' },
            { Controle: 21, Funcao: 'MAM/MN', Descricao: 'MARINHEIRO AUXILIAR DE MÁQUINAS' },
            { Controle: 23, Funcao: 'CZA', Descricao: 'COZINHEIRO' },
            { Controle: 24, Funcao: 'MFM/CHEMAQ', Descricao: 'MARINHEIRO FLUVIAL DE MÁQUINAS' },
            { Controle: 25, Funcao: 'MMA/CHEMAQ', Descricao: 'MARINHEIRO FLUVIAL AUXILIAR DE MÁQUINAS' },
            { Controle: 26, Funcao: 'MMA/MN', Descricao: 'MARINHEIRO FLUVIAL AUXILIAR DE MÁQUINAS' },
            { Controle: 27, Funcao: 'MNM/CHEMAQ', Descricao: 'MARINHEIRO DE MÁQUINAS' },
            { Controle: 28, Funcao: 'MFC/MN', Descricao: 'MARINHEIRO FLUVIAL DE CONVÉS' },
            { Controle: 29, Funcao: 'MFC/COM', Descricao: 'MARINHEIRO FLUVIAL DE CONVÉS' },
            { Controle: 30, Funcao: 'MRM/CHEMAQ', Descricao: 'MARINHEIRO REGIONAL DE MÁQUINAS' },
            { Controle: 32, Funcao: 'MAF/MAF', Descricao: 'MARINHEIRO FLUVIAL AUXILIAR' },
            { Controle: 33, Funcao: 'MAC/MN', Descricao: 'MARINHEIRO AUXILIAR DE CONVÉS' },
            { Controle: 34, Funcao: 'CDM/CHEMAQ', Descricao: 'CONDUTOR DE MÁQUINAS' },
            { Controle: 35, Funcao: 'PLF/PLF', Descricao: 'PILOTO FLUVIAL' },
            { Controle: 39, Funcao: 'MAC/COM', Descricao: 'MARINHEIRO AUXILIAR DE CONVÉS' },
            { Controle: 40, Funcao: 'MRC/COM', Descricao: 'MARINHEIRO REGIONAL DE CONVES' },
            { Controle: 42, Funcao: 'MFM/MN', Descricao: 'MARINHEIRO FLUVIAL DE MAQUINAS' },
            { Controle: 47, Funcao: 'MRM/MN', Descricao: 'MARINHEIRO REGIONAL DE MÁQUINAS' },
            { Controle: 48, Funcao: 'PLF/IMTº', Descricao: 'PILOTO FLUVIAL' },
            { Controle: 49, Funcao: 'CZF/CZF', Descricao: 'COZINHEIRO' },
            { Controle: 50, Funcao: 'MCB/COM', Descricao: 'MESTRE DE CABOTAGEM' },
            { Controle: 52, Funcao: 'CFL/IMTº', Descricao: 'CAPITAO FLUVIAL' },
            { Controle: 53, Funcao: 'MCB/IMTº', Descricao: 'MESTRE DE CABOTAGEM' },
            { Controle: 54, Funcao: 'SUF/CHEMAQ', Descricao: 'SUPERVISOR MAQUINISTA' },
            { Controle: 67, Funcao: 'MNC/MNC', Descricao: 'MARINHEIRO DE CONVÉS' },
            { Controle: 68, Funcao: 'CTR/CTR', Descricao: 'CONTRAMESTRE' },
            { Controle: 71, Funcao: 'MFC', Descricao: 'MARINHEIRO FLUVIAL DE CONVÉS' },
            { Controle: 82, Funcao: 'MFL/EST', Descricao: 'ESTAGIÁRIO' },
            { Controle: 83, Funcao: 'CTF', Descricao: 'ESTAGIÁRIO' },
            { Controle: 96, Funcao: 'CFL/IMT', Descricao: 'CAPITÃO FLUVIAL' },
            { Controle: 97, Funcao: 'PCF/IMTº', Descricao: 'PRATICANTE DE CAPITÃO FLUVIAL' },
            { Controle: 98, Funcao: 'CTF/EST', Descricao: 'ESTAGIÁRIO' },
            { Controle: 99, Funcao: 'MNC/MN', Descricao: 'MARINHEIRO DE CONVES' },
            { Controle: 100, Funcao: 'EAM', Descricao: 'ESTÁGIARIO' },
            { Controle: 101, Funcao: '2OM', Descricao: '2º OFICIAL DE MÁQUINAS' },
            { Controle: 102, Funcao: 'MOC/COM', Descricao: 'MOÇO DE CONVÉS' },
            { Controle: 104, Funcao: 'EAC', Descricao: 'MFL' },
            { Controle: 105, Funcao: 'BALSA', Descricao: 'BAL' },
            { Controle: 107, Funcao: 'POP', Descricao: 'PESCADOR PROFISSIONAL' },
            { Controle: 110, Funcao: 'CFL', Descricao: 'CAPITÃO FLUVIAL' },
            { Controle: 111, Funcao: 'PLF/MN', Descricao: 'PILOTO FLUVIAL' }
        ],
        skipDuplicates: true, // Ignorar duplicatas para evitar erro de restrição de unicidade
    });

    console.log({ funcoes });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
