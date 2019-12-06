import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { getDefaultURL } from '../app.const';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { SnackbarService } from '../reusables/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.currentTokenSubject = new BehaviorSubject<string>(sessionStorage.getItem('token')),
    this.currentToken = this.currentTokenSubject.asObservable();
  }


  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/plain'
    });
  }

  public getHeadersAuthorization(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.currentTokenValue,
    });
  }



  // Realiza a autenticação de um usuário
  public login = (login: string, password: string): Observable<string> => {
    const body = JSON.stringify({ login, password });

    return this.http.post<string>(
        getDefaultURL('auth/login'), body, {
           headers: this.getHeaders(), responseType: 'text' as 'json'
        }
    );
  }

  public recoveryAccount = (email: string): Observable<string> => {
    return this.http.post<string>(
      getDefaultURL('auth/password/recovery/' + email), {
        headers: this.getHeaders()
      },
    );
  }



  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  public set currentTokenValue(token: string) {
    this.currentTokenSubject.next(token);
  }

  public isLogged(): boolean {
    return !isNullOrUndefined(this.currentTokenSubject.value);
  }

  public logout() {
    /* console.log('acessou lougout'); */
    sessionStorage.removeItem('person');
    this.snackbar.openSnackBar('Account disconnected', 'OK');

    sessionStorage.removeItem('token');
    this.currentTokenValue = null;
    this.router.navigate(['auth/login']);
  }


}



/* 
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.currentTokenValue,
    });
  } */
