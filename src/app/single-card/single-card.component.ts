import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent {

  @Input() imagePokemon: string | null = '' 
  @Input() namePokemon: string | null = ''
  @Input() weightPokemon: number | null = null
  @Input() heigthPokemon: number | null = null

  @Input() pokemonId = -1
}
