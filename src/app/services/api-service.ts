import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = 'https://localhost:7041/api'; // ✅ Change to your backend base URL

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': `Bearer ${token}` // optional if JWT auth is needed
    });
  }

  // ✅ Generic GET
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() })
      .pipe(
        map((res: ApiResponse<T>) => {
          if (!res.success) throw new Error(res.message || 'Request failed');
          if (res.data === null) throw new Error('No data returned');
          return res.data;
        }),
        catchError(this.handleError)
      );
  }

  // ✅ Generic POST
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, body, { headers: this.getHeaders() })
      .pipe(
        map((res: ApiResponse<T>) => {
          if (!res.success) throw new Error(res.message || 'Request failed');
          if (res.data === null) throw new Error('No data returned');
          return res.data;
        }),
        catchError(this.handleError)
      );
  }

  // ✅ Generic PUT
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, body, { headers: this.getHeaders() })
      .pipe(
        map((res: ApiResponse<T>) => {
          if (!res.success) throw new Error(res.message || 'Request failed');
          if (res.data === null) throw new Error('No data returned');
          return res.data;
        }),
        catchError(this.handleError)
      );
  }

  // ✅ Generic DELETE
  delete<T>(endpoint: string): Observable<T | null> {
    return this.http.delete<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() })
      .pipe(
        map((res: ApiResponse<T>) => {
          if (!res.success) throw new Error(res.message || 'Request failed');
          if (res.data === null) throw new Error('No data returned');
          return res.data;
        }),
        catchError(this.handleError)
      );
  }

  // ✅ Error Handler
  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server-side
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMsg);
  }
}


export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string; // Remove the '?' to make it required
  errors?: string[];
}