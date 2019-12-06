import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { IotService } from '../iot.service';
import { Sensor } from './sensor.model';
import { Device } from '../device/device.model';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorComponent implements OnInit {

  displayedColumns: string[] = ['id', 'device', 'datatype', 'action'];
  public dataSource = new MatTableDataSource<Sensor>([]);


  constructor(
    public dialog: MatDialog,
    public iotService: IotService
  ) { }

  ngOnInit() {

    this.iotService.readAllDevice().subscribe(
      (device: Device[]) => {
        console.log(device);
      },
      error => {
        console.log(error);
      }
    );

    this.iotService.readAllSensorsOfDevice().subscribe(
      (sensors: Sensor[]) => {
        console.log(sensors);
        this.dataSource.data = sensors;
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
      data: {name: 'Simba', animal: 'Leão'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ANIMAL: ' + result);
    });
  }


}
