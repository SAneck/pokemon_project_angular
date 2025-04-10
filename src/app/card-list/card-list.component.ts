import { PokemonService } from './../pokemon.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, bufferCount, from, merge, mergeMap, Observable, pipe, switchMap } from 'rxjs';
import { AllPokemons, NamedAPIResource, Pokemon } from '../interface';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{

  pokemons$ : Observable<Pokemon[]> | undefined
  offset$ = new BehaviorSubject(0)



  onPageChange(event: any) {
    this.offset$.next(event.page * 20)
    }



  constructor(private http: HttpClient, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemons$ = this.offset$.pipe(
      switchMap(offset => {
        return this.pokemonService.getPokemons(offset).pipe(
          switchMap((element: AllPokemons) => from(element.results)),
          mergeMap((el: NamedAPIResource) => this.pokemonService.getSinglePokemon(el.url)),
          bufferCount(20,20)
          )
      })
    )
  
    // switchMap((offset) => {
    //   return this.pokemonService.getPokemons(offset).pipe(
    //     switchMap((element: AllPokemons) => from(element.results)),
    //     mergeMap((el: NamedAPIResource) => this.pokemonService.getSinglePokemon(el.url)),
    //     bufferCount(20,20)
    //   )
    // })


  }

  }