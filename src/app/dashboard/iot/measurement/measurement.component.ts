import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
