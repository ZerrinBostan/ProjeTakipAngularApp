import { Component, OnInit,Input } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() drawer: MatDrawer;
  @Input() isAdmin: boolean;
  toogleDrawer() {
    this.drawer.toggle();
  }
  constructor(private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit() {
  }
  logOutAdmin() {
    if (this.localStorage.get('_id')) {
      this.localStorage.remove('_id');
      this.router.navigate(['admin-login']);
    }
  }
  logOut() {
    if (this.localStorage.get('_id')) {
      this.localStorage.remove('_id');
      this.router.navigate(['login']);
    }
  }
}
