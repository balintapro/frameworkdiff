import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PokemonDetails } from '../helpers/interfaces';
import { PokemonService } from '../helpers/pokemon.service';

@Component({
  selector: 'details-comp',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  pokemon!: PokemonDetails;
  pokeImg!: string;

  height!: number;
  weight!: number;

  onImgError(e: Event) {
    const target = e.target as HTMLImageElement;
    const sprite = this.pokemon.sprites.front_default
    const pokeBall = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg';
    target.src = sprite ? sprite : pokeBall
  }

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.pokemonService.getPokemon(name)
      .subscribe(pokemon => {
        this.pokemon = pokemon
        this.pokeImg = this.pokemonService.getPokemonImage(pokemon.id.toString().padStart(3, "0"))
        this.height = Math.round(pokemon.height * 10) / 100;
        this.weight = Math.round(pokemon.weight * 10) / 100;
      })
  }
}
