import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashCoperativaComponent } from './dash-coperativa/dash-coperativa.component';


const routes: Routes = [
  {path: '', component: DashCoperativaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CooperativaRoutingModule { }
