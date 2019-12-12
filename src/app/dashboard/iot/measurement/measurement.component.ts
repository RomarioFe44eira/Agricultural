import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IotService } from '../iot.service';
import { Measurement } from './measurement.model';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MeasurementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'value', 'description', 'geometry', 'dateTime','sensor', 'unitMeasurement', 'action'];
  dataSource = new MatTableDataSource([]);

  constructor(
    private mesurementService: IotService
  ) { }

  ngOnInit() {
    this.mesurementService.readAllMeansurement().subscribe(
      (measurement: Measurement[]) => {
        this.dataSource.data = measurement;
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
