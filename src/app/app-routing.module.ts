import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { PrivilegeGuard } from './auth/privilege.guard';

const routes: Routes = [
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  {path: 'cooperativa',  loadChildren: './cooperativa/cooperativa.module#CooperativaModule', canActivate: [AuthGuard, PrivilegeGuard]},
  {path: '', loadChildren: './default/default.module#DefaultModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
