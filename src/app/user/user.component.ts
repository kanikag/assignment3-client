import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user/user.service";
import {User} from "../models/domains";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = {userId:'',username: '', email: '', role: {name: ''}, organization: {name: ''}};


  constructor(private userService: UserService) {

  }

  authenticated() { return localStorage.getItem('jwt');
  }

  ngOnInit() {
    this.userService.getMe().subscribe(data => {
      this.user = data;
      localStorage.setItem('role', this.user.role.name);
    });

  }
}
