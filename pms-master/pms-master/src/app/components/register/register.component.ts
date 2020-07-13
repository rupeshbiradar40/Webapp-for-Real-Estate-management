import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from './register.custom-validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  alertClass: string;
  alertMessage: string;
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: [
      null,
      Validators.compose([
      Validators.required,
      // check whether the entered password has a number
      CustomValidators.patternValidator(/\d/, {
        hasNumber: true
        }),
      // check whether the entered password has upper case letter
      CustomValidators.patternValidator(/[A-Z]/, {
        hasCapitalCase: true
        }),
      // check whether the entered password has a lower case letter
      CustomValidators.patternValidator(/[a-z]/, {
        hasSmallCase: true
        }),
      // check whether the entered password has a special character
      CustomValidators.patternValidator(
        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        {
          hasSpecialCharacters: true
        }),
      Validators.minLength(8)])
    ],
    contact: new FormControl('', [
      Validators.pattern('^[0-9_-]{10,12}')]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)]),
    city: new FormControl('', [
      Validators.required]),
    zip: new FormControl('', [
      Validators.pattern('^[0-9_-]{5,6}')]),
    state: new FormControl('', [
      Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.auth.doRegister(this.registerForm.value).subscribe((res) => {
      console.log('Register ', res);
      if (res.status === 201) {
        this.alertMessage = res.statusText;
        this.alertClass = 'alert-success';
        this.registerForm.reset();
      } else {
        this.alertMessage = res.statusText;
        this.alertClass = 'alert-danger';
      }
    });
  }

  get username() {
    return this.registerForm.get('username');
  }

  get contact() {
    return this.registerForm.get('contact');
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get zip() {
    return this.registerForm.get('zip');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get state() {
    return this.registerForm.get('state');
  }

  get city() {
    return this.registerForm.get('city');
  }
}
