import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';

import { LayoutComponent } from './layouts/layout/layout.component';
import {
  EditHeroPageComponent,
  HeroPageComponent,
  ListPageComponent,
  SearchHeroPageComponent,
} from './pages';

@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutComponent,
    ListPageComponent,
    EditHeroPageComponent,
    SearchHeroPageComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, HeroesRoutingModule],
})
export class HeroesModule {}
