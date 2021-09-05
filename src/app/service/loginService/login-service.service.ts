import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndpointUrl } from 'src/app/api-end-points';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private _http: HttpClient) { }

/**
 * @Name login
 * @purpose this is  used to  verify user
 * @param username and password 
 */
public login(data: any){
  return this._http
  .post(apiEndpointUrl.login(), data)
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}
/**
 * @Name verifyOtp
 * @purpose this is  used to  verify user
 * @param username and password 
 */
 public verifyOtp(data: any){
  return this._http
  .post(apiEndpointUrl.verifyOtp(), data)
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}
isAuthenticated(){
  const token = localStorage.getItem('authToken') 
  if(token){
    return true;
  } 
  return false;
}
}

