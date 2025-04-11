import { Component, inject, Input } from '@angular/core';
import { PokemonStat, PokemonType } from '../interface';


@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent {
  @Input() stats: PokemonStat[] = []
  @Input() type: PokemonType[] = []
}
