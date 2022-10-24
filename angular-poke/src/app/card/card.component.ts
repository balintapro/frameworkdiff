import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../helpers/pokemon.service';

import { PokemonDetails, Pokemon } from '../helpers/interfaces';

@Component({
  selector: 'card-comp',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardPokemon: Pokemon = {
    name: '',
    url: ''
  };

  pokemon!: PokemonDetails | undefined;
  pokeImg: string | undefined;

  constructor(
    private pokemonService: PokemonService,
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {

    this.pokemonService.getPokemon(this.cardPokemon.name)
      .subscribe(pokemon => {
        this.pokemon = pokemon
        this.pokeImg =  this.pokemonService.getPokemonImage(pokemon.id.toString().padStart(3, "0"))
      })
  }


}
