import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReusablesModule } from '../reusables/reusables.module';
import { Material } from '../material';
import { DefaultComponent } from './default/default.component';
import { AccountComponent } from './account/account.component';
import { ToolbarDashboardComponent } from './toolbar-dashboard/toolbar-dashboard.component';
import { MatDrawerComponent } from './mat-drawer/mat-drawer.component';


@NgModule({
  declarations: [DefaultComponent, AccountComponent, ToolbarDashboardComponent, MatDrawerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReusablesModule,
    Material
  ],
  exports: [DefaultComponent, AccountComponent, ToolbarDashboardComponent, MatDrawerComponent]
})
export class DashboardModule { }
