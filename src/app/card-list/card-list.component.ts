import { PokemonService } from './../pokemon.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from, merge, mergeMap, pipe, switchMap } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{

  elements = new BehaviorSubject<any>([])

  constructor(private http: HttpClient, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons().pipe(
      switchMap((element: any) => from(element.results)),
      mergeMap((el: any) => this.pokemonService.getSinglePokemon(el.url))
    ).subscribe(res => {
      this.elements.next([...this.elements.value, res.sprites.front_default])
    })
  }
  }