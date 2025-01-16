import { Component, computed, inject, resource } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces';

@Component({
  selector: 'heroes-hero-page',
  standalone: false,
  templateUrl: './hero-page.component.html',
  styles: ``,
})
export class HeroPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  heroesService = inject(HeroesService);

  heroId = computed(() => this.activatedRoute.snapshot.params['id']);
  hero?: Hero;

  heroResource = resource({
    request: () => ({ id: this.heroId() }),
    loader: async ({ request }) => {
      const hero = await firstValueFrom(
        this.heroesService.getHeroById(request.id)
      );

      if (hero === undefined) return this.router.navigate(['heroes', 'list']);

      return (this.hero = hero);
    },
  });

  goBack(): void {
    this.router.navigate(['heroes', 'list']);
  }
}
