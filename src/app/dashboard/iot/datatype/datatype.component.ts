import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IotService } from '../iot.service';

import { DataType } from './datatype.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-datatype',
  templateUrl: './datatype.component.html',
  styleUrls: ['./datatype.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatypeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'action'];
  dataSource;

  public textValue;

  public dType: DataType;

  public cardVisible;
  public createOrEdit;

  typeDescription: any;

  public dTypeListaTable: DataType;

  datatype: FormGroup;

  
  constructor(
    private iotSevice: IotService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.readAllDataTypes();

    this.datatype = this.fb.group({
      description: ['', [Validators.required, Validators.min(2)]]
    });
  
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  insertDataType() {
    console.log(this.datatype.value.description);
    this.dType.description = this.datatype.value.description;
    this.dType.person = { id: 85 };
    
    this.iotSevice.insertDataType(this.dType).subscribe(
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
