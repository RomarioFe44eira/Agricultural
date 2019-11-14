import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PersonService } from 'src/app/person/person.service';
import { Person } from 'src/app/person/person.model';

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
    this.personService.getPersonAuthenticated().subscribe(
      (person: Person) => {
        console.log(person);
        this.person = person;
      },
      error => {
        console.log(error);
      }
    );
  }

}
