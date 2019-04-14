import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from './authenticate.service';
import { Students } from './students.model';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  step = 0;
  registerForm = this.formBuilder.group({
    identityNumber: ['', Validators.required],
    email: ['', Validators.email],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    studentNumber: ['', Validators.required],
    studentClass: [''],
    studentClassGroup: [''],
    password: ['', Validators.required],
    repassword: ['', Validators.required]
  });
  loginForm = this.formBuilder.group({
    studentNo: ['', Validators.required],
    studentPassword: ['', Validators.required]
  });
  student: Students;
// tslint:disable-next-line: max-line-length
  constructor(public formBuilder: FormBuilder,private authenticateService: AuthenticateService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() {

  }
  onRegister() {
    this.student = this.registerForm.value;
    this.authenticateService.register(this.student).subscribe((data)  => {
        if (data) {
          console.log(data);
          this.localStorage.set('_id', data);
          this.registerForm.reset();
          this.step = 0;
        }
    });
  }
  onLogin() {
    this.userName = this.loginForm.get('studentNo').value;
    this.password = this.loginForm.get('studentPassword').value;
    this.authenticateService.authenticate(this.userName, this.password).subscribe((data) => {
      if (data) {
        if (!this.localStorage.get('_id')) {
          this.localStorage.set('_id', data);
        }
      }
      this.router.navigate(['']);
    });
    }

}
