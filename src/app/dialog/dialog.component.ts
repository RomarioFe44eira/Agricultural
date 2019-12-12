import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Device } from '../dashboard/iot/device/device.model';
import { DataType } from '../dashboard/iot/datatype/datatype.model';
import { throwMatDuplicatedDrawerError } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { SnackbarService } from '../reusables/snackbar.service';
import { IotService } from '../dashboard/iot/iot.service';
import { Sensor } from '../dashboard/iot/sensor/sensor.model';

export interface DialogData {
  name: string;
  dataType: DataType,
  device:Device
}

enum OPERATION { SUCESS = 1, FAIL=0}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public sensor: Sensor = new Sensor();
  public device: Device = null;
  public datatype: DataType = null;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackbarService: SnackbarService,
    private sensorService: IotService
  ) {}

  ngOnInit(): void {
    /* throw new Error("Method not implemented."); */
  }

  onNoClick(): void {
    this.sensor = null;
    this.dialogRef.close();
  }

  onClicked(){
    if (!isNullOrUndefined(this.device) && !isNullOrUndefined(this.datatype)) {      // Realiza o cadastro de um sensor
      console.log(this.device); console.log(this.datatype);
      this.sensor.device = this.device;
      this.sensor.dataType = this.datatype;
     

      this.sensorService.insertSensor(this.sensor).subscribe(
        (data) => {
          this.snackbarService.openSnackBar('Sensor cadastrado com sucesso!');
          console.log(data);
          this.dialogRef.close();
        },
        error => {
          this.sensor = null;
          console.log(error);
          this.snackbarService.openSnackBar("Sensor não cadastrado, \n Erro: " + error.error.category);
        }
      );

    } else {
      if (isNullOrUndefined(this.device)) {
        this.snackbarService.openSnackBar('Choice a device');
      } else {
        this.snackbarService.openSnackBar('Choice a data type');
      }
    }

  }

  onSaveEdits(element){
  
      
      this.sensor.id = element.id;
      this.sensor.dataType = this.datatype;
      this.sensor.device = this.device;

      this.sensorService.updateSensor(this.sensor).subscribe(
        data => {
          this.snackbarService.openSnackBar('Sensor atualizado com sucesso!');
          console.log(data);
          this.dialogRef.close();
        },
        error => {
          this.snackbarService.openSnackBar('Não foi possível atualizar o sensor');
          console.log(error);
        }
      );
  }



  receivedMessageDevice(e){
    this.device = e;
    console.log('Mensagem recebida via @Output para device');
    console.log(e);
  }

  receivedMessageDataType(e){
    this.datatype = e;
    console.log('Mensagem recebida via @Output para data type');
    console.log(e);
  }

}
