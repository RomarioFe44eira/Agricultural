import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent implements OnInit {

  public passVisible = false;
  @Output() outPassword = new EventEmitter<any>();
  public pass = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  passChange() {


    if (this.pass.status == 'VALID') {

      this.outPassword.emit(this.pass);
    } else {
      console.log(this.pass);
      this.openSnackBar('Verifique a senha digitada', 'ok');
    }
  }

  getErrorMessage() {
    return this.pass.hasError('required') ? 'You must enter a value' : this.pass.hasError('status')  ? 'Not a valid password' : '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
