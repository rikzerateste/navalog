import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { resourceUsage } from "process";

const prisma = new PrismaClient();

// Ordem desejada com os novos nomes
const ordemTripulantes = [
  "Comandante",
  "Imediato",
  "Oficial da Náutica",
  "Rádio Operador",
  "Contramestre",
  "Chefe de Máquinas",
  "Subchefe de Máquinas",
  "Oficial de Máquinas",
  "Condutor",
  "Eletricista",
  "Enfermeiro/Auxíliar de Saúde",
  "Cozinheiro",
  "Taifeiro",
  "Marinheiro de Máquinas",
  "Marinheiro de Convés",
  "Moço de Convés",
  "Moço de Máquinas"
];

const traduzirFuncao = (funcao: string) => {
  switch(funcao){
    case 'Comandante':
      return "Master";
    case 'Imediato':
      return "Chief Mate";
    case 'Oficial da Náutica':
      return "Deck Officer";
    case 'Rádio Operador':
      return "Radio Operator";
    case 'Contramestre':
      return "Boatwain";
    case 'Chefe de Máquinas':
      return "Chief Engineer Officer";
    case 'Subchefe de Máquinas':
      return "Second Engineer Officer";
    case 'Oficial de Máquinas':
      return "Engineer Officer";
    case 'Condutor':
      return "Petty Officer Engineer";
    case 'Eletricista':
      return "Electrician";
    case 'Enfermeiro/Auxíliar de Saúde':
      return "Male Nurse";
    case 'Cozinheiro':
      return "Cook";
    case 'Taifeiro':
      return "Steward";
    case 'Marinheiro de Máquinas':
      return "Oiler";
    case 'Marinheiro de Convés':
      return "Able Seaman";
    case 'Moço de Convés':
      return "Ordinary Seaman";
    case 'Moço de Máquinas':
      return 'Wiper';
    default:
      return '';
  }
}

// Função para preencher e ordenar os tripulantes
const preencherEOrdenarTripulantes = (tripulantes: any) => {
  // Cria um array com objetos vazios para cada tipo de tripulante
  const tripulantesOrdenados = ordemTripulantes.map(tipo => ({
    Tipo_de_Tripulante: tipo,
    Traducao_Tipo_de_Tripulante: traduzirFuncao(tipo),
    Categoria: "",
    Nivel: "",
    Quantidade: 0,
    CTSId: 0,
    id: 0
  }));

  // Preenche os dados disponíveis nos objetos correspondentes
  tripulantes.forEach((tripulante: any) => {
    const index = ordemTripulantes.indexOf(tripulante.Tipo_de_Tripulante);
    if (index !== -1) {
      tripulante["Traducao_Tipo_de_Tripulante"] = traduzirFuncao(tripulantesOrdenados[index].Tipo_de_Tripulante)
      tripulantesOrdenados[index] = tripulante;
      // tripulantesOrdenados[index].Traducao_Tipo_de_Tripulante = traduzirFuncao(tripulantesOrdenados[index].Tipo_de_Tripulante)
    }
  });

  return tripulantesOrdenados;
};

const nomearMes = (numeroDoMes: string) => {
  switch(numeroDoMes){
    case '01':
      return "Janeiro";
    case '02':
      return "Fevereiro";
    case '03':
      return "Março";
    case '04':
      return "Abril";
    case '05':
      return "Maio";
    case '06':
      return "Junho";
    case '07':
      return "Julho";
    case '08':
      return "Agosto";
    case '09':
      return "Setembro";
    case '10':
      return "Outubro";
    case '11':
      return "Novembro";
    case '12':
      return "Dezembro";
    default:
      return "";
  }
}

const separarData = (data: string | null) => {
  if(data!=null){
    const partes = data.split('/');
    return {
      Dia: partes[0] || "",
      Mes: nomearMes(partes[1]) || "",
      Ano: partes[2] || ""
    };
  }else{
    return { Dia: "", Mes: "", Ano: "" };
  }
};

const calcularQuantidadeTotal = (tripulantes: any[]) => {
  return tripulantes.reduce((total, tripulante) => {
    return total + tripulante.Quantidade;
  }, 0);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { controle } = req.query;

      if (!controle || typeof controle !== "string") {
        return res.status(400).json({ error: "ID do pedido é necessário" });
      }

      const cts = await prisma.cTS.findUnique({
        where: { CTS_controle: parseInt(controle, 10) },
        include: {
            tripulanteCTS: true,
            embarcacao: true
        }
      });

      if (!cts) {
        return res.status(404).json({ error: "CTS não encontrado" });
      }

      // Preencher e ordenar os tripulantes antes de retornar
      const tripulantesOrdenados = preencherEOrdenarTripulantes(cts.tripulanteCTS);
      // Separar a data para formatar no relatorio
      const dataSeparada = separarData(cts.Data_emissao);
      // Calcula quantidade total de 
      const qtdTotal = calcularQuantidadeTotal(cts.tripulanteCTS);

      res.status(200).json({ ...cts, tripulanteCTS: tripulantesOrdenados, Dia: dataSeparada?.Dia, Mes: dataSeparada?.Mes, Ano:dataSeparada?.Ano, QtdTotal: qtdTotal});
    } catch (error) {
      console.error("Erro ao buscar o CTS:", error);
      res.status(500).json({ error: "Erro ao buscar o CTS" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} Não Permitido`);
  }
};

export default handler;
