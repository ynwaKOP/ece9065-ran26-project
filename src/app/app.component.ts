import { Component } from '@angular/core';
import { List } from './lists/list.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedLists: List[] = [];

  onListAdded(list) {
    this.storedLists.push(list);
  }
}
