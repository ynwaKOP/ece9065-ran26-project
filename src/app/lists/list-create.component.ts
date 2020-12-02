import { Component } from '@angular/core';


@Component({
    selector: 'app-list-create',
    templateUrl: './list-create.component.html'
})
export class ListCreateComponent {

    enteredValue = '';
    newList = 'no content';

    onAddList() {
        
        this.newList = this.enteredValue;
    }
}