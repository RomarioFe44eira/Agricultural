import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IotRoutingModule } from './iot-routing.module';
import { DatatypeComponent } from './datatype/datatype.component';
import { DeviceComponent } from './device/device.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { SensorComponent } from './sensor/sensor.component';
import { IotDefaultComponent } from './iot-default/iot-default.component';
import { DashboardModule } from '../dashboard.module';
import { Material } from 'src/app/material';
import { ReusablesModule } from 'src/app/reusables/reusables.module';


@NgModule({
  declarations: [DatatypeComponent, DeviceComponent, MeasurementComponent, SensorComponent, IotDefaultComponent],
  imports: [
    CommonModule,
    IotRoutingModule,
    DashboardModule,
    Material,
    ReusablesModule
  ],
  exports: [DatatypeComponent, DeviceComponent, MeasurementComponent, SensorComponent, IotDefaultComponent]
})
export class IotModule { }
