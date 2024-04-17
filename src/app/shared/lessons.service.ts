import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) {
  }

  getLessons() {
    return this.http.get('http://localhost:3000/lessons');
  }
}
