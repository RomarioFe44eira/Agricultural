import { Person } from 'src/app/person/person.model';
import { Device } from '../device/device.model';
import { DataType } from '../datatype/datatype.model';

export class Sensor {
    device: Device;
    dataType: DataType;
}

