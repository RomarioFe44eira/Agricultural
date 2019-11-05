import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  
  constructor(private _snackBar: MatSnackBar) { }


  openSnackBar(message: string, action: string) { 
    this._snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }


}
