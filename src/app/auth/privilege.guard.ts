import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from '../reusables/snackbar.service';
import { isNullOrUndefined } from 'util';
import { Person } from '../person/person.model';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeGuard implements CanActivate {
 
  constructor(
    private router: Router, 
    private auth: AuthService,
    private snackbar: SnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!isNullOrUndefined(sessionStorage.getItem('person'))) {
      let person: Person = JSON.parse(sessionStorage.getItem('person'));
      if (person.admin)
        return true;
          
      this.snackbar.openSnackBar('Sem permissão para abrir a dashboard da cooperativa!');
      this.router.navigate(['/dashboard']);
      return false;
    }


     
  }
}
