import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { errorMessages } from 'src/app/constants/errorMessages';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { ToastService } from 'src/app/services/toast.service';
import { ErrorMessages } from 'src/app/types/errorMessageType';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() registered = new EventEmitter();
  formErrorMessages: ErrorMessages = errorMessages;
  registerForm!: FormGroup;
  inputFields = [
    { 
      label: 'Navn',
      controlName: 'name',
      type: 'text',
      placeholder: 'Navn',
      validators: [Validators.required, Validators.minLength(2)]
    },
    { 
      label: 'Email',
      controlName: 'email',
      type: 'text',
      placeholder: 'Email',
      validators: [Validators.required, Validators.email]
    },
    {
      label: 'Adgangskode',
      controlName: 'password',
      type: 'password',
      placeholder: 'Adgangskode',
      helperText: 'Adgangskode skal bestå af 8+ store og små bogstaver, tal & symboler',
      validators: [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
    },
    {
      label: 'Telefonnummer',
      controlName: 'phone',
      type: 'number',
      placeholder: 'Telefonnummer',
      validators: [Validators.required, Validators.minLength(8)]
    },
    {
      label: 'Alder',
      controlName: 'age',
      type: 'number',
      placeholder: 'Alder',
      validators: [Validators.required]
    },
    {
      label: 'Postnummer',
      controlName: 'zipcode',
      type: 'number',
      placeholder: 'Postnummer',
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
    },
    {
      label: 'By',
      controlName: 'city',
      type: 'text',
      placeholder: 'By',
      validators: [Validators.required]
    }
  ]

  constructor(private authService: AuthService, private formService: FormService, private scroll: ViewportScroller, private toastService: ToastService) { 
    this.registerForm = this.formService.createForm(this.inputFields);
    this.registerForm.addControl('termsAccepted', new FormControl(false, Validators.requiredTrue));
  }


  async register() {
    const formValue = this.registerForm.value;
    try {
      await this.authService.signUp(formValue);
      this.registerForm.reset();
      this.toastService.presentSuccessToast('Sådan, så er du registreret, du kan nu logge ind!');
      this.scroll.scrollToPosition([0,0]);
    } catch (error) {
      this.toastService.presentErrorToast('Noget gik galt, tjek formattering af email og password');
      console.error("Error during registration", error);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control && control.errors) {
      for (const error of this.formErrorMessages[controlName]) {
        if (control.hasError(error.type)) {
          return error.message;
        }
      }
    }
    return '';
  }

  confirmPasswordValidation(formGroup: FormGroup){
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }


}
