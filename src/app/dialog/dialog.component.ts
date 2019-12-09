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
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
 
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
    this.dialogRef.close();
  }

  onClicked(){
    if (!isNullOrUndefined(this.device) && !isNullOrUndefined(this.datatype)) {
      //Cadastra
      console.log(this.device);
      console.log(this.datatype);

      let sensor: Sensor = new Sensor();
      sensor.device = this.device;
      sensor.dataType = this.datatype;
      console.log(sensor); 

      this.sensorService.insertSensor(sensor).subscribe(
        (data) => {
          console.log(data);
          this.snackbarService.openSnackBar('Sensor cadastrado com sucesso!');
          this.dialogRef.close();
        },
        error => {
          console.log(error);
          this.snackbarService.openSnackBar('Não foi possível cadastrar o sensor!');
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
