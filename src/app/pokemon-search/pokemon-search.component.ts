import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../interface';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit{

  pokemonName: FormControl<string | null> = new FormControl('')
  pokemoFiltered$: Observable<Pokemon[]> | undefined

  constructor(private pokemonService: PokemonService){
    this.pokemoFiltered$ = pokemonService.pokemons$
    pokemonService.pokemons$ = this.pokemoFiltered$
  }

  searchPokemon(){

    this.pokemonService.searchPokemon(this.pokemonName.value || '')

    // this.poke$ = this.pokemonName.valueChanges.pipe(
    //   switchMap((value) => {
    //     return this.pokemonService.getSinglePokemon(
    //       this.pokemonService.baseUrl + value
    //     ).pipe(
    //       map(pokemon => [pokemon])
    //     )
    //   })
    // )
  }

  ngOnInit(){}
  
}
