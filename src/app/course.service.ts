import { Course } from './course.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})


export class CourseService {

    //private coursesUrl = "/api/open/courses/"
    private coursesUrl = 'http://localhost:3000/api/open/courses/'

    ///api/open/courses/:subject/:code
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    

    constructor(
        private http: HttpClient
    ) { }

    searchSubCode(subject: string, code: string): Observable<Course> {
        if (!subject.trim() || !code.trim()) {
            // if not search term, return empty hero array.
            return of();
        }
      
        const url = 'http://localhost:3000/api/open/courses/' + subject + '/' + code;
        console.log(url);
        return this.http.get<Course>(url).pipe(
            catchError(this.handleError<Course>('searchSubCode'))
          );
    }


    searchKeyword(keyword: string): Observable<Course[]> {
      if (!keyword.trim()) {
          // if not search term, return empty hero array.
          return of([]);
      }
    
      const url = 'http://localhost:3000/api/open/keyword/' + keyword;
      console.log(url);
      return this.http.get<Course[]>(url).pipe(
          catchError(this.handleError<Course[]>('searchKeyword'))
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