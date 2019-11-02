import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user/user.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.css']
})
export class RssFeedComponent implements OnInit {
  rssfeed = new RssDataSource(this.userService);
  displayedColumns: any = ['title', 'description', 'link', 'uri', 'publishedDate'];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }


  isResearcher() {
    return 'researcher' === localStorage.getItem('role');
  }

}


export class RssDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }

  connect(): Observable<Array<any>> {

    return this.userService.getRss();
  }

  disconnect() {
  }
}
