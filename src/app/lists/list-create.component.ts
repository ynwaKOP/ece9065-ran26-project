import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListsService } from './lists.service';
import { Course } from '../course.model';

import { CourseService } from '../course.service';

import { List } from '../lists/list.model'
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
    selector: 'app-list-create',
    templateUrl: './list-create.component.html',
    styleUrls: ['./list-create.component.css'],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ],
})
export class ListCreateComponent implements OnInit{


    myLists: List[] = [];
    user = "user111";

    courses: Course[] = [];
    selectedList: List;
    expandedElement: Course;
  
    cols = ['subject', 'code', 'name', 'section', 
        'component'];


    constructor(public listsService: ListsService,
                public courseService: CourseService,
        ) {}

    ngOnInit() {
        this.getMyOwnLists();
    }


    getMyOwnLists() {
        this.listsService.getMyOwnLists()
            .subscribe(myLists => this.myLists = myLists);
    }


    onAddList(form: NgForm): void {
        if (form.invalid) {
            return;
        }
        this.listsService.addList(form.value.name, form.value.description).subscribe(
            c => this.myLists.push(c)
        );
        this.getMyOwnLists();
        form.resetForm();
        
    }

   
      // select a list
     mySelectedList(list: List){
          this.selectedList = list;
          const collect = [];
          for (let p of this.selectedList.classes) {
              this.courseService.searchSubCode(p.subject, p.code)
                .subscribe(c => collect.push(c));
          }
          this.courses = collect;
          console.log(this.courses);
         
          
      }


      removeFromList(subject:string, code:string) {
            console.log(subject+ code);
      }


      deleteList(name: string) {
          this.listsService.removeList(name)
            .subscribe();

        this.getMyOwnLists();
      }

   
   
}
