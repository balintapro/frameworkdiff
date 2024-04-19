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

  const onImgError = (error) => {
    const sprite = pokemon.sprites.front_default
    const pokeBall = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg';
    error.target.src = sprite ? sprite : pokeBall
  }

  return (
    (!pokemon ?
      <Loader /> :
      <div className={`card backdrop-${pokemon.types[0].type.name}`}>
        <h2>{pokemon.name}</h2>
        <img
          alt={pokemon.name}
          title={pokemon.name}
          src={GetImageById(pokemon.id)}
          className={"anim"}
          onError={onImgError}
        />
        <div className="uni-row">
          {pokemon.types.map(type =>
            <div key={type.type.name}>
              <p className={`bg-${type.type.name}`}>{type.type.name}</p>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default Card;
