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
    
    private listsUpdated = new Subject<List[]>();


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




    addIntoList(subject: string, code: string, listName: string) {
        const url = 'http://localhost:3000/api/secure/addCourse';
        const c = {
            subject: subject,
            code: code,
            name: listName
        };

        return this.http.post<any>(url, c).pipe(
          catchError(this.handleError<any>('addIntoList'))
        )

    }


    removeFromList(subject: string, code: string, listName: string) {
        console.log(subject+code+listName);
        const url = 'http://localhost:3000/api/secure/deleteCourse/' + listName + '/' + subject + '/' + code;
        console.log(url)
        return this.http.delete<any>(url, this.httpOptions).subscribe();
    }


    setYear(y: string, subject: string, code: string, listName: string) {

      const temp = {
          year: y,
          subject: subject,
          code: code,
          name: listName
      }

        const url = 'http://localhost:3000/api/secure/setYear';
        
        return this.http.post<any>(url, temp).subscribe();
    }



    addReview(listName: string, subject: string, code: string, review: string) {
      const temp = {
        name: listName,
        subject: subject,
        code: code,
        review: review,
      }

      const url = 'http://localhost:3000/api/secure/addReview';
        
      return this.http.post<any>(url, temp).subscribe();
      
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