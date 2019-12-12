import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { IotService } from '../iot.service';
import { Sensor } from './sensor.model';
import { Device } from '../device/device.model';
import { SnackbarService } from 'src/app/reusables/snackbar.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorComponent implements OnInit {

  displayedColumns: string[] = ['id', 'device', 'datatype', 'action'];
  public dataSource = new MatTableDataSource<Sensor>([]);

  public 

  constructor(
    public dialog: MatDialog,
    public iotService: IotService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {

    this.iotService.readAllDevice().subscribe(
      (device: Device[]) => {
        console.log(device);
        if (device.length > 0) {
          this.iotService.readAllSensorsOfDevice(device[0].id).subscribe(
            (sensors: Sensor[]) => {
              console.log(sensors);
              this.dataSource.data = sensors;
            }, 
            error => {
              console.log(error);
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    console.log('click');
    
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      /* data: {id: 0} */
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ANIMAL: ' + result);
    }); */
  }

  openEditSensorDialog(element): void {
    console.log('Dialog Edit opened');
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: {element: element}
    });
  }

  deleteSensor(sensor){
    this.iotService.deleteSensor(sensor).subscribe(
      (data)=> {
        this.dataSource.data.forEach(element => {
          if (sensor.id == element.id) {
            this.dataSource.data.splice(this.dataSource.data.indexOf(element), 1);
            this.snackbarService.openSnackBar('Sensor removido com sucesso!');
            this.dataSource.data = this.dataSource.data;
          }
        });
      },
      error => {
        console.log(error.message);
        this.snackbarService.openSnackBar('Erro: '+ error.message);
      }
    );

  }

  receivedMessage(e){
    this.iotService.readAllSensorsOfDevice(e.id).subscribe(
      (sensors: Sensor[]) => {
        console.log(sensors);
        this.dataSource.data = null;
        this.dataSource.data = sensors;
      }, 
      error => {
        console.log(error);
    })
  }

}
