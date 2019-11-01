import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToolbarDefaultComponent } from './toolbar-default/toolbar-default.component';
import { Material } from '../material';


@NgModule({
  declarations: [HomeComponent, NotFoundComponent, ToolbarDefaultComponent],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    Material
  ],
  exports: [HomeComponent, NotFoundComponent, ToolbarDefaultComponent]
})
export class DefaultModule { }
