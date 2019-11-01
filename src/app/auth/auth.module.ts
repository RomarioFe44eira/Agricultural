import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Material } from '../material';
import { ReusablesModule } from '../reusables/reusables.module';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule, 
    ReusablesModule,
    Material,
  ],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
