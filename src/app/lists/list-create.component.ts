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

    isLoading = false;
    
    isPersonal: boolean = true;

    message: string;

    myLists: List[] = [];

    courses: Course[] = [];
    selectedList: List;

    info: any = [];
    
  
    cols = ['subject', 'code', 'name', 'section', 
        'component'];


    constructor(public listsService: ListsService,
                public courseService: CourseService,
        ) {}

    ngOnInit() {
        this.getMyOwnLists();
    }


    getMyOwnLists() {
        this.isLoading = true;
        this.listsService.getMyOwnLists()
            .subscribe(ls => this.myLists = ls);
        
        this.isLoading = false;
    }


    onAddList(form: NgForm): void {
        this.isLoading = true;
        if (form.invalid) {
            return;
        }
        this.listsService.addList(form.value.name, form.value.description).subscribe(
            c => this.myLists.push(c)
        );
        this.getMyOwnLists();
        this.isLoading = false;
        form.resetForm();
        
    }


    deleteList(name: string) {
        this.isLoading = true;
        this.listsService.removeList(name)
          .subscribe();

      this.getMyOwnLists();
      this.isLoading = false;
    }



    switchList(list: List) {
        this.listsService.switchList(list)
            .subscribe();
        this.getMyOwnLists();
    }


    setYear(event: any, subject: string, code: string, listname: string) {
        
        this.listsService.setYear(event.target.value,  subject, code, listname);
    }


    addReview(listName: string, subject: string, code: string, review: string) {
        //console.log(listName + '////' + subject + "/////" + code + "......" + review);
        if (!review) {
            return;
        }
        this.listsService.addReview(listName, subject, code, review);
    }

   
      // select a list
     mySelectedList(list: List){
         this.isLoading = true;
        this.courses = [];
        this.selectedList = list;
        this.info = this.selectedList.classes;
        
        const collect = [];
          for (var p of this.selectedList.classes) {
              this.courseService.searchSubCode(p.subject, p.code)
                .subscribe(c => collect.push(c));
          }
          
          this.courses = collect;     
          
          this.isLoading = false;
          
      }


    removeFromList(subject: string, code: string, listName: string) {
        this.isLoading = true;
        this.listsService.removeFromList(subject, code, listName);
        this.isLoading = false;
    }


      getSelectedListName() {
          return this.selectedList.name;
      }

      //add a course into list
      onAddIntoList(form: NgForm, listName: string): void {
          if (form.invalid) {
            return;
        }
       
        this.listsService.addIntoList(form.value.subject, form.value.code, listName).subscribe();
        form.resetForm();
       
      }



   
   
}
