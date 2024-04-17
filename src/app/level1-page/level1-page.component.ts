import {Component, OnInit} from '@angular/core';
import {LessonsService} from '../shared/lessons.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-level1-page',
  templateUrl: './level1-page.component.html',
  styleUrls: ['./level1-page.component.css']
})
export class Level1PageComponent implements OnInit {

  lessons: any = [];
  currentLesson;
  flag = false;
  k;

  constructor(private lessonsService: LessonsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.lessonsService.getLessons().subscribe(data => {
      this.lessons = data;
      this.currentLesson = this.lessons[0][0];
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.k = +params['i'];
    });
  }

  openModal(num) {
    this.flag = true;
    this.currentLesson = this.lessons[this.k][num];
  }


}
