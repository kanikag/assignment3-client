import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user/user.service';
import {DataSource} from '@angular/cdk/collections';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  youtube = new YoutubeDataSource(this.userService);
  displayedColumns: any = ['title', 'description', 'video'];

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  ngOnInit() {
  }


  isPatient() {
    return 'patient' === localStorage.getItem('role');
  }

  videoURL(id): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id);
  }

}


export class YoutubeDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }

  connect(): Observable<Array<any>> {
    return this.userService.getYoutubeVideos();
  }

  disconnect() {
  }
}
