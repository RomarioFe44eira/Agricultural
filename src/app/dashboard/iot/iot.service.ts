import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, from } from 'rxjs';
import { getDefaultURL } from 'src/app/app.const';

import { DataType } from './datatype/datatype.model'

@Injectable({
  providedIn: 'root'
})
export class IotService {
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  public readAllDataType = (): Observable<DataType> => {
    return this.http.get<DataType>(
      getDefaultURL('datatype'),{ headers: this.authService.getHeadersAuthorization()}
    )
  }
  
  public readDataTypeById = (dType: DataType): Observable<DataType> => {
    return this.http.get<DataType>(
      getDefaultURL('datatype' + dType.id),{ headers: this.authService.getHeadersAuthorization()}
    )
  }

  public insertDataType = (dType: DataType): Observable<DataType> => {
    return this.http.post<DataType>(
      getDefaultURL('datatype'), JSON.stringify(dType),{ headers: this.authService.getHeadersAuthorization()}
    )
  }

  public updateDataType = (dType: DataType): Observable<string> => {
    return this.http.put<string>(
      getDefaultURL('datatype' + dType.id), JSON.stringify(dType),{headers: this.authService.getHeadersAuthorization()}
    )
  }

  public deleteDataType = (dType: DataType): Observable<string> => {
    return this.http.delete<string>(
      getDefaultURL('datatype' + dType.id), {headers: this.authService.getHeadersAuthorization()}
    )
  }

}
