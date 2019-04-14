import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ProfileService } from './profile.service';
import { Students } from '../students/students.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  panelOpenState = false;
  hide:boolean;
  studentData: Students;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getUserInfo().subscribe((observer) => {
    this.studentData = observer;
    });
  }

}
