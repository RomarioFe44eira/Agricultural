import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IotService } from '../iot.service';

import { DataType } from './datatype.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SnackbarService } from 'src/app/reusables/snackbar.service';
import { PersonService } from 'src/app/person/person.service';
import { Person } from 'src/app/person/person.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-datatype',
  templateUrl: './datatype.component.html',
  styleUrls: ['./datatype.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatypeComponent implements OnInit {
  public dataSource;
  public cardVisible
  public createOrEdit;
  public datatype: FormGroup;

  public dTypeGlobal: DataType;

  displayedColumns: string[] = ['id', 'description', 'action'];
  
  constructor(
    private iotSevice: IotService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private personService: PersonService
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
    let dType: DataType = new DataType();
    dType.description = this.datatype.value.description;

    this.personService.getPersonAuthenticated().subscribe(
      (data: Person) => {
        dType.person = {id: data.id};
        console.log(data.id);
      },
      error =>{
        console.log(error);
        this.snackbarService.openSnackBar(error.error.message);
      }
    );

    if(!isNullOrUndefined(dType.description)){
      this.iotSevice.insertDataType(dType).subscribe(
        data => {
          console.log(data);
          this.snackbarService.openSnackBar('Data Type create sucessfuly!');
        },
        error => {
          console.log(error);
          this.snackbarService.openSnackBar(error.error.message);
        }
      );
    }
    else{
      this.snackbarService.openSnackBar('You must enter a description');
    }
  }

   readAllDataTypes(){
    this.iotSevice.readAllDataType().subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        /* this.dataSource = data; */
      },
      error => {
        console.log(error);
        alert(error.error.message);
      }
    );
  }

  //CORRIGIR
  deleteDataType(dType: DataType){
    console.log(dType);
    
    this.iotSevice.deleteDataType(dType).subscribe(
      data =>{
        console.log(data);
        /* delete(this.dataSource.data[dType.id]); */

        let i = 0;
        this.dataSource.data.forEach(element => {
          if (element.id == dType.id) {
            delete(this.dataSource.data[i]);
          }
          i++;
        });
      },
      error => {
        console.log(error);
      }
    );
  }


  updateDataType(dType: DataType){
    console.log('update');
    
    dType = this.dTypeGlobal;
    dType.description = this.datatype.value.description;
    console.log(dType);

    if (!isNullOrUndefined(dType.description)) {
      this.iotSevice.updateDataType(dType).subscribe(
        data => {
          console.log(data);
          this.snackbarService.openSnackBar(dType.description + ' foi atualizado!');
        },
        error => {
          console.log(error);
          this.snackbarService.openSnackBar('Data type ' + dType.description + ' não atualizado!');
        }
      );
    }
    else{
      this.snackbarService.openSnackBar('Campo vaziu');
    }

   
  }




}
