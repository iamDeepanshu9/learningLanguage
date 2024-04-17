import {Component, OnInit} from '@angular/core';
import {TestService} from '../shared/test.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {PersonsService} from '../shared/persons.service';

@Component({
  selector: 'app-test1-page',
  templateUrl: './test1-page.component.html',
  styleUrls: ['./test1-page.component.css']
})
export class Test1PageComponent implements OnInit {

  tests: any = [];
  data = [];
  form: FormGroup;
  counter = 0;
  hiddenTest;
  k;
  disabledTest = false;
  persons: any = [];
  person: any = {};
  j;
  numberOfCorrect = false;
  nextLevel = false;
  tryAgain = false;

  constructor(private testsService: TestService, private route: ActivatedRoute, private personsService: PersonsService) {
  }

  ngOnInit() {
    this.testsService.getTests().subscribe(data => {
      this.tests = data;
      this.data.push(this.tests[this.k]);
    });

    this.form = new FormGroup({
      radioJan0: new FormControl(),
      radioJan1: new FormControl(),
      radioJan2: new FormControl(),
      radioJan3: new FormControl(),
      radioJan4: new FormControl(),
      radioJan5: new FormControl(),
      radioJan6: new FormControl(),
      radioJan7: new FormControl(),
      radioJan8: new FormControl(),
      radioJan9: new FormControl()
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.k = +params['i'];
    });
  }

  finish() {
    for (let i = 0; i < this.data[0].length; i++) {
      if (this.form.get('radioJan' + i).value === this.data[0][i].rightAnswer) {
        this.counter++;
      }
    }
    setTimeout(() => {
      this.hiddenTest = true;
    }, 3000);
    // console.log(this.counter);
    this.disabledTest = true;

    this.personsService.getPersons().subscribe(data => {
      this.persons = data;
      for (let i = 0; i < this.persons.length; i++) {
        if (this.persons[i].id === this.personsService.currentUserId) {
          this.person = this.persons[i];
        }
      }

      if (this.counter >= 8 && this.k <= 5) {
        this.numberOfCorrect = true;
        this.nextLevel = true;
        this.j = this.k + 2;
        localStorage.setItem('lt' + this.j, 'true');
        this.personsService.obj['lt' + this.j] = true;
        this.person.levels['lt' + this.j] = true;
        this.personsService.changePerson(this.person).subscribe();
      }
      else if (this.counter < 8) {
        this.tryAgain = true;
        this.numberOfCorrect = true;
      }
    });


  }

}
