import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Hero } from '../../interfaces';
import { HeroesService } from '../../services';
import { filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components';

@Component({
  selector: 'heroes-edit-hero-page',
  standalone: false,
  templateUrl: './edit-hero-page.component.html',
  styles: `
  .heroImage {
    background-size: cover;
    height: 540px;
    width: auto;
  }`,
})
export class EditHeroPageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private heroesService = inject(HeroesService);
  private snackbar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  private fb = inject(FormBuilder);

  heroForm: FormGroup = this.fb.group({
      id: [''],
      superhero: ['', [Validators.required, Validators.minLength(3)]],
      publisher: ['', [Validators.required]],
      alter_ego: ['', Validators.required],
      first_appearance: ['', Validators.required],
      characters: ['', Validators.required],
      alt_img: [''] // Campo opcional, sin validaciones
    });

    ngOnInit(): void {
      if (!this.router.url.includes('edit')) return;

      this.activatedRoute.params.
        pipe(
          switchMap(({ id }) => this.heroesService.getHeroById(id))
        ).subscribe(hero => {
          if (!hero) return this.router.navigate(['heroes', 'list']);

          this.heroForm.reset(hero);

          return;
        });
    }

  publishers: { id: string; description: string }[] = [
    { id: 'DC Comics', description: 'DC Comics' },
    { id: 'Marvel Comics', description: 'Marvel Comics' },
  ];

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe(
        hero => {
          // TODO: Show snackbar
          this.showSnackbar(`Héroe '${hero.superhero}' actualizado exitosamente.-`)
        }
      );

      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe(
      hero => {
        this.router.navigate(['heroes', 'edit', hero.id]);
        this.showSnackbar(`Héroe '${hero.superhero}' creado exitosamente.-`);
      }
    );
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }

  onConfirm(): void {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted),
      )
      .subscribe(() => {
        this.router.navigate(['heroes', 'list'])
      });
  }
}
