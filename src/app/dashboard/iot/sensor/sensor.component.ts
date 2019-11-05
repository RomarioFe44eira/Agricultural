import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
