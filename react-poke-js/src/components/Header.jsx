import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <a href="http://localhost:4200/" alt="switch to Angular">
        <img alt="react" src={'/logo192.png'} />
      </a>
      <NavLink to="/">
        <h1>Pokedex</h1>
      </NavLink>
    </header>
  );
};

export default Header;
