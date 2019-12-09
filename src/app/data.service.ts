import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  headers = new HttpHeaders();
  constructor( private http: HttpClient) {
    this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
   }

   getServerData(serviceName) {
    return this.http.post(serviceName,{ headers: this.headers })
  }

  getConfig(serviceName) {
    return this.http.get(serviceName);
  }
}
