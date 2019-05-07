import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from './authenticate.service';
import { Students } from '../students/students.model';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { NotificationService } from '../admin/notification.service';

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
  constructor(
    public formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private router: Router,
    private localStorage: LocalStorageService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService) { }

  ngOnInit() {

  }
  onRegister() {
    this.student = this.registerForm.value;
    this.student.isEnabled = false;
    this.authenticateService.register(this.student).subscribe((data)  => {
        if (data) {
          this.localStorage.set('_id', data);
          this.registerForm.reset();
          this.step = 0;
          this.notificationService.setNotification({
            icon: 'work',
            message: `${this.student.name} ${this.student.surname} isimli öğrenci kayıt oldu. Onay bekliyor.`
          }).subscribe((res) => {
            console.log(res);
          });
        }
    });
  }
  onLogin() {
    this.userName = this.loginForm.get('studentNo').value;
    this.password = this.loginForm.get('studentPassword').value;
    this.authenticateService.authenticate(this.userName, this.password).subscribe((data) => {
        if (data.isEnabled) {
          if (!this.localStorage.get('_id')) {
            this.localStorage.set('_id', data._id);
            this.authenticateService.isLogin.next(true);
            this.router.navigate(['']);
          }
        } else {
          this.snackBar.openFromComponent(SnackbarComponent, {duration:2000 ,data: 'Hesabınız henüz onaylanmadı.'});
        }
    });
    }

}
