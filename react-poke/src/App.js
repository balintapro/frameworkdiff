import React, { useState, useEffect } from "react";

import { fetchApi } from './services/api'
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import Loader from './components/Loader';

import './App.scss';

const App = () => {

  const [pokemons, setPokemons] = useState(null);
  const [search, setSearchInput] = useState("");
  const [filteredSearch, setFilteredSearch] = useState(null);

  const getSearchValue = e => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    fetchApi(`pokemon?limit=10000`, setPokemons);

  }, [])

  useEffect(() => {
      const filterData = () => {
        if (search.length !== 0) {
          let bigSearch = search.toLocaleUpperCase();
          return pokemons?.results?.filter(temp => temp.name.toLocaleUpperCase()?.includes(bigSearch))
        } else {
          return pokemons?.results
        }
      };

    if (pokemons) {
      setFilteredSearch(filterData())
      return () => {
        setFilteredSearch(pokemons.results)
      }
    }
  }, [pokemons, search])

  return (
    <>
      <Header />
      <input placeholder="Search" type="text" onChange={getSearchValue} />
      {!filteredSearch ? <Loader /> :
        filteredSearch.slice(0, 25).map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))
      }
      <Footer />
    </>
  );
}

export default App;
