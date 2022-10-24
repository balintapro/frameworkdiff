export interface Pokemon {
  name: string
  url: string
}

export interface AllPokemon {
  count: Number
  results: Pokemon[]
}

export interface PokemonDetails {
  id: number
  name: string
  url: string
  height: number
  weight: number
  habitat: string
  types: PokemonTypes[]
  stats: PokemonStats[]
  abilities: PokemonAbilities[]
}

export interface PokemonTypes {
  slot: string
  type: {
    name: string,
    url: string
  }
}


export interface PokemonStats {
  base_stat: number,
  effort: number,
  stat: {
    name: string
    url: string
  }
}

export interface PokemonAbilities {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean,
  slot: number
}
