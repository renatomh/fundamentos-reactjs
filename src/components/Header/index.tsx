import React from 'react';

import { Link } from 'react-router-dom';

// Importando os estilos personalizados criados
import { Container } from './styles';

// Imporntando os ícones para a página
import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

// Criando o cabeçalho para permitir a navegação entre as páginas
const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link to="/">Listagem</Link>
        <Link to="/import">Importar</Link>
      </nav>
    </header>
  </Container>
);

export default Header;
