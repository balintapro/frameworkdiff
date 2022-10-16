import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../helpers/interfaces';
import { PokemonService } from '../helpers/pokemon.service';

@Component({
  selector: 'detaila',
  templateUrl: './details.component.html',
  styleUrls: [ './details.component.css' ]
})
export class DetailsComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const name = parseInt(this.route.snapshot.paramMap.get('name')!, 10);
    this.pokemonService.getPokemon(name)
      .subscribe(pokemon => this.pokemon = pokemon);
  }

  goBack(): void {
    this.location.back();
  }

}
