import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { getDefaultURL } from '../app.const';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.currentTokenSubject = new BehaviorSubject<string>(sessionStorage.getItem('token')),
    this.currentToken = this.currentTokenSubject.asObservable()
  }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/plain'
    });
  }


  // Realiza a autenticação de um usuário
  public login = (login: string, password: string): Observable<string> => {
    const body = JSON.stringify({ login: login, password: password });

    return this.http.post<string>( 
        getDefaultURL('auth/login'), body, {
           headers: this.getHeaders(), responseType: 'text' as 'json' 
        }
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
    console.log('acessou lougout');
    
    sessionStorage.removeItem('token');
    this.currentTokenValue = null;
    this.router.navigate(['/login']);
  }
 

}
