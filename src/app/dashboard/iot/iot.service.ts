import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, from } from 'rxjs';
import { getDefaultURL } from 'src/app/app.const';

import { DataType } from './datatype/datatype.model'
import { PersonService } from 'src/app/person/person.service';
import { Person } from 'src/app/person/person.model';
import { SnackbarService } from 'src/app/reusables/snackbar.service';
import { Sensor } from './sensor/sensor.model';
import { Device } from './device/device.model';

@Injectable({
  providedIn: 'root'
})
export class IotService {
  
  private uri: string = 'datatype';
  private uriSensor: string = 'sensor';
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private personService: PersonService,
    private snackbarService: SnackbarService
  ) { }

  /////////   DATA TYPE       /////////////////////////////////////////////////
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






  /////////// DEVICE //////////////////////////////////////////////////////////
  readAllDevice = (): Observable<Device[]> => { // Buscar os dispositivos do usuário autenticado
    return this.http.get<Device[]>(
      getDefaultURL('device'),{ headers: this.authService.getHeadersAuthorization()}
    )
  }

  /////////// SENSOR //////////////////////////////////////////////////////////
  readAllSensorsOfDevice = (): Observable<Sensor[]> => { // Buscar os sensores de um dispositivo
    return this.http.get<Sensor[]>(
      getDefaultURL('device/32/' + this.uriSensor),{ headers: this.authService.getHeadersAuthorization()}
    )
  }
/*
  readSensor = (sensor:Sensor): Observable<Sensor[]> => {}
  insertSensor = (sensor:Sensor): Observable<Sensor[]> => {}
  updateSensor = (sensor:Sensor): Observable<string> => {}
  deleteSernsor = (sensor:Sensor): Observable<string> => {} */
  

}
