import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';

import { LayoutComponent } from './layouts';

import {
  EditHeroPageComponent,
  HeroPageComponent,
  ListPageComponent,
  SearchHeroPageComponent,
} from './pages';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutComponent,
    ListPageComponent,
    EditHeroPageComponent,
    SearchHeroPageComponent,
    HeroCardComponent,
    HeroImagePipe,
    ConfirmDialogComponent,
  ],
  imports: [HeroesRoutingModule, MaterialModule, CommonModule, ReactiveFormsModule],
})
export class HeroesModule {}
