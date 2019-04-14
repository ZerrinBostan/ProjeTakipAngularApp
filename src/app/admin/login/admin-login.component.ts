import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/login/authenticate.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required]
  });
// tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private authService: AuthenticateService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit() {
  }
  onLogin() {
// tslint:disable-next-line: max-line-length
    this.authService.adminAuthenticate(this.loginForm.get('userName').value, this.loginForm.get('userPassword').value).subscribe((observer) => {
      if (observer) {
        this.localStorage.set('_id', observer);
        this.localStorage.set('isAdmin', true);
        this.router.navigate(['admin']);
      }
    });
  }

}
