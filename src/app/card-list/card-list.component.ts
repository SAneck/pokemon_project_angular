import { PokemonService } from './../pokemon.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { Pokemon } from '../interface';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  pokemons$: Observable<Pokemon[]> | undefined;
  offset$ = new BehaviorSubject(0);

  onPageChange(event: any) {
    this.pokemonService.offset$.next(event.page * 20);
  }

  constructor(
    private http: HttpClient,
    private pokemonService: PokemonService
  ) {
    this.pokemons$ = pokemonService.pokemons$;
    this.offset$ = pokemonService.offset$;
  }

  ngOnInit() {}
}
