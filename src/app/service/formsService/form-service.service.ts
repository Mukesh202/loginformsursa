import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBase } from 'src/app/model/form-base';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor() { }
  toFormGroup(questions: FormBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}