import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PokemonDetails } from '../helpers/interfaces';
import { PokemonService } from '../helpers/pokemon.service';

@Component({
  selector: 'details-comp',
  templateUrl: './details.component.html',
  styleUrls: [ './details.component.css' ]
})
export class DetailsComponent implements OnInit {
  pokemon!: PokemonDetails | undefined;
  pokeImg: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.pokemonService.getPokemon(name)
      .subscribe(pokemon => {
        this.pokemon = pokemon
        this.pokeImg =  this.pokemonService.getPokemonImage(pokemon.id.toString().padStart(3, "0"))
      })
  }

  goBack(): void {
    this.location.back();
  }

}
