import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import { fetchApi, GetImageById } from '../services/api'

import Loader from './Loader';

const Details = () => {
  const [pokemon, setPokemon] = useState(null);
  const { name } = useParams()

  useEffect(() => {
    fetchApi(`pokemon/${name}`, setPokemon);
  }, [name])

  return (
    !pokemon ?
      <Loader /> :

      <div className="container details">
        <div className="row">
          <div className="col-md-6">
            <div className={`card base backdrop-${pokemon.types[0].type.name}`}>
              <h2 className={`backdrop-${pokemon.types[0].type.name}`}>{pokemon.name}</h2>
              <img
                alt={pokemon.name}
                title={pokemon.name}
                src={GetImageById(pokemon.id)}
                className="anim"
              />
              <div className="uni-row">
                {pokemon.types.map(type =>
                  <div key={type.type.name}>
                    <p className={`bg-${type.type.name}`}>{type.type.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card row">
              <h2 className="col-md-12">
                Base Info
              </h2>
              <div className="item col-md-6">
                <p>Height: </p>
                <span>
                  {Math.round(pokemon.height * 10) / 100} m
                </span>
              </div>
              <div className="item col-md-6">
                <p>Weight: </p>
                <span>
                  {Math.round(pokemon.weight * 10) / 100} kg
                </span>
              </div>
              <div className="item col-md-6">
                <p>Abilities: </p>
                <ul>
                  {pokemon.abilities.map(ability =>
                    <li key={ability.ability.name}>
                      {ability.ability.name}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row stat">
          <div className="col-md-12">
            <div className="card">
              <h2>
                Stats
              </h2>
              <div className="row">
                {pokemon.stats.map(stat =>
                  <div className="col-md-2" key={stat.stat.url}>
                    <div className="bar">
                      <div
                        style={{ height: stat.base_stat }}
                        className={`bar-active bg-${pokemon.types[0].type.name}`}
                      />
                        <p className="value">{stat.base_stat}</p>
                    </div>
                    <p>
                      {stat.stat.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Details;
