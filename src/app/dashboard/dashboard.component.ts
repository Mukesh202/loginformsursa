import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from '../model/form-base';
import { DashboardService } from '../service/dashboard/dashboard.service';
import { FormServiceService } from '../service/formsService/form-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() question!: FormBase<string>;
  @Input() form!: FormGroup;
  dynamicFormsResponse: any;
  formTypes: any[] | undefined;
  constructor(private _service: DashboardService, private _formService: FormServiceService, private _router: Router) {
   }

  ngOnInit(): void {
    // this.getDynamicforms();
    this.dynamicFormsResponse = [
      {
          "icici": {
              "slab_min": 100,
              "slab_max": 500,
              "value": 0.6,
              "is_fixed": 0
          },
          "indus": {
              "slab_min": 500,
              "slab_max": 900,
              "value": 0.6,
              "is_fixed": 2
          },
          "fino": {
              "slab_min": 300,
              "slab_max": 350,
              "value": 0.9,
              "is_fixed": 2
          }
      }
  ]
  this.formTypes = this.dynamicFormsResponse[0];
  this._formService.toFormGroup(this.dynamicFormsResponse[0])
  }

  getDynamicforms(){
    this._service.getDynamicForms().subscribe(res => {
      if(res && res.data){
        this.dynamicFormsResponse = res;
      } 
    })
  }
  logout(): void{
    localStorage.removeItem('authToken');
    this._router.navigate(['/login'])
    
 }
  get isValid() { return this.form.controls[this.question.key].valid; }
}
