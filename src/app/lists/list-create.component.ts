import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { List } from './list.model';

@Component({
    selector: 'app-list-create',
    templateUrl: './list-create.component.html',
    styleUrls: ['./list-create.component.css',]
})
export class ListCreateComponent {

    newListName = 'name';
    listDescription = 'descript';
    //enteredSub = 'sub';
    //enteredCode = 'code';
    //addNewRow = false;
    @Output() listCreated = new EventEmitter<List>();

    onAddList(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const list: List = {
            name: form.value.name,
            description: form.value.description,
            pairs: []
        };
        this.listCreated.emit(list);
        
    }
   
}
