import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { SnackbarService } from 'src/app/reusables/snackbar.service';
import { Observable } from 'rxjs';
import { getDefaultURL } from 'src/app/app.const';

@Injectable({
  providedIn: 'root'
})
export class IotService {
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    /* private snackbar: SnackbarService */
  ) { }

/* 
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.currentTokenValue,
    });
  } */

  public readAllDataType = (dType: dataType): Observable<dataType> => {
    return this.http.get<dataType>(
      getDefaultURL('datatype'),{ headers: this.authService.getHeadersAuthorization()}
    )
  }
  
  public readDataTypeById = (dType: dataType): Observable<dataType> => {
    return this.http.get<dataType>(
      getDefaultURL('datatype/' + dType.id),{ headers: this.authService.getHeadersAuthorization()}
    )
  }

  public insertDataType = (dType: dataType): Observable<dataType> => {
    return this.http.post<dataType>(
      getDefaultURL('datatype'), JSON.stringify(dType),{ headers: this.authService.getHeadersAuthorization()}
    )
  }

  public updateDataType = (dType: dataType): Observable<string> => {
    return this.http.put<string>(
      getDefaultURL('datatype' + dType.id), JSON.stringify(dType),{headers: this.authService.getHeadersAuthorization()}
    )
  }

  public deleteDataType = (dType: dataType): Observable<string> => {
    return this.http.delete<string>(
      getDefaultURL('datatype' + dType.id), {headers: this.authService.getHeadersAuthorization()}
    )
  }

}
