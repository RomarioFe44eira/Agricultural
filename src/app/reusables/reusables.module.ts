import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputEmailComponent } from './inputs/input-email/input-email.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { FormsModule } from '@angular/forms';
import { Material } from '../material';
import { InputGenericComponent } from './inputs/input-generic/input-generic.component';



@NgModule({
  declarations: [InputEmailComponent, InputPasswordComponent, InputGenericComponent],
  imports: [
    CommonModule,
    FormsModule,
    Material
  ],
  exports: [InputPasswordComponent, InputEmailComponent]
})
export class ReusablesModule { }
