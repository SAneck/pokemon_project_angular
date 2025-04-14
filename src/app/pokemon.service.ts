import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  bufferCount,
  from,
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
  }

  getPokemons(offset: number): Observable<AllPokemons> {
    return this.http.get<AllPokemons>(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
    ); // [{name, url}, ...]
  }

  getSinglePokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(id);
  }
}
