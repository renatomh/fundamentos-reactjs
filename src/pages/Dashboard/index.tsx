import React, { useState, useEffect } from 'react';

// Imporntando os ícones para a página
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

// importando o componten de cabeçalho
import Header from '../../components/Header';

// Importando as funções para formatar os valores monetáríos e datas
import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

// Importando os estilos personalizados criados
import { Container, CardContainer, Card, TableContainer } from './styles';

// Definindo a tipagem para a transação
interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

// Definindo a tipagem para o saldo
interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  // Criando os estados para as transações e o saldo
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  // Função chamada quando há atualização no conjunto de estados
  useEffect(() => {
    // Criando a função para carregar os dados
    async function loadTransactions(): Promise<void> {
      // Chamando a função da API para listar as transações
      const response = await api.get('/transactions');
      // Separando os dados obtidos
      const { transactions, balance } = response.data;

      // Formatando as transações recebidas da API
      const transactionsFormatted = transactions.map(
        (transaction: Transaction) => ({
          // Pegando os dados já presentes na transaction
          ...transaction,
          // Adicionando os valores formatados no objeto
          formattedValue: formatValue(transaction.value),
          formattedDate: formatDate(transaction.created_at),
        })
      );

      // Formatando o saldo recebido
      const balanceFormatted = {
        income: formatValue(balance.income),
        outcome: formatValue(balance.outcome),
        total: formatValue(balance.total),
      }

      // Atualizando os estados de transações e saldo
      setTransactions(transactionsFormatted);
      setBalance(balanceFormatted);
    }
    // Chamando a função para carregar os dados
    loadTransactions();
  }, []);

  // Retornando a página principal
  return (
    <>
      {/* Cabeçalho para nageação entre as páginas */}
      <Header />
      <Container>
        {/* Cartões principais para o saldo */}
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        {/* Tabela para a listagem das transações */}
        <TableContainer>
          <table>
            {/* Aqui definimos o cabeçalho da tabela */}
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            {/* Aqui temos as linhas da tabela */}
            <tbody>
              {/* Mapeando as transações na tabela */}
              {transactions.map((transaction: Transaction) => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {/* Verificando se o tipo é 'outcome' para adicionar o símbolo de menos */}
                    {transaction.type == "outcome" && ' - '}
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
