import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AuthService } from './auth.service';
import { SnackbarService } from '../reusables/snackbar.service';


@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate{
    /* public firstAcess = true; */
    constructor(private router: Router, private auth: AuthService, private snackbar: SnackbarService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(!isNullOrUndefined(this.auth.currentTokenValue)) {
           /*  console.log(state);
            if (state.url == '/dashboard' && this.firstAcess == true) {
                this.snackbar.openSnackBar("Você está autenticado","ok");
                this.firstAcess = false;
            } */

            return true;
        }
        this.router.navigate(['']);
        console.log("AuthGuardState: Deslogado");
        this.snackbar.openSnackBar("Conta não autenticada","OK");
        return false;
    }

}