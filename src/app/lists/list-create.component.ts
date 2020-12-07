import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListsService } from './lists.service';


import { List } from '../lists/list.model'
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
    selector: 'app-list-create',
    templateUrl: './list-create.component.html',
    styleUrls: ['./list-create.component.css',]
})
export class ListCreateComponent {


    myLists: List[] = [];
    user = "user111";

    constructor(public listsService: ListsService) {}

    ngOnInit() {
        this.getMyOwnLists();
    }

    onAddList(form: NgForm): void {
        if (form.invalid) {
            return;
        }
        this.listsService.addList(form.value.name, form.value.description, this.user);
        form.resetForm();
        
    }

    getMyOwnLists() {
        this.listsService.getMyOwnLists(this.user)
            .subscribe(myLists => this.myLists = myLists);
    }
   
    
   
}
