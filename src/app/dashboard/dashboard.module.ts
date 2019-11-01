import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReusablesModule } from '../reusables/reusables.module';
import { Material } from '../material';
import { DefaultComponent } from './default/default.component';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [DefaultComponent, AccountComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReusablesModule,
    Material
  ],
  exports: [DefaultComponent, AccountComponent]
})
export class DashboardModule { }
