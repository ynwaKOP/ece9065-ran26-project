import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { NgForm } from '@angular/forms';
import { List } from '../lists/list.model'

@Component({
    selector: 'app-visitor-page',
    templateUrl: './visitor.component.html',
    styleUrls: ['./visitor.component.css']
})

export class VisitorPageComponent implements OnInit {
    //lists: 
    
    pubLists: List[];
    courses: Course[];
    
    constructor(private courseService: CourseService) { }

    
    ngOnInit(): void {
    }


    searchCombo(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.courseService.searchSubCode(form.value.subject, form.value.code)
          .subscribe( c => this.courses = c);
        form.resetForm();
    }
    
}



