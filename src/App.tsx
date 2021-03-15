import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Importando as rotas da aplicação
import Routes from './routes';

// Importando a estilização global da aplicação
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    {/* Utilizando a estilização global para a aplicação */}
    <GlobalStyle />
    {/* Utilizando as rotas da aplicação */}
    <Router>
      <Routes />
    </Router>
  </>
);

export default App;
