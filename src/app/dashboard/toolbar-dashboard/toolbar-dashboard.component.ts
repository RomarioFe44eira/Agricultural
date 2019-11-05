import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-toolbar-dashboard',
  templateUrl: './toolbar-dashboard.component.html',
  styleUrls: ['./toolbar-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarDashboardComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }


  logout() {
    this.auth.logout();
  }

}
