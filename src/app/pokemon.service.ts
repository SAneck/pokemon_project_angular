import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  bufferCount,
  combineLatest,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  switchMap,
} from 'rxjs';
import { AllPokemons, NamedAPIResource, Pokemon } from './interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons$: Observable<Pokemon[]> | undefined;
  offset$ = new BehaviorSubject(0);
  filteredPokemons$: Observable<Pokemon[]> | undefined
  pokemonName$ = new BehaviorSubject<string>('')

  baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {
    this.pokemons$ = this.offset$.pipe(
      switchMap((offset) => {
        return this.getPokemons(offset).pipe(
          switchMap((element: AllPokemons) => from(element.results)),
          mergeMap((el: NamedAPIResource) => this.getSinglePokemon(el.url)),
          bufferCount(20, 20)
        );
      })
    );

    this.pokemons$ = combineLatest([
      this.pokemons$,
      this.pokemonName$
    ]).pipe(
      map(([pokemon, pokemonName]) => {
        if(!pokemonName) return pokemon
        return pokemon.filter(value => 
          value.name.toLowerCase()
          .includes(pokemonName.toLowerCase())
        )
      })
    )
  }

  getPokemons(offset: number): Observable<AllPokemons> {
    return this.http.get<AllPokemons>(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
    ); // [{name, url}, ...]
  }

  getSinglePokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(name);
  }

  searchPokemon(text: string){
    this.pokemonName$.next(text)
  }

}
