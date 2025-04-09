import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient){}

  getPokemons(){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20`) // [{name, url}, ...]
  }

  getSinglePokemon(name: string): Observable<any> {
    return this.http.get(name)
  }

}
