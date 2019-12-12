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
import { Measurement } from './measurement/measurement.model';

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

  /////////   DATA TYPE       ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      console.log(JSON.stringify(dType));  
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

  /////////// DEVICE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  readAllDevice = (): Observable<Device[]> => { // Buscar os dispositivos do usuário autenticado
    return this.http.get<Device[]>(
      getDefaultURL('device'),{ headers: this.authService.getHeadersAuthorization()}
    )
  }
  public insertDevice  = (device: Device): Observable<Device> => {
    try{
      console.log(JSON.stringify(device));  
      return this.http.post<Device>(
        getDefaultURL('device'), JSON.stringify(device),{ headers: this.authService.getHeadersAuthorization()}
      )
    }
    catch(e){
      this.snackbarService.openSnackBar('Ocorreu um problema ao realizar esta operação.')
    }
  }
  public updateDevice  = (device: Device): Observable<string> => {
    return this.http.put<string>(
      getDefaultURL('device'), JSON.stringify(device),{headers: this.authService.getHeadersAuthorization()}
    )
  }
  public deleteDevice = (device: Device): Observable<string> => {
    return this.http.delete<string>(
      getDefaultURL('device/' + device.id), {headers: this.authService.getHeadersAuthorization()}
    )
  }


  /////////// MEANSUREMENT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  readAllMeansurement = (): Observable<Measurement[]> => { // Buscar os dispositivos do usuário autenticado
    return this.http.get<Measurement[]>(
      getDefaultURL('measurement'),{ headers: this.authService.getHeadersAuthorization()}
    )
  }
  public insertMeansurement = (meansurement: Measurement): Observable<Measurement> => {
    try{
      console.log(JSON.stringify(meansurement));
      return this.http.post<DataType>(
        getDefaultURL('meansurement'), JSON.stringify(meansurement),{ headers: this.authService.getHeadersAuthorization()}
      )
    }
    catch(e){
      this.snackbarService.openSnackBar('Ocorreu um problema operacional na inserção do registro.');
    }
  }
  public deleteMeansurement = (meansurement: Measurement): Observable<string> => {
    return this.http.delete<string>(
      getDefaultURL('meansurement/' + meansurement.id), {headers: this.authService.getHeadersAuthorization()}
    )
  }
  public updateMeansurement = (meansurement: Measurement): Observable<string> => {
    return this.http.put<string>(
      getDefaultURL(this.uri), JSON.stringify(meansurement),{headers: this.authService.getHeadersAuthorization()}
    )
  }


  /////////// SENSOR /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  readAllSensorsOfDevice = (idSensor): Observable<Sensor[]> => { // Buscar os sensores de um dispositivo
    return this.http.get<Sensor[]>(
      getDefaultURL('device/'+ idSensor + '/'+ this.uriSensor),{ headers: this.authService.getHeadersAuthorization()}
    )
  }
  
  insertSensor = (sensor:Sensor): Observable<Sensor> => {
    try{
      return this.http.post<Sensor>(
        getDefaultURL('device/'+ this.uriSensor), JSON.stringify(sensor), { headers: this.authService.getHeadersAuthorization()}
      )
    }
    catch(e){
      this.snackbarService.openSnackBar('Problema ao inserir o sensor.');
    }

  }

  public deleteSensor = (sensor: Sensor): Observable<string> => {
    return this.http.delete<string>(
      getDefaultURL('device/sensor/' + sensor.id), {headers: this.authService.getHeadersAuthorization()}
    )
  }

  public updateSensor = (sensor: Sensor): Observable<string> => {
    return this.http.put<string>(
      getDefaultURL('device/sensor/'), JSON.stringify(sensor),{headers: this.authService.getHeadersAuthorization()}
    )
  }

 

}
