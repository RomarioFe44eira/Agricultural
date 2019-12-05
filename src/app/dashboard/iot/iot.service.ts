import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, from } from 'rxjs';
import { getDefaultURL } from 'src/app/app.const';

import { DataType } from './datatype/datatype.model'
import { PersonService } from 'src/app/person/person.service';
import { Person } from 'src/app/person/person.model';
import { SnackbarService } from 'src/app/reusables/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class IotService {
  
  public uri: string = 'datatype';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private personService: PersonService,
    private snackbarService: SnackbarService
  ) { }


  public readAllDataType = (): Observable<DataType[]> => {
    return this.http.get<DataType[]>(
      getDefaultURL(this.uri),{ headers: this.authService.getHeadersAuthorization()}
    )
  }
  
  public readDataTypeById = (dType: DataType): Observable<DataType> => {
    return this.http.get<DataType>(
      getDefaultURL(this.uri + dType.id),{ headers: this.authService.getHeadersAuthorization()}
    )
  }

  public insertDataType = (dType: DataType): Observable<DataType> => {
    try{
      
      return this.http.post<DataType>(
        getDefaultURL(this.uri), JSON.stringify(dType),{ headers: this.authService.getHeadersAuthorization()}
      )
    }
    catch(e){
      this.snackbarService.openSnackBar('Ocorreu um problema ao realizar esta operação.')
    }
  }

  public updateDataType = (dType: DataType): Observable<string> => {
    return this.http.put<string>(
      getDefaultURL(this.uri), JSON.stringify(dType),{headers: this.authService.getHeadersAuthorization()}
    )
  }

  public deleteDataType = (dType: DataType): Observable<string> => {
    return this.http.delete<string>(
      getDefaultURL(this.uri + '/' + dType.id), {headers: this.authService.getHeadersAuthorization()}
    )
  }

}
