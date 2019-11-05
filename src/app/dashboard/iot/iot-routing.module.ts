import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IotDefaultComponent } from './iot-default/iot-default.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { DatatypeComponent } from './datatype/datatype.component';
import { DeviceComponent } from './device/device.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { SensorComponent } from './sensor/sensor.component';


const routes: Routes = [
  {path: '', component: IotDefaultComponent, canActivate: [AuthGuard]},
  {path: 'datatype', component: DatatypeComponent, canActivate: [AuthGuard]},
  {path: 'device', component: DeviceComponent, canActivate: [AuthGuard]},
  {path: 'measurement', component: MeasurementComponent, canActivate: [AuthGuard]},
  {path: 'sensor', component: SensorComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IotRoutingModule { }
