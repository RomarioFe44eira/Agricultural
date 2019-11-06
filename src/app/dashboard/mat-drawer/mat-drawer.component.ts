import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

export interface drawerItens {
  name: string;
  icon: string;
  routerLink: string;
}

const DRAWERMENU: drawerItens[] = [
  {name: 'IoT', icon: 'widgets', routerLink: '/dashboard/iot'},
  {name: 'Data Type', icon: 'data_usage', routerLink: '/dashboard/iot/datatype'},
  {name: 'Device', icon: 'devices', routerLink: '/dashboard/iot/device'},
  {name: 'Measurement', icon: 'timeline', routerLink: '/dashboard/iot/measurement'},
  {name: 'Sensor', icon: 'settings_input_antenna', routerLink: '/dashboard/iot/sensor'},
];

@Component({
  selector: 'app-mat-drawer',
  templateUrl: './mat-drawer.component.html',
  styleUrls: ['./mat-drawer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MatDrawerComponent implements OnInit {
  today: number = Date.now();
  public drawerMenu = DRAWERMENU;

  constructor() { }

  ngOnInit() {
  }

}
