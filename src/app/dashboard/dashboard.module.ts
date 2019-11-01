import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReusablesModule } from '../reusables/reusables.module';
import { Material } from '../material';
import { DefaultComponent } from './default/default.component';


@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReusablesModule,
    Material
  ],
  exports: [DefaultComponent]
})
export class DashboardModule { }
