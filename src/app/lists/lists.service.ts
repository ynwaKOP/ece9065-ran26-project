import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { List } from './list.model'
import { HttpClientModule } from '@angular/common/http'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';



@Injectable({providedIn: 'root'})


export class ListsService {
    private lists: List[] = [];
    private listsUpdated = new Subject<List[]>();


    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      constructor(
        private http: HttpClient,
        
    ) { }

    getPubLicLists() {
        const url = 'http://localhost:3000/api/open/publiclists';
        console.log(url);
        return this.http.get<List[]>(url).pipe(
            catchError(this.handleError<List[]>('searchHeroes', []))
          );
    }

    getListUpdateListener() {
        return this.listsUpdated.asObservable();
    }

    /*
    addList(name: string, description: string) {
        const list: List = {
            name: name,
            description: description
            
        };

        this.lists.push(list);
        this.listsUpdated.next([...this.lists]);
    } */


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }



    

}