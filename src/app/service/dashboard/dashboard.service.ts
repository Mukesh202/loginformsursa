import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiEndpointUrl } from 'src/app/api-end-points';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpClient) { }

  public getDynamicForms(){
    const httpOptions = {
      headers: new HttpHeaders({
        "Authkey" : "test-angular-2021"
      })
    }
    
    return this._http
    .get(apiEndpointUrl.getDynamicform(), httpOptions)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
}