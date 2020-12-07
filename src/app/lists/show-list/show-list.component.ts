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

    myLists: List[] = [];




    constructor(public listsService: ListsService) {}

    ngOnInit() {
        this.getPublicLists();
    }


    getPublicLists() {
        this.listsService.getPubLicLists()
            .subscribe(lists => this.lists = lists.reverse());

    }

    ngOnDestroy() {
        this.listsSub.unsubscribe();
    }


    onSelectedList(list: List) {
        this.selectedList = list;
    }
    



}


