import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IotService } from '../iot.service';
import { Device } from './device.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceComponent implements OnInit {
  displayedColumns: string[] = ['id','description', 'area','installationDate', 'geometry', 'situation', 'action'];
  dataSource = new MatTableDataSource([]);


  constructor(
    private deviceService: IotService
  ) { }

  ngOnInit() {
    this.deviceService.readAllDevice().subscribe(
      (devices: Device[]) => {
        console.log(devices);
        this.dataSource.data = devices;
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
