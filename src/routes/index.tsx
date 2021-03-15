import React from 'react';

import { Switch, Route } from 'react-router-dom';

// Importando as páginas da aplicação
import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';

// Definindo as rotas (páginas) para a aplicação
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/import" component={Import} />
  </Switch>
);

export default Routes;
