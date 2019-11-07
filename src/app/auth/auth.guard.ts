import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AuthService } from './auth.service';
import { SnackbarService } from '../reusables/snackbar.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService, private snackbar: SnackbarService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!isNullOrUndefined(this.auth.currentTokenValue)) {
            return true;
        }
        this.router.navigate(['']);
        this.snackbar.openSnackBar('Conta não autenticada', 'OK');
        return false;
    }

}
