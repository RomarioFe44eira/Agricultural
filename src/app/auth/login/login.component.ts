import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { SnackbarService } from '../../reusables/snackbar.service';
import { isNullOrUndefined } from 'util';
import { PersonService } from 'src/app/person/person.service';
import { Person } from 'src/app/person/person.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public state: boolean;

  private email: string;
  private password: string;

  public problemAcess = false;
  public emailIsValid;
  public passIsValid;

  constructor(
    private auth: AuthService,
    private router: Router,
    private personService: PersonService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    console.log('ISLOGGED: ' + this.auth.isLogged());
    this.state = this.auth.isLogged();
  }

  setEmail(mail) {
    console.log(mail);
    console.log(mail.value);
    (mail.status == 'VALID') ? this.email = mail.value  : this.email = undefined;
    this.emailIsValid = (mail.status == 'VALID') ? true : false;
  }

  setPassword(password) {
    console.log(password);
    console.log(password.value);
    this.passIsValid = (password.status == 'VALID') ? true : false;
    (password.status == 'VALID') ? this.password = password.value : this.password = undefined;
  }

  executeForm(pAccess?) {
    (pAccess == undefined) ? pAccess = false : pAccess = pAccess;
    if (pAccess) { // Recuperar Senha
      console.log('Recover Password?: ' + pAccess);

      if (!isNullOrUndefined(this.email)) {
        this.auth.recoveryAccount(this.email).subscribe(
          data => {
            console.log(data);
            /* this.snackbar.openSnackBar(data.message, 'OK'); */
            this.router.navigate(['auth']);
          },
          error => {
            console.log(error);
            this.snackbar.openSnackBar(error.error.message, 'OK');
          }
        );
      } else {
        this.snackbar.openSnackBar('Forneça um email válido', 'OK');
      }



    } else { // Realizar autenticação
      console.log('Autenticação Ativado?: ' + !pAccess);


      if (isNullOrUndefined(this.email) || isNullOrUndefined(this.password)) {
        this.snackbar.openSnackBar('Email ou senha inválidos', 'ok');
      } else {
        this.auth.login(this.email, this.password).subscribe(
          data => {
            console.log(data);
            this.auth.currentTokenValue = data;
            sessionStorage.setItem('token', data);
            
            this.personService.getPersonAuthenticated().subscribe(
              (person:Person) => {
                sessionStorage.setItem('person', JSON.stringify(person));
                if (person.admin) this.router.navigate(['/cooperativa']); else this.router.navigate(['/dashboard']);   
              },
              error => {
                console.log(error.error.message);
              }

            );

            /* this.router.navigate(['/dashboard']); */
          },
          error => {
            const e = JSON.parse(error.error);
            this.snackbar.openSnackBar(e.message, error.statusText);
          }
        );
      }
    }
  }

  desconectar() {
    this.auth.logout();
  }

}
