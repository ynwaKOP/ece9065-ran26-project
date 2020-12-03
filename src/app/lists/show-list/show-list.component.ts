import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { List } from '../list.model';
import { Pair } from '../pair.model';

@Component({
    selector: 'app-show-list',
    templateUrl: './show-list.component.html',
    styleUrls: ['./show-list.component.css']

})
export class ShowListComponent {
    /*lists = [
        {name: "my list 111", description:'optional 123123', pairs:[]},
        {name: "my list 222", description:'', pairs:[]},
        {name: "my list 333", description:'optional 33633', pairs:[]},
        {name: "my list 444", description:'', pairs:[]}
    ]*/

    selectedList: List;

    @Input() lists: List[] = [];

    showTable() {
        
    }

    onSelectedList(list: List) {
        this.selectedList = list;
    }

    onAddIntoList(form:NgForm) {
        if (form.invalid) {
            return;
        }
        const pair : Pair = {
            subject: form.value.subject,
            code: form.value.code
        };

        this.selectedList.pairs.push(pair);
    }


}


