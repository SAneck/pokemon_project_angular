import { Component } from '@angular/core';
import { Pokemon } from '../interface';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {
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
