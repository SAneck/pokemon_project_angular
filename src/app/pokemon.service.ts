import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AllPokemons, Pokemon } from './interface';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient){}

  getPokemons(offset: number): Observable<AllPokemons>{
    return this.http.get<AllPokemons>(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`) // [{name, url}, ...]
  }

  getSinglePokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(name)
  }

}
