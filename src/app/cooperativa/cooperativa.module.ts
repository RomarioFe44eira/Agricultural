import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CooperativaRoutingModule } from './cooperativa-routing.module';
import { DashCoperativaComponent } from './dash-coperativa/dash-coperativa.component';
import { Material } from '../material';


@NgModule({
  declarations: [DashCoperativaComponent],
  imports: [
    Material,
    CommonModule,
    CooperativaRoutingModule
  ],
  exports: [DashCoperativaComponent],
})
export class CooperativaModule { }
