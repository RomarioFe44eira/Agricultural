import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IotService } from '../iot.service';

import { DataType } from './datatype.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-datatype',
  templateUrl: './datatype.component.html',
  styleUrls: ['./datatype.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatypeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  public dTypeListaTable: DataType;

  constructor(
    private iotSevice: IotService
  ) { }

  ngOnInit() {
    this.readAllDataTypes();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  insertDataType(){
    let dType: DataType = new DataType();
    dType.description = "Km";
    dType.person = {id: 85};
    

   this.iotSevice.insertDataType(dType).subscribe(
      data => {
        console.log(data);
        alert("inseriu");
      },
      error => {
        console.log(error);
        alert(error.error.message);

      }
    );
   }

   readAllDataTypes(){
    this.iotSevice.readAllDataType().subscribe(
      (data: DataType) => {
        console.log(data);
        this.dTypeListaTable = data
        alert("Obteve as dados");
      },
      error => {
        console.log(error);
        alert(error.error.message);
      }
    );
   }


}
