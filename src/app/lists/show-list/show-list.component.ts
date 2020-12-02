import { Component } from '@angular/core';

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

    lists = [];
}
