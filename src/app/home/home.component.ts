import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user/user.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  title = 'client';
  constructor(private userService: UserService) {
  }

  authenticated() { return localStorage.getItem('jwt');
  }

  isPatient() {
    return 'patient' === localStorage.getItem('role');
  }

  ngOnInit() {
  }
}
