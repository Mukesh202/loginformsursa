import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginServiceService } from '../loginService/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private httpClient: HttpClient, private _service: LoginServiceService, private _router: Router) { }
  
  public  canActivate(route: ActivatedRouteSnapshot): any {
    const isLoggedIn = this._service.isAuthenticated();
    if(!isLoggedIn){
      this._router.navigate(['/'])
    }
    return isLoggedIn;
  }

}
