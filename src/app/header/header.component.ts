import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonsService} from '../shared/persons.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  form: FormGroup;
  email;
  password;
  persons: any = [];
  person: any = {};
  form2: FormGroup;
  email2;
  password2;
  name2;
  personId;
  locStorPerson = [];
  repeatedUser = false;
  signinFlag = true;
  signoutFlag = false;
  registrateFlag = false;
  reg = true;
  online = false;
  incorrectlog = false;

  constructor(private personsService: PersonsService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', Validators.required)
    });

    this.form2 = new FormGroup({
      name2: new FormControl('', Validators.required),
      email2: new FormControl('', [Validators.required, Validators.email]),
      pass2: new FormControl('', Validators.required)
    });

    this.personsService.getPersons().subscribe(data => {
      this.persons = data;
    });

    for (let i = 1; i <= 7; i++) {
      if (localStorage.getItem('lt' + i) == 'true') {
        this.personsService.obj['lt' + i] = true;
      }
      else if (localStorage.getItem('lt' + i) == 'false') {
        this.personsService.obj['lt' + i] = false;
      }
    }

    if (localStorage.getItem('signoutFlag') == 'true') {
      this.signoutFlag = true;
    }

    if (localStorage.getItem('online') == 'true') {
      this.online = true;
    }

    if (localStorage.getItem('reg') == 'false') {
      this.reg = false;
    }

    if (localStorage.getItem('signinFlag') == 'false') {
      this.signinFlag = false;
    }

    if (localStorage.getItem('registrateFlag') == 'false') {
      this.registrateFlag = false;
    }

    this.name2 = localStorage.getItem('name');
  }

  login() {
    this.email = this.form.get('email').value;
    this.password = this.form.get('pass').value;
    for (let i = 0; i < this.persons.length; i++) {
      if (this.email === this.persons[i].email && this.password === this.persons[i].pass) {
        this.person = this.persons[i];
      }
    }

    if (this.person.id) {
      this.incorrectlog = false;
      this.name2 = this.person.name;
      this.personsService.info(this.person.id);
      localStorage.setItem('lt1', this.person.levels.lt1);
      localStorage.setItem('lt2', this.person.levels.lt2);
      localStorage.setItem('lt3', this.person.levels.lt3);
      localStorage.setItem('lt4', this.person.levels.lt4);
      localStorage.setItem('lt5', this.person.levels.lt5);
      localStorage.setItem('lt6', this.person.levels.lt6);
      localStorage.setItem('lt7', this.person.levels.lt7);

      // nor kod
      for (let i = 1; i <= 7; i++) {
        if (localStorage.getItem('lt' + i) == 'true') {
          this.locStorPerson.push(true);
        }
        else if (localStorage.getItem('lt' + i) == 'false') {
          this.locStorPerson.push(false);
        }
      }
      this.personsService.login(this.locStorPerson);
      this.signinFlag = false;
      this.signoutFlag = true;
      this.reg = false;
      this.online = true;

      localStorage.setItem('signoutFlag', 'true');
      localStorage.setItem('online', 'true');
      localStorage.setItem('signinFlag', 'false');
      localStorage.setItem('registrateFlag', 'false');
      localStorage.setItem('reg', 'false');
      localStorage.setItem('name', this.name2);
    }
    else
      this.incorrectlog = true;

  }

  registrate() {
    this.email2 = this.form2.get('email2').value;
    this.password2 = this.form2.get('pass2').value;
    this.name2 = this.form2.get('name2').value;
    for (let i = 0; i < this.persons.length; i++) {
      if (this.email2 === this.persons[i].email) {
        this.repeatedUser = true;
      }
    }
    if (!this.repeatedUser) {
      this.personsService.addPerson(this.email2, this.password2, this.name2).subscribe(data => {
        this.persons.push(data);
      });
    }
    this.reg = false;
    this.signinFlag = false;
    this.signoutFlag = false;
    if (this.repeatedUser) {
      this.registrateFlag = true;
      this.registrateFlag = false;
      this.signinFlag = true;
      this.reg = true;
      alert('User already registered');
      window.location.href = 'http://localhost:4200';
    }
    else if (!this.repeatedUser) {
      this.repeatedUser = false;
      this.signinFlag = true;
      this.registrateFlag = false;
      this.reg = true;
    }
  }

  logout() {
    // localStorage.removeItem('email');
    for (let i = 1; i <= 7; i++) {
      localStorage.removeItem('lt' + i);
    }
    localStorage.removeItem('signoutFlag');
    localStorage.removeItem('online');
    localStorage.removeItem('signinFlag');
    localStorage.removeItem('registrateFlag');
    localStorage.removeItem('reg');
    localStorage.removeItem('name');
    window.location.href = 'http://localhost:4200';
  }

  changeFlags() {
    this.signinFlag = false;
    this.registrateFlag = true;
    this.reg = false;
  }
}
