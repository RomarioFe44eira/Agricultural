import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SnackbarService } from '../../snackbar.service';
import { IotService } from 'src/app/dashboard/iot/iot.service';
import { Device } from 'src/app/dashboard/iot/device/device.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  public formDevice: FormGroup;

  @Output() public outDeviceSelectedValue = new EventEmitter<any>();

  @Input() public inLabel: string = 'Select a device';
  @Input() public inVisible: boolean = true;
  @Input() public inDisabled: boolean = true;
  @Input() public inValueSelectedInitial;


  public devices: Device[] = [];

  constructor(
    private deviceService: IotService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.getAllDevices();

    this.formDevice = this.fb.group({
      device: [this.inValueSelectedInitial, Validators.required]
    });

  }

  getAllDevices(){
    this.deviceService.readAllDevice().subscribe(
      (device: Device[]) => {
        this.devices = device;
        /* console.log(device); */
        console.log(this.devices);
      },
      error => {
        console.log('Ocorreu um erro em device.component.ts - linha 35');
        console.log(error);
      }
    );

  }

  changeDevice(){
    this.devices.forEach(deviceItem => {
      if (deviceItem.description == this.formDevice.value.device) {
        this.outDeviceSelectedValue.emit(deviceItem);
        console.log(deviceItem);
      }
    })
  }

}
