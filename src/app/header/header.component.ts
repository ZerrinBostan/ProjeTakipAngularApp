import { Component, OnInit,Input } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { NotificationService } from '../admin/notification.service';
import { Notification } from '../admin/notification.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() drawer: MatDrawer;
  @Input() isAdmin: boolean;
  notifications: Notification[];
  toogleDrawer() {
    this.drawer.toggle();
  }
  constructor(private localStorage: LocalStorageService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getNotifications();
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
  getNotifications() {
    this.notificationService.getNotification().subscribe((observer) => {
      this.notifications = observer.slice(Math.max(observer.length - 5, 1));
    });
  }
}
