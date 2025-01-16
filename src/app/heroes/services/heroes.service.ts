import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, delay, map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Hero } from '../interfaces';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private http = inject(HttpClient);

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${BASE_URL}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${BASE_URL}/heroes/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[] | undefined> {
    return this.http
      .get<Hero[]>(`${BASE_URL}/heroes?q=${query}&_limit=6`)
      .pipe(catchError(() => of(undefined)));
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${BASE_URL}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');

    return this.http.patch<Hero>(`${BASE_URL}/heroes/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<boolean> {
    return this.http.delete(`${BASE_URL}/heroes/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(() => {
          return true;
        })
      );
  }
}
