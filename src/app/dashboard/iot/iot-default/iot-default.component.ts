import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-iot-default',
  templateUrl: './iot-default.component.html',
  styleUrls: ['./iot-default.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IotDefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
