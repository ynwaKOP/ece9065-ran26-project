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

    newListName = 'name';
    listDescription = 'descript';

    constructor(public listsService: ListsService) {}



    onAddList(form: NgForm): void {
        if (form.invalid) {
            return;
        }

        this.listsService.addList(form.value.name, form.value.description);
        form.resetForm();
        
    }
    
   
}
