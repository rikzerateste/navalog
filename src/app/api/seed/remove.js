import fs from 'fs/promises';
import path from 'path';

// Caminho para o arquivo JSON original e o novo arquivo JSON
const inputFilePath = path.join(process.cwd(), 'empresas.json');
const outputFilePath = path.join(process.cwd(), 'empresas_cleaned.json');

// Atributos que você deseja remover
const attributesToRemove = ['Codigo', 'Fax', 'Endereco_internet'];

// Função para remover atributos do JSON
function removeAttributes(data) {
  return data.map(item => {
    attributesToRemove.forEach(attr => {
      delete item[attr];
    });
    return item;
  });
}

// Função principal
async function processJson() {
  try {
    // Leitura do arquivo JSON
    const data = await fs.readFile(inputFilePath, 'utf8');

    // Parse do JSON
    const jsonData = JSON.parse(data);

    // Se o JSON for um array de objetos
    if (Array.isArray(jsonData)) {
      // Remove os atributos indesejados
      const cleanedData = removeAttributes(jsonData);
      
      // Grava o novo arquivo JSON
      await fs.writeFile(outputFilePath, JSON.stringify(cleanedData, null, 2), 'utf8');
      console.log('Arquivo JSON limpo gerado com sucesso:', outputFilePath);
    } else {
      console.error('O JSON fornecido não é um array de objetos.');
    }
  } catch (err) {
    console.error('Erro ao processar o JSON:', err);
  }
}

// Executa a função principal
processJson();
