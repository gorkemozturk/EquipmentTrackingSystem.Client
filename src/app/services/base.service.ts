import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private url: string, private http: HttpClient) { }

  getResources(params?: Params): Observable<any> {
    return this.http.get<any>(this.url, { params: params, observe: 'response' }).pipe(
      share(),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getResource(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/' + id).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  postResource(resource: any): Observable<any> {
    return this.http.post<any>(this.url + '/', resource).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  putResource(id: number, resource: any): Observable<any> {
    return this.http.put<any>(this.url + '/' + id, resource).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteResource(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
