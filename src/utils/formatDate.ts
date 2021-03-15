// Função para formatar as datas
const formatDate = (date: Date): string =>
  new Date(date).toLocaleDateString('pt-BR'); // Definindo o tipo de acordo com a língua

export default formatDate;
