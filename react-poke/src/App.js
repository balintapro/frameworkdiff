import React, { useState, useEffect } from "react";

import { fetchApi } from './services/api'
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Card from './components/Card';
import Loader from './components/Loader';

import './App.scss';

const App = () => {

  const [pokemons, setPokemons] = useState(null);

  const limit = 48;

  useEffect(() => {
    fetchApi(`pokemon?limit=${limit}`, setPokemons);
  }, [])

  return (
    <>
      <Header />
      <Search />
      {!pokemons ? <Loader /> :
        pokemons.results.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))
      }
      <Footer />
    </>
  );
}

export default App;
