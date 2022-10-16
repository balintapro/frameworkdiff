import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import { fetchApi, GetImageById } from '../services/api'

import Loader from './Loader';

const Deatils = () => {
  const [pokemon, setPokemon] = useState(null);
  const { name } = useParams()

  useEffect(() => {
    fetchApi(`pokemon/${name}`, setPokemon);
  }, [name])

  return (
    !pokemon ?
      <Loader /> :

      <div>
        <h2>{pokemon.name}</h2>
        <img
          alt={pokemon.name}
          title={pokemon.name}
          src={GetImageById(pokemon.id)}
        />
        {pokemon.height}
        {pokemon.weight}
        {pokemon.habitat}
        {pokemon.abilities.map(ability =>
          <p key={ability.ability.name}>
            {ability.ability.name}
          </p>
        )}
        {pokemon.types.map(type =>
          <p key={type.type.name}>
            {type.type.name}
          </p>
        )}
        {pokemon.stats.map(stat =>
          <p key={stat.stat.url}>
            {stat.base_stat}
            {stat.stat.name}
          </p>
        )}
      </div>
  );
}

export default Deatils;
