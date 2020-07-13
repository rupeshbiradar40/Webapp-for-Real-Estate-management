import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  alertClass: string;
  alertMessage: string;

  constructor(private fb: FormBuilder, public auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['akshayabhang43@gmail.com', Validators.required],
      password: ['akshayabhang43@gmail.com', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.auth.doLogin(this.loginForm.value).subscribe((res) => {
      console.log('xxxx', res);
      if (res.status == 200) {
        this.auth.appUser = res.data;
        this.alertMessage = res.statusText;
        this.alertClass = 'alert-success';
        this.auth.doRedirect(['/home']);
        //setTimeout(function () { this.auth.doRedirect(['/home']);}, 3000);
       
      } else {
        this.alertMessage = res.statusText;
        this.alertClass = 'alert-danger';
      }
    });
  }
}
