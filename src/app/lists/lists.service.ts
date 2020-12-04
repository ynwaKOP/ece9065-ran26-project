import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { List } from './list.model'


@Injectable({providedIn: 'root'})
export class ListsService {
    private lists: List[] = [];
    private listsUpdated = new Subject<List[]>();

    getLists() {
        return [...this.lists]; //copy the element of the lists array
    }

    getListUpdateListener() {
        return this.listsUpdated.asObservable();
    }

    addList(name: string, description: string) {
        const list: List = {
            name: name,
            description: description,
            
        };

        this.lists.push(list);
        this.listsUpdated.next([...this.lists]);
    }

}