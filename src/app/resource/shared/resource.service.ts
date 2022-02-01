import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Resource } from './resource.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private http: HttpClient) {}

  public getResources(): Observable<Resource[]> {
    return this.http
      .get<Resource[]>('/api/resources')
      .pipe(catchError(this.handleError));
  }
  public getResourcesById(id: string): Observable<Resource> {
    return this.http
      .get<Resource>('/api/resources/' + id)
      .pipe(catchError(this.handleError));
  }

  public searchResources(searchedTerm: string): Observable<Resource[]> {
    return this.http
      .get<Resource[]>(`/api/resources/s/${searchedTerm}`)
      .pipe(catchError(this.handleError));
  }
  public updateResource(id: string, body: Resource): Observable<Resource> {
    return this.http
      .patch<Resource>(`/api/resources/${id}`, body)
      .pipe(catchError(this.handleError));
  }

  public createResource(body: Resource): Observable<Resource> {
    return this.http
      .post<Resource>(`/api/resources`, body)
      .pipe(catchError(this.handleError));
  }

  public deleteResource(id: string): Observable<Resource> {
    return this.http.delete<Resource>(`/api/resources/${id}`);
  }

  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    let message;
    if (errorRes.error instanceof ErrorEvent) {
      message = errorRes.error.message;
    } else {
      message = errorRes.error;
    }
    return throwError(message);
  }
}
