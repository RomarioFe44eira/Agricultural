import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputEmailComponent } from './inputs/input-email/input-email.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { FormsModule } from '@angular/forms';
import { Material } from '../material';



@NgModule({
  declarations: [InputEmailComponent, InputPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    Material
  ],
  exports: [InputPasswordComponent, InputEmailComponent]
})
export class ReusablesModule { }
