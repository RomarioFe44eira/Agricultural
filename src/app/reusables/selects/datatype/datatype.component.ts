import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataType } from 'src/app/dashboard/iot/datatype/datatype.model';
import { IotService } from 'src/app/dashboard/iot/iot.service';
import { SnackbarService } from '../../snackbar.service';

@Component({
  selector: 'app-select-datatype',
  templateUrl: './datatype.component.html',
  styleUrls: ['./datatype.component.css']
})
export class DatatypeComponent implements OnInit {


  public formDataType: FormGroup;

  @Output() public outDataTypeSelected = new EventEmitter<any>();

  @Input() public inLabel: string = 'Select a Data Type';
  @Input() public inVisible: boolean = true;
  @Input() public inDisabled: boolean = false;
  @Input() public inValueSelectedInitial: string;


  public dataTypes: DataType[] = [];

  constructor(
    private dataTypeService: IotService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.getAllDataTypes();

    this.formDataType = this.fb.group({
      datatype: [this.inValueSelectedInitial, Validators.required]
    });

  }

  getAllDataTypes(){
    this.dataTypeService.readAllDataType().subscribe(
      (dataType: DataType[]) => {
        this.dataTypes = dataType;
        console.log( this.dataTypes);
      },
      error => {
        console.log('Ocorreu um erro em datatype.component.ts');
        console.log(error);
      }
    );

  }

  changeDataType(){
    this.dataTypes.forEach(dataTypeItem => {
      if (dataTypeItem.description == this.formDataType.value.datatype) {
        this.outDataTypeSelected.emit(dataTypeItem);
        console.log(dataTypeItem);
      }
    })
  }

}
