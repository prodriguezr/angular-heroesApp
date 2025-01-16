import { Component, input } from '@angular/core';
import { Hero } from '../../interfaces';

@Component({
  selector: 'heroes-hero-card',
  standalone: false,

  templateUrl: './hero-card.component.html',
  styles: ``,
})
export class HeroCardComponent {
  hero = input.required<Hero>();
}
