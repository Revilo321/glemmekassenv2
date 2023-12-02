import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) {}

  createForm(inputFields: any[]): FormGroup {
    const formGroup = inputFields.reduce((group, field) => {
      group[field.controlName] = ['', field.validators];
      return group;
    }, {});

    return this.formBuilder.group(formGroup);
  }
}
