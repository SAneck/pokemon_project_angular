import { Component, inject, Input } from '@angular/core';
import { Pokemon, PokemonStat, PokemonType } from '../interface';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent {
  poke$: Observable<Pokemon> | undefined;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.poke$ = this.route.params.pipe(
      switchMap((params) => {
        return this.pokemonService.getSinglePokemon(
          this.pokemonService.baseUrl + '/' + params['id']
        );
      })
    );

    // this.poke$ = this.pokemonService.getSinglePokemon(
    //   this.pokemonService.baseUrl + '/' + this.route.snapshot.params['id']
    // );
  }
}
