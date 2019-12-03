import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarService } from '../../snackbar.service';
import { EventEmitter } from 'events';


@Component({
  selector: 'app-input-generic',
  templateUrl: './input-generic.component.html',
  styleUrls: ['./input-generic.component.css']
})
export class InputGenericComponent implements OnInit {

  @Input() label: string = "Label description";
  @Input() icon: string = "settings";
  @Input() matTooltip: string = "matTooltip"
  @Input() appearance: string = "fill"
  @Input() placeholder: string = "Placeholder"

  
  /* @Output() outValue: string = new EventEmitter<any>(); */


  public genericText = new FormControl(
    '', [Validators.required]
  );

  constructor(private snack: SnackbarService) { }

  ngOnInit() {
  }

 /*  genericChange() {
    if (this.genericText.status == 'VALID') {
      this.outValue.emit(this.genericText.value);
    } else {
      this.snack.openSnackBar('Your email has errors');
    }
  } */

}
