import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { NgForm } from '@angular/forms';
import { List } from '../lists/list.model'
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-visitor-page',
    templateUrl: './visitor.component.html',
    styleUrls: ['./visitor.component.css'],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ],
})

export class VisitorPageComponent implements OnInit {
    //lists: 
    
    pubLists: List[];
    courses: Course[];

    cols = ['subject', 'code', 'name', 'section', 
        'component'];

    expandedElement: Course;

    constructor(private courseService: CourseService) { }

    
    ngOnInit(): void {
    }


    searchCombo(form: NgForm): Course[] {
        if (form.invalid) {
            return;
        }
        this.courseService.searchSubCode(form.value.subject, form.value.code)
          .subscribe( c => this.courses = c);
        form.resetForm();
    }


    searchKeyword(form: NgForm): Course[] {
      if (form.invalid) {
          return;
      }
      this.courseService.searchKeyword(form.value.keyword)
        .subscribe( c => this.courses = c);
      form.resetForm();
  }
    
}


