import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pokemon, AllPokemon, PokemonDetails } from './interfaces';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class PokemonService {

  private allPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=10000';
  private singlePokemon = 'https://pokeapi.co/api/v2/pokemon/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET pokemons from the server */
  getPokemons(): Observable<AllPokemon> {
    return this.http.get<AllPokemon>(this.allPokemon)
      .pipe(
        tap(_ => this.log('fetched pokemons')),
        catchError(this.handleError<AllPokemon>('getPokemons'))
      );
  }

  /** GET pokemon by id. Return `undefined` when id not found */
  getPokemonNo404<Data>(name: string): Observable<Pokemon> {
    const url = `${this.singlePokemon}${name}`;
    return this.http.get<Pokemon[]>(url)
      .pipe(
        map(pokemons => pokemons[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} ${name}`);
        }),
        catchError(this.handleError<Pokemon>(`${name}`))
      );
  }

  /** GET pokemon by name. Will 404 if id not found */
  getPokemon(name: string): Observable<PokemonDetails> {
    const url = `${this.singlePokemon}${name}`;
    return this.http.get<PokemonDetails>(url).pipe(
      tap(_ => this.log(`fetched pokemon ${name}`)),
      catchError(this.handleError<PokemonDetails>(`${name}`))
    );
  }

  /** GET pokemon image by id. Will 404 if id not found */
  getPokemonImage(id: string) {
    const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
    return url
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PokemonService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }
}
