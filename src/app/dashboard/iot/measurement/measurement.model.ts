export class Measurement {
    id?: number;
    value?: number;
    description?: string;
    geometry?: string;
    dateTime?: string;
    sensor?: { id?: number };
    unitMeasurement?: { id?: number }
}
