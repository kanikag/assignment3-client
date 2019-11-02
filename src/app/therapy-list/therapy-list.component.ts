import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user/user.service";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

import {User} from "../models/domains";

@Component({
  selector: 'app-therapy-list',
  templateUrl: './therapy-list.component.html',
  styleUrls: ['./therapy-list.component.css']
})
export class TherapyListComponent implements OnInit {
  therapies = new UserDataSource(this.userService);
  displayedColumns: any = ['id', 'patient', 'therapy', 'medicine', 'dosage', 'med', 'data'];


  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {

  }


  isMed() {
    return "patient" != localStorage.getItem('role');
  }

  loadSessions(username: string) {
    this.router.navigate(['/sessions', username]);
  }

}


export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }

  connect(): Observable<Array<any>> {

    return this.userService.getTherapies();
  }

  disconnect() {
  }
}
