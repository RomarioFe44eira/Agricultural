import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { API } from 'src/app/app.const';

@Component({
  selector: 'app-toolbar-default',
  templateUrl: './toolbar-default.component.html',
  styleUrls: ['./toolbar-default.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarDefaultComponent implements OnInit {
  titleToolbar = API.projectName;


  constructor() { }

  ngOnInit() {
    
  }

}
