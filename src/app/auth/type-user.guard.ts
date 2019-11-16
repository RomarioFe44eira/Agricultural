import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from '../reusables/snackbar.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class TypeUserGuard implements CanActivate {
 
  constructor(
    private router: Router, 
    private auth: AuthService,
    private snackbar: SnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (isNullOrUndefined(this.auth.currentTokenValue))
        return true;
      
      this.router.navigate(['']);
      this.snackbar.openSnackBar('Não foi possível acessar o dashboard da cooperativa, pois não possui privilégios.', 'OK');
      return false;
  }
}
