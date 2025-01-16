import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LayoutComponent } from './layouts';

@NgModule({
  declarations: [LayoutComponent, LoginPageComponent, RegisterPageComponent],
  imports: [AuthRoutingModule, MaterialModule],
})
export class AuthModule {}
