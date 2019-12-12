import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getDefaultURL } from '../app.const';
import { SnackbarService } from '../reusables/snackbar.service';
import { Person } from './person.model';
import { AuthService } from '../auth/auth.service';
import { Country } from '../auth/register/country.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) { }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.currentTokenValue,
    });
  }

  public getPersonAuthenticated = (): Observable<Person> => {
    return this.http.get<Person>(
      getDefaultURL('person'), {headers: this.getHeaders()}
    )
    /*.pipe(catchError(this.handleError)); */
  }


  // Registar uma pessoa na API
  public personCreate = (person): Observable<string> => {
    const body = person;
    return this.http.post<string>( getDefaultURL('person'), body, {
      headers: this.getHeaders()
    })
  }

  public getPaises = (): Observable<Country[]> => {
    return this.http.get<Country[]>(
      getDefaultURL('country'), {headers: this.getHeaders()}
    )
  }

  // Atualiza uma pessoa na API
 /*  public personUpdate = (person): Observable<string> => {
    
    let form = {
      "id": person['id'],
      "name": person['name'],
      "mail": person['mail'],
      "phone": person['phone'],
      "birth": moment(person['birth']).format("YYYY-MM-DDTHH:mm:ssZZ"),
      "country": { "id": person['country']['id']},
      "phoneCode": { "id": person['phoneCode']['id']}
    }
   
    console.log(form);
    
    
    return this.http.put<string>( getDefaultURL('person'), form, {
        headers: this.getHeaders()
    })
  } */

  // Deleta uma pessoa na API
  public personDelete = (person): Observable<string> => {
    return this.http.delete<string>( getDefaultURL('person/' + person['id']),{
      headers: this.getHeaders()
    })
  } 
  
  public getPerson = (): Observable<string> => {
    return this.http.get<string>( 
        getDefaultURL('person'), {
           headers: this.getHeaders()
        }
    );
  }


public getPersonSessionStorage(){
  return JSON.parse(sessionStorage.getItem('person'));
}



}
