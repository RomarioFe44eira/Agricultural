import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SnackbarService } from '../reusables/snackbar.service';
import { isNullOrUndefined } from 'util';
import { Person } from '../person/person.model';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeColaboradorGuard implements CanActivate {
 
  constructor(
    private router: Router, 
    private snackbar: SnackbarService
  ) {}

  canActivate() {

    if (!isNullOrUndefined(sessionStorage.getItem('person'))) {
      let person: Person = JSON.parse(sessionStorage.getItem('person'));
      if (!person.admin)
        return true;
          
      this.snackbar.openSnackBar('Acesso somente para colaboradores');
      this.router.navigate(['cooperativa']);
      return false;
    }


     
  }
}