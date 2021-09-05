import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/loginService/login-service.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public otpForm!: FormGroup;
  public loginResponse: any;
  constructor(private _fb: FormBuilder, private _service: LoginServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.initlizationForm();
    this.initlizationOtpForm();
  }

/**
 * name: initlization
 * @purpose: this is used to  initlize  login form
 */
  initlizationForm(): void{
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      token: ['e090c25187ee2b3f9f1f8a02747356641']
    })
  }

  /**
 * name: initlization
 * @purpose: this is used to  initlize  login form
 */
   initlizationOtpForm(): void{
    this.otpForm = this._fb.group({
      otp: ['', Validators.required]
    })
  }

  login(): void{
    const  fd =  new FormData();
    fd.append('username', this.loginForm.value.username);
    fd.append('password', this.loginForm.value.password);
    fd.append('token', this.loginForm.value.token);
   this._service.login(fd).subscribe(res => {
    this.loginResponse = res;
     if(res.twostep === 1){
      $("#exampleModal").modal("show");
     }
   })
  }

  /**
   * verifyOtp
   */
  
   verifyOtp(): void{
    const  fd =  new FormData();
    fd.append('token',  this.loginForm.value.token);
    fd.append('authToken', this.loginResponse.authToken);
    fd.append('otp', this.otpForm.value.otp);
   this._service.verifyOtp(fd).subscribe(res => {
     localStorage.setItem('authToken', this.loginResponse.authToken)
    this._router.navigate(['/dashboard'])
   })
   }  
}
