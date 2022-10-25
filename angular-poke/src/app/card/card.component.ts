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

  // no undefined ! or default value
  pokemon!: PokemonDetails;
  pokeImg: string = "";

  // dependency injection
  // no logic, only fetch, helpers, fallbacks
  constructor(
    private pokemonService: PokemonService,
  ) { }

  // async
  ngOnInit(): void {
    this.getPokemon();
  }

  // functions
  getPokemon(): void {
    this.pokemonService.getPokemon(this.cardPokemon.name)
      .subscribe(pokemon => {
        this.pokemon = pokemon
        this.pokeImg = this.pokemonService.getPokemonImage(pokemon.id.toString().padStart(3, "0"))
      })
  }

  onImgError(e: Event) {
    const target = e.target as HTMLImageElement;
    const sprite = this.pokemon.sprites.front_default
    const pokeBall = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg';
    target.src = sprite ? sprite : pokeBall
  }

}
