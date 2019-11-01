import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.css']
})
export class InputEmailComponent implements OnInit {

  @Output() public outEmail = new EventEmitter<any>();
  public email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {}
  
  mailChange(){
    if (this.email.status == 'VALID') {
      this.outEmail.emit(this.email)
    }
    else{
      this.openSnackBar("Your email has errors", "Ok")
    }
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  openSnackBar(message: string, action: string) { 
    this._snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
