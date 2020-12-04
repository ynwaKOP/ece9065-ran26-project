import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { List } from '../list.model';
import { ListsService } from '../lists.service';
import { Pair } from '../pair.model';

import { Subscription } from 'rxjs';

@Component({
    selector: 'app-show-list',
    templateUrl: './show-list.component.html',
    styleUrls: ['./show-list.component.css']

})
export class ShowListComponent implements OnInit, OnDestroy {
   

    publish: boolean = false;

    selectedList: List;

    lists: List[] = [];
    private listsSub: Subscription;

    constructor(public listsService: ListsService) {}

    ngOnInit() {
        this.lists = this.listsService.getLists();
        this.listsSub = this.listsService.getListUpdateListener()
            .subscribe((lists: List[]) => {
                this.lists = lists;
            });
    }

    ngOnDestroy() {
        this.listsSub.unsubscribe();
    }

    showTable() {
        
    }

    onSelectedList(list: List) {
        this.selectedList = list;
    }
    
    onAddIntoList(form:NgForm) {
        if (form.invalid) {
            return;
        }
        /*
        const pair : Pair = {
            subject: form.value.subject,
            code: form.value.code
        };

        this.selectedList.pairs.push(pair);*/
    }


}


