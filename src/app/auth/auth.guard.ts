import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AuthService } from './auth.service';


@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate{

    constructor(private router: Router, private auth: AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(!isNullOrUndefined(this.auth.currentTokenValue)) {
            console.log("AuthGuardState: Logado");
            return true;
        }
        this.router.navigate(['']);
        console.log("AuthGuardState: Deslogado");
        return false;
    }

}