import React, { useEffect, useState } from "react";

import { fetchApi } from '../services/api'

import Loader from './Loader';

const Card = (props) => {

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if(props.pokemon) {
      fetchApi(`pokemon/${props.pokemon.name}`, setPokemon);
    }
  }, [props.pokemon])

  return (
    !pokemon ?
      <Loader /> :

      <div>
        <h2>{pokemon.name}</h2>
      </div>
  );
}

export default Card;
