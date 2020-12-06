import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListsService } from './lists.service';

@Component({
    selector: 'app-list-create',
    templateUrl: './list-create.component.html',
    styleUrls: ['./list-create.component.css',]
})
export class ListCreateComponent {

    newListName = 'name';
    listDescription = 'descript';

    constructor(public listsService: ListsService) {}


    
    onAddList(form: NgForm) {
        if (form.invalid) {
            return;
        }
        /*
        this.listsService.addList(form.value.name, form.value.description);*/
        form.resetForm();
        
    } 
   
}
