import {Component, OnInit} from '@angular/core';
import {LessonsService} from '../shared/lessons.service';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {

  lessons: any = [];

  constructor(private lessonsService: LessonsService) {
  }

  ngOnInit() {
    this.lessonsService.getLessons().subscribe(data => {
      this.lessons = data;
    });
  }

}
