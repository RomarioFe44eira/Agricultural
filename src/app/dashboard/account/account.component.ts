import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PersonService } from 'src/app/person/person.service';
import { Person } from 'src/app/person/person.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  public person: Person;

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit() {
  this.getPerson();
  }

  getPerson(){
    if (isNullOrUndefined(sessionStorage.getItem('person'))) {
      this.personService.getPersonAuthenticated().subscribe(
        (person: Person) => {
          console.log(person);
          sessionStorage.setItem('person', JSON.stringify(person));
          this.person = person;
        },
        error => {
          console.log(error);
        }
      );
    }
    else{
      this.person = JSON.parse(sessionStorage.getItem('person'));
    }



    
  }

}
