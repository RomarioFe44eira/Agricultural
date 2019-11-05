import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
