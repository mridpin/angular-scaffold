import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  get(path: string, options?: any): Observable<any> {
    return this.http.get<any>(path, options);
  }

  post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post<any>(url, body, options);
  }

  put(url: string, body: any, options?: any): Observable<any> {
    return this.http.put<any>(url, body, options);
  }

  delete(url: string, options?: any): Observable<any> {
    return this.http.delete(url, options);
  }
}
