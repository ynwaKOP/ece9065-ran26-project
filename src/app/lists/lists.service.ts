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

    private myLists: List[] = [];
    //private user = "user111";


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
            catchError(this.handleError<List[]>('getPublicLists', []))
          );
    }

    getListUpdateListener() {
        return this.listsUpdated.asObservable();
    }


    getMyOwnLists(user:string) {
      const url = 'http://localhost:3000/api/secure/mylists/' + user;
        console.log(url);
        return this.http.get<List[]>(url).pipe(
            catchError(this.handleError<List[]>('search', []))
          );
    }


    
    addList(name: string, description: string, user:string ) {
      const list: List = {name: name, description: description};
      const url = 'http://localhost:3000/api/secure/createList/' + user;
      console.log(url);
      this.http.post<any>('http://localhost:3000/api/secure/createList/' + user, list).subscribe( responseData => {
        console.log(responseData);
        this.myLists.push(list);
        this.listsUpdated.next([...this.myLists]);
      }
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