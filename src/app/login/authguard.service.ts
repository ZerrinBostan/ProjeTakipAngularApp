import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  isLogin: boolean;
// tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.localStorage.get('_id')) {
      this.authService.isLogin.next(true);
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  constructor(private authService: AuthenticateService, private router: Router, private localStorage: LocalStorageService) { }
}
