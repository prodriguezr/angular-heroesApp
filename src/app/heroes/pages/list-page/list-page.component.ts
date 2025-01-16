import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-list-page',
  standalone: false,

  templateUrl: './list-page.component.html',
  styles: ``,
})
export class ListPageComponent implements OnInit {
  private heroesService = inject(HeroesService);
  heroes: Hero[] = [];

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}
