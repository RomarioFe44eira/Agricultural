import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IotService } from '../iot.service';

import { DataType } from './datatype.model';

@Component({
  selector: 'app-datatype',
  templateUrl: './datatype.component.html',
  styleUrls: ['./datatype.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatypeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'action'];
  dataSource;


  public cardVisible;
  public createOrEdit;

  typeDescription: any;

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
    dType.description = "Credo do Assasino";
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
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
      },
      error => {
        console.log(error);
        alert(error.error.message);
      }
    );
   }


}
