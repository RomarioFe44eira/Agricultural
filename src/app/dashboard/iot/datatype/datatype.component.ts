import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IotService } from '../iot.service';

import { DataType } from './datatype.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SnackbarService } from 'src/app/reusables/snackbar.service';
import { PersonService } from 'src/app/person/person.service';
import { Person } from 'src/app/person/person.model';
import { isNullOrUndefined } from 'util';

import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-datatype',
  templateUrl: './datatype.component.html',
  styleUrls: ['./datatype.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatypeComponent implements OnInit {
  dataSource = new MatTableDataSource<DataType>([]);
  
  public cardVisible:boolean;
  public createOrEdit:boolean;

  public datatype: FormGroup;
  public dTypeGlobal: DataType;

  displayedColumns: string[] = ['id', 'description', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private iotSevice: IotService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private personService: PersonService
  ) { }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;

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
        (data: DataType) => {
          console.log(data);
          this.dataSource.data.push(data);
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
      (data: DataType[]) => {
        console.log(data);
        this.dataSource.data = data;
        /* console.log(this.dataSource.data); */
      },
      error => {
        console.log(error);
        alert(error.error.message);
      }
    );
  }

  //CORRIGIR
  deleteDataType(dType: DataType, position: number){
    console.log(dType);
    
    this.iotSevice.deleteDataType(dType).subscribe(
      data =>{
        console.log(data);
        delete(this.dataSource.data[position]);
        this.snackbarService.openSnackBar('Data type deleted!');
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
          this.cardVisible = false;
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


  public editCase(i:number){
    console.log('id: '+i);
    this.datatype.value.description = this.dataSource.data[i].description;
    this.dTypeGlobal = this.dataSource.data[i];
    this.cardVisible = true;
    this.createOrEdit = false;
  }

  


}
