import { Component, inject, resource } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'heroes-search-hero-page',
  standalone: false,

  templateUrl: './search-hero-page.component.html',
  styles: ``,
})
export class SearchHeroPageComponent {
  private heroesService = inject(HeroesService);
  selectedHero?: Hero;
  heroes: Hero[]|undefined = [];

  searchInput = new FormControl('');

  searchHero(): void {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value).subscribe(
      heroes => this.heroes = heroes
    );
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;

      return;
    }

    const hero: Hero = event.option.value as Hero;

    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }
}
