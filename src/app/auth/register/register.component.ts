import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Country } from './country.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';
import { PersonService } from 'src/app/person/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isLinear = false;
  public dadosPessoais: FormGroup;
  public contato: FormGroup;
  public phone: FormGroup;
  public localizacao: FormGroup;
  public auth: FormGroup;
  public spinnerVisivel: boolean = true;
  public erroAoCadastrar: any;
  public country: Country[];

  constructor(
    private _formBuilder: FormBuilder,
    private personService: PersonService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit() {

    this.personService.getPaises().subscribe(
      (data: Country[]) => {
        this.country = data
        /* console.log(data) */
      },
      error => {
        console.log(error);
      }
    );



    this.dadosPessoais = this._formBuilder.group({
      name: ['', Validators.required],
      birth: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.contato = this._formBuilder.group({
      mail: ['', Validators.required],
      phoneCode: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.auth = this._formBuilder.group({
      senha: ['', [Validators.required, Validators.minLength(8)]],
      cosenha: ['', Validators.required]
    }, { validator: this.checkPasswords });

  }


  updateFormGroupContato() {
    console.log("Evento executado!");

    this.country.forEach(c => {
      if (c.id == this.dadosPessoais.value.country) {
        this.contato.value.phoneCode = c.phoneCode;
      }
    });

    console.log(this.dadosPessoais);

  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('senha').value;
    let confirmPass = group.get('cosenha').value;
    return pass === confirmPass ? null : { notSame: true, passLength: !(pass >= 8) ? true : false }
  }

  resposta($event) {
    console.log($event);
  }

  sendForm() {
    //let data = [this.dadosPessoais.value, this.contato.value, this.auth.value];
    //console.log(JSON.stringify(data));

    let form = {
      "name": this.dadosPessoais.value.name,
      /* "birth": moment(this.dadosPessoais.value.birth).format("YYYY-MM-DDTHH:mm:ssZZ"), */
      "birth": this.dadosPessoais.value.birth,
      "mail": this.contato.value.mail,
      "phone": this.contato.value.phone,
      "password": this.auth.value.senha,
      "country": {
        "id": this.dadosPessoais.value.country
      },
      "phoneCode": {
        "id": this.contato.value.phoneCode
      }
    }
    console.log(form);
   /*  this.authService.cadastro(JSON.stringify(form))
      .subscribe(
        person => {
          console.log(person)
          this.openSnackBar('Account successfully created, please login.', 'ok');
          this.router.navigate(['/Auth/Login']);
        },
        error => {
          this.spinnerVisivel = false;
          this.erroAoCadastrar = error.status;
          switch (error.status) {
            case 400: 
              console.log("Rule not respected");
              this.openSnackBar('Email or contact already registered by another user.', 'ok');
            break;
            case 401:
              console.log("Authentication Required");
              this.openSnackBar('Authentication Required', 'ok');
            break;
            case 403: 
              console.log("Authorization Required"); 
              this.openSnackBar('Authorization Required");', 'ok');
            break;
            case 404: 
              console.log("Resource not found"); 
              this.openSnackBar('Resource not found', 'ok');
              break;
            case 415: 
              console.log("Unsupported media type"); 
              this.openSnackBar('Unsupported media type', 'ok');
              break;
            case 500: 
              console.log("Internal server error"); 
              this.openSnackBar('Error persisting dodos on server, check your information.', 'ok');
              break;
            case 0: 
              console.log("No server connection."); 
              this.openSnackBar('No server connection.', 'ok');
              break;
            default: return alert(`Backend returned code ${error.status}, ` + `body was: ${error.error}` + '\n Contact the administrator');
          }
          console.log(error);
        } 
      );*/


   


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
