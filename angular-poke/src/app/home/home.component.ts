import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../helpers/interfaces';
import { PokemonService } from '../helpers/pokemon.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  pokemons: Pokemon[] = [];
  searchResults: Pokemon[] = [];
  searchText = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons.results);
  }

  searchPokemons(): void {

  }

}
