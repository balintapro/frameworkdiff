import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { fetchApi } from '../services/api'

import Card from './Card';
import Loader from './Loader';

const Home = () => {

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
        let standardizedInput = search.toLocaleLowerCase();
        return pokemons?.results?.filter(temp => temp.name.toLocaleLowerCase()?.includes(standardizedInput))
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
      <input placeholder="Search" type="text" onChange={getSearchValue} />
      {!filteredSearch ? <Loader /> :
        filteredSearch.slice(0, 25).map((pokemon) => (
          <NavLink key={pokemon.name} to={"/" + pokemon.name}>
            <Card pokemon={pokemon} />
          </NavLink>
        ))
      }
    </>
  );
}

export default Home;
