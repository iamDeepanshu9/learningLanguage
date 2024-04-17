import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  obj = {
    lt1: false,
    lt2: false,
    lt3: false,
    lt4: false,
    lt5: false,
    lt6: false,
    lt7: false
  };
  flag1 = false;
  currentUserId;

  constructor(private http: HttpClient) {
  }

  isLogged(i) {
    return this.obj['lt' + i];
  }

  login(x) {
    this.obj.lt1 = x[0];
    this.obj.lt2 = x[1];
    this.obj.lt3 = x[2];
    this.obj.lt4 = x[3];
    this.obj.lt5 = x[4];
    this.obj.lt6 = x[5];
    this.obj.lt7 = x[6];
  }

  getPersons() {
    return this.http.get('http://localhost:3000/persons');
  }

  addPerson(e, p, n) {
    const data = {
      name: n,
      email: e,
      pass: p,
      levels: {
        lt1: true,
        lt2: false,
        lt3: false,
        lt4: false,
        lt5: false,
        lt6: false,
        lt7: false
      }
    };
    return this.http.post('http://localhost:3000/persons', data);
  }

  info(id) {
    this.currentUserId = id;
  }

  changePerson(user) {
    this.obj.lt1 = user.levels.lt1;
    this.obj.lt2 = user.levels.lt2;
    this.obj.lt3 = user.levels.lt3;
    this.obj.lt4 = user.levels.lt4;
    this.obj.lt5 = user.levels.lt5;
    this.obj.lt6 = user.levels.lt6;
    this.obj.lt7 = user.levels.lt7;
    return this.http.put(`http://localhost:3000/persons/${this.currentUserId}`, user);
  }
}
