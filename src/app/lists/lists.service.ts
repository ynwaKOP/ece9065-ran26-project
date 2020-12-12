import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { List } from './list.model'
import { HttpClientModule } from '@angular/common/http'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})

export class ListsService {
    private lists: List[] = [];
    private listsUpdated = new Subject<List[]>();

    private myLists: List[] = [];
    //private user = "user111";


    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      constructor( private http: HttpClient, private router: Router) { }

    getPubLicLists() {
        const url = 'http://localhost:3000/api/open/publiclists';
        console.log(url);
        return this.http.get<List[]>(url).pipe(
            catchError(this.handleError<List[]>('getPublicLists', []))
          );
    }

    getListUpdateListener() {
        return this.listsUpdated.asObservable();
    }


    getMyOwnLists() {
      const url = 'http://localhost:3000/api/secure/mylists/';
        console.log(url);
        return this.http.get<List[]>(url).pipe(
            catchError(this.handleError<List[]>('search', []))
          );
    }


    switchList(list: List) {
      const url = 'http://localhost:3000/api/secure/publish';
      const theList: List = {
        name: list.name, 
        description: list.description, 
        classes:list.classes, 
        isPersonal: !list.isPersonal
      };
      console.log(url);
      return this.http.post<List>(url, theList).pipe(
        catchError(this.handleError<List>())
      );

    }


    
    addList(name: string, description: string) {
      const list: List = {name: name, description: description, classes:[], isPersonal: true};
      const url = "http://localhost:3000/api/secure/createList";
      console.log(url);
      return this.http.post<List>(url, list).pipe(
        catchError(this.handleError<List>('addList'))
        
        //this.router.navigate(['/'])
      );
      
    }
    
    
    removeList(name: string) {
      const url = 'http://localhost:3000/api/secure/deleteList/' + name;
      console.log(url);
      return this.http.delete<List>(url).pipe(
        catchError(this.handleError<List>('deleteList'))
      );

    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }



    

}