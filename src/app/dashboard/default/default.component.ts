import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {


  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }


  logout() {
    this.auth.logout();
  }

}
