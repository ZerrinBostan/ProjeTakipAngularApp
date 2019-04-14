import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  isLogin: boolean;
// tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.authService.isLogin.subscribe((data) => {
      this.isLogin = data;
    });
    console.log(this.isLogin);
    if (this.isLogin) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  constructor(private authService: AuthenticateService, private router: Router) { }
}
