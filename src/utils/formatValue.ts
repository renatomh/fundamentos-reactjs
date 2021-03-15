// Função para formatar os valores monetários
const formatValue = (value: number): string =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',  // Definindo o estilo
    currency: 'BRL',    // Definindo a moeda ('.' como separador de milhar e ',' como de decimal)
  }).format(value);

export default formatValue;
