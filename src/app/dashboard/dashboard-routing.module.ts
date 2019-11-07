import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {path: '', component: DefaultComponent, canActivate: [AuthGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'iot', loadChildren: './iot/iot.module#IotModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
