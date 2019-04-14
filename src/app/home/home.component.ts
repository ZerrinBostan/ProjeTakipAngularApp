import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin = false;
  constructor(private localStorage: LocalStorageService) { }

  ngOnInit() {
    if (this.localStorage.get('isAdmin')) {
      this.isAdmin = this.localStorage.get('isAdmin');
    }

  }

}
