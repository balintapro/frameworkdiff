import React, { useEffect, useState } from "react";

import { fetchApi, GetImageById } from '../services/api'

import Loader from './Loader';

const Card = (props) => {

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (props.pokemon) {
      fetchApi(`pokemon/${props.pokemon.name}`, setPokemon);
    }
  }, [props.pokemon])

  return (
    !pokemon ?
      <Loader /> :

      <div className={pokemon.types[0].type.name}>
        <h2>{pokemon.name}</h2>
        <img
          alt={pokemon.name}
          title={pokemon.name}
          src={GetImageById(pokemon.id)}
        />
        {pokemon.types.map(type =>
          <p key={type.type.name}>
            {type.type.name}
          </p>
        )}
      </div>
  );
}

export default Card;
