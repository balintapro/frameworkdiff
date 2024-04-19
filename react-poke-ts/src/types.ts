type sprites = {
  front_default: string;
};

type ability = {
  name: string;
};

type stat = {
  name: string;
  url: string;
};

type type = {
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites;
  height: number;
  weight: number;
  abilities: {
    ability;
  }[];
  stats: {
    base_stat: number;
    stat: stat;
  }[];
  types: {
    type: type;
  }[];
  results: {
    name: string;
  }[];
};

export interface Pokemons {
  results: Pokemon[];
};
