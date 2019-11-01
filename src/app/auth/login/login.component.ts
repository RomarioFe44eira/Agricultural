import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public state: boolean;

  private email: string;
  private password: string;

  public problemAcess: boolean = false;
  public emailIsValid;
  public passIsValid;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("ISLOGGED: " + this.auth.isLogged());
    this.state = this.auth.isLogged();
  }

  setEmail(mail){
    console.log(mail);
    console.log(mail.value);
    (mail.status == 'VALID') ? this.email = mail.value  : this.email = undefined;
    this.emailIsValid = (mail.status == 'VALID') ? true : false;
  }

  setPassword(password){
    console.log(password);
    console.log(password.value);
    this.passIsValid = (password.status == 'VALID') ? true : false;
    (password.status == 'VALID') ? this.password = password.value : this.password = undefined;
  }

  executeForm(pAccess?){
    (pAccess == undefined) ? pAccess = false : pAccess = pAccess;
    if (pAccess) {
      console.log('Obter Acesso a conta: ' + pAccess);
    }
    else {
      console.log('Realizar login: ' + pAccess);
      this.auth.login(this.email, this.password).subscribe(
        data => {
          console.log(data)
          this.auth.currentTokenValue = data;
          sessionStorage.setItem('token', data);
          this.router.navigate(['/dashboard']);
        },
        error => {
          alert("Ocorreu um erro");
        }

      )

    }
  }

  desconectar(){
    this.auth.logout();
  }

}
