import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AuthService } from './service/auth/auth.service';


const routes: Routes = [
  {
    path: '',
    
    component: LoginComponent
  },
   {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService] 
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthService] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
